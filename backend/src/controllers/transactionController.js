
const { user } = require("../db/models");
const transaction = require("../db/models/transaction");
const transactionController = {
  async create(req, res) {
    try {
      const { cpf, description, transactionDate, points, value, status } = req.body;

      const usuario = await user.findOne({
        where: { cpf: cpf.toString().replace(/\D/g, "") },
      });

      if (!usuario) {
        return res.status(400).json({ message: `CPF ${cpf} não encontrado no sistema.` });
      }

      const transtions = await transaction.create({
        userId: usuario.id,
        description,
        transactionDate: new Date(transactionDate),
        points: parseInt(points),
        value: parseFloat(value.toString().replace(".", "").replace(",", ".")),
        status,
      });

      return res.status(201).json(transtions);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = transactionController;
