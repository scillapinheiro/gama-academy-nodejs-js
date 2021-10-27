// Incluindo uma biblioteca
const http = require('http');
const queryString = require('query-string');
const url = require('url');
const fs = require('fs');

// Definição de endereço / URL
const hostname = '127.0.0.1'; // localhost
const port = 3000;

// Implementação da redra de negócio
const server = http.createServer((req, res) => {

  var resposta;
  const urlparse = url.parse(req.url, true);
  // Receber informações do usuário
  const params = queryString.parse(urlparse.search);

  // Criar um usuário - Atualizar um usuário
  if(urlparse.pathname == '/criar-atualizar-usuario'){

    // Salvar informações
    fs.writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err) {
      if (err) throw err;
      console.log('Saved!');

      resposta = 'Usuario criado/atualizado com sucesso!';

      // Retornar a resposta escolhida
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(resposta);
    });
  } 
  // Selecionar usuário
  else if(urlparse.pathname == '/selecionar-usuario'){
    fs.readFile('users/' + params.id + '.txt', function(err, data) {
      resposta = data;

      // Retornar a resposta escolhida
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(resposta);
    });
  }
  // Remover o usuário
  else if(urlparse.pathname == '/remover-usuario'){
    fs.unlink('users/' + params.id + '.txt', function (err) {
      console.log('File deleted!');

      resposta = err ? 'Usuario nao encontrado!' : 'Usuario removido com sucesso!';
      
      // Retornar a resposta escolhida
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(resposta);
    });
  }
});

// Execução
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});