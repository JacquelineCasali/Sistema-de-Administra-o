
const  user  = require("../db/models/user");
const transaction = require("../db/models/transaction");
const sequelize = require("../db/config/database");
const { Op } = require("sequelize");

// Função para normalizar CPF
function normalizeCPF(cpf) {
  return String(cpf).replace(/[^\d]+/g, '');
}

const transactionController = {
//criar transação 
async create(req, res) {
  try {
    const { description, points, value, status } = req.body;

    const transaction = await transaction.create({
      userId: req.userId,
      description,
      points,
      value,
      status: status || 'avaliando',
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar transação' });
  }
},




    async relatorioFiltros (req, res) {
 try {
    const { cpf, description, startDate, endDate, minValue, maxValue, status } = req.query;
    const where = {};

    if (cpf) {
      const users = await user.findOne({ where: { cpf: normalizeCPF(cpf) } });
      if (!users) return res.json([]); // ou return erro
      where.userId = users.id;
    }
    if (description) {
      where.description = { [Op.like]: `%${description}%` };
    }
    if (startDate || endDate) {
      where.transactionDate = {};
      if (startDate) where.transactionDate[Op.gte] = new Date(startDate);
      if (endDate) where.transactionDate[Op.lte] = new Date(endDate);
    }
    if (minValue || maxValue) {
      where.value = {};
      if (minValue) where.value[Op.gte] = minValue;
      if (maxValue) where.value[Op.lte] = maxValue;
    }
    if (status) {
      where.status = status;
    }

    const transactions = await transaction.findAll({  where, 
 include: [
        {
          model: user,
          attributes: ['cpf', 'name', 'email'],
        },
      ],
      order: [['transactionDate', 'DESC']],


    });
    const result = transactions.map(t => ({
      id: t.id,
      description: t.description,
      transactionDate: t.transactionDate,
      points: t.points,
      value: t.value,
      status: t.status,
      cpf: t.User.cpf,
      name: t.User.name,
      email: t.User.email,
    }));

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }

    },
//extrato
  async extract (req, res) {
    try {
    const userId = req.userId;
    const { status, startDate, endDate } = req.query;

    const where = { userId };

    if (status) where.status = status;

    if (startDate || endDate) {
      where.transactionDate = {};
      if (startDate) where.transactionDate[Op.gte] = new Date(startDate);
      if (endDate) where.transactionDate[Op.lte] = new Date(endDate);
    }

    const transactions = await transaction.findAll({ where, order: [["transactionDate", "DESC"]] });
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  },





   //saldo 
    async wallet (req, res) {
 
  try {
      console.log("User ID:", req.userId); 
    const result = await transaction.findOne({
      where: {
        userId: req.userId,
        status: 'aprovado',
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('points')), 'totalPoints'],
         [sequelize.fn('SUM', sequelize.col('value')), 'totalValue']
      ],
      raw: true,
    });
  const totalPoints = result?.totalPoints ? parseFloat(result.totalPoints) : 0;
  const totalValue = result?.totalValue ? parseFloat(result.totalValue) : 0;
   res.json({
    balance:{
totalPoints, totalValue
    }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar saldo' });
  }
    }
   

   }
  


module.exports = transactionController;
