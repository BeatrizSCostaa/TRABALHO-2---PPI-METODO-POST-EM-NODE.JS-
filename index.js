import express from "express";

const host = "localhost";
const port = 3000;
var listaClientes = [];

const server = express();
server.use(express.urlencoded({ extended: true }));

server.get("/cadastroUsuario", (req, resp) => {
  resp.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de Clientes</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Poppins", sans-serif;
      }
      body {
        background: linear-gradient(135deg, #dfe9f3, #ffffff);
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        padding: 20px;
      }
      .container {
        background-color: #fff;
        padding: 2.5rem;
        border-radius: 1rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 500px;
        transition: 0.3s ease;
      }
      .container:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
      }
      h2 {
        text-align: center;
        color: #333;
        margin-bottom: 1.5rem;
      }
      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      label {
        font-weight: 600;
        color: #333;
        font-size: 0.95rem;
      }
      input {
        padding: 0.8rem;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        font-size: 1rem;
        transition: border-color 0.3s;
      }
      input:focus {
        border-color: #4a90e2;
        outline: none;
      }
      .row {
        display: flex;
        gap: 1rem;
      }
      .row > div {
        flex: 1;
      }
      button {
        padding: 0.9rem;
        background-color: #4a90e2;
        color: white;
        border: none;
        border-radius: 0.5rem;
        font-size: 1rem;
        cursor: pointer;
        transition: background 0.3s ease;
      }
      button:hover {
        background-color: #357abd;
      }
      @media (max-width: 500px) {
        .row {
          flex-direction: column;
        }
      }
    </style>
    </head>
    <body>
      <div class="container">
        <h2>Cadastro de Cliente</h2>
        <form id="formCliente" action="/clientescadastrados" method="POST">
          <div class="row">
            <div>
              <label for="nome">Nome</label>
              <input type="text" id="nome" name="nome" required>
            </div>
            <div>
              <label for="cpf">CPF</label>
              <input type="text" id="cpf" name="cpf" required>
            </div>
          </div>
          <label for="email">E-mail</label>
          <input type="email" id="email" name="email" required>
          <div class="row">
            <div>
              <label for="telefone">Telefone</label>
              <input type="tel" id="telefone" name="telefone">
            </div>
            <div>
              <label for="dataNasc">Data de Nascimento</label>
              <input type="date" id="dataNasc" name="dataNasc">
            </div>
          </div>
          <label for="endereco">Endereço</label>
          <input type="text" id="endereco" name="endereco" required>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

server.post("/clientescadastrados", (req, resp) => {
  const { nome, cpf, email, telefone, dataNasc, endereco } = req.body;

  listaClientes.push({ nome, cpf, email, telefone, dataNasc, endereco });
  console.log("Cliente cadastrado com sucesso:", nome);

  resp.redirect("/listarClientes");
});

server.get("/listarClientes", (req, resp) => {
  let conteudo = `
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <title>Lista de Clientes</title>
    <link rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
  </head>
  <body>
  <div class="container mt-5">
    <h2>Clientes Cadastrados</h2>
    <table class="table table-bordered">
      <thead class="thead-dark">
        <tr>
          <th>Nome</th>
          <th>CPF</th>
          <th>E-mail</th>
          <th>Telefone</th>
          <th>Data de Nascimento</th>
          <th>Endereço</th>
        </tr>
      </thead>
      <tbody>`;

  for (let cliente of listaClientes) {
    conteudo += `
      <tr>
        <td>${cliente.nome}</td>
        <td>${cliente.cpf}</td>
        <td>${cliente.email}</td>
        <td>${cliente.telefone}</td>
        <td>${cliente.dataNasc}</td>
        <td>${cliente.endereco}</td>
      </tr>`;
  }

  conteudo += `
      </tbody>
    </table>
  </div>
  </body>
  </html>`;

  resp.send(conteudo);
});

server.listen(port, host, () => {
  console.log(`Servidor rodando em http://${host}:${port}/cadastroUsuario`);
});
