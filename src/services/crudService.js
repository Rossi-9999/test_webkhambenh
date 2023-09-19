var bcrypt = require("bcryptjs");
import { raw } from "body-parser";
import db from "../models/index";

var salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await hashUserPassword(data.password);
      console.log("------------------------");
      console.log(data.password, hashPassword);
      await db.User.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashPassword,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        // image: data.image,
        roleId: data.roleId,
        // positionId: data.positionId,
      });
      resolve("createNewUser success !");
    } catch (error) {
      reject(error);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({ raw: true });
      return resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

let getUserInforById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateUserData = (data) => {
  console.log("user update", data);
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: data.id } });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();
        resolve();
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUserById = (userId) => {
  new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: userId }, raw: true });
      if (user) {
        // await user.destroy();
        await db.User.destroy({
          where: { id: userId },
        });
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
  hashUserPassword: hashUserPassword,
  getAllUsers: getAllUsers,
  getUserInforById: getUserInforById,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById,
};
