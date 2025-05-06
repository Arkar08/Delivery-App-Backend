import Category from "../models/categorySchema.js";
import Products from "../models/productSchema.js";
import { responseStatus } from "../service/responseStatus.js";

export const getProduct = async (req, res) => {
  try {
    const findProduct = await Products.find({});
    const findCategory = findProduct.map((product) => product.category);
    const category = await Category.find({ _id: findCategory });

    const categoryMap = {};
    category.forEach((category) => {
      categoryMap[category._id] = category.name;
    });

    const getProducts = findProduct.map((product) => {
      const categoryName = categoryMap[product.category] || "unknown";

      const products = { ...product.toObject() };
      delete products.__v;
      delete products.createdAt;
      delete products.updatedAt;

      return {
        ...products,
        category: categoryName,
      };
    });

    const data = {
      res: res,
      data: getProducts,
      status: 200,
      success: true,
    };
    return responseStatus(data);
  } catch (error) {
    console.log(error);
  }
};

export const postProduct = async (req, res) => {
  try {
    const { title, category, description, image, price } = req.body;
    const findCategory = await Category.findOne({ _id: category });
    if (!findCategory) {
      const data = {
        res: res,
        success: false,
        status: 404,
        message: "Category does not exist.",
      };
      return responseStatus(data);
    }
    if (!title || !price) {
      const data = {
        res: res,
        success: false,
        status: 404,
        message: "Plz filled out in the form field.",
      };
      return responseStatus(data);
    }

    const newProduct = await Products.create({
      title: title,
      category: category,
      price: price,
      description: description,
      image: image,
    });

    const newProductList = { ...newProduct.toObject() };
    delete newProductList.__v;
    delete newProductList.createdAt;
    delete newProductList.updatedAt;

    const data = {
      res: res,
      data: [newProductList],
      status: 201,
      success: true,
    };
    return responseStatus(data);
  } catch (error) {
    console.log(error);
  }
};

export const getProductId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!parseInt(id)) {
      const data = {
        res: res,
        success: false,
        status: 404,
        message: "ProductId does not exist.",
      };
      return responseStatus(data);
    }

    const findProductId = await Products.findOne({ _id: id });

    const findCategory = await Category.find({ _id: findProductId.category });
    const getProduct = {
      ...findProductId.toObject(),
      category: findCategory[0].name,
    };
    delete getProduct.__v;
    delete getProduct.createdAt;
    delete getProduct.updatedAt;

    if (!findProductId) {
      const data = {
        res: res,
        success: false,
        status: 404,
        message: "Not Found.",
      };
      return responseStatus(data);
    }

    const data = {
      res: res,
      status: 200,
      data: [getProduct],
      success: true,
    };

    return responseStatus(data);
  } catch (error) {
    console.log(error);
  }
};

export const patchProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!parseInt(id)) {
      const data = {
        res: res,
        success: false,
        status: 404,
        message: "ProductId does not exist.",
      };
      return responseStatus(data);
    }
    const findProductId = await Products.findOne({ _id: id });
    if (!findProductId) {
      const data = {
        res: res,
        success: false,
        status: 404,
        message: "Not Found",
      };
      return responseStatus(data);
    } else {
      const findProductName = await Products.findOne({ title: req.body.title });
      if (!findProductName) {
        const updateProduct = await Products.findOneAndUpdate(
          { _id: id },
          { ...req.body }
        );

        if (updateProduct) {
          const findProduct = await Products.findOne({ _id: id });
          const findCategory = await Category.find({
            _id: findProduct.category,
          });
          const getProduct = {
            ...findProduct.toObject(),
            category: findCategory[0].name,
          };
          delete getProduct.__v;
          delete getProduct.createdAt;
          delete getProduct.updatedAt;

          const data = {
            res: res,
            status: 200,
            data: [getProduct],
            success: true,
          };

          return responseStatus(data);
        }
      } else {
        const data = {
          res: res,
          success: false,
          status: 400,
          message:
            "Product Title is already exist that cannot update this Product Title.",
        };
        return responseStatus(data);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!parseInt(id)) {
      const data = {
        res: res,
        success: false,
        status: 404,
        message: "ProductId does not exist.",
      };
      return responseStatus(data);
    }
    const findProductId = await Products.findOne({ _id: id });
    if (!findProductId) {
      const data = {
        res: res,
        success: false,
        status: 404,
        message: "Not Found",
      };
      return responseStatus(data);
    } else {
      const deleteProduct = await Products.findOneAndDelete({ _id: id });
      if (deleteProduct) {
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
          message: "ProductName cannot delete.",
        };
        return responseStatus(data);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
