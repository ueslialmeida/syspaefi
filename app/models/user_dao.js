// recebe a conexão do banco e guarda numa var do objeto
function userDao(connection) {
  this._connection = connection;
}

// método que salva um novo usuário no banco de dados
userDao.prototype.saveNewUser = function(user, callback) {
  var nome = user.nome;
  var nomeResponsavel = user.nome_responsavel;
  var endereco = user.endereco_rua;
  var bairro = user.endereco_bairro;
  var telefone = user.telefone;
  var sexo = "";

  if (user.sexo === "Masculino") {
    sexo = "M";
  } else {
    sexo = "F";
  }

  var dataNascimento = user.data_nascimento;
  var escolaridade = user.escolaridade;
  var religiao = user.religiao;
  var ano = user.ano;
  var identificacao = user.identificacao;
  var beneficios = user.beneficios;

  this._connection.query(
    "INSERT INTO usuario (nome, nome_responsavel, endereco_rua, endereco_bairro, telefone, sexo, data_nascimento, escolaridade, religiao, ano, identificacao, beneficios) VALUES(" +
      "'" +
      nome +
      "','" +
      nomeResponsavel +
      "','" +
      endereco +
      "','" +
      bairro +
      "','" +
      telefone +
      "','" +
      sexo +
      "','" +
      dataNascimento +
      "','" +
      escolaridade +
      "','" +
      religiao +
      "','" +
      ano +
      "','" +
      identificacao +
      "','" +
      beneficios +
      "');",
    callback
  );
};

// método que salva a edição de um usuário no banco de dados
userDao.prototype.saveUser = function(user, callback) {
  var id = user.id_usuario;
  var nome = user.nome;
  var nomeResponsavel = user.nome_responsavel;
  var endereco = user.endereco_rua;
  var bairro = user.endereco_bairro;
  var telefone = user.telefone;
  var sexo = "";

  if (user.sexo === "Masculino") {
    sexo = "M";
  } else {
    sexo = "F";
  }

  var dataNascimento = user.data_nascimento;
  var escolaridade = user.escolaridade;
  var religiao = user.religiao;
  var ano = user.ano;
  var identificacao = user.identificacao;
  var beneficios = user.beneficios;

  this._connection.query(
    "UPDATE usuario SET nome=" +
      "'" +
      nome +
      "', nome_responsavel='" +
      nomeResponsavel +
      "', endereco_rua='" +
      endereco +
      "', endereco_bairro='" +
      bairro +
      "', telefone='" +
      telefone +
      "', sexo='" +
      sexo +
      "', data_nascimento='" +
      dataNascimento +
      "', escolaridade='" +
      escolaridade +
      "', religiao='" +
      religiao +
      "', ano='" +
      ano +
      "', identificacao='" +
      identificacao +
      "', beneficios='" +
      beneficios +
      "' WHERE id=" +
      id +
      ";",
    callback
  );
};

// método que recupera todos os usuários cadastrados
userDao.prototype.getUsers = function(callback) {
  this._connection.query(
    'SELECT id, nome, nome_responsavel, endereco_rua, endereco_bairro, telefone, sexo, DATE_FORMAT(data_nascimento, "%d/%m/%Y") AS data_nascimento, escolaridade, religiao, ano, identificacao, beneficios FROM usuario;',
    callback
  );
};

// método que recupera todos os usuários que atendem os parâmetros da busca
userDao.prototype.getUsersOnSearch = function(column, keyword, callback) {
  if (column == "idade") {
    this._connection.query(
      "SELECT id, nome, nome_responsavel, endereco_rua, endereco_bairro, telefone, sexo, DATE_FORMAT(data_nascimento, '%d/%m/%Y') AS data_nascimento, escolaridade, religiao, ano, identificacao, beneficios FROM usuario WHERE round(datediff(now(), data_nascimento)/365.25) = " +
        parseInt(keyword) +
        ";",
      callback
    );
  } else {
    this._connection.query(
      "SELECT id, nome, nome_responsavel, endereco_rua, endereco_bairro, telefone, sexo, DATE_FORMAT(data_nascimento, '%d/%m/%Y') AS data_nascimento, escolaridade, religiao, ano, identificacao, beneficios FROM usuario WHERE " +
        column +
        " LIKE '%" +
        keyword +
        "%';",
      callback
    );
  }
};

// método que recupera os últimos usuários cadastrados
userDao.prototype.getLastUsers = function(callback) {
  this._connection.query(
    'SELECT id, nome, nome_responsavel, endereco_rua, endereco_bairro, telefone, sexo, DATE_FORMAT(data_nascimento, "%d/%m/%Y") AS data_nascimento, escolaridade, religiao, ano, identificacao, beneficios FROM usuario ORDER BY id DESC LIMIT 10;',
    callback
  );
};

// método que recupera um usuário específico a partir de um id
userDao.prototype.getUserById = function(userId, callback) {
  this._connection.query(
    'SELECT id, nome, nome_responsavel, endereco_rua, endereco_bairro, telefone, sexo, DATE_FORMAT(data_nascimento, "%Y-%m-%d") AS data_nascimento, escolaridade, religiao, ano, identificacao, beneficios FROM usuario WHERE id = ' +
      userId,
    callback
  );
};

module.exports = function() {
  return userDao;
};
