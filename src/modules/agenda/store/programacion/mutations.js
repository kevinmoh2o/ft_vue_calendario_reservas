//El state es reativo y notificar todos los lugares que escuchan el store
// export const myAction = ( state ) => {

// }


export const setEntries = (state, entries) => {
  state.entries = entries
  state.isLoading = false
}

export const updateEntry = (state, entry) => {
  const index = state.entries.findIndex(e => e.id === entry.id)
  state.entries.splice(index, 1, entry)
}

export const addEntry = (state, entry) => {
  state.entries.push(entry)
}

//export const setEntries = async ( state  ) =>  {
//    
//}
//
//export const updateEntry = (/* state */ ) => {
//
//}
//
//export const addEntry = (/* state */ ) => {
//    
//}
//
