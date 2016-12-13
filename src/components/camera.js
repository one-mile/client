var yo = require('yo-yo')
const request = require('superagent')
const url = require('./requestUrl')


//
function accessCamera (state, dispatch) {
  if(state.user.shotsRemaining > 0) {
    cloudinary.openUploadWidget({ cloud_name: 'toothandpail', upload_preset: 'fasiveib', sources: ['camera', 'local'], default_source: 'local', multiple: false, text: {"sources.local.select_file": "Take photo", "sources.local.select_files": "Take photo" } },
      function (err, result) {
        if (result) {
          request
            .post(`${url}entries/new`)
            .type('application/json')
            .send({user_id: state.user.user_id, image_url: result[0].secure_url })
            .end((err, response) => {
              if(err) console.log(err)
              var newPhoto = {}
              dispatch({type: 'ADD_NEW_PHOTO', payload: {"entry_id": response.body.entry_id, "image_url": result[0].secure_url}})
            })
        } else if (err) console.log(err);
    }, false)
  } else alert("You have no shots left for today")
}

module.exports = accessCamera

// cloud_name: 'toothandpail', upload_preset: 'fasiveib'
// cloud_name: 'dr2qeam2p', upload_preset: 'iyjqsx0w'
