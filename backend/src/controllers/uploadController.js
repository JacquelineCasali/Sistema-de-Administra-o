const XLSX = require("xlsx");
const fs = require("fs");
const db = require("../db/models/transaction");
const path = require("path");
const uploadController = {

 async upload(req, res) {
    try {
      const filePath = path.resolve("uploads", req.file.filename);
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const dados = XLSX.utils.sheet_to_json(sheet);

      if (!dados.length) {
        return res.status(400).json({ message: "Planilha vazia!" });
      }

      const transacoes = [];

      for (const linha of dados) {
        const { "CPF":cpf, "Descrição da transação": description, "Data da transação": transactionDate, "Valor em pontos": points, "Valor":value, "Status":status } = linha;

        if (!cpf || !description || !transactionDate || !points || !value || !status) {
          return res.status(400).json({ message: "Planilha possui campos faltando." });
        }

        transacoes.push({
          cpf: cpf.toString().replace(/\D/g, ""), // limpa CPF
          description,
          transactionDate: new Date(transactionDate),
          points: parseInt(points),
          value: parseFloat(value.toString().replace(".", "").replace(",", ".")),
          status: status
        });
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
