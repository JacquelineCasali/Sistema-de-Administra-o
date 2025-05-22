
const bcrypt = require('bcryptjs');
const user = require("../db/models/user");
const userController = {

create:async (req, res) => {
   
  try {
    
      const { nome, email,password } = req.body;
      const users = await user.findOne({ where: { email },where:{nome} });
      if (users) {
        return res.status(422).json({message: `Email ${email} ou nome ${nome} já cadastrado`});
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword=await bcrypt.hash(password,salt);
      const novoProcesso = await user.create({ nome, email,password:hashedPassword });
      res.status(201).json(novoProcesso);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error:error.errors[0].message });
    }
  },
  // 🔹 Listar todos os processos com área associada
listar: async (req, res) => {
    try {
      const users = await user.findAll({
        order: [["nome", "ASC"]],
      });
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar processos" });
    }
  },
  async ler(req, res) {
    try {
      const { id } = req.params;
        const users = await user.findOne({ where: { id } });
      // caso nao encotre o usuario
      if (!users) {
        return res.status(404).json({ message: "Usuario não encontrado" });
      }
    return res.status(200).json(users);
      
    } catch (err) {
      return res.status(401).send({ err: err });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome,email, password } = req.body;
      const users = await user.findOne({ where: { id } });
      if (!users) {
        return res.status(404).json({
          message: "Usuario não encontrado",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt)
        await user.update(
          { nome,email, password:hashedPassword },
          { where: { id } }
        );
        return res.status(200).json({
          message: "Usuario atualizado com suceso!",
        });
      }
    } catch (err) {
      // return res.status(400).send(err);
      return res.status(500).json({ message: `Email já cadastrado`, err: err });
    }
    
  },
  async delete(req, res) {
    try {
      const { id } = req.params;

      const rows = await user.findOne({ where: { id } });
      if (!rows) {
        return res.status(400).json({
          message: "Usuário não encontrado",
        });
      } else {
        await user.destroy({ where: { id } });

        return res.status(200).json({
          message: "Deletado com suceso!",
        });
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  },
}

module.exports = userController;