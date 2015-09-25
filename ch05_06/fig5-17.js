// create a jQuery collection
$t = $('<div/>');
// Have $t subscribe to global custom events with test functions
$.gevent.subscribe( $t, 'spa-login', function () {
 console.log( 'Hello!', arguments ); });
$.gevent.subscribe( $t, 'spa-logout', function () {
 console.log('!Goodbye', arguments ); });
// get the current user object
var currentUser = spa.model.people.get_user();
// confirm it is anonymous
currentUser.get_is_anon();
// >> true
// get the people collection
var peopleDb = spa.model.people.get_db();
// show the names of all people in our list
peopleDb().each(function(person, idx){console.log(person.name);});
// sign-in as 'Alfred'; get current user within 3s!
spa.model.people.login( 'Alfred' );
currentUser = spa.model.people.get_user();
// confirm the current user is no longer anonymous
// inspect the current user id and cid
currentUser.id;
// >> undefined
currentUser.cid;
// >> "c0"
// wait 3s ...
// revisit the people collection
peopleDb().each(function(person, idx){console.log(person.name);});
// sign-out and watch for the event
spa.model.people.logout();
// look at the people collection and current user
peopleDb().each(function(person, idx){console.log(person.name);});

currentUser = spa.model.people.get_user();
currentUser.get_is_anon();
