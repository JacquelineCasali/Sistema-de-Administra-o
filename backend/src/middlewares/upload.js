// Incluir as bibliotecas
// Upload de arquivos
const multer  = require('multer');
const crypto=require("crypto");
const path=require('path')

// Realizar upload de arquivo
module.exports = (multer({
  // onde vai ser salvo
   // diskStorage permite manipular locar para salvar o arquivo na pasta 
    storage: multer.diskStorage({

        // Local para salvar o arquivo
        destination: (req, file, cb) => {
            cb(null, 'uploads/')
        },

        // Nome que deve ser atribuido ao arquivo
        filename: (req, file, cb) => {
            crypto.randomBytes(5, (err, hash) => {
                file.documentacao = `${file.originalname}`;
  
                cb(null, file.documentacao);  
            })
          
            //Date.now data atual
            //extname extensão do arquivo
         //   cb(null, Date.now().toString() + path.extname(file.originalname))
        }
    }),

  //limites de uploads
    limits: {
        //tamanho do arquivo
        fileSize: 2 * 1024 * 1024
      },

    // Validar a extensão do arquivo
    // fileFilter: (req, file, cb) => {

    //     // Verificar se a extensão da imagem enviada pelo usuário está no array de extensões
    //     const extesaoImg = ['image/png', 'image/jpg', 'image/jpeg','image/gif'].find(formatoAceito => formatoAceito == file.mimetype);

    //     // Retornar TRUE quando a extensão da imagem é válida
    //     if(extesaoImg){
    //         return cb(null, true);
    //     }

    //     // Retornar FALSE quando a extensão da imagem é válida
    //     return cb(null, false);
    // }
}))