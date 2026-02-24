
var Date = new Date().toISOString().split('T')[0];
document.getElementById("main").innerHTML = Date;

/*
get_data() {O
  var people = [];
   getJSON('people.json', function(data) {
       $.each(data.person, function(i, f) {
          var tblRow = "<tr>" + "<td>" + f.firstName + "</td>" +
           "<td>" + f.lastName + "</td>" + "<td>" + f.job + "</td>" + "<td>" + f.roll + "</td>" + "</tr>"
           $(tblRow).appendTo("#userdata tbody");
     });

   });

});
*/
