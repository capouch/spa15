/*
 * app.js - Express server with middleware
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
  http    = require( 'http'    ),
  express = require( 'express' ),
  morgan = require( 'morgan' ),
  bodyParser = require( 'body-parser' ), 
  methodOverride = require( 'method-override' ),

  app     = express(),
  server  = http.createServer( app );
// ------------- END MODULE SCOPE VARIABLES ---------------

// ------------- BEGIN SERVER CONFIGURATION ---------------
  app.use( morgan ('combined') );
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use( methodOverride() );

app.get( '/', function ( request, response ) {
  response.send( 'Hello Express' );
});
// -------------- END SERVER CONFIGURATION ----------------

// ----------------- BEGIN START SERVER -------------------
server.listen( 3000 );
console.log(
  'Express server listening on port %d in %s mode',
   server.address().port, app.settings.env
);
// ------------------ END START SERVER --------------------
