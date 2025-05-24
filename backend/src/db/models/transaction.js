
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const transaction = sequelize.define("Transaction", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  
  
  // cpf: { type: DataTypes.STRING, allowNull: false, unique:true,
  //   validate:{
  //     notEmpty:{
  //       msg:"Campo cpf não pode ser vazio"
  //     },
  //   }  
  //  },
  description:{type:DataTypes.STRING,allowNull: false,
    validate:{
      notEmpty:{
        msg:"Campo descrição não pode ser vazio"
      },
       },
  },
  transactionDate:{
    type:DataTypes.DATE,
    allowNull: false,
    validate:{
      notEmpty: {
        msg:"Esse campo não pode ser vazio"
      },
   
    }
  } ,
    points:{
    type:DataTypes.INTEGER,
    allowNull: false,
    validate:{
      notEmpty: {
        msg:"Esse campo não pode ser vazio"
      },
   
    }
  } ,
      value:{
    type:DataTypes.DECIMAL(10,2),
    allowNull: false,
    validate:{
      notEmpty: {
        msg:"Esse campo não pode ser vazio"
      },
   
    }
  } ,
     status: { type: DataTypes.ENUM("aprovado", "reprovado", "avaliando"), allowNull: false },
     userId: {
  type: DataTypes.INTEGER,
  allowNull: false,
}
   

},
{
 timestamps: true
}
);




  
    

module.exports = transaction;