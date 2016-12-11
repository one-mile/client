var yo = require('yo-yo')

function accessCamera (state) {

  return yo `
  <div>
    <video id='video'></video>
    <button id='capture'>flooky</button>
    <canvas id='snapshot' width=300 height=300></canvas>
  </div>
  `
  var video = document.getElementById('video')
  var snapshot = document.getElementById('snapshot')
  var captureBtn = document.getElementById('capture')
  
}

module.exports = accessCamera


// ##Input function - works to access camera and take photo - can't save.
// <input type="file" name="file" accept="image/*" id="file" capture="camera">
