const express = require("express");
 const userController = require("../controllers/userController");
const loginController = require("../controllers/loginController");
const ValidateToken = require("../middlewares/token");

const router = express.Router();
router.post('/login',loginController.login)
router.post('/senha',loginController.senha)
router.post('/user',userController.create)
router.get('/user',userController.listar)
router.get('/user/:id', ValidateToken,userController.ler)
router.put("/user/:id", userController.update);
router.delete("/user/:id", userController.delete);


module.exports=router;