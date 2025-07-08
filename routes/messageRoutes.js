import express from "express";
const messageRoutes = express.Router();
messageRoutes.post("/send", (req, res) => {});
messageRoutes.get("/get", (req, res) => {});
export default messageRoutes;
