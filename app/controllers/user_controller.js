module.exports.addNewUser = function(application, req, res){
  res.render('add_user_view', {pageTitle : 'Adicionar Novo Usuário', validationError : {}, user : {}});
}

module.exports.editUser = function(application, req, res){
  var urlParam = req.query;
  var userId = urlParam.user_id;
  var connection = application.config.database();
  var userDao = new application.app.models.user_dao(connection);

  userDao.getUserById(userId, function(error, result){
    res.render('edit_user_view', {pageTitle : 'Editar Cadastro de Usuário', validationError : {}, user : result});
  });
}

module.exports.getUsers = function(application, req, res){
  var connection = application.config.database();
  var userDao = new application.app.models.user_dao(connection);

  userDao.getUsers(function(error, result){
    res.render('users_view', {pageTitle : 'Usuários Cadastrados', users : result});
  });
}

module.exports.getUsersOnSearch = function(application, req, res){
  var urlParam = req.query;
  var param = urlParam.field;
  var keyword = urlParam.keyword;
  var column = '';

  var connection = application.config.database();
  var userDao = new application.app.models.user_dao(connection);

  switch(param){
    case 'Nome':
      column = 'nome';
      break;
    case 'Nome Responsável':
      column = 'nome_responsavel';
        break;
    case 'Endereço':
      column = 'endereco_rua';
      break;
    case 'Bairro':
      column = 'endereco_bairro';
      break;
    case 'Sexo':
      column = 'sexo';
      break;
    case 'Identificação':
      column = 'identificacao';
      break;
    case 'Idade':
      column = 'idade';
      break;
    default:
      res.redirect('/users');
      break;   
  }

  userDao.getUsersOnSearch(column, keyword, function(error, result){
    res.render('users_view', {pageTitle : 'Resultado da Busca', users : result});
  });
}

module.exports.saveUser = function(application, req, res){
  var user = req.body;

  // validar se existe erros nos dados enviados
  req.assert('nome', 'Nome do usuário deve ser informado!').notEmpty();
  req.assert('nome', 'Nome deve conter pelo menos 3 caracteres!').len(3);
  req.assert('endereco_rua', 'Um endereço deve ser informado!').notEmpty();
  req.assert('endereco_bairro', 'Um bairro deve ser informado!').notEmpty();

  var errors = req.validationErrors();

  if(errors){
    if(user.id_usuario != 0){
      res.render('edit_user_view', {pageTitle : 'Editar Cadastro de Usuário', validationError : errors, user : user});
  	  return;
    }
    else{
      res.render('add_user_view', {pageTitle : 'Adicionar Novo Usuário', validationError : errors, user : user});
  	  return;
    }
  }

  var connection = application.config.database();
  var userDao = new application.app.models.user_dao(connection);

  if(user.id_usuario != 0){
    userDao.saveUser(user, function(error, result){
      res.redirect('/users');
    });
  }
  else{
    userDao.saveNewUser(user, function(error, result){
      res.redirect('/users');
    });
  }
}
