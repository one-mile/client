var yo = require('yo-yo')
//
function accessCamera (state) {
//   var video = document.getElementById("camera")
//   // video.src = window.URL.createObjectURL(stream) // may be superfluous
//   navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia)
//
//   if (navigator.getUserMedia) {
//       navigator.getUserMedia({video: true}, handleVideo, error)
//   }
//   function handleVideo(stream) {
//     var video = document.getElementById("camera")
//       video.src = window.URL.createObjectURL(stream)
//   }
//   function error(e) {
//     console.log(error, "Nope!")
//   }
//
//   function takePhoto() {
//     console.log('takePhoto !!!');
//     var canvas = document.getElementById('canvas')
//     var context = canvas.getContext('2d')
//     var w = 300
//     var h = 300
//     if (w && h) {
//       canvas.w = w
//       canvas.h = h
//       console.log(typeof video);
//        // Uncaught TypeError: Failed to execute 'drawImage' on 'CanvasRenderingContext2D': The provided value is not of type '(HTMLImageElement or HTMLVideoElement or HTMLCanvasElement or ImageBitmap)'
//     var img = new Image()
//     img.src = canvas.toDataURL('image/png')
//     img.onload = function(){
//       context.drawImage(video, 0, 0, w, h)
//     }
//
//     var data = canvas.toDataURL('image/png')
//       console.log("data is", data);
//       // video.setAttribute('src', data)
//     } else {
//         clearphoto()
//         }
//   }
  return yo `
  <div>
  <canvas id="canvas"></canvas>
  <video autoplay='true' id='camera'></video>
  <input type="file" accept="image/*" id="capture" capture="camera">
  </div>
  `
  // <button type='submit' id='takePhoto'>oOo</button>
// // document.getElementById('takePhoto').addEventListener('click', function(e){
// //   e.preventDefault()
// //   takePhoto()
// // }, false)
//   window.addEventListener("DOMContentLoaded", function() {
//     // Grab elements, create settings, etc.
//     var canvas = document.getElementById('canvas');
//     var context = canvas.getContext('2d');
//     var video = document.getElementById('video');
//     var mediaConfig =  { video: true };
//     var errBack = function(e) {
//       console.log('An error has occurred!', e)
//     };
//
//     // Put video listeners into place
//     if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       navigator.mediaDevices.getUserMedia(mediaConfig).then(function(stream) {
//         video.src = window.URL.createObjectURL(stream);
//         video.play();
//       });
//     }
//
//     /* Legacy code below! */
//     else if(navigator.getUserMedia) { // Standard
//       navigator.getUserMedia(mediaConfig, function(stream) {
//         video.src = stream;
//         video.play();
//       }, errBack);
//     } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
//       navigator.webkitGetUserMedia(mediaConfig, function(stream){
//         video.src = window.webkitURL.createObjectURL(stream);
//         video.play();
//       }, errBack);
//     } else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
//       navigator.mozGetUserMedia(mediaConfig, function(stream){
//         video.src = window.URL.createObjectURL(stream);
//         video.play();
//       }, errBack);
//     }
//
//     // Trigger photo take
//     document.getElementById('snap').addEventListener('click', function() {
//       context.drawImage(video, 0, 0, 640, 480);
//     });
//   }, false);
//
}

module.exports = accessCamera
