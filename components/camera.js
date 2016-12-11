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
      <label class='captureBtn'>
      <img src='http://image.flaticon.com/icons/svg/34/34397.svg' width='50'/>
      <input id="camera" type="file" accept="image/*" capture="camera" value='Take a photo'>
      </label>
      <input type='submit' value='I will be able to upload photos one day...!' id='capture'>flooky/>
      <img id='display'>
    </div>
    `
  }

module.exports = accessCamera
