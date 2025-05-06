import Orders from "../models/orderSchema.js";
import Users from "../models/userSchema.js";
import { responseStatus } from "../service/responseStatus.js";

export const getOrder = async (req, res) => {
  try {
    const findOrder = await Orders.find({});

    const mapCustomer = findOrder.map((order) => order.customer);
    const findCustomer = await Users.find({ _id: mapCustomer });

    let customerMap = {};
    findCustomer.forEach((customer) => {
      customerMap[customer._id] = customer.name;
    });

    const getOrderList = findOrder.map((order) => {
      const customerName = customerMap[order.customer] || "Unknown";
      const deliveryMan = customerMap[order.deliveryMen] || "Unknown";

      const orderList = { ...order.toObject() };
      delete orderList.__v;
      delete orderList.createdAt;
      delete orderList.updatedAt;

      return {
        ...orderList,
        customer: customerName,
        deliveryMen: deliveryMan,
      };
    });

    
    const compare = (a,b)=>{
      if ( a.orderNo < b.orderNo){
        return 1;
      }
      if ( a.orderNo > b.orderNo ){
        return -1;
      }
      return 0;
    }

    getOrderList.sort(compare)


    const data = {
      res: res,
      data: getOrderList,
      status: 200,
      success: true,
    };
    return responseStatus(data);
  } catch (error) {
    console.log(error);
  }
};

export const postOrder = async (req, res) => {
  try {
    const { customer, deliveryMen, productLists, totalAmount, payment } =
      req.body;

    if (!totalAmount || productLists.length === 0) {
      const data = {
        res: res,
        success: false,
        status: 404,
        message: "Plz filled out in the form field.",
      };
      return responseStatus(data);
    }

    const lastOrder = await Orders.find();

    const orderId = Number(lastOrder[lastOrder.length - 1].orderNo.slice(8))
      ? Number(lastOrder[lastOrder.length - 1].orderNo.slice(8)) + 1
      : 1;
    const voucherId = (number) => {
      let string = "";
      let modifyNumber = 6 - number;
      for (let i = 0; i < modifyNumber; i++) {
        string = string + "0";
      }
      return string;
    };
    const orderNo = `OrderNo-${
      voucherId(orderId.toString().length) + orderId.toString()
    }`;

    const newOrder = await Orders.create({
      orderNo: orderNo,
      customer: customer,
      deliveryMen: deliveryMen,
      productLists: productLists,
      totalAmount: totalAmount,
      payment: payment,
    });

    const newOrderList = { ...newOrder.toObject() };
    delete newOrderList.__v;
    delete newOrderList.createdAt;
    delete newOrderList.updatedAt;

    const data = {
      res: res,
      status: 201,
      data: [newOrderList],
      success: true,
    };

    return responseStatus(data);
  } catch (error) {
    console.log(error);
  }
};

export const getOrderId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!parseInt(id)) {
      const data = {
        res: res,
        success: false,
        status: 404,
        message: "OrderId does not exist.",
      };
      return responseStatus(data);
    }

    const findOrderId = await Orders.findOne({ _id: id });
    const findCustomer = await Users.find({ _id: findOrderId.customer });
    const findDelivery = await Users.find({ _id: findOrderId.deliveryMen });
    const getOrder = {
      ...findOrderId.toObject(),
      customer: findCustomer[0].name,
      deliveryMen: findDelivery[0].name,
    };
    delete getOrder.__v;
    delete getOrder.createdAt;
    delete getOrder.updatedAt;

    if (!findOrderId) {
      const data = {
        res: res,
        success: false,
        status: 404,
        message: "Not Found",
      };
      return responseStatus(data);
    }
    const data = {
      res: res,
      status: 200,
      data: [getOrder],
      success: true,
    };

    return responseStatus(data);
  } catch (error) {
    console.log(error);
  }
};

