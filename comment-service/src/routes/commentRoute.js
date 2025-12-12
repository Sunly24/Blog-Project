import express from "express";
import { fetch, create, deleteComment } from "../controllers/commentController";


const commentRoute = express.Router();

commentRoute.post("/create", create);
commentRoute.get("/getAllComments", fetch);
commentRoute.delete("/delete/:id", deleteComment);

export default commentRoute;