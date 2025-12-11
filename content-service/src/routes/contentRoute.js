import express from "express";
import {
  fetch,
  create,
  update,
  deleteContent,
} from "../controllers/contentController.js";

const contentRoute = express.Router();

contentRoute.post("/create", create);
contentRoute.get("/getAllContent", fetch);
contentRoute.put("/update/:id", update);
contentRoute.delete("/delete/:id", deleteContent);

export default contentRoute;
