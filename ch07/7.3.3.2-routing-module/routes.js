/*
 * routes.js - module to provide routing
*/

/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global */

// ------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict';
var configRoutes, ensureAuthenticated;

// ------------- END MODULE SCOPE VARIABLES ---------------

// ---------------- BEGIN PUBLIC METHODS ------------------
configRoutes = function ( app, server, passport) {

//  app.all( '/*', function ( request, response, next ) {
//   basic.apply(request, response, function(username) {
//     next();
//    });
//  }); 

    app.get('/auth/google', passport.authenticate('google', {failureRedirect: '/login' }),
	function(request, response, next) {
	   next();
	   });

//  app.get('/auth/google/return', 
//  passport.authenticate('google', { successRedirect: '/',
//                                    failureRedirect: '/login' }));

//  app.get('/auth/google/return', 
//  passport.authenticate('google', { failureRedirect: '/login' }),
//  function(req, res) {
//    res.redirect('/spa.html');
//  });

  app.get( '/auth/google/return', function ( request, response, next ) {
       passport.authenticate('google', {successRedirect: '/spa.html', failureRedirect: '/login'}); 
  });

  app.get('/login', function(request, response ) {
	reponse.redirect('/auth/google' );
  });

  app.all( '/:obj_type/*?', function ( request, response, next ) {
    response.contentType( 'json' );
    next();
  });

  app.get( '/', function ( request, response ) {
        response.redirect( '/spa.html' );
  });

  app.get( '/:obj_type/list', function ( request, response ) {
    response.send({ title: request.params.obj_type + ' list' });
  });

  app.post( '/:obj_type/create', function ( request, response ) {
    response.send({ title: request.params.obj_type + ' created' });
  });

    app.get( '/:obj_type/read/:id([0-9]+)',
    function ( request, response , next ) {
     if(request.isAuthenticated()) { 
      console.log( 'User is in fact authenticated' );
      response.send({
        title: request.params.obj_type
          + ' with id ' + request.params.id + ' found'
      });
     } 
    response.redirect( '/auth/google' );
    }
  );

  app.post( '/:obj_type/update/:id([0-9]+)',
    function ( request, response ) {
      response.send({
        title: request.params.obj_type
          + ' with id ' + request.params.id + ' updated'
      });
    }
  );

  app.get( '/:obj_type/delete/:id([0-9]+)',
    function ( request, response ) {
      response.send({
        title: request.params.obj_type
          + ' with id ' + request.params.id + ' deleted'
      });

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
    }

    }
  );
};
module.exports = { configRoutes : configRoutes };
// ----------------- END PUBLIC METHODS -------------------
