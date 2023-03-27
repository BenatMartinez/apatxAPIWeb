import { Request, Response, Router } from "express";
import { registerCtrl, loginCtrl, console } from "../controllers/auth";

const router = Router();
router.post("/register", registerCtrl);
router.post("/login", loginCtrl);
router.get("/hello", console);

export { router };