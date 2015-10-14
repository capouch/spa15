/*
 * app.js - Express server with routes module
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
var
  http    = require( 'http'     ),
  express = require( 'express'  ),
  routes  = require( './routes' ),
  passport = require( 'passport' ),
  morgan = require( 'morgan' ),
  bodyParser = require( 'body-parser' ),
  methodOverride = require( 'method-override' ),
  errorHandler = require( 'errorhandler' ),
  auth = require( 'http-auth' ),
  app     = express(),
  server  = http.createServer( app );
  passport.initialize();
  passport.session();
var  GoogleStrategy = require('passport-google').Strategy;
  passport.use(new GoogleStrategy({
  returnURL: 'http://localhost:3000/auth/google/return',
  realm: 'http://localhost:3000/'
},
  function(identifier, profile, done) {
      console.log('Called back: ', identifier);
      console.log('With profile: ',profile);
      // return( done, 'Authenticated' );      
    })
);

passport.serializeUser(function(user, done) {
  console.log( 'In serialize' );
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log( 'In deserialize' );  
  done(null, obj);
});

// ------------- END MODULE SCOPE VARIABLES ---------------

// ------------- BEGIN SERVER CONFIGURATION ---------------
  app.use( bodyParser.urlencoded() );
  app.use( methodOverride() );
  app.use( express.static( __dirname + '/public' ) );
  app.use( morgan( 'common' ) );
  app.use( errorHandler() );

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
  app.use( errorHandler({
    dumpExceptions : true,
    showStack      : true
  }) );
};

var env = process.env.NODE_ENV || 'production';
if ('development' == env) {
  app.use( errorHandler() );
};

routes.configRoutes( app, server, passport);
// -------------- END SERVER CONFIGURATION ----------------

// ----------------- BEGIN START SERVER -------------------
server.listen( 3000 );
console.log(
  'Express server listening on port %d in %s mode',
   server.address().port, app.settings.env
);
// ------------------ END START SERVER --------------------
