const express = require("express");
 const userController = require("../controllers/userController");
const loginController = require("../controllers/loginController");
const ValidateToken = require("../middlewares/token");
const IsAdmin = require("../middlewares/IsAdmin");
const uploadController = require("../controllers/uploadController");
const upload = require("../middlewares/upload");
const transactionController = require("../controllers/transactionController");

const router = express.Router();
router.post('/login',loginController.login)
router.post('/senha',loginController.senha)
// usuarios adm ou user 
router.post('/user',userController.create)
router.post('/user', ValidateToken, IsAdmin, userController.create);
router.get('/user',ValidateToken,IsAdmin,userController.listar)
router.get('/user/:id', ValidateToken,userController.ler)
router.put("/user/:id", ValidateToken,userController.update);
router.delete("/user/:id",ValidateToken, userController.delete);
router.post("/upload",ValidateToken,IsAdmin,upload.single('file'), uploadController.upload);
//transação manual 
router.post("/transacoes",ValidateToken,IsAdmin, transactionController.create);
//filtro
router.get("/admin/transactions",ValidateToken, IsAdmin,transactionController.admin);
//extrato
router.get('/transactions', ValidateToken, transactionController.extract);
//status
router.get('/status', ValidateToken, transactionController.status);



module.exports=router;