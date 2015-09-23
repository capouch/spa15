$( 'body' ).append( '<div id="spa-chat-list-box"/>' );
  var $listbox = $( '#spa-chat-list-box' );
  $listbox.css({
    position: 'absolute', 'z-index' : 3,
    top : 50, left : 50, width : 50, height :50,
    border : '2px solid black', background : '#fff'
    });
  var onListChange = function ( event, update_map ) {
    $( this ).html( update_map.list_text );
    alert( 'onListChange ran' );
  };
  $.gevent.subscribe(
    $listbox,
    'spa-listchange',
    onListChange
    );

  $.gevent.publish(
    'spa-listchange',
    [ { list_text : 'the list is here' } ]
    );
$listbox.remove();
$.gevent.publish( 'spa-listchange', [ {} ] );
