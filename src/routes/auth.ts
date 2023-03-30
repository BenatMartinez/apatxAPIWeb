import { Request, Response, Router } from "express";
import { registerCtrl, loginCtrl, getAccounts } from "../controllers/auth";
import {checkJwt} from "../middleware/session"

const router = Router();

router.post("/register", registerCtrl);
router.post("/login", loginCtrl);

router.get("/accounts", checkJwt, getAccounts);

export { router };