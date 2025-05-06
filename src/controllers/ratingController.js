import Orders from "../models/orderSchema.js";
import Rating from "../models/ratingSchema.js";
import Users from "../models/userSchema.js";
import { responseStatus } from "../service/responseStatus.js";

export const getRating = async (req, res) => {
  try {
    const findRating = await Rating.find({});

    const mapOrder = findRating.map((rating) => rating.orderId);
    const order = await Orders.find({ _id: mapOrder });

    const mapUser = findRating.map((user) => user.userId);
    const user = await Users.find({ _id: mapUser });

    let userName = {};
    user.map((users) => {
      return (userName[users._id] = users.name);
    });

    let orderName = {};
    order.map((orders) => {
      return (orderName[orders._id] = orders.orderNo);
    });

    const getRatingList = findRating.map((rating) => {
      const orderNo = orderName[rating.orderId] || "Unknown";
      const userNames = userName[rating.userId] || "Unknown";
      const ratingList = { ...rating.toObject() };
      delete ratingList.__v;
      delete ratingList.createdAt;
      delete ratingList.updatedAt;

      return { ...ratingList, orderNo: orderNo, customerName: userNames };
    });

    const data = {
      res: res,
      data: getRatingList,
      status: 200,
      success: true,
    };
    return responseStatus(data);
  } catch (error) {
    console.log(error);
  }
};

export const postRating = async (req, res) => {
  try {
    const { orderId, rating, comments, userId } = req.body;

    const newRating = await Rating.create({
      orderId: orderId,
      rating: rating,
      comments: comments,
      userId: userId,
    });

    const newRatingList = { ...newRating.toObject() };
    delete newRatingList.__v;
    delete newRatingList.createdAt;
    delete newRatingList.updatedAt;

    const data = {
      res: res,
      data: [newRatingList],
      status: 201,
      success: true,
    };
    return responseStatus(data);
  } catch (error) {
    console.log(error);
  }
};

export const getRatingId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!parseInt(id)) {
      const data = {
        res: res,
        success: false,
        status: 404,
        message: "RatingId does not exist.",
      };
      return responseStatus(data);
    }

    const findRatingId = await Rating.findOne({ _id: id });
    const findCustomer = await Users.find({ _id: findRatingId.userId });
    const findDelivery = await Orders.find({ _id: findRatingId.orderId });
    const getRating = {
      ...findRatingId.toObject(),
      customerName: findCustomer[0].name,
      orderNo: findDelivery[0].orderNo,
    };
    delete getRating.__v;
    delete getRating.createdAt;
    delete getRating.updatedAt;

    if (!findRatingId) {
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
      data: [getRating],
      success: true,
    };

    return responseStatus(data);
  } catch (error) {
    console.log(error);
  }
};

export const patchRating = async (req, res) => {
  try {
    const { id } = req.params;
    if (!parseInt(id)) {
      const data = {
        res: res,
        success: false,
        status: 404,
        message: "RatingId does not exist.",
      };
      return responseStatus(data);
    }
    const findRating = await Rating.findOne({ _id: id });
    if (!findRating) {
      const data = {
        res: res,
        success: false,
        status: 404,
        message: "Not Found",
      };
      return responseStatus(data);
    } else {
      const updateRating = await Rating.findOneAndUpdate(
        { _id: id },
        { ...req.body }
      );

      if (updateRating) {
        const findRating = await Rating.findOne({ _id: id });
        const findCustomer = await Users.find({ _id: findRating.userId });
        const findDelivery = await Orders.find({ _id: findRating.orderId });
        const getRating = {
          ...findRating.toObject(),
          customerName: findCustomer[0].name,
          orderNo: findDelivery[0].orderNo,
        };
        delete getRating.__v;
        delete getRating.createdAt;
        delete getRating.updatedAt;

        const data = {
          res: res,
          status: 200,
          data: [getRating],
          success: true,
        };

        return responseStatus(data);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteRating = async (req, res) => {
  try {
    const { id } = req.params;
    if (!parseInt(id)) {
      const data = {
        res: res,
        success: false,
        status: 404,
        message: "RatingId does not exist.",
      };
      return responseStatus(data);
    }
    const findRatingId = await Rating.findOne({ _id: id });
    if (!findRatingId) {
      const data = {
        res: res,
        success: false,
        status: 404,
        message: "Not Found",
      };
      return responseStatus(data);
    } else {
      const deleteRating = await Rating.findOneAndDelete({ _id: id });
      if (deleteRating) {
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
          message: "Rating cannot delete.",
        };
        return responseStatus(data);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
