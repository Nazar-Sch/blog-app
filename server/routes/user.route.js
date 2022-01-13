const { Router } = require("express");

const validator = require("../middleware/shemaValidator");
const auth = require("../middleware/auth");
const { signIn, signUp, getCurrentUser } = require("../controllers/user");

const { signin, signup } = require("../schema");

const router = Router();

router.post("/signin", validator(signin), signIn);
router.post("/signup", validator(signup), signUp);
router.get("/current", auth, getCurrentUser);

module.exports = router;
