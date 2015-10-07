var $t = $('<div/>');
// bind functions to test global events
$.gevent.subscribe( $t, 'spa-login', function( event, user ) {
   console.log('Hello!', user.name); });

$.gevent.subscribe( $t, 'spa-updatechat', function( event, chat_map ) {
   console.log( 'Chat message:', chat_map);
});

$.gevent.subscribe( $t, 'spa-setchatee',
  function( event, chatee_map ) {
  console.log( 'Chatee change:', chatee_map);
});

$.gevent.subscribe( $t, 'spa-listchange',
   function( event, changed_list ) {
   console.log( '*Listchange:', changed_list );
});

// sign-in, wait 3s
spa.model.people.login( 'Fanny' );
// >> Hello! Fanny
// >> *Listchange: [Array[5]]
// try to send a message without setting chatee
spa.model.chat.send_msg( 'Hi Pebbles!' );

// receipt of a message sets the chatee
spa.model.chat.send_msg( 'What is up, tricks?' );
/* >> Chat message: Object {dest_id: "id_04", dest_name: "Wilma",
>> sender_id: "id_5", msg_text: "What is up tricks?"}
>> true
>> Chat message: Object {dest_id: "id_5", dest_name: "Fanny",
>> sender_id: "id_04", msg_text: "Thanks for the note, Fanny"} */

// Set the chatee to Pebbles
spa.model.chat.set_chatee( 'id_03' );
// >> Chatee change: Object {old_chatee: Object, new_chatee: Object}
// >> true
// Send a message
spa.model.chat.send_msg( 'Hi Pebbles!' )
