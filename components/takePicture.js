var yo = require('yo-yo')

function takePicture (state) {
  var video = document.getElementById("camera")
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia

  if (navigator.getUserMedia) {
      navigator.getUserMedia({video: true}, handleVideo, videoError)
  }
  function handleVideo(stream) {
    var video = document.getElementById("camera")
      video.src = window.URL.createObjectURL(stream)
  }
  function videoError(e) {
    console.log(error, "Nope!")
  }

  return yo `
  <div>
    <video autoplay='true' id='camera'></video>
    <button type='submit' id='takePhoto'>oOo</button>
  </div>
  `
}


module.exports = takePicture
