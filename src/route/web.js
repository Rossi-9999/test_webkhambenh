import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();
let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/crud", homeController.getCrudPage);
  router.post("/post-crud", homeController.postCrud);
  router.get("/get-crud", homeController.getCrud);
  router.get("/edit-crud", homeController.getEditCrud);
  router.post("/put-crud", homeController.putCrud);
  router.get("/delete-crud", homeController.deleteCrud);

  router.post("/api/login", userController.handleLogin);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);

  return app.use("/", router);
};
module.exports = initWebRoutes;
