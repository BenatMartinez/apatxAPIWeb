import { NextFunction, Request, Response } from "express";
import { JwtPayload, TokenExpiredError} from "jsonwebtoken";
import { RequestExt } from "../interfaces/req-ext";
import { verifyToken } from "../utils/jwt.handle";
import {Error} from "../interfaces/error.interface"

const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || "";
    const jwt = jwtByUser.split(" ").pop(); // 11111
    const isUser = verifyToken(`${jwt}`) as { id: string };
    if (!isUser) {
        const error: Error = {
            name : "UnauthorizedError",
            message : "No estas autorizado para acceder a este contenido"
        };
        res.status(401);
        res.send({"error":error});
    } else {
      req.user = isUser;
      next();
    }
  } catch (e: any) {
    if (e instanceof TokenExpiredError) {
        e.message = "TOKEN_EXPIRADO"
        res.status(401).send({"error":e});
        //res.status(401).send("TOKEN_EXPIRED");
      } else {
        e.message = "SESSION_NO_VALIDAD"
        res.status(401).send({"error":e});
        //res.status(401).send("SESSION_NO_VALIDAD");
    }
  }
};

export { checkJwt };