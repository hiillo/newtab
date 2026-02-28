//Init People
document.addEventListener("DOMContentLoaded", function () {

  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      data.people.forEach(person => {

        const now = new Date();
        let hours = now.getHours();
        let tableBody = "";

        if(Math.floor((hours+person.RelTime+24)/12)%2 == 1){
          tableBody = document.querySelector("#pm");
        }
        else{
          tableBody = document.querySelector("#am");
        }

        const row = document.createElement("div");
        
        row.innerHTML = `
          <a id = "elements" href = discord://-/channels/@me/${person.discord}>
          <div>
            <img src = image/${person.Name}.webp>
            <p>${person.Name}</p>
            <p id = ${person.Name}></p>
            <p>${person.desc}</p>
          </div>
          </a>
        `;

        tableBody.appendChild(row);
        clock(person.Name, person.RelTime)
      });

    })
    .catch(error => console.error("Error loading JSON:", error));
  timeline();
});

//timeline thingy
function timeline(){
  const now = new Date();
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      const filteredEvents = data.eventtimeline
        .filter(events => {
          const eventTime = new Date(events.time).getTime();
          return (eventTime - now) / (1000 * 60 * 60 * 24) >= -5;
        })
        .sort((a, b) => new Date(a.time) - new Date(b.time));

      filteredEvents.forEach(events => {

        let eventtime = new Date(events.time);
        let days2 = Math.floor((eventtime - now)/(1000 * 60 * 60 * 24));
        console.log(events.time,eventtime, days2)

        const target = document.querySelector("#timeline");

        const row = document.createElement("a");
        row.className = "item-group";
        row.href = events.link;
        row.innerHTML = `
          <img class= event-image>
          <div class = event-content>
            <div class = event-title>
              <h3 class = event-name>${events.name}</h3>
              <p class = event-time>${days2} day(s)</p>
            </div>
            <p class = event-desc>${events.desc}</p>
          </div>
        `;

        target.appendChild(row);
      });

    })
    .catch(error => console.error("Error loading JSON:", error));
}


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
  let minutes = now.getMinutes().toString().padStart(2, '0');;
  let seconds = now.getSeconds().toString().padStart(2, '0');;
  let state = ""
  if(Math.floor((hours+difference+24)/12)%2 == 1){
     state = "pm"
  }
  else{
    state = "am"
  }
  
  hours = ((hours + difference +24)%12).toString();

  document.getElementById(target).innerHTML = `${hours}:${minutes}:${seconds} ${state}`;
}

function date(){
  const now = new Date();

  const longDate = now.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  document.getElementById("sub").innerHTML = longDate;

}

date()

clock("main", 0)

setInterval(() => clock("main", 0),1000)
setInterval(updateTimes, 10000);

