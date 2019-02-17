// recebe a conexão do banco e guarda numa var do objeto
function caseObservationDao(connection){
  this._connection = connection;
}

// método que grava as informações do histórico de atendimento do caso
caseObservationDao.prototype.saveObservation = function(observationInfo, callback){
  var caseId = observationInfo.id_caso;
  var observacao = observationInfo.observacao;
  var dataAtendimento = observationInfo.data_atendimento;
  this._connection.query("INSERT INTO historico_atendimento (id_caso, observacao, data_atendimento) VALUES (" + caseId + ", '" + observacao + "', '" + dataAtendimento + "');", callback);
}

// método que recupera as informações de histórico de atendimento
caseObservationDao.prototype.getObservationsByCaseId = function(caseId, callback){
  this._connection.query('SELECT id, id_caso, observacao, DATE_FORMAT(data_atendimento, "%d/%m/%Y") as data_atendimento FROM historico_atendimento WHERE id_caso = ' + caseId, callback);
}

module.exports = function(){
  return caseObservationDao;
}
