module.exports.index = function(application, req, res){
  var connection = application.config.database();
  var userDao = new application.app.models.user_dao(connection);
  var caseDao = new application.app.models.case_dao(connection);
  var cases = {};

  caseDao.getLastCases(function(error, result){
    cases = result;
  });

  userDao.getLastUsers(function(error, result){
    res.render('dashboard_view', {pageTitle : 'Sistema de gerenciamento de usuários', lastUsers : result, lastCases : cases});
  });
}
