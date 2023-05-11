//El state es reativo y notificar todos los lugares que escuchan el store
// export const myAction = ( state ) => {

// }
import investigacionApi from '@/apis/investigacionapi'

export const setEntries = async ( state  ) =>  {
    var data = [];
    var respuesta = await investigacionApi.get(`/resultados.json`);
    
    const myObj = respuesta.data;
    console.log(myObj);
    for (const key in myObj) {
        const value = myObj[key];
        
        data.push(value);
      }
      console.log(data);
      console.log(state);
    state.entries=data
}

export const updateEntry = (/* state */ ) => {

}

export const addEntry = (/* state */ ) => {
    
}
