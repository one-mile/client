var yo = require('yo-yo')

function accessCamera (state) {

  // var handleSuccess = function(stream) {
  //   var video = document.getElementById('video')
  //   video.srcObject = stream
  //
  // }
  // function onClick (){
  //   var canvas = document.getElementById('snapshot')
  //   console.log('CLICKING THE BUTTON DOES THIS');
  //   var context = canvas.getContext('2d')
  //   context.drawImage(video, 0, 0, canvas.width, canvas.height)
  // }
  //
  // navigator.mediaDevices.getUserMedia({video: true})
  // .then(handleSuccess)

  return yo `
  <div>
    <video id='video' width=300 height=300></video>
    <button id='capture'>flooky</button>
    <canvas id='snapshot' width=300 height=250></canvas>
  </div>
  `
}

module.exports = accessCamera

// onclick=${onClick}

// ##Input function - works to access camera and take photo - can't save.
// <input type="file" name="file" accept="image/*" id="file" capture="camera">
