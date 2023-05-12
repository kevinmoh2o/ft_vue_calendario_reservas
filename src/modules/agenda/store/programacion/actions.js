//acciones asincronas que pueden llamar una mutacion
// export const myAction = async ({ commit }) => {

// }
import investigacionApi from '@/apis/investigacionapi'

export const loadEntries = async ({ commit }) => {
    console.log("daloadEntriesta");
    var data = [];
        try {
            var respuesta = await investigacionApi.get(`/resultados.json`);
            const myObj = respuesta.data;
            console.log(myObj);
            for (const key in myObj) {
                const value = myObj[key];
                data.push(value);
            }
            console.log(data);
            commit('setEntries', data)
            localStorage.setItem('entries', JSON.stringify(data));
          } catch (error) {
             console.error(error)
          }
}

    export const updateEntry = async ({ commit }, entry) => {
        try {
        const updatedEntry = await investigacionApi.updateEntry(entry)
        commit('updateEntry', updatedEntry)
        } catch (error) {
        console.error(error)
        }
    }
  
  export const createEntry = async ({ commit }, entry) => {
    try {
      const newEntry = await investigacionApi.createEntry(entry)
      commit('addEntry', newEntry)
    } catch (error) {
      console.error(error)
    }
  }
