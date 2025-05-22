const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { user } = require("../db/models");

const loginController = {
  //cadastrar
  async login(req, res) {
    const { email, password } = req.body;
    const users = await user.findOne({ where: { email } });

    if (!users) {
      return res.status(422).json({ message: `Email ${email} não encontrado` });
    }

    const userSenha = await bcrypt.compare(password, users.password);
    if (!userSenha) {
      return res.status(401).json({ message: `Email ou senha não confere ` });
    }
    //resgatando o id do usuario
    const { id } = users;
    //expiresIn:300 expira em 5 minutos
    const token = jwt.sign(
      { id 
      },

      process.env.APP_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token);

    return res.json({
      auth: true,
      // message: 'logado com sucesso',
      users: {
        id,
        email,
        nome:users.nome
      },
      token,
      message: "Logado com sucesso",
    });
  },

  //cadastrar
};
module.exports = loginController;
