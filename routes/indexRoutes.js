var express = require("express");
const router = express.Router();

// this acts as a conduit for all the routes to reduce routes in app.js to one line

const userRouter = require("./userRoutes");
const dogamiRouter = require("./dogamiRoutes");
const trackRouter = require("./trackRoutes");
const powerRouter = require("./powerRoutes");
const consumableRouter = require("./consumableRoutes");
const skillRouter = require("./skillRoutes");
const dogamiImgRouter = require("./dogamiImgRoutes");
const dogamiOfficialApiRouter = require("./dogamiOfficialApiRoutes");

router.use("/user", userRouter);
router.use("/dogamis", dogamiRouter);
router.use("/tracks", trackRouter);
router.use("/powers", powerRouter);
router.use("/consumables", consumableRouter);
router.use("/skills", skillRouter);
router.use("/dogami-images", dogamiImgRouter);
router.use("/dogami-official-api", dogamiOfficialApiRouter);

router.get("/", async (req, res, next) => {
  res.status(200).json({ msg: "test - backend service live" });
});

module.exports = router;
