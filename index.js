console.log('Starting...')
const fetch = require('node-fetch');
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED1 = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output
var LED17 = new Gpio(17, 'out');
const URL = 'https://agile-reef-99245.herokuapp.com/'


  fetch(URL + 'login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  Accept: 'application/json'
  },
  body: JSON.stringify({
    user: {
      username: 'Pi',
      password: '1'
    }
  })
})
.then(r => r.json())
.then(data => getDevices(data.jwt))

function getDevices(jwt) {
    let config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    }
    fetch(URL + 'devices', config)
      .then(r => r.json())
      .then (data => controlDevices(data, jwt))
  }

function controlDevices(devices, jwt){
    console.log(devices)
    devices.forEach(ele => {
      if(ele.id === 1){
        if(ele.commands[0]==='on'){
          LED1.writeSync(1)
          getDevices(jwt)
        } else {
          LED1.writeSync(0)
          getDevices(jwt)
        }
      } 
      if(ele.id === 2){
        if(ele.commands[0]==='on'){
          LED17.writeSync(1)
          getDevices(jwt)
        } else {
          LED17.writeSync(0)
          getDevices(jwt)
        }
      }

    })
  }