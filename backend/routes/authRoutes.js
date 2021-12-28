const router = require("express").Router();
const authController = require("../controllers/authControllers");
const asmController = require("../controllers/asmControllers");
const gsmController = require("../controllers/gsmControllers");
const presenceController = require("../controllers/presenceControllers");

// router.use(function (req, res, next) {
//   const token = req.cookies.jwt;
//   console.log(token);
//   next();
// });
// router.use(requireAuth);
router.get("/signup", authController.signup_get);
router.get("/menu", authController.menu_get);
router.post("/signup", authController.signup_post);
router.get("/login", authController.login_get);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout_get);

router.post("/asm", asmController.asm_post);
router.get("/asm", asmController.asm_get);
router.get("/asm/:id", asmController.asm_get_id);
router.post("/asm_edit/:id", asmController.asm_edit);
router.get("/asm_search", asmController.asm_get_search);
router.get("/asm_class/:class", asmController.asm_get_class);

router.post("/gsm", gsmController.gsm_post);
router.post("/gsm_edit/:id", gsmController.gsm_edit);
router.get("/gsm", gsmController.gsm_get);
router.get("/gsm/:id", gsmController.gsm_get_id);
router.get("/gsm_service/:service", gsmController.gsm_get_service);

router.post("/asm_presence", presenceController.asm_presence_post);
router.post("/gsm_presence", presenceController.gsm_presence_post);

module.exports = router;
