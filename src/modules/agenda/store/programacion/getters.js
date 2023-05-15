//Traer informacion del state para procesarla
// export const myGetter = ( state ) => {
//  return state
// }

export const getEvents = ( state ) => {
    return state.entries
}

// id
export const getEntryById = ( state ) => ( id = '' ) => {

    const entry = state.entries.find( entry => entry.id === id )

    if ( !entry ) return

    return { ...entry } // TODO: prueben
}



