## 📌 Projeto Administração
Este projeto é uma aplicação permite que administradores gerenciem transações por meio do upload de planilhas e que usuários acompanhem seus extratos e carteiras de pontos.

## Vídeo do Projeto 
https://github.com/user-attachments/assets/ad14cd49-8d44-43b9-aff0-bc3a193b3c55


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

Acesse a pasta backend.

Instale as dependências:
npm install 

2. Configure o arquivo .env:
Crie um banco de dados MySQL e configure o arquivo .env com:

- DB_HOST=localhost
- DB_USER=root
- DB_PASSWORD=senha
- DB_NAME=nome_do_banco
- JWT_SECRET=sua_chave_secreta

3.Instalar Dependências

4.
 Instalar Dependências
Back-end
- $ cd backend
- $ npm install

Front-end
- $ cd frontend
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
