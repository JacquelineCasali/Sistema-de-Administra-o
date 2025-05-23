const express = require("express");
 const userController = require("../controllers/userController");
const loginController = require("../controllers/loginController");
const ValidateToken = require("../middlewares/token");
const IsAdmin = require("../middlewares/IsAdmin");

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

// router.get('/extrato',ValidateToken,usuarioController.extrato)
// router.get('/carteira',ValidateToken,usuarioController.carteira)
//admin
// router.get('/relatorio',ValidateToken,IsAdmin,admController.listar)

module.exports=router;