//Traer informacion del state para procesarla
// export const myGetter = ( state ) => {
//  return state
// }

export const getEvents = ( state ) => {
    return state.entries
}

export const getEstado = ( state ) => {
   /*  console.log("state setIsLoading",state.isLoading) */
    return state.isLoading
}

// id
export const getEntryById = ( state ) => ( id = '' ) => {

    const entry = state.entries.find( entry => entry.id === id )

    if ( !entry ) return

    return { ...entry } // TODO: prueben
}



