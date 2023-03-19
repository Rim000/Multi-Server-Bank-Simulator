var clientNumber = 0;
var clientServiceNumber = 0;
var newClient;


// Remove Array Function
function removeElement(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

//***************/
//**** TIME FUNCTION ****/
//*************/
setInterval(timeFunc, 1000);
var hour = 0, minute = 0, hour24 = 0;
function timeFunc(){
  // Time calculations:
    minute += 1;
    if(minute == 60) {
      minute = 0;
      hour += 1;
      hour24 += 1;
      console.log(hour24);
      if(hour == 13) {
        hour = 1;
        console.log("12hr passed.")
      }
      if(hour24 == 24) {
        hour24 = 0;
        console.log("One day passed.")
      }
    }
  // Formating time:
    if(minute <= 9) {
      var formatedMinute = "0" + minute;
      document.getElementById("newMins").innerText = formatedMinute;
    } else {
      document.getElementById("newMins").innerText = minute;
    }

    if (hour == 0) {
      document.getElementById("newHours").innerText = 12;
    } else if(hour <= 9) {
      var formatedHour = "0" + hour;
      document.getElementById("newHours").innerText = formatedHour;
    } else {
      document.getElementById("newHours").innerText = hour;
    }
  // AM or PM?
    if(hour24 <= 12) {
      document.getElementById("AMorPM").innerText = "AM";
    } else {
      document.getElementById("AMorPM").innerText = "PM";
    }
}

//*****************/
//**** CLIENT ARRIVAL FUNCTION *****/
//*****************/
q1 = []; q2 = []; q3 = []; q4 = [];
var arrivalTimeInMinutes = 4671.6467399789;
setInterval(clientFunction, arrivalTimeInMinutes);
function clientFunction() {
  if(hour24 >= 0 && hour24 < 1) {
    // Arrival time:
    var cdf1 = Math.random() * 1;
    arrivalTime = -Math.log(cdf1) / 1;
    arrivalTimeInMinutes = 60000 * arrivalTime;
    // Creating client div:
    clientNumber += 1;
    newClient = document.createElement("div");
    newClient.id = "client-" + clientNumber;
    newClient.innerText = clientNumber;
    newClient.classList.add("client");
    // Queue Array:
      if(q1.length == 0 || q1.length == q4.length){
          q1.push(clientNumber);
          clientQueue1 = document.getElementById("queue1");
          clientQueue1.appendChild(newClient);
      } else if (q1.length > q2.length) {
          q2.push(clientNumber);
          clientQueue2 = document.getElementById("queue2");
          clientQueue2.appendChild(newClient);
      } else if (q2.length > q3.length) {
          q3.push(clientNumber);
          clientQueue3 = document.getElementById("queue3");
          clientQueue3.appendChild(newClient);
      } else if (q3.length > q4.length) {
          q4.push(clientNumber);
          clientQueue4 = document.getElementById("queue4");
          clientQueue4.appendChild(newClient);
      }
      // Queues on console:
      console.log("QUEUES:");
      console.log("Q1 = ", q1);
      console.log("Q2 = ", q2);
      console.log("Q3 = ", q3);
      console.log("Q4 = ", q4);
  }
}
//*****************/
//**** JOCKEYING FUNCTION *****/
//***************/
setInterval(jockeyingClient, 1000);
function jockeyingClient(){
    if(q1[q1.length - 1] == undefined) {
      clientQueue2.removeChild(removeClient);
    }
}


//*****************/
//**** CLIENT SERVICE FUNCTION *****/
//****************/
var serviceTimeInMinutes = 10965.973148714857;
setInterval(clientServiceFunction, serviceTimeInMinutes);
function clientServiceFunction() {
  if(hour24 >= 0 && hour24 <= 23) {
    // Service time:
    var cdf2 = Math.random() * 1;
    serviceTime = -Math.log(cdf2) / 4.5;
    serviceTimeInMinutes = 60000 * serviceTime;
    // Removing after service completion:
    clientServiceNumber += 1;
    if (q1.includes(clientServiceNumber)) {
      removeClient = document.getElementById("client-" + clientServiceNumber);
      clientQueue1.removeChild(removeClient);
        if(q1.length >= q2.length) {
          q1 = removeElement(q1, clientServiceNumber);
        } else if(q1.length < q2.length) {
          indexNumber = q1.indexOf(clientServiceNumber);
          q1[indexNumber] = undefined;
        }
      console.log(clientServiceNumber + " removed from q1");
    }
    if (q2.includes(clientServiceNumber)) {
      removeClient = document.getElementById("client-" + clientServiceNumber);
      clientQueue2.removeChild(removeClient);
        if(q2.length >= q3.length) {
          q2 = removeElement(q2, clientServiceNumber);
        } else if(q2.length < q3.length) {
          indexNumber = q2.indexOf(clientServiceNumber);
          q2[indexNumber] = undefined;
        }
      console.log(clientServiceNumber + " removed from q2");
    }
    if (q3.includes(clientServiceNumber)) {
      removeClient = document.getElementById("client-" + clientServiceNumber);
      clientQueue3.removeChild(removeClient);
        if(q3.length >= q4.length) {
          q3 = removeElement(q3, clientServiceNumber);
        } else if(q3.length < q4.length) {
          indexNumber = q3.indexOf(clientServiceNumber);
          q3[indexNumber] = undefined;
        }
      console.log(clientServiceNumber + " removed from q3");
    }
    if (q4.includes(clientServiceNumber)) {
      removeClient = document.getElementById("client-" + clientServiceNumber);
      clientQueue4.removeChild(removeClient);
        if(q3.length >= q4.length) {
          q4 = removeElement(q4, clientServiceNumber);
        } else if(q3.length < q4.length) {
          indexNumber = q4.indexOf(clientServiceNumber);
          q4[indexNumber] = undefined;
        }
      console.log(clientServiceNumber + " removed from q4");
    }
  }
}


/********* NOTES *********
*) To convert from minutes to milliseconds we multiply by 60000.
*) Client arrival time will be exponentially given by:
  -ln(c.d.f)/ λ = x
    where λ = 1
    and x = inter-arrival time.
*) Client service time which will be also exponentially given by:
  -ln(c.d.f)/ λ = y
    where λ = 4.5
    And y = inter-service time.
********************/