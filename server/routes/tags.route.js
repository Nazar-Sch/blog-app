const { Router } = require("express");

const router = Router();
const {
  getAllTags
} = require("../controllers/tags");

const auth = require("../middleware/auth");

router.get("/", auth, getAllTags);

module.exports = router;
