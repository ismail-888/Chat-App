import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getusersForSidebar } from "../controllers/user-controller.js";

const router = express.Router();

router.get("/", protectRoute, getusersForSidebar);

export default router;
