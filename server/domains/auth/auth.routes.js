import express from "express";
const router = express.Router();
import checkAuthenticated from "../../shared/middlewares/checkAuthenticated.js";

import { userMe, loginUser, logoutUser } from "./auth.controller.js";

router.get("/me", checkAuthenticated, userMe);
// TEMPORARY (ROADMAP item 4): log the forwarding headers on login so we can
// pick the Express "trust proxy" hop count. Remove once it's set. Logs no
// request body.
router.post(
  "/login",
  (req, res, next) => {
    console.log(
      "[xff-check]",
      JSON.stringify({
        xForwardedFor: req.headers["x-forwarded-for"],
        xRealIp: req.headers["x-real-ip"],
        xNfClientConnectionIp: req.headers["x-nf-client-connection-ip"],
        xEnvoyExternalAddress: req.headers["x-envoy-external-address"],
        remoteAddress: req.socket.remoteAddress,
        ip: req.ip,
        ips: req.ips,
      }),
    );
    next();
  },
  loginUser,
);
router.post("/logout", logoutUser);

export default router;
