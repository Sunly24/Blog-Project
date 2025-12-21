import express from "express";
import { create, deleteComment, fetchByContentId } from "../controllers/commentController.js";


const commentRoute = express.Router();

commentRoute.post("/create", create);
commentRoute.get("/content/:contentId", fetchByContentId);
commentRoute.delete("/delete/:id", deleteComment);

export default commentRoute;