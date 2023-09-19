import db from "../models/index";
import crudService from "../services/crudService";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log(data);
    return res.render("homepage.ejs", { data: JSON.stringify(data) });
  } catch (error) {
    console.log(error);
  }
};
let getCrudPage = async (req, res) => {
  return res.render("crudpage.ejs");
};
let postCrud = async (req, res) => {
  await crudService.createNewUser(req.body);
  console.log(req.body);

  return res.send("post crud from server");
};
let getCrud = async (req, res) => {
  let data = await crudService.getAllUsers();
  console.log("AllUser", data);
  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};
let getEditCrud = async (req, res) => {
  console.log(req.query.id);
  let userId = req.query.id;
  if (userId) {
    let userData = await crudService.getUserInforById(userId);
    console.log(`user with id ${userId}: `, userData);
    return res.render("editCRUD.ejs", { user: userData });
  } else {
    return res.send("user not found");
  }
};

let putCrud = async (req, res) => {
  let data = req.body;
  await crudService.updateUserData(data);
  return res.redirect("/get-crud");
};

let deleteCrud = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await crudService.deleteUserById(id);
    return res.send("delete");
  } else {
    return res.send("user not found");
  }
};

module.exports = {
  getHomePage: getHomePage,
  getCrudPage: getCrudPage,
  postCrud: postCrud,
  getCrud: getCrud,
  getEditCrud: getEditCrud,
  putCrud: putCrud,
  deleteCrud: deleteCrud,
};
