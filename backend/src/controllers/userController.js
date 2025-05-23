
const bcrypt = require('bcryptjs');
const user = require("../db/models/user");
const userController = {

create:async (req, res) => {
   
  try {
    
      const { name, email,password,role  } = req.body;
         // Se não houver usuário logado (rota pública), sempre cria como "user"
     const isAdminRequest = req.user?.role === "admin";

      const roleToSave = isAdminRequest ? role : "user";


      const users = await user.findOne({ where: { email },where:{name} });
      if (users) {
        return res.status(422).json({message: `Email ${email} ou nome ${name} já cadastrado`});
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword=await bcrypt.hash(password,salt);
      const novoUsuario = await user.create({ name, email,password:hashedPassword,role:roleToSave });
      res.status(201).json(novoUsuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error:error.errors[0].message });
    }
  },
  // 🔹 Listar todos os processos com área associada
listar: async (req, res) => {
    try {
      const users = await user.findAll({
        order: [["name", "ASC"]],
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
      const { name,email, password,role } = req.body;
      const users = await user.findOne({ where: { id } });
      if (!users) {
        return res.status(404).json({
          message: "Usuario não encontrado",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt)
        await user.update(
          { name,email, password:hashedPassword,role },
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