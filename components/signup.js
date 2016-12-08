const yo = require('yo-yo')
var header = require ('./header')


module.exports = signup

function login (state, dispatch) {
  return yo`
    <div>
    ${header(state)}
      <h3>Sign Up</h3>
      <form class='login' action='/login' method='post'>
        <input type='text' value='Choose username'/>
        <input type='text' value='Choose password'/>
        <input type='text' value='Confirm password'/>
        <input type='text' value='Enter email'/>
        <button class='loginBtn' type='submit'>Create Account</button>
      </form>
    </div>
  `
}
