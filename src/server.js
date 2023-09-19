import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";
require("dotenv").config();

let app = express();
app.use(cors({ credentials: true, origin: true }));
// config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
viewEngine(app);
initWebRoutes(app);
connectDB(app);

let port = process.env.PORT || 3000;
console.log("helo");
app.listen(port, () => {
  console.log("Server listening on port: " + port);
});
