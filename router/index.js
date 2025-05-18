const authRouter = require("./authRoute");
const eventRouter = require("./eventRoute");

const router = require("express").Router();

router.use("/auth", authRouter);
router.use("/event", eventRouter);
module.exports = router;
