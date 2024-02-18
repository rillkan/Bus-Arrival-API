const busStopIdInput = document.getElementById("busStopId");
const arrivalInfo = document.getElementById("arrivalInfo");

async function fetchBusArrival(busStopId) {
  const response = await fetch(`https://2t8td6-8080.csb.app/?id=${busStopId}`);
  if (response.ok) {
    busContainer.style.display = "none"
    const data = await response.json();// data ={jghvjhgbhjjb}
    return data;
  } else {
    throw new Error("Error fetching bus arrival data.");
  }
}

function formatArrivalData(arrivalData) {
  // { data}
  const buses = arrivalData.services;
  const formattedData = [];
  formattedData.push(`
  <table>
  <thead>
    <tr>
      <th>Bus No</th>
      <th>Next Arrival</th>
    </tr>
  </thead>
  </table>
  `)
  for (const bus of buses) {

    const arrivalTimeString = `${bus.next_bus_mins} min(s)`;
    formattedData.push(
      `
    <table>
    <tbody>
      <tr>
      <hr width="100%" size="2" color="blue" noshade>
      <td>${bus.bus_no}</td>
      <td>${arrivalTimeString} </td>
      
      </tr>
    </tbody>
  </table>
        `)
  }
  return formattedData.join("");
}

function displayBusArrival(busStopId) {
  arrivalInfo.innerHTML = "Loading...";
  fetchBusArrival(busStopId)
    .then((arrivalData) => {
      const formattedArrivalData = formatArrivalData(arrivalData);
      arrivalInfo.innerHTML = formattedArrivalData;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function getBusTiming() { //
  const busStopId = busStopIdInput.value;
  displayBusArrival(busStopId);
}

