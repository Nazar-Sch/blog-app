const { Router } = require("express");

const { signIn, signUp, getCurrentUser } = require("../controllers/user");
const auth = require("../middleware/auth");
const validator = require("../middleware/shemaValidator");

const { signin, signup } = require("../schema");

const router = Router();

router.get("/current", auth, getCurrentUser);
router.post("/signin", validator(signin), signIn);
router.post("/signup", validator(signup), signUp);


module.exports = router;
