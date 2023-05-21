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
                value["id"]=key;
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
      const newEntry = await investigacionApi.post(`/resultados.json`,entry);
      /*
        {
          "data": {
              "name": "-NVQCoJ0LLmglGWhnx10"
          },
          "status": 200,
          "statusText": "OK",
        
              "baseURL": "https://luna-covid-efwqev.firebaseio.com",
              "method": "post",
              "url": "/resultados.json",
              "data": "{\"title\":\"Maria\",\"link\":\"asdkñlas asdlñaksdk aslñdñlaksd asdlñasñlda sdñlkasñldklñaskd asd alskdñ{laskdñlaskdlñ\",\"start\":\"2023-05-19T14:00:00\",\"end\":\"2023-05-19T15:00:00\",\"userid\":\"\",\"backgroundColor\":\"#3788D8\",\"borderColor\":\"darkred\"}"
          },
          "request": {}
        }
      */
     if(newEntry.status === 200){
      console.log(newEntry)
      commit('addEntry', newEntry)
      return {entry,stausCode:200};
     }else{
      return null;
     }
      
    } catch (error) {
      console.error(error)
    }
  }



  