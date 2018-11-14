module.exports = function(application){

  application.get('/', function(req, res){
    application.app.controllers.dashboard_controller.index(application, req, res);
  });

  application.get('/users', function(req, res){
    application.app.controllers.user_controller.getUsers(application, req, res);
  });

  application.get('/users/new', function(req, res){
    application.app.controllers.user_controller.addNewUser(application, req, res);
  });

  application.get('/users/edit', function(req, res){
    application.app.controllers.user_controller.editUser(application, req, res);
  });

  application.post('/users/save', function(req, res){
    application.app.controllers.user_controller.saveUser(application, req, res);
  });

  application.get('/cases', function(req, res){
    application.app.controllers.case_controller.getCases(application, req, res);
  });

  application.get('/cases/new', function(req, res){
    application.app.controllers.case_controller.addNewCase(application, req, res);
  });

  application.get('/cases/edit', function(req, res){
    application.app.controllers.case_controller.editCase(application, req, res);
  });

  application.post('/cases/save', function(req, res){
    application.app.controllers.case_controller.saveCase(application, req, res);
  });

  application.get('/cases/opened', function(req, res){
    application.app.controllers.case_controller.getOpenCases(application, req, res);
  });

  application.post('/case/observation/save', function(req, res){
    application.app.controllers.case_observation_controller.saveObservation(application, req, res);
  });

  application.get('/users/search', function(req, res){
    application.app.controllers.user_controller.getUsersOnSearch(application, req, res);
  });

  application.get('/cases/search', function(req, res){
    application.app.controllers.case_controller.getCasesOnSearchByNumber(application, req, res);
  });

  application.get('/cases/search/date', function(req, res){
    application.app.controllers.case_controller.getCasesOnSearchByDate(application, req, res);
  });

}
