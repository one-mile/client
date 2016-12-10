var yo = require('yo-yo')

function accessCamera (state) {
  var video = document.getElementById("camera")
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
    var canvas = document.getElementById('canvas')
    var context = canvas.getContext('2d')
    var w = 300
    var h = 300
    if (w && h) {
      canvas.w = w
      canvas.h = h
      context.drawImage(video, 0, 0, w, h)

    var data = canvas.toDataURL('image/png')
      photo.setAttribute('src', data)
    } else {
        clearphoto()
        }
  }
  return yo `
  <div>
  <video autoplay='true' id='camera'></video>
  <button onclick=${accessCamera} type='submit' id='takePhoto'>oOo</button>
  </div>
  `
// photoBtn = document.getElementById('takePhoto').addEventListener('click', function(e){
//   e.preventDefault()
//   takePhoto()
// }, false)
}


module.exports = accessCamera
