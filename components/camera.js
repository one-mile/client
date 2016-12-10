var yo = require('yo-yo')

function accessCamera (state) {

  return yo `
  <div>
  <input type="file" name="file" accept="image/*" id="file" capture="camera">
  </div>
  `
}

module.exports = accessCamera
