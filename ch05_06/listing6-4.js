// create a jQuery collection
var $t = $('<div/>');
// Have $t subscribe to global custom events with test functions
$.gevent.subscribe( $t, 'spa-login', function () {
 console.log( 'Hello!', arguments ); });
$.gevent.subscribe( $t, 'spa-listchange', function () {
 console.log( '*Listchange', arguments ); });
// get the current user object
var currentUser = spa.model.people.get_user();
// confirm this is not yet signed-in
currentUser.get_is_anon();
// >> true
// try to join chat without being signed-in
spa.model.chat.join();
// >> User must be defined before joining chat
// sign-in, wait 3s. The UI updates too!
spa.model.people.login( 'Fred' );
// >> Hello! > [jQuery.Event, Object]
// get the people collection
var peopleDb = spa.model.people.get_db();
// show the names of all people in the collection.
peopleDb().each(function(person, idx){console.log(person.name);});
// >> anonymous
// >> Fred
// join the chat
spa.model.chat.join();
// >> true
// the spa-listchange event should fire almost immediately.
// >> *Listchange > [jQuery.Event, Array[1]]
// inspect the user list again. We see the people list has
// been updated to show all online people.
var peopleDb = spa.model.people.get_db();
peopleDb().each(function(person, idx){console.log(person.name);});
