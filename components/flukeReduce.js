function flukeReduce(entries, payload) {
  if (payload.action === 'fluke') {
    var flukedEntry = entries.find( (entry) => entry.entry_id === payload.entry_id)
    if (flukedEntry) flukedEntry.flukes++
  } else if (payload.action === 'defluke') {
    var deFlukedEntry = entries.find( (entry) => entry.entry_id === payload.entry_id)
    if (deFlukedEntry) deFlukedEntry.flukes--
  }
}

function flukeReducer (newState, payload) {
  if (payload.action === 'fluke') {
    newState.myFlukes.push(payload.entry_id)
  } else if (payload.action === 'defluke') {
    var idx = newState.myFlukes.indexOf(payload.entry_id)
    newState.myFlukes.splice(idx, 1)
  }
  flukeReduce(newState.entries, payload)
  flukeReduce(newState.myEntries, payload)
  flukeReduce(newState.targetEntries, payload)
}

module.exports = flukeReducer
