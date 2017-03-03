// Capture F5 to reload the base page testPersistence.html not this one
$(document).on('keydown', function (e) {
if (e.keyCode === 116) {
e.preventDefault();
window.location = 'testPersistence.html';
}
});

function testsFailed () {
document.getElementById("results").innerHTML = "TESTS FAILED";
}

var filename = 'prueba';
var db = new Nedb({ filename: filename, autoload: true });

function Update_Data(id, column, value){ 
var new_data = { column: value };
db.update({ _id: id },{ $set: { new_data }}, { multi: true }, function (err, numReplaced) {
console.log(id+": "+column+": "+value+", numReplaced: "+numReplaced); 
});
}

//var data = [];
var date = ""+Date.now()+"";
var data = {
name: 'Luigui',
twitter: '@maitret', 
date: date
}; 

db.insert(data, function(err, doc) { console.log('Inserted: '+doc.name+' with ID '+ doc._id); }); 

db.find({ date: /10/ }, function (err, docs){
if (docs.length >= 1){ 
console.log("docs.length: "+docs.length); 
docs.forEach(function(d){
Update_Data(d._id, "name", 'ÑOla k ase!ó'); 
$(".res_sults").append(JSON.stringify(d)+"<br>"); 
});
}
}); 

db.find({}, function (err, docs){
console.log("docs.length 2: "+docs.length);
docs.forEach(function(d){
$(".res_sults_2").append(JSON.stringify(d)+"<br>"); 

$.ajax({
method: "POST",
url: "https://www.enatural.tk/apps/test/get_data.php",
data: d
})
.done(function( msg ) { 
//alert(msg);
});

});
});

/* if (docs.length !== 1) {
//console.log(docs);
//console.log("Unexpected length of document database");
//return testsFailed();
}
if (Object.keys(docs[0]).length !== 2) {
console.log("Unexpected length insert document in database");
return testsFailed();
}
if (docs[0].hello !== 'world') {
console.log("Unexpected document");
return testsFailed();
} */ 
//document.getElementById("results").innerHTML = "BROWSER PERSISTENCE TEST PASSED";
