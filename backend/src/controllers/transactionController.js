
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

   async admin (req, res) {
     const {
    cpf,
    description,
    dataInicio,
    dataFim,
    status,
    valorMin,
    valorMax
  } = req.query;
try {
    const filtrosTransacao = {};
    const filtrosUsuario = {};

    // Filtros por CPF
    if (cpf) filtrosUsuario.cpf = cpf;

    // Filtro por descrição da transação
    if (description) {
      filtrosTransacao.description = { [Op.like]: `%${description}%` };
    }

    // Filtro por status da transação
    if (status) {
      filtrosTransacao.status = status;
    }

    // Filtros por data
    if (dataInicio || dataFim) {
      filtrosTransacao.transactionDate = {};
      if (dataInicio) filtrosTransacao.transactionDate[Op.gte] = new Date(dataInicio);
      if (dataFim) filtrosTransacao.transactionDate[Op.lte] = new Date(dataFim);
    }

    // Filtros por valor
    if (valorMin || valorMax) {
      filtrosTransacao.value = {};
      if (valorMin) filtrosTransacao.value[Op.gte] = parseFloat(valorMin);
      if (valorMax) filtrosTransacao.value[Op.lte] = parseFloat(valorMax);
    }

    const transacoes = await transaction.findAll({
      where: filtrosTransacao,
      include: [{
        model: user,
        where: filtrosUsuario,
        attributes: ['id', 'name', 'cpf'],
      }],
      order: [['transactionDate', 'DESC']],
    });

    return res.status(200).json({
      sucesso: true,
      total: transacoes.length,
      transacoes,
    });
  } catch (error) {
    console.error('Erro ao gerar relatório administrativo:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Ocorreu um erro ao buscar as transações. Tente novamente mais tarde.',
    });
  }
},
   async extract (req, res) {
 const { dataInicio, dataFim, status } = req.query;
  const userId = req.userId;

  try {
    const where = { userId };

    if (status) where.status = status;
    if (dataInicio || dataFim) {
      where.transactionDate = {};
      if (dataInicio) where.transactionDate[Op.gte] = new Date(dataInicio);
      if (dataFim) where.transactionDate[Op.lte] = new Date(dataFim);
    }

    const transactions = await transaction.findAll({
      where,
      order: [['transactionDate', 'DESC']],
    });

    return res.json(transactions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar extrato' });
  }

   },
    async status (req, res) {
      const userId = req.userId;

  try {
    const result = await transaction.findAll({
      where: {
        userId,
        status: 'aprovado',
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('points')), 'totalPoints']
      ],
      raw: true,
    });

    const saldo = result[0].totalPoints || 0;

    return res.json({ saldo: parseInt(saldo) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar saldo' });
  }
    }
   

   }
  


module.exports = transactionController;
