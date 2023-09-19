import db from "../models";
import bcrypt from "bcryptjs";

var salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "OK";
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong Password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "User not found";
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = "Your email isn't exist";
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

let checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { email: email } });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let compareUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
    } catch (error) {
      reject(error);
    }
  });
};

// let getAllUsers = (userId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let users = "";
//       if (userId === "ALL") {
//         users = await db.User.findAll({
//           attributes: { exclude: ["password"] },
//           raw: true,
//         });
//       }
//       if (userId && userId !== "ALL") {
//         users = await db.User.findOne({
//           where: { id: userId },
//           attributes: { exclude: ["password"] },
//           raw: true,
//         });
//       }
//       resolve(users);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: { exclude: ["password"] },
          raw: true,
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: { exclude: ["password"] },
          raw: true,
        });
      }
      return users;
      // resolve(users);
    } catch (error) {
      // reject(error);
      return null;
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

// let createNewUser = (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       // check email  is exist ??
//       let check = await checkUserEmail(data.email);
//       if (check == true) {
//         resolve({
//           errCode: 1,
//           errMessage: "Your email already exists, please try other email",
//         });
//       } else {
//         let hashPassword = await hashUserPassword(data.password);

//         await db.User.create({
//           firstName: data.firstName,
//           lastName: data.lastName,
//           email: data.email,
//           password: hashPassword,
//           address: data.address,
//           phoneNumber: data.phoneNumber,
//           gender: data.gender === "1" ? true : false,
//           // image: data.image,
//           roleId: data.roleId,
//           // positionId: data.positionId,
//         });
//         resolve({
//           errCode: 0,
//           errMessage: "OK",
//         });
//       }
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

let createNewUser = async (data) => {
  try {
    // check email  is exist ??
    const user = await db.User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: "123",
      address: data.address,
      phoneNumber: data.phoneNumber,
      gender: data.gender === "1" ? true : false,
      // image: data.image,
      roleId: data.roleId,
      // positionId: data.positionId,
    });
    return user;
  } catch (error) {
    return null;
  }
};

let deleteUser = async (userId) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.User.findOne({
      where: { id: userId },
    });
    if (!user) {
      resolve({
        errCode: 2,
        errMessage: "The user isn't exist",
      });
    }
    await db.User.destroy({
      where: { id: userId },
    });
    resolve({
      errCode: 0,
      errMessage: "The user already deleted",
    });
  });
};

let updateUserData = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters",
        });
      }
      let user = await db.User.findOne({ where: { id: data.id }, raw: false });
      if (user) {
        // await db.User.save({
        //   firstName: data.firstName,
        //   lastName: data.lastName,
        //   address: data.address,
        // });
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;

        await user.save();

        resolve({
          errCode: 0,
          message: "update the user success",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "user's not found ",
        });
      }
    } catch (error) {
      reject(e);
    }
  });
};
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUserData: updateUserData,
};
