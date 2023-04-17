
export const Formatos = {

    //INP: "2023-03-31T05:00:00.000Z" fecha objeto
    //OUT: "13/04/2023"
    soloFechaDMY:function(fecha){
        const fechaOriginal = new Date(fecha);
        const dia = fechaOriginal.getDate();
        const mes = fechaOriginal.getMonth() + 1;
        const anio = fechaOriginal.getFullYear();
        return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anio}`;
    },

    // Formato para números con separador de miles
    separadorMiles: function(valor) {
      return valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    
    // Formato para números como moneda
    moneda: function(valor, simbolo, decimales) {
      const simboloMoneda = simbolo || "$";
      const decimalesMostrar = decimales !== undefined ? decimales : 2;
      const valorNumerico = parseFloat(valor);
      
      if (isNaN(valorNumerico)) {
        return "";
      }
      
      return simboloMoneda + valorNumerico.toFixed(decimalesMostrar).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    },
    
 
  };