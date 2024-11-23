
const mathNotifs = [
  {
    "title": "Notif 1",
    "desc": "Desc for notif 1.",
    "time": "10",
    "alertLevel": "6"
  },
  {
    "title": "Notif 2",
    "desc": "notif 2 desc.",
    "time": "40",
    "alertLevel": "4"
  },
  {
    "title": "Notif 3",
    "desc": "third desc.",
    "time": "25",
    "alertLevel": "3"
  }
]

const scripts = {
  "math": mathNotifs
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms * 1000));
}

// code to test
// const button = document.getElementById('activateBtn');
// button.addEventListener('click', () => runScript("math", 0));

function runScript(script, dndLevel) {
  notifs = scripts[script]
  notifs.forEach(notif => {
    if (notif.alertLevel > dndLevel) {
      showNotification(notif)
    }
  });
}

async function showNotification(notif) {
  await sleep(notif.time)
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
