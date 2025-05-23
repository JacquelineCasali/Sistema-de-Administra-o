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
    const { id, role,name } = users;
    //expiresIn:300 expira em 5 minutos
    const token = jwt.sign(
      { userId: id, role },

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
        name,
        // name: users.name,
        role
      },
      token,
      message: "Logado com sucesso",
    });
  },

  //cadastrar
  async senha(req, res) {
    const { email, password } = req.body;
    const users = await user.findOne({ where: { email } });

    if (!users) {
      return res.status(422).json({ message: `Email ${email} não encontrado` });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await user.update({ password: hashedPassword }, { where: { email } });
    }
    const { id } = users;
    return res.json({
      users: {
        id,
        email,
      },
      message: "Atualizada com sucesso",
    });
  },
};
module.exports = loginController;
