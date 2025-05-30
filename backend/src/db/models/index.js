'use strict';
const sequelize = require("../config/database");
const user=require("./user")
const transaction=require("./transaction")

//hasMany- muitas transações
user.hasMany(transaction, { foreignKey: "userId" });
//belongsTo - uma trasação um usuario
transaction.belongsTo(user, { foreignKey: "userId" });

const syncDatabase = async () => {
  try {
//verifica e cria a tabela
await sequelize.sync({ alter: false });
    console.log("Banco de dados sincronizado!");
  } catch (error) {
    console.error("Erro ao sincronizar o banco:", error);
  }
};

module.exports = { sequelize, syncDatabase,user,transaction
   };