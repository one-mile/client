const moment = require('moment')

module.exports = formatDate

function formatDate (timeinUTC) {
  var setUTC = moment.utc(timeinUTC).format()
  var localTime = moment(setUTC).local().format()
  var formatted = moment(localTime).format('HH:mma, Do MMM')
  return formatted
}
