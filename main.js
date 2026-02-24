//Init People
document.addEventListener("DOMContentLoaded", function () {

  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      data.people.forEach(person => {

        const now = new Date();
        let hours = now.getHours();

        if(Math.floor((hours+difference)/12)%2 == 1){
          const tableBody = document.querySelector("#pm tbody");
        }
        else{
          const tableBody = document.querySelector("#am tbody");
        }

        const row = document.createElement("tr");
        
        row.innerHTML = `
          <a href = discord://-/channels/@me/${person.discord}>
          <td><img src = image/${person.Name}.webp></td>
          <td>${person.Name}</td>
          <td id = ${person.Name}></td>
          </a>
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
  console.log(hours + difference, difference)
  let state = ""
  if(Math.floor((hours+difference)/12)%2 == 1){
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

