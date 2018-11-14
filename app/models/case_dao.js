// recebe a conexão do banco e guarda numa var do objeto
function caseDao(connection){
  this._connection = connection;
}

// método realiza a gravação de um caso já existe
caseDao.prototype.saveCase = function(caseInfo, callback){
  var id = caseInfo.id_caso;
  var nomeUsuario = caseInfo.usuario;
  var numeroProcesso = caseInfo.numero_processo;
  var violacaoDiretos = caseInfo.violacao_direitos;
  var dataInclusao = caseInfo.data_inclusao;
  var dataDesligamento = caseInfo.data_desligamento;
  var encaminhamento = caseInfo.encaminhamento;
  var situacao = caseInfo.situacao;

  this._connection.query('UPDATE caso SET violacao='
	+"'"+
	violacaoDiretos
	+"', data_inclusao='"+
	dataInclusao
	+"', data_desligamento='"+
	dataDesligamento
	+"', encaminhamento='"+
	encaminhamento
	+"', situacao='"+
	situacao
	+"' WHERE id="+id+';', callback);
}

// método realiza a gravação de um novo caso
caseDao.prototype.saveNewCase = function(caseInfo, callback){
  var id = caseInfo.id_caso;
  var nomeUsuario = caseInfo.usuario;
  var numeroProcesso = caseInfo.numero_processo;
  var violacaoDiretos = caseInfo.violacao_direitos;
  var dataInclusao = '';
  var dataDesligamento = '';

  if (caseInfo.data_inclusao == '') {
    dataInclusao = null;
  }
  else {
    dataInclusao = "'" + caseInfo.data_inclusao + "'";
  }

  if (caseInfo.data_desligamento == '') {
    dataDesligamento = null;
  }
  else {
    dataDesligamento = "'" + caseInfo.data_desligamento + "'";
  }

  var encaminhamento = caseInfo.encaminhamento;
  var situacao = caseInfo.situacao;

  this._connection.query("INSERT INTO caso (id_usuario, numero_caso, violacao, data_inclusao, data_desligamento, encaminhamento, situacao) VALUES((SELECT id FROM usuario WHERE nome = "
  +"'"+
	nomeUsuario
	+"'),'"+
	numeroProcesso
	+"','"+
	violacaoDiretos
	+"',"+
	dataInclusao
	+","+
	dataDesligamento
	+",'"+
	encaminhamento
	+"','"+
	situacao
	+"');", callback);
}

// método retorna todos os casos cadastros
caseDao.prototype.getCases = function(callback){
  this._connection.query('SELECT c.id as id_caso, id_usuario, u.nome as nome_usuario, numero_caso, violacao, DATE_FORMAT(data_inclusao, "%d/%m/%Y") as data_inclusao, DATE_FORMAT(data_desligamento, "%d/%m/%Y") as data_desligamento, encaminhamento, situacao FROM caso c LEFT JOIN usuario u ON c.id_usuario = u.id;', callback);
}

// recuerar os últimos casos Cadastrados
caseDao.prototype.getLastCases = function(callback){
  this._connection.query('SELECT c.id as id_caso, id_usuario, u.nome as nome_usuario, numero_caso, violacao, DATE_FORMAT(data_inclusao, "%d/%m/%Y") as data_inclusao, DATE_FORMAT(data_desligamento, "%d/%m/%Y") as data_desligamento, encaminhamento, situacao FROM caso c LEFT JOIN usuario u ON c.id_usuario = u.id  ORDER BY c.id DESC LIMIT 10;', callback);
}

// recupera os casos com data de desligamento nulo (casos ligados)
caseDao.prototype.getOpenCases = function(callback){
  this._connection.query('SELECT c.id as id_caso, id_usuario, u.nome as nome_usuario, numero_caso, violacao, DATE_FORMAT(data_inclusao, "%d/%m/%Y") as data_inclusao, DATE_FORMAT(data_desligamento, "%d/%m/%Y") as data_desligamento, encaminhamento, situacao FROM caso c LEFT JOIN usuario u ON c.id_usuario = u.id WHERE c.data_desligamento IS null;', callback);
}

// método que recupera um caso específico a partir de um id
caseDao.prototype.getCaseById = function(caseId, callback){
  this._connection.query('SELECT c.id as id_caso, id_usuario, u.nome as nome_usuario, nome_responsavel, DATE_FORMAT(u.data_nascimento, "%d/%m/%Y") as data_nascimento, endereco_rua, endereco_bairro, telefone, sexo, round(datediff(now(), u.data_nascimento) / 365.25) as idade, identificacao, numero_caso, violacao, DATE_FORMAT(data_inclusao, "%Y-%m-%d") as data_inclusao, DATE_FORMAT(data_desligamento, "%Y-%m-%d") as data_desligamento, encaminhamento, situacao FROM caso c LEFT JOIN usuario u ON c.id_usuario = u.id WHERE c.id = ' + caseId, callback);
}

// método que recupera casos a partir de um número
caseDao.prototype.getCaseByNumber = function(caseNumber, callback){
  this._connection.query('SELECT c.id as id_caso, id_usuario, u.nome as nome_usuario, nome_responsavel, DATE_FORMAT(u.data_nascimento, "%d/%m/%Y") as data_nascimento, endereco_rua, endereco_bairro, telefone, sexo, round(datediff(now(), u.data_nascimento) / 365.25) as idade, identificacao, numero_caso, violacao, DATE_FORMAT(data_inclusao, "%Y-%m-%d") as data_inclusao, DATE_FORMAT(data_desligamento, "%Y-%m-%d") as data_desligamento, encaminhamento, situacao FROM caso c LEFT JOIN usuario u ON c.id_usuario = u.id WHERE c.numero_caso = ' + caseNumber, callback);
}

// método que recupera casos em um período específico
caseDao.prototype.getCaseByDate = function(column, initialDate, finalDate, callback){
  this._connection.query("SELECT c.id as id_caso, id_usuario, u.nome as nome_usuario, nome_responsavel, DATE_FORMAT(u.data_nascimento, '%d/%m/%Y') as data_nascimento, endereco_rua, endereco_bairro, telefone, sexo, round(datediff(now(), u.data_nascimento) / 365.25) as idade, identificacao, numero_caso, violacao, DATE_FORMAT(data_inclusao, '%Y-%m-%d') as data_inclusao, DATE_FORMAT(data_desligamento, '%Y-%m-%d') as data_desligamento, encaminhamento, situacao FROM caso c LEFT JOIN usuario u ON c.id_usuario = u.id WHERE c." + column + " >= '" + initialDate + "' AND c." + column + " <= '" + finalDate + "'", callback);
}

module.exports = function(){
  return caseDao;
}
