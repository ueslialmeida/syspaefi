module.exports.saveObservation = function(application, req, res){
  var observationInfo = req.body;
  var connection = application.config.database();
  var caseObservationDao = new application.app.models.case_observation_dao(connection);

  caseObservationDao.saveObservation(observationInfo, function(error, result){
    res.redirect('/cases/edit?case_id=' + observationInfo.id_caso);
  });
}

module.exports.getObservationsByCaseId = function(application, req, res){
  
}
