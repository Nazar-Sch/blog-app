const { Router } = require("express");

const { signIn, signUp, checkuser } = require("../controllers/user");
const validator = require("../middleware/shemaValidator");

const { signin, signup } = require("../schema");

const router = Router();

router.post("/signin", validator(signin), signIn);
router.post("/signup", validator(signup), signUp);

module.exports = router;
