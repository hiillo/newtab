//Init People
document.addEventListener("DOMContentLoaded", function () {

  fetch("data.json")
    .then(response => response.json())
    .then(data => {

      const tableBody = document.querySelector("#userTable tbody");

      data.people.forEach(person => {


        const row = document.createElement("tr");
        
        row.innerHTML = `
          <td>${person.Name}</td>
          <td id = ${person.Name}></td>
        `;

        tableBody.appendChild(row);
        clock(person.Name, person.Rel-Time)
      });

    })
    .catch(error => console.error("Error loading JSON:", error));

});


//Update people
function updateTimes() {
   fetch("data.json")
    .then(response => response.json())
    .then(data => {
      data.people.forEach(person => {
        clock(person.Name, person.Rel-Time)
      });
    })

}


//Clock format & math
function clock(target, difference){
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes().toString();
  let seconds = now.getSeconds().toString();

  let state = ""
  if(Math.floor((hours+difference)/2)%2 == 1){
     state = "am"

  }
  else{
    state = "pm"
  }
  
  hours = ((hours + difference)%12).toString();

  document.getElementById(target).innerHTML = `${hours}:${minutes}:${seconds} ${state}`;
}


clock("main", 0)

setInterval(updateTimes, 10000);

