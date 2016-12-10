var yo = require('yo-yo')

function accessCamera (state) {
  var video = document.getElementById("camera")
  // video.src = window.URL.createObjectURL(stream) // may be superfluous
  navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia)

  if (navigator.getUserMedia) {
      navigator.getUserMedia({video: true}, handleVideo, error)
  }
  function handleVideo(stream) {
    var video = document.getElementById("camera")
      video.src = window.URL.createObjectURL(stream)
  }
  function error(e) {
    console.log(error, "Nope!")
  }

  function takePhoto() {
    console.log('takePhoto !!!');
    var canvas = document.getElementById('canvas')
    var context = canvas.getContext('2d')
    var w = 300
    var h = 300
    if (w && h) {
      canvas.w = w
      canvas.h = h
      console.log(typeof video);
       // Uncaught TypeError: Failed to execute 'drawImage' on 'CanvasRenderingContext2D': The provided value is not of type '(HTMLImageElement or HTMLVideoElement or HTMLCanvasElement or ImageBitmap)'
    var img = new Image()
    img.src = canvas.toDataURL('image/png')
    img.onload = function(){
      context.drawImage(video, 0, 0, w, h)
    }

    var data = canvas.toDataURL('image/png')
      console.log("data is", data);
      // video.setAttribute('src', data)
    } else {
        clearphoto()
        }
  }
  return yo `
  <div>
  <canvas id="canvas" width="300" height="300"></canvas>
  <video autoplay='true' id='camera'></video>
  <button onclick=${takePhoto} type='submit' id='takePhoto'>oOo</button>
  </div>
  `
// document.getElementById('takePhoto').addEventListener('click', function(e){
//   e.preventDefault()
//   takePhoto()
// }, false)
}
module.exports = accessCamera
