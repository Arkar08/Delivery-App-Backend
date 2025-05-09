import Category from "../models/categorySchema.js";
import { responseStatus } from "../service/responseStatus.js";

export const getCategory = async (req, res) => {
  try {
    const findData = await Category.find({});

    const category = findData.map((data) => {
      const list = { ...data.toObject(),id:data._id };
      delete list.__v;
      delete list._id;
      return list;
    });

    const compare = (a,b)=>{
      if ( a.createdAt < b.createdAt){
        return 1;
      }
      if ( a.createdAt > b.createdAt ){
        return -1;
      }
      return 0;
    }

    category.sort(compare)

    const data = {
      res: res,
      data: category,
      status: 200,
      success: true,
    };
    return responseStatus(data);
  } catch (error) {
    console.log(error);
  }
};

export const postCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name === "") {
      const data = {
        res: res,
        success: false,
        status: 404,
        message: "Plz filled out in the form field.",
      };
      return responseStatus(data);
    }
    const findCategory = await Category.findOne({ name: name });
    if (!findCategory) {
      const newCategory = await Category.create({
        name: name,
      });

      const newCategoryList = { ...newCategory.toObject() };
      delete newCategoryList.__v;

      const data = {
        res: res,
        status: 201,
        data: [newCategoryList],
        success: true,
      };

      return responseStatus(data);
    } else {
      const data = {
        res: res,
        success: false,
        status: 400,
        message: "Category is already exist.",
      };

      return responseStatus(data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!parseInt(id)) {
      const data = {
        res: res,
        success: false,
        status: 400,
        message: "CategoryId does not exist.",
      };
      return responseStatus(data);
    }

    const findCategoryId = await Category.findOne({ _id: id });

    if (!findCategoryId) {
      const data = {
        res: res,
        success: false,
        status: 404,
        message: "Not Found.",
      };
      return responseStatus(data);
    }

    const newCategoryList = { ...findCategoryId.toObject() };
    delete newCategoryList.__v;

    const data = {
      res: res,
      status: 200,
      data: [newCategoryList],
      success: true,
    };

    return responseStatus(data);
  } catch (error) {
    console.log(error);
  }
};

export const patchCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!parseInt(id)) {
      const data = {
        res: res,
        success: false,
        status: 400,
        message: "CategoryId does not exist.",
      };
      return responseStatus(data);
    }
    const findCategoryId = await Category.findOne({ _id: id });
    if (!findCategoryId) {
      const data = {
        res: res,
        success: false,
        status: 404,
        message: "Not Found.",
      };
      return responseStatus(data);
    } else {
      const findCategoryName = await Category.findOne({ name: req.body.name });
      if (!findCategoryName) {
        const updateCategory = await Category.findOneAndUpdate(
          { _id: id },
          { ...req.body }
        );

        if (updateCategory) {
          const findCategory = await Category.findOne({ _id: id });

          const newCategoryList = { ...findCategory.toObject() };
          delete newCategoryList.__v;
          const data = {
            res: res,
            data: [newCategoryList],
            status: 200,
            success: true,
          };
          return responseStatus(data);
        }
      } else {
        return res
          .status(400)
          .json(
            "Category Name is already exist that cannot update this Category Name."
          );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!parseInt(id)) {
      const data = {
        res: res,
        success: false,
        status: 400,
        message: "CategoryId does not exist.",
      };
      return responseStatus(data);
    }
    const findCategoryId = await Category.findOne({ _id: id });
    if (!findCategoryId) {
      const data = {
        res: res,
        success: false,
        status: 404,
        message: "Not Found.",
      };
      return responseStatus(data);
    } else {
      const deleteCategory = await Category.findOneAndDelete({ _id: id });
      if (deleteCategory) {
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
          message: "CategoryName cannot delete.",
        };
        return responseStatus(data);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
