var yo = require('yo-yo')
const request = require('superagent')

//
function accessCamera (state, dispatch) {
  console.log("open widget");
        cloudinary.openUploadWidget({ cloud_name: 'toothandpail', upload_preset: 'fasiveib' },
          function (error, result) {
            if (result) {
              request
                .post('http://one-shot-api.herokuapp.com/api/v1/entries/new')
                .type('application/json')
                .send({ "user_id": state.user.user_id, "image_url": result[0].secure_url })
                .end(function(error, response){
                  console.log("response is", response)
                  var newPhoto = {}
                  dispatch({type: 'ADD_NEW_PHOTO', payload: {"entry_id": response.body.entry_id, "image_url": result[0].secure_url}}) 
                })
            }

      }, false)
  }

module.exports = accessCamera

// cloud_name: 'toothandpail', upload_preset: 'fasiveib'
// cloud_name: 'dr2qeam2p', upload_preset: 'iyjqsx0w'
