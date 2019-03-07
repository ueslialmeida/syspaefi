// recebe a conexão do banco e guarda numa var do objeto
function caseDao (connection) {
  this._connection = connection
}

// método realiza a gravação de um caso já existe
caseDao.prototype.saveCase = function (caseInfo, callback) {
  var id = caseInfo.id_caso
  var nomeUsuario = caseInfo.usuario
  var numeroProcesso = caseInfo.numero_processo
  var violacaoDiretos = caseInfo.violacao_direitos
  var nome_agressor = caseInfo.nome_agressor
  var dataInclusao = caseInfo.data_inclusao
  var dataDesligamento = caseInfo.data_desligamento
  var encaminhamento = caseInfo.encaminhamento
  var situacao = caseInfo.situacao
  var consequencias = caseInfo.consequencias

  this._connection.query(
    'UPDATE caso SET violacao=' +
      "'" +
      violacaoDiretos +
      "', nome_agressor='" +
      nome_agressor +
      "', data_inclusao='" +
      dataInclusao +
      "', data_desligamento='" +
      dataDesligamento +
      "', encaminhamento='" +
      encaminhamento +
      "', situacao='" +
      situacao +
      "', consequencias='" +
      consequencias +
      "' WHERE id=" +
      id +
      ';',
    callback
  )
}

// método realiza a gravação de um novo caso
caseDao.prototype.saveNewCase = function (caseInfo, callback) {
  var id = caseInfo.id_caso
  var nomeUsuario = caseInfo.usuario
  var numeroProcesso = caseInfo.numero_processo
  var violacaoDiretos = caseInfo.violacao_direitos
  var nomeAgressor = caseInfo.nome_agressor
  var dataInclusao = ''
  var dataDesligamento = ''

  if (caseInfo.data_inclusao == '') {
    dataInclusao = null
  } else {
    dataInclusao = "'" + caseInfo.data_inclusao + "'"
  }

  if (caseInfo.data_desligamento == '') {
    dataDesligamento = null
  } else {
    dataDesligamento = "'" + caseInfo.data_desligamento + "'"
  }

  var encaminhamento = caseInfo.encaminhamento
  var situacao = caseInfo.situacao
  var consequencias = caseInfo.consequencias

  this._connection.query(
    'INSERT INTO caso (id_usuario, numero_caso, violacao, nome_agressor, data_inclusao, data_desligamento, encaminhamento, situacao, consequencias) VALUES((SELECT id FROM usuario WHERE nome = ' +
      "'" +
      nomeUsuario +
      "')," +
      numeroProcesso +
      ",'" +
      violacaoDiretos +
      "','" +
      nomeAgressor +
      "'," +
      dataInclusao +
      ',' +
      dataDesligamento +
      ",'" +
      encaminhamento +
      "','" +
      situacao +
      "','" +
      consequencias +
      "');",
    callback
  )
}

// método retorna todos os casos cadastros
caseDao.prototype.getCases = function (callback) {
  this._connection.query(
    'SELECT c.id as id_caso, id_usuario, u.nome as nome_usuario, numero_caso, violacao, nome_agressor, DATE_FORMAT(data_inclusao, "%d/%m/%Y") as data_inclusao, DATE_FORMAT(data_desligamento, "%d/%m/%Y") as data_desligamento, encaminhamento, situacao, consequencias FROM caso c LEFT JOIN usuario u ON c.id_usuario = u.id;',
    callback
  )
}

// recuerar os últimos casos Cadastrados
caseDao.prototype.getLastCases = function (callback) {
  this._connection.query(
    'SELECT c.id as id_caso, id_usuario, u.nome as nome_usuario, numero_caso, violacao, nome_agressor, DATE_FORMAT(data_inclusao, "%d/%m/%Y") as data_inclusao, DATE_FORMAT(data_desligamento, "%d/%m/%Y") as data_desligamento, encaminhamento, situacao, consequencias FROM caso c LEFT JOIN usuario u ON c.id_usuario = u.id  ORDER BY c.id DESC LIMIT 10;',
    callback
  )
}

// recupera os casos com data de desligamento nulo (casos ligados)
caseDao.prototype.getOpenCases = function (callback) {
  this._connection.query(
    'SELECT c.id as id_caso, id_usuario, u.nome as nome_usuario, numero_caso, violacao, nome_agressor, DATE_FORMAT(data_inclusao, "%d/%m/%Y") as data_inclusao, DATE_FORMAT(data_desligamento, "%d/%m/%Y") as data_desligamento, encaminhamento, situacao, consequencias FROM caso c LEFT JOIN usuario u ON c.id_usuario = u.id WHERE c.data_desligamento IS null;',
    callback
  )
}

// método que recupera um caso específico a partir de um id
caseDao.prototype.getCaseById = function (caseId, callback) {
  this._connection.query(
    'SELECT c.id as id_caso, id_usuario, u.nome as nome_usuario, nome_responsavel, DATE_FORMAT(u.data_nascimento, "%d/%m/%Y") as data_nascimento, escolaridade, religiao, ano, endereco_rua, endereco_bairro, telefone, sexo, round(datediff(now(), u.data_nascimento) / 365.25) as idade, identificacao, beneficios, numero_caso, violacao, nome_agressor, DATE_FORMAT(data_inclusao, "%Y-%m-%d") as data_inclusao, DATE_FORMAT(data_desligamento, "%Y-%m-%d") as data_desligamento, encaminhamento, situacao, consequencias FROM caso c LEFT JOIN usuario u ON c.id_usuario = u.id WHERE c.id = ' +
      caseId,
    callback
  )
}

// método que recupera casos a partir de um número
caseDao.prototype.getCaseByNumber = function (caseNumber, callback) {
  this._connection.query(
    'SELECT c.id as id_caso, id_usuario, u.nome as nome_usuario, nome_responsavel, DATE_FORMAT(u.data_nascimento, "%d/%m/%Y") as data_nascimento, escolaridade, religiao, ano, endereco_rua, endereco_bairro, telefone, sexo, round(datediff(now(), u.data_nascimento) / 365.25) as idade, identificacao, beneficios, numero_caso, violacao, nome_agressor, DATE_FORMAT(data_inclusao, "%Y-%m-%d") as data_inclusao, DATE_FORMAT(data_desligamento, "%Y-%m-%d") as data_desligamento, encaminhamento, situacao, consequencias FROM caso c LEFT JOIN usuario u ON c.id_usuario = u.id WHERE c.numero_caso = ' +
      caseNumber,
    callback
  )
}

// método que recupera casos em um período específico
caseDao.prototype.getCaseByDate = function (
  column,
  initialDate,
  finalDate,
  callback
) {
  this._connection.query(
    "SELECT c.id as id_caso, id_usuario, u.nome as nome_usuario, nome_responsavel, DATE_FORMAT(u.data_nascimento, '%d/%m/%Y') as data_nascimento, escolaridade, religiao, ano, endereco_rua, endereco_bairro, telefone, sexo, round(datediff(now(), u.data_nascimento) / 365.25) as idade, identificacao, beneficios, numero_caso, violacao, nome_agressor, DATE_FORMAT(data_inclusao, '%Y-%m-%d') as data_inclusao, DATE_FORMAT(data_desligamento, '%Y-%m-%d') as data_desligamento, encaminhamento, situacao, consequencias FROM caso c LEFT JOIN usuario u ON c.id_usuario = u.id WHERE c." +
      column +
      " >= '" +
      initialDate +
      "' AND c." +
      column +
      " <= '" +
      finalDate +
      "'",
    callback
  )
}

module.exports = function () {
  return caseDao
}
