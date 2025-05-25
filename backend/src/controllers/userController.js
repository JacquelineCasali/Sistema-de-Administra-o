
const bcrypt = require('bcryptjs');
const user = require("../db/models/user");
const { Op } = require("sequelize");
const userController = {
 async checkAdmin(req, res) {
  try {
    const count = await user.count({ where: { role: 'admin' } });
    return res.json({ hasAdmin: count > 0 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao verificar admin' });
  }
},
create:async (req, res) => {
   
  try {
    
      const { name, email,password,role,cpf  } = req.body;
         // Se não houver usuário logado (rota pública), sempre cria como "user"
        const adminCount = await user.count({ where: { role: 'admin' } });
    
         const isAdminRequest = req.user?.role === "admin";

     const roleToSave =
      isAdminRequest || adminCount === 0 ? role : "user";


      const users = await user.findOne({  
       where:{
[Op.or]:[  {email },{name},{cpf}]
       } 
       });
      if (users) {
        return res.status(422).json({message: `Email ${email} ou nome ${name} ou ${cpf} já cadastrado`});
      }
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword=await bcrypt.hash(password,salt);
      const novoUsuario = await user.create({ name, email,password:hashedPassword,role:roleToSave ,
        cpf: cpf.toString().replace(/\D/g, ""), // Remove qualquer caractere que não seja número
      });
      res.status(201).json(novoUsuario);
    } catch (error) {
  console.error(error);
  res.status(500).json({ 
    error: error?.errors?.[0]?.message || error.message || "Erro interno no servidor" 
  });
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
      const { name,email, password,role ,cpf} = req.body;
      const users = await user.findOne({ where: { id } });
      if (!users) {
        return res.status(404).json({
          message: "Usuario não encontrado",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt)
        await user.update(
          { name,email, password:hashedPassword,role,
            cpf: cpf.toString().replace(/\D/g, "") 
           },
          { where: { id } }
        );
        return res.status(200).json({
          message: "Usuario atualizado com suceso!",
        });
      }
    } catch (err) {
      return res.status(500).json({
        message: err?.errors?.[0]?.message || err.message || "Erro interno no servidor"
      });
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