const yo = require('yo-yo')
var request = require('superagent')

var header = require ('./header')


module.exports = login
function loginRequest(form) {
  console.log(form)
}

function login (state, dispatch) {
  return yo`
    <div>
    ${header(state)}
      <h3>Login</h3>
      <input id='username' type='text' placeholder='username'/>
      <input id='password' type='password' placeholder='password'/>
      <button onclick=${onSubmit} class='loginBtn' type='submit'>Sign In</button>
      <button class='signupBtn' type='submit'>Sign Up</button>
    </div>
  `
}

function onSubmit (e) {
  e.preventDefault()
  var username = document.getElementById('username').value
  var password = document.getElementById('password').value
request
    .post('https://one-shot-api.herokuapp.com/api/v1/users/login')
    .end((error, response) => {
      if (error) {
        console.log(error, 'Error goes here')
      } else {
        store.dispatch({type: 'GO_TO_HOME', payload: response.body})
      }
    })
  console.log(username);
}
