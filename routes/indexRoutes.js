var express = require("express");
const router = express.Router();

// this acts as a conduit for all the routes to reduce routes in app.js to one line

const userRouter = require("./userRoutes");
const dogamiRouter = require("./dogamiRoutes");
const trackRouter = require("./trackRoutes");
const powerRouter = require("./powerRoutes");
const consumableRouter = require("./consumableRoutes");
// const dogamiImgRouter = require("./dogamiImgRoutes"); // one-off comment out

router.use("/user", userRouter);
router.use("/dogamis", dogamiRouter);
router.use("/tracks", trackRouter);
router.use("/powers", powerRouter);
router.use("/consumables", consumableRouter);
// router.use("/dogami-img", dogamiImgRouter); // one-off comment out

router.get("/", async (req, res, next) => {
  res.status(200).json({ msg: "test - backend service live" });
});

module.exports = router;
