//Init People
document.addEventListener("DOMContentLoaded", function () {

  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      data.people.forEach(person => {

        const now = new Date();
        let hours = now.getHours();
        let tableBody = "";

        if(Math.floor((hours+${person.RelTime}+12)/12)%2 == 0){
          tableBody = document.querySelector("#pm tbody");
        }
        else{
          tableBody = document.querySelector("#am tbody");
        }

        const row = document.createElement("tr");
        
        row.innerHTML = `
          <td>
          <div href = discord://-/channels/@me/${person.discord}>
            <img src = image/${person.Name}.webp>
            <p>${person.Name}</p>
            <p id = ${person.Name}></p>
          </div>
          </td>
        `;

        tableBody.appendChild(row);
        clock(person.Name, person.RelTime)
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
        clock(person.Name, person.RelTime)
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
  if(Math.floor((hours+difference+12)/12)%2 == 0){
     state = "pm"
  }
  else{
    state = "am"
  }
  
  hours = ((hours + difference)%12).toString();

  document.getElementById(target).innerHTML = `${hours}:${minutes}:${seconds} ${state}`;
}


clock("main", 0)

setInterval(updateTimes, 1000);

