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

function Update_Data(id, value){ 
db.update({ _id: id },{ $set: { sync: value }}, { multi: true }, function (err, numReplaced) {
console.log(id+" / sync: "+value+", numReplaced: "+numReplaced); 
});
}

//var data = [];
var date = ""+Date.now()+"";
var data = {
nombre: 'Luigui',
fecha: date,
sync: 'Pendiente'
}; 

db.insert(data, function(err, doc) { console.log('Inserted: '+doc.nombre+' with ID '+ doc._id); }); 

/* db.find({ date: /10/ }, function (err, docs){
if (docs.length >= 1){ 
console.log("docs.length: "+docs.length); 
docs.forEach(function(d){
$(".res_sults").append(JSON.stringify(d)+"<br>"); 
});
}
}); */ 

//db.find({}, function (err, docs){
db.find({  }).sort({ fecha: -1 }).exec(function (err, docs) {
console.log("docs.length 2: "+docs.length);
docs.forEach(function(d){
var table_db = '<tr>'+
'<td>'+d.nombre+'</td>'+
'<td>'+d.fecha+'</td>'+
'<td class="sync_'+d._id+'">'+d.sync+'</td>'+
'</tr>';
$("#table_db").append(table_db); 
//$(".res_sults_2").append(JSON.stringify(d)+"<br>"); 
});
});

function Update_All(){
//db.find({}, function (err, docs){
db.find({  }).sort({ fecha: -1 }).exec(function (err, docs) {
docs.forEach(function(d){
if(d.sync != "OK"){
$.ajax({
method: "POST",
url: "https://www.enatural.tk/apps/test/get_data.php",
data: d
}).done(function(msg){ 
Update_Data(d._id, "OK"); 
$(".sync_"+d._id).html("OK");
}).fail(function(jqXHR, textStatus) {
//alert(d._id+": "+JSON.stringify(jqXHR));
$(".sync_"+d._id).append(" ("+JSON.stringify(jqXHR)+")"); 
});
}
});
});
}

function Delete_All(){
db.remove({}, { multi: true }, function (err, numRemoved) { 
alert("Borrados: "+numRemoved); 
location = "index.html?deleted="+numRemoved;
});
}

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
