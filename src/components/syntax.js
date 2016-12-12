function userPageSyntax (count) {
  if (count === 1) {
    return 'entry'
  } else {
    return 'entries'
  }
}

module.exports = userPageSyntax
