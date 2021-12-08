const router = require("express").Router();
const authController = require("../controllers/authControllers");

// router.use(function (req, res, next) {
//   const token = req.cookies.jwt;
//   console.log(token);
//   next();
// });
// router.use(requireAuth);
router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);
router.get("/login", authController.login_get);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout_get);
router.post("/asm", authController.asm_post);
router.get("/asm", authController.asm_get);
router.get("/asm/:id", authController.asm_get_id);
router.post("/asm_edit/:id", authController.asm_edit);
module.exports = router;
