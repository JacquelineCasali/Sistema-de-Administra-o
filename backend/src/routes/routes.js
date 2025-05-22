const express = require("express");
const areaController = require("../controllers/areaController");
const subprocessoController = require("../controllers/subprocessoController");
 const userController = require("../controllers/userController");
const loginController = require("../controllers/loginController");
const ValidateToken = require("../middlewares/token");
const dashboardController = require("../controllers/dashboardController");
const processoController = require("../controllers/processoController");
const upload = require("../middlewares/upload");
const pdfController = require("../controllers/pdfController");
const downloadController = require("../controllers/downloadController");

const router = express.Router();
router.post('/login',loginController.login)
router.post('/user',userController.create)
router.get('/user',userController.listar)

router.get('/user/:id', ValidateToken,userController.ler)
router.put("/user/:id", userController.update);
router.delete("/user/:id", userController.delete);

router.post("/area", ValidateToken,areaController.create);
router.get("/area", ValidateToken,areaController.listar);
router.get("/area/:id",ValidateToken, areaController.ler);
router.put("/area/:id",ValidateToken, areaController.update);
router.delete("/area/:id", ValidateToken,areaController.delete);

router.post("/processo",ValidateToken,upload.single('documentacao'), processoController.create);
router.get("/processo", ValidateToken,processoController.listar);
router.get("/processo/:id/pdf",ValidateToken, processoController.ler);
router.get("/processo/:id",ValidateToken, processoController.lerProcesso);

router.put("/processo/:id",ValidateToken, upload.single('documentacao'),processoController.update);
router.delete("/processo/:id", ValidateToken,processoController.delete);
router.post("/subprocesso",ValidateToken, subprocessoController.create);
router.get("/subprocesso",ValidateToken, subprocessoController.listar);
router.get("/subprocesso/:id", ValidateToken,subprocessoController.ler);
router.put("/subprocesso/:id",ValidateToken, subprocessoController.update);
router.delete("/subprocesso/:id", ValidateToken,subprocessoController.delete);


router.get("/dashboard",dashboardController.listar)
router.get('/:processoId/pdf', pdfController.ler)
router.get("/download/:filename", downloadController.ler);

module.exports=router;