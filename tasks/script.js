import { mathScript } from "./mathScript.js"
import { readingScript } from "./readingScript.js"

const times = [10, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210, 230, 250, 270, 290, 310, 330, 350, 370, 390, 410, 430, 450, 470, 490, 510, 530, 550]

document.addEventListener("DOMContentLoaded", function () {
    const bodyElement = document.querySelector("body");
    const value = bodyElement.getAttribute("script");
    console.log("Value from HTML:", value);
    const urlParams = new URLSearchParams(window.location.search);
    const level = urlParams.get('dnd')
    // Pass the value to your function
    runScript(value, level) 
});

const scripts = {
  "math": mathScript,
  "reading": readingScript
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms * 1000));
}


function runScript(script, dndLevel) {
  var notifs = scripts[script]
  notifs.forEach((notif, index) => {
    if (notif.alertLevel > dndLevel) {
      showNotification(notif, times[index])
    }
  });
}

async function showNotification(notif, time) {
  await sleep(time)
  if (Notification.permission === 'granted') {
    new Notification(notif.title, {
      title: notif.title,
      body: notif.desc
    });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(function (permission) {
      if (permission === 'granted') {
        showNotification(notif); // Try again if permission granted
      }
    });
  }
}
