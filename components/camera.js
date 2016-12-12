var yo = require('yo-yo')
const request = require('superagent')

//
function accessCamera (state, dispatch) {
  console.log("open widget");
        cloudinary.openUploadWidget({ cloud_name: 'toothandpail', upload_preset: 'fasiveib' },
          function (error, result) {
            if (result) {
              console.log({taken});
              request
                .post('http://one-shot-api.herokuapp.com/api/v1/entries/new')
                .type('application/json')
                .send({ "user_id": state.user.user_id, "image_url": result[0].secure_url })
                .end(function(error, response){
                  //dispatch goes here
                })
            }

      }, false)
  }

module.exports = accessCamera
