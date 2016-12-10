const yo = require('yo-yo')
const request = require('superagent')

var header = require ('./header').header
const url = require('./requestUrl')



module.exports = signup

function signup (state, dispatch) {
  return yo`
    <div class='homediv'>
    ${header(state, dispatch)}
      <h3>Sign Up</h3>
      <form class='signup'>
        <input id='username' type='text' placeholder='Choose username'/>
        <input id='password' type='text' placeholder='Choose password'/>
        <input id='rpt-password' type='text' placeholder='Confirm password'/>
        <input id='email' type='text' placeholder='Enter email'/>
        <button onclick=${handleSignup} class='signupBtn' type='submit'>Create Account</button>
      </form>
    </div>
  `
  function handleSignup(e) {
    // dispatch({type: "TOGGLE_LOADING"})
    e.preventDefault()
    var username = document.getElementById('username').value
    var password = document.getElementById('password').value
    var rptPassword = document.getElementById('rpt-password').value
    var email = document.getElementById('email').value
    // console.log({username, password, rptPassword, email})
    if ( !(username && password && rptPassword && email)) {
      alert("missing")
    } else if (password !== rptPassword) {
      alert("passwords not match")
    } else {
        request
          .post(url + 'users/signup')
          .send({username, password, email})
          .end( (err, response) => {
            console.log("response is", response);
          })
    }
  }
}
