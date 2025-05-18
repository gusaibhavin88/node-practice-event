const {
  create,
  getEvent,
  deleteEvent,
  listEvent,
} = require("../controller/event.controller");
const { authMiddleware } = require("../middleware/authMiddleware");
const { upload } = require("../utility/multer");

const eventRouter = require("express").Router();

eventRouter.post("/create", upload.array("imagesUrl"), create);
eventRouter.post("/get/:id", getEvent);
eventRouter.delete("/:id", deleteEvent);
eventRouter.get("/list", listEvent);
module.exports = eventRouter;
