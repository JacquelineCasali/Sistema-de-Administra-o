
const express = require('express');
const port= 3001;
const cors = require("cors");
const cookieParser = require('cookie-parser')
const path=require('path')
const morgan = require("morgan");
 const {syncDatabase } = require("./src/db/models");
const router = require('./src/routes/routes');
const app = express();


app.use(cookieParser())

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//resposta no console sobre a aplicação
app.use(morgan("dev"));
//acessando o arquivo 
app.use(express.static(path.join(__dirname,"uploads")));



app.use(router);





app.listen(port,async () => {
   await syncDatabase();
  console.log("Estamos rodando em: http://localhost:" + port );
});
