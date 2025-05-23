const { DataTypes,  } = require("sequelize");
const sequelize = require("../config/database");

const user = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Campo nome não pode ser vazio",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Esse campo precisa ser um e-mail",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isLength: {
          min: 2,
          msg: "Esse precisa ter no minimo 2 caracteres",
        },
        notEmpty: {
          msg: "Esse campo não pode ser vazio",
        },
      },
    },
    role: { type: DataTypes.ENUM("admin", "user"), defaultValue: "user" },
      cpf: { type: DataTypes.STRING, allowNull: false, unique: true,
    validate:{
      
      len:{
   args: [11, 11],
  msg: "CPF precisa ter exatamente 11 dígitos",
notEmpty:{
        msg:"Campo cpf não pode ser vazio"
      },
      }
    }  
   },
  },
  {
    timeStamp: true,
  }
);





module.exports = user;
