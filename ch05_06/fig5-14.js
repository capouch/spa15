// get the people collection
var peopleDb = spa.model.people.get_db();
// get list of all people
var peopleList = peopleDb().get();
// show our list of people
peopleList;
peopleDb().each(function(person, idx){console.log(person.name);});
// get the person with the id of 'id_03':
var person = peopleDb({ cid : 'id_03' }).first();
// inspect the name attribute
person.name;
// inspect the css_map attribute
JSON.stringify( person.css_map );
// try an inherited method
person.get_is_anon();
person = peopleDb({ id : 'a0' }).first();
// use the same method
person.get_is_anon();
person.name;
// check our person_cid_map too...
var personCidMap = spa.model.people.get_cid_map();
personCidMap[ 'a0' ].name;
