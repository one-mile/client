var yo = require('yo-yo')

function accessCamera (state) {
  var takePhoto = document.getElementById('camera')
  var displayPhoto = document.getElementById('display')
  if (takePhoto && displayPhoto) {
    takePhoto.onchange = function (e) {
      var files = e.target.files, file
      if (files && files.length > 0) {
        file = files[0] }
          else {
            var URL = window.URL || window.webkitURL
            var imgURL = URL.createObject
            displayPhoto.src = imgURL
            displayPhoto.onload = function() {
              URL.revokeObjectURL(imgURL) //releases existing object URL created above - call this when object URL is no longer needed.
            }
          }
        var fileReader = new FileReader()
        fileReader.onload = function(e) {
          displayPhoto.src = e.target.result
        }
      fileReader.readAsDataURL(file) //reads contents of file - result attribute holds data as a URL (base64)
      }
    }
    return yo `
    <div>
      <div id='hideInput'><input type="file" name="file" accept="image/*" id="camera" capture="camera"></div>
      <button id='capture'>flooky</button>
      <img src='about:blank' id='display'>
      <button id='post'>Post</button>
      <canvas id='snapshot' width=300 height=250></canvas>
    </div>
    `
  }

module.exports = accessCamera

// var handleSuccess = function(stream) {
//   var image = document.getElementById('image')
//   video.srcObject = stream
// }

  // navigator.mediaDevices.getUserMedia({video: true})
// .then(handleSuccess)


// function onClick (){
//   var canvas = document.getElementById('snapshot')
//   var context = canvas.getContext('2d')
//   var image = new Image()
//   console.log('BUTTON CLICKITY');
//   context.drawImage(image, 0, 0, canvas.width, canvas.height)
// }


// ##Input function - works to access camera and take photo - can't save.
// <video id='video' width=300 height=300></video>
