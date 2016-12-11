var yo = require('yo-yo')

function accessCamera (state) {
  var takePhoto = document.getElementById('camera')
  var displayPhoto = document.getElementById('display')
  if (takePhoto && displayPhoto) {
    takePhoto.onchange = function (e) {
      var files = e.target.files
      if (files && files.length > 0) {
        file = files[0]
      }
        var fileReader = new FileReader()
        fileReader.onload = function(e) {
          displayPhoto.src = e.target.result
        }

      fileReader.readAsDataURL(file) //reads contents of file - result attribute holds data as a URL (base64)
      console.log(file);
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

// var images = []
// document.getElementById('save').onclick=function(e){
//   e.preventDefault()
//   var url = canvas.toDataURL("image/png")
//   ajax.postImage(url, function(err, res){
//     console.log(res.body);
//     var imageEl = document.createElement('img')
//       imageEl.src = res.body.images.url
//       document.body.appendChild(imageEl)
//   })
// }
