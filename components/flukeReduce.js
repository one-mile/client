function flukeReduce(entries, payload) {
  console.log({entries});
  if (payload.action === 'fluke') {
    var flukedEntry = entries.find( (entry) => entry.entry_id === payload.entry_id)
    if (flukedEntry) flukedEntry.flukes++
  } else if (payload.action === 'defluke') {
    var deFlukedEntry = entries.find( (entry) => entry.entry_id === payload.entry_id)
    if (deFlukedEntry) deFlukedEntry.flukes--
  }
}

function flukeReducer (newState, payload) {
  console.log("newState", newState);
  flukeReduce(newState.entries, payload)
  flukeReduce(newState.myEntries, payload)
  flukeReduce(newState.targetEntries, payload)
}

module.exports = flukeReducer
