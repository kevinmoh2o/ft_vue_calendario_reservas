//El state es reativo y notificar todos los lugares que escuchan el store
// export const myAction = ( state ) => {

// }


export const setEntries = (state, entries) => {
  state.entries = entries
  
}

/* export const updateEntry = (state, entry) => {
  const index = state.entries.findIndex(e => e.id === entry.id)
  state.entries.splice(index, 1, entry)
} */
export const updateEntry = (state, entry) => {
  const index = state.entries.findIndex((e) => e.id === entry.id);
  if (index !== -1) {
    state.entries.splice(index, 1, entry);
  }
};

export const addEntry = (state, entry) => {
  console.log("Mutacion addEntry",state, entry)
  state.entries.push(entry)
}

export const deleteEntry = (state, id) => {
  const index = state.entries.findIndex(entry => entry.id === id);
  /* console.log("index DELETE",index); */
  if (index !== -1) {
    state.entries.splice(index, 1);
  }
}

export const setIsLoading = (state, valor) => {
  /* console.log("state setIsLoading",state)
  console.log("valor setIsLoading",valor) */
  state.isLoading = valor
}
