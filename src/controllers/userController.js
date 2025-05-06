import Users from "../models/userSchema.js";
import { responseStatus } from "../service/responseStatus.js";

export const getUser = async (req, res) => {
  try {
    const findUser = await Users.find({});

    const users = findUser.map((data) => {
      const list = { ...data.toObject() };
      delete list.__v;
      delete list.createdAt;
      delete list.updatedAt;
      return list;
    });

    const data = {
      res: res,
      status: 200,
      success: true,
      data: users,
    };

    return responseStatus(data);
  } catch (error) {
    console.log(error);
  }
};

export const postUser = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    if (!name || !email || !password || !phone || !role) {
      const data = {
        res: res,
        success: false,
        status: 404,
        message: "Plz filled out in the form field.",
      };
      return responseStatus(data);
    }

    const newAddress = "Yangon";
    const newLongitude = "16.871311";
    const newLatitude = "96.199379";

    const findEmail = await Users.findOne({ email: email });
    if (!findEmail) {
      const newUser = await Users.create({
        name: name,
        email: email,
        password: password,
        phone: phone,
        role: role,
        address: newAddress,
        longitude: newLongitude,
        latitude: newLatitude,
      });

      const newUserList = { ...newUser.toObject() };
      delete newUserList.__v;
      delete newUserList.createdAt;
      delete newUserList.updatedAt;

      const data = {
        res: res,
        status: 201,
        data: [newUserList],
        success: true,
      };

      return responseStatus(data);
    } else {
      const data = {
        res: res,
        success: false,
        status: 400,
        message: "Email is already exist.",
      };
      return responseStatus(data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!parseInt(id)) {
      const data = {
        res: res,
        success: false,
        status: 404,
        message: "UserId does not exist.",
      };
      return responseStatus(data);
    }

    const findUserId = await Users.findOne({ _id: id });

    const newUserList = { ...findUserId.toObject() };
    delete newUserList.__v;
    delete newUserList.createdAt;
    delete newUserList.updatedAt;

    if (!findUserId) {
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
      data: [newUserList],
      success: true,
    };

    return responseStatus(data);
  } catch (error) {
    console.log(error);
  }
};

export const patchUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!parseInt(id)) {
      const data = {
        res: res,
        success: false,
        status: 404,
        message: "UserId does not exist.",
      };
      return responseStatus(data);
    }
    const findUserId = await Users.findOne({ _id: id });
    if (!findUserId) {
      const data = {
        res: res,
        success: false,
        status: 404,
        message: "Not Found",
      };
      return responseStatus(data);
    } else {
      const findUserEmail = await Users.findOne({ email: req.body.email });
      if (!findUserEmail) {
        const updateUser = await Users.findOneAndUpdate(
          { _id: id },
          { ...req.body }
        );

        if (updateUser) {
          const findUser = await Users.findOne({ _id: id });

          const newUserList = { ...findUser.toObject() };
          delete newUserList.__v;
          delete newUserList.createdAt;
          delete newUserList.updatedAt;

          const data = {
            res: res,
            status: 200,
            data: [newUserList],
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
            "User Name is already exist that cannot update this User Name.",
        };
        return responseStatus(data);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!parseInt(id)) {
      const data = {
        res: res,
        success: false,
        status: 404,
        message: "UserId does not exist.",
      };
      return responseStatus(data);
    }
    const findUserId = await Users.findOne({ _id: id });
    if (!findUserId) {
      const data = {
        res: res,
        success: false,
        status: 404,
        message: "Not Found",
      };
      return responseStatus(data);
    } else {
      const deleteUser = await Users.findOneAndDelete({ _id: id });
      if (deleteUser) {
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
          message: "UserName cannot delete.",
        };
        return responseStatus(data);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
