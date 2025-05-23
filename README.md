## 📌 Projeto Administração
Este projeto é uma aplicação permite que administradores gerenciem transações por meio do upload de planilhas e que usuários acompanhem seus extratos e carteiras de pontos.

## Vídeo do Projeto 



## 🚀 Tecnologias Utilizadas

Back-end: Node.js, Express.js, Sequelize ORM, JWT, Multer
Node.js: Plataforma para execução do JavaScript no servidor.MySQL: Banco de Banco de dados : MySql.
Frontend: React.js, Axios, React Router, Context API
React.js: Biblioteca para construção da interface do usuário.
Context API: Gerenciamento de estado global para autenticação e dados outros: bcrypt, dotenv, Yup (validação), cors

## ⚙️ Funcionalidades

👨‍💼 Administrador:

✅ Upload de planilhas .csv ou .xlsx contendo transações.

✅ Relatórios completos com filtros:

✅ CPF

✅ Produto (descrição da transação)

✅ Período da data da transação

✅ Faixa de valores

✅ Status da transação (Aprovado, Reprovado, Em avaliação)

👤 Usuário Comum:

✅ Cadastro (nome, e-mail, senha com hash).

✅ Login com autenticação JWT.

✅ Página de Extrato:

✅ Listagem das suas próprias transações.

✅ Filtros por status e por período.

✅ Página de Carteira:

✅ Exibição do saldo total de pontos.

✅ Considera apenas transações com status "Aprovado".

🔐 Autenticação

✅ Login protegido por JWT.

✅ Rotas privadas para usuários e administradores.

## 📌 Como Rodar o Projeto

1️
 Clonar o repositório
$ https://github.com/JacquelineCasali/Sistema-de-Administra-o.git


## 🔧 Backend

1. Acesse a pasta backend.

2.Instale as dependências:
npm install 

3. Configure o arquivo .env:
- DB_HOST=localhost
- DB_USER=root
- DB_PASSWORD=senha
- DB_NAME=nome_do_banco
- JWT_SECRET=sua_chave_secreta

4.Execute as migrations:
npx sequelize db:migrate

5.Inicie o servidor:
npm start

🚀 O backend estará rodando em http://localhost:3333

💻 Frontend

1. Acesse a pasta frontend.

- $ cd frontend

2. Instale as dependências:

- $ npm install


## 4️⃣ Executar o Projeto
Rodar o servidor (Node.js + Express + MySQL)

✅ $ cd backend

✅ $ npm run dev

Rodar o front-end (React.js)

✅ $ cd frontend

✅ $ npm run dev

É necessário deixar o backend rodando no terminal para que os dados sejam visualizados no projeto.

## 📝 Projeto Desenvolvido por 
Jacqueline Casali 
https://www.linkedin.com/in/jaquelinecasali/
