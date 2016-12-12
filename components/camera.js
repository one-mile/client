var yo = require('yo-yo')
const request = require('superagent')

//
function accessCamera (state) {
  document.getElementById("upload_widget_opener").addEventListener("click", function () {
        cloudinary.openUploadWidget({ cloud_name: 'toothandpail', upload_preset: 'fasiveib' },
          function (error, result) {
            request
              .post('http://one-shot-api.herokuapp.com/api/v1/entries/new')
              .type('application/json')
              .send({ "user_id": state.user.user_id, "image_url": result[0].secure_url })
              .end(function(error, response){
                console.log(response);
              })
          })
      }, false)
  }

module.exports = accessCamera
