const yo = require('yo-yo')
const request = require('superagent')

var header = require ('./header').header
const url = require('./requestUrl')



module.exports = signup

function signup (state, dispatch) {
  return yo`
    <div class='homediv'>
    ${header(state, dispatch)}
      <h1>Sign Up</h1>
      <form class='signup'>
        <input id='username' type='text' placeholder='Choose username'/>
        <input id='password' type='text' placeholder='Choose password'/>
        <input id='rpt-password' type='text' placeholder='Confirm password'/>
        <input id='email' type='text' placeholder='Enter email'/>
        ${state.authError ? yo`<h3>${state.authError}</h3>` : ""}
        <button onclick=${handleSignup} class='signupBtn' type='submit'>Create Account</button>
        <button class='loginBtn' onclick=${() => dispatch({type: "GO_TO_LOGIN"})}>Back to Login</button>
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
      // alert("missing")
      dispatch({type: "AUTH_ERROR", payload: "Please complete all fields"})
    } else if (password !== rptPassword) {
      // alert("passwords not match")
      dispatch({type: "AUTH_ERROR", payload: "Passwords do not match"})
    } else {
        dispatch({type: "TOGGLE_LOADING"})
        request
          .post(url + 'users/signup')
          .send({username, password, email})
          .end( (err, response) => {
            console.log("signup response is", response)
            if (response.body.user_id === 0) {
              dispatch({type: "AUTH_ERROR", payload: "Username already taken"})
              return
            }
            request
              .post(url + 'users/login')
              .send({username, password})
              .end((error, response) => {
                console.log("login response", response);
                if (error) {
                  console.log(error, 'Error goes here')
                } else {
                  // console.log("got it!!!!!", response.body.user)
                  dispatch({type: 'RECEIVE_USER', payload: response.body.user})
                  dispatch({type: "TOGGLE_LOADING"})
                }
              })
          })
    }
  }
}
