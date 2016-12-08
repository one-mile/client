const yo = require('yo-yo')

module.exports = login

function login (state, dispatch) {
  return yo`
    <div>
      <h3>Login</h3>
      <form class='login' action='/home' method='post'>
        <input type='text' value='username'/>
        <input type='text' value='password'/>
        <button class='loginBtn' type='submit'>Sign In</button>
      </form>
      <button class='signupBtn' type='submit'>Sign Up</button>
    </div>
  `
}
