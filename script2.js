const busStopIdInput = document.getElementById("busStopId"); //catch the busstop Id
const arrivalInfo = document.getElementById("arrivalInfo"); //catch the arrivalInfo to display 

async function fetchBusArrival(busStopId) {
  const response = await fetch(`https://arrivelah2.busrouter.sg/?id=${busStopId}`); //Test: 83139 //18141
  if (response.ok) { //to check if the response is ok, can proceed
    busContainer.style.display = "none" //remove the style display "none"
    const data = await response.json(); // save the data and convert to json
    return data;
  } else {
    throw new Error("Error fetching bus arrival data."); //error fetching the details
  }
}

function formatArrivalData(arrivalData) { //Format the necessecary data to readable words for user
  const buses = arrivalData.services; //to save the buses data  //instead of using buses.services(In file practicearray), save it on a variable call buses
  const formattedData = [];//to store and save to a variable
  //create a table inside and push to the empty array
  formattedData.push(` 
      <table>
        <thead>
          <tr>
            <th>Bus No</th>
            <th>First Bus</th>
            <th>Second Bus</th>
            <th>Third Bus</th>
          </tr>
        </thead>
        <tbody>
      </table>
    `);

  function convertToStandardTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    return { minutes }
  }

  //to loop every buses and name it variable busService
  for (const busService of buses) {
    console.log(busService)
    let nextDuration = "N/A"; //since there are some bus wont be working when it comes midnight, i let every nextDuration to be N/A
    let next2Duration = "N/A";
    let next3Duration = "N/A";

    if (busService.next) {
      const { minutes } = convertToStandardTime(busService.next.duration_ms);
      nextDuration = `${minutes}`
    }
    if (busService.next2) {
      const { minutes } = convertToStandardTime(busService.next2.duration_ms);
      next2Duration = `${minutes} `
    }
    if (busService.next3) {
      const { minutes } = convertToStandardTime(busService.next3.duration_ms);
      next3Duration = `${minutes} `
    }

    const arrivalTimeString1 = `${nextDuration} minutes`; //store it on a variable to use in a string
    const arrivalTimeString2 = `${next2Duration} minutes`;
    const arrivalTimeString3 = `${next3Duration} minutes`;
    // create another table and push to the empty variable
    formattedData.push(` 
        <table>
          <tbody>
            <tr>
              <hr width="100%" size="2" color="blue" noshade>
              <td>${busService.no}</td>
              <td>${arrivalTimeString1}</td>
              <td>${arrivalTimeString2}</td>
              <td>${arrivalTimeString3}</td>
            </tr>
          </tbody>
        </table>
      `);
  }

  return formattedData.join(""); //to convert the empty array to a string. using this(" ") as an empty string
}

function displayBusArrival(busStopId) {
  arrivalInfo.innerHTML = "Loading..."; //set it to innerHTML that its loading. To let user know the data is being fetch
  fetchBusArrival(busStopId) //call the 1st function, to check if can fetch succesfully
    .then((arrivalData) => { //once succesful, save the variable and store it on a variable. arrivalData is used as the parameter. the big chunk
      const formattedArrivalData = formatArrivalData(arrivalData);
      arrivalInfo.innerHTML = formattedArrivalData; //put it on the arrivalInfo.innerHTML
    })
    .catch((error) => {
      arrivalInfo.innerHTML = `Error: ${error.message}` //show the error 
    });
}

function getBusTiming() {
  const busStopId = busStopIdInput.value; //get the value 
  displayBusArrival(busStopId); //execute the display function 
}

function reset() {
  arrivalInfo.innerHTML = " "
}

function refresh() {
  const test = busStopIdInput.value
  displayBusArrival(test)
}