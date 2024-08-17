var express = require("express");
var router = express.Router();

const user_controller = require("../controllers/userController");

/**
 *  Given the purpose of the application, and user containing
 *  authentication information, all user requests go through
 *  JWT authentication and use the id in the JWT.
 *
 *  It would be possible to provide general user/:userId routes,
 *  but I have chosen not to currently.
 *
 *  Users can make things such as their strats private.
 */

/* --- PAGE ROUTES--- */
// Can generally put these first, as they are fully-specific

/* POST register page - user attempts to register. */
router.post("/register", user_controller.register_post);

/* POST login page - user attempts to login. */
router.post("/login", user_controller.login_post);

// GET request tailored to the needs of the frontend user dashboard
router.get("/frontend-user-dashboard", user_controller.dashboard_get);

// GET request to collect the username relating to a JWT, nothing else
router.get("/current-user", user_controller.user_get);

// creates and a modular, mountable route handler
module.exports = router;
