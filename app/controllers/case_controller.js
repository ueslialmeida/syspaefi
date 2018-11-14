module.exports.addNewCase = function(application, req, res){
  var connection = application.config.database();
  var userDao = new application.app.models.user_dao(connection);

  userDao.getUsers(function(error, result){
    res.render('add_case_view', {pageTitle : 'Adicionar Novo Caso', validationError : {}, caseInfo : {}, users : result});
  });
}

module.exports.editCase = function(application, req, res){
  var urlParam = req.query;
  var caseId = urlParam.case_id;
  var connection = application.config.database();
  var caseDao = new application.app.models.case_dao(connection);
  var caseObservationDao = new application.app.models.case_observation_dao(connection);
  var observations = {};

  caseObservationDao.getObservationsByCaseId(caseId, function(erro, result){
    observations = result;
  });

  caseDao.getCaseById(caseId, function(error, result){
    res.render('edit_case_view', {pageTitle : 'Editar Informações do Caso', validationError : {}, caseInfo : result, caseObservations : observations});
  });
}

module.exports.getCases = function(application, req, res){
  var connection = application.config.database();
  var caseDao = new application.app.models.case_dao(connection);

  caseDao.getCases(function(error, result){
    res.render('cases_view', {pageTitle : 'Casos Cadastrados', cases : result});
  });
}

module.exports.getOpenCases = function(application, req, res){
  var connection = application.config.database();
  var caseDao = new application.app.models.case_dao(connection);

  caseDao.getOpenCases(function(error, result){
    res.render('cases_view', {pageTitle : 'Casos Cadastrados [ligados]', cases : result});
  });
}

module.exports.getCasesOnSearchByNumber = function(application, req, res){
  var urlParam = req.query;
  var caseNumber = urlParam.case_number;

  var connection = application.config.database();
  var caseDao = new application.app.models.case_dao(connection);

  if(caseNumber != ''){
    caseDao.getCaseByNumber(caseNumber, function(error, result){
      res.render('cases_view', {pageTitle : 'Resultado da Busca', cases : result});
    });
  }
  else{
    res.redirect('/cases');
  }
}

module.exports.getCasesOnSearchByDate = function(application, req, res){
  var urlParam = req.query;
  var param = urlParam.field;
  var initialDate = urlParam.initial_date;
  var finalDate = urlParam.final_date;
  var column = '';

  var connection = application.config.database();
  var caseDao = new application.app.models.case_dao(connection);

  switch(param){
    case 'Data de Inclusão':
      column = 'data_inclusao';
      break;
    case 'Data de Desligamento':
      column = 'data_desligamento';
      break;
    default:
      res.redirect('/cases');
      break;
  }

  if(initialDate != '' && finalDate != ''){
    caseDao.getCaseByDate(column, initialDate, finalDate, function(error, result){
      res.render('cases_view', {pageTitle : 'Resultado da Busca', cases : result});
    });
  }
  else{
    res.redirect('/cases');
  }
}

module.exports.saveCase = function(application, req, res){
  var caseInfo = req.body;

  var connection = application.config.database();
  var caseDao = new application.app.models.case_dao(connection);

  if(caseInfo.id_caso != 0){
    caseDao.saveCase(caseInfo, function(error, result){
      res.redirect('/cases');
    });
  }
  else {
    caseDao.saveNewCase(caseInfo, function(error, result){
      res.redirect('/cases');
    });
  }

}
