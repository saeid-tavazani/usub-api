const express = require("express");
const { auth } = require("../middlewares/auth");
const validator = require("../middlewares/validator");
const {
  newSession,
  verifyToken,
} = require("../controllers/sessionsController");
const {
  emailValidator,
  passValidator,
} = require("../services/ValidatorService");

const router = express.Router();

router.post(
  "/",
  validator([emailValidator().notEmpty(), passValidator().notEmpty()]),
  newSession
);
router.get("/verify", [auth], verifyToken);

module.exports = router;
