const XLSX = require("xlsx");
const fs = require("fs");
const db = require("../db/models/transaction");
const path = require("path");
const user  = require("../db/models/user");
const uploadController = {

 async upload(req, res) {
    try {
      const filePath = path.resolve("uploads", req.file.filename);
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const dados = XLSX.utils.sheet_to_json(sheet);
    if (!dados.length) {
        fs.unlinkSync(filePath);
        return res.status(400).json({ message: "Planilha vazia!" });
      }

  
     

      const transacoes = [];

      for (const linha of dados) {

    const cpf = String(linha['CPF']).replace(/[^\d]+/g, '');
      const users = await user.findOne({ where: { cpf } });
      
      if (!users) {
        console.log(`Usuário com CPF ${cpf} não encontrado`);
        continue;
      }
    const description = linha["Descrição da transação"];
        const transactionDate = new Date(linha["Data da transação"]);
        const points = parseInt(String(linha["Valor em pontos"]).replace(/[^\d]/g, ""));
        const value = parseFloat(String(linha["Valor"]).replace(".", "").replace(",", "."));
        const status = linha["Status"].toLowerCase();
       
        if (!description || !transactionDate || !points || !value || !status) {
          return res.status(400).json({ message: "Planilha possui campos faltando." });
        
        }

        transacoes.push({
      userId: users.id,
          
          description,
          transactionDate,
          points,
          value ,
          status
        });
      }
   if (!transacoes.length) {
        fs.unlinkSync(filePath);
        return res.status(400).json({ message: "Nenhuma transação válida para importar." });
      }
      // Inserir no banco
      await db.bulkCreate(transacoes);

      // Remove o arquivo após processar
      fs.unlinkSync(filePath);

      return res.status(200).json({ message: "Upload e importação realizados com sucesso!" });
    } catch (error) {
      console.error("Erro no upload:", error);
      return res.status(500).json({ error: "Erro ao processar planilha" });
    }
  },
}; 
 




module.exports = uploadController;