export const patchOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!parseInt(id)) {
      const data = {
        res: res,
        success: false,
        status: 404,
        message: "OrderId does not exist.",
      };
      return responseStatus(data);
    }
    const findOrderId = await Orders.findOne({ _id: id });
    if (!findOrderId) {
      const data = {
        res: res,
        success: false,
        status: 404,
        message: "Not Found",
      };
      return responseStatus(data);
    } else {
      const updateOrder = await Orders.findOneAndUpdate(
        { _id: id },
        { ...req.body }
      );

      if (updateOrder) {
        const findOrder = await Orders.findOne({ _id: id });
        const findCustomer = await Users.find({ _id: findOrder.customer });
        const findDelivery = await Users.find({ _id: findOrder.deliveryMen });
        const getOrder = {
          ...findOrder.toObject(),
          customer: findCustomer[0].name,
          deliveryMen: findDelivery[0].name,
        };
        delete getOrder.__v;
        delete getOrder.createdAt;
        delete getOrder.updatedAt;
        const data = {
          res: res,
          status: 200,
          data: [getOrder],
          success: true,
        };

        return responseStatus(data);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!parseInt(id)) {
      const data = {
        res: res,
        success: false,
        status: 404,
        message: "OrderId does not exist.",
      };
      return responseStatus(data);
    }
    const findOrderId = await Orders.findOne({ _id: id });
    if (!findOrderId) {
      const data = {
        res: res,
        success: false,
        status: 404,
        message: "Not Found",
      };
      return responseStatus(data);
    } else {
      const deleteOrder = await Orders.findOneAndDelete({ _id: id });
      if (deleteOrder) {
        const data = {
          res: res,
          success: true,
          status: 200,
          message: "Delete Successfully.",
        };
        return responseStatus(data);
      } else {
        const data = {
          res: res,
          success: false,
          status: 400,
          message: "orderName cannot delete",
        };
        return responseStatus(data);
      }
    }
  } catch (error) {
    console.log(error);
  }
};


export const getOrderCustomer = async(req,res)=>{
  try {
    const {userId} = req.params;
    const findOrder = await Orders.find({customer:userId})
    

    if(findOrder.length === 0){
        const data = {
          res:res,
          status:400,
          success:false,
          message:"UserId does not exist."
        }

        return responseStatus(data)
    }else{
      const mapCustomer = findOrder.map((order) => order.customer);
      const findCustomer = await Users.find({ _id: mapCustomer });
  
      let customerMap = {};
      findCustomer.forEach((customer) => {
        customerMap[customer._id] = customer.name;
      });
  
      const getOrderList = findOrder.map((order) => {
        const customerName = customerMap[order.customer] || "Unknown";
        const deliveryMan = customerMap[order.deliveryMen] || "Unknown";
  
  
        const orderList = { ...order.toObject() };
        delete orderList.__v;
        delete orderList.createdAt;
        delete orderList.updatedAt;
  
        return {
          ...orderList,
          customer: customerName,
          deliveryMen: deliveryMan,
        };
      });
  
      const compare = (a,b)=>{
        if ( a.orderNo < b.orderNo){
          return 1;
        }
        if ( a.orderNo > b.orderNo ){
          return -1;
        }
        return 0;
      }
  
      getOrderList.sort(compare)
  
     
  
      const data = {
        res: res,
        data: getOrderList,
        status: 200,
        success: true,
      };
      return responseStatus(data);
      
    }

   
  } catch (error) {
    console.log(error)
  }
}

export const getOrderDelivery = async(req,res)=>{
  try {
    const {userId} = req.params;
    const findOrder = await Orders.find({deliveryMen:userId})
    if(findOrder.length === 0){
      const data = {
        res:res,
        status:400,
        success:false,
        message:"UserId does not exist."
      }

      return responseStatus(data)
  }else{
    const mapCustomer = findOrder.map((order) => order.customer);
    const findCustomer = await Users.find({ _id: mapCustomer });

    let customerMap = {};
    findCustomer.forEach((customer) => {
      customerMap[customer._id] = customer.name;
    });

    const getOrderList = findOrder.map((order) => {
      const customerName = customerMap[order.customer] || "Unknown";
      const deliveryMan = customerMap[order.deliveryMen] || "Unknown";


      const orderList = { ...order.toObject() };
      delete orderList.__v;
      delete orderList.createdAt;
      delete orderList.updatedAt;

      return {
        ...orderList,
        customer: customerName,
        deliveryMen: deliveryMan,
      };
    });

    const compare = (a,b)=>{
      if ( a.orderNo < b.orderNo){
        return 1;
      }
      if ( a.orderNo > b.orderNo ){
        return -1;
      }
      return 0;
    }

    getOrderList.sort(compare)

   

    const data = {
      res: res,
      data: getOrderList,
      status: 200,
      success: true,
    };
    return responseStatus(data);
    
  }
    
  } catch (error) {
    console.log(error)
  }
}