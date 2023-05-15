//import { split } from "core-js/fn/symbol";

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
    fechaStrinToObject: function(fecha) {
      console.log(fecha)
      const fechaParts = fecha.split(' ');
      return fechaParts[0].split('/').reverse().join('-') + 'T' + fechaParts[1];
    },

    fechaZeroToDB(input){
      const fecha = new Date(input);
      /* const opciones = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'America/Lima' // UTC -5
      };
      const fechaPeru = fecha.toLocaleString('es-PE', opciones); */
      /* const fechaPeru = fecha.toLocaleDateString('es-PE', { timeZone: 'America/Lima' });
      const horaPeru = fecha.toLocaleTimeString('es-PE', { timeZone: 'America/Lima', hour12: false });
      const fechaHoraPeru = fechaPeru + 'T' + horaPeru;
      console.log(fechaHoraPeru) */
      const horaPeru = fecha.toLocaleTimeString('es-PE', { timeZone: 'America/Lima', hour12: false });
      const fechaFormateada = fecha.toISOString().split('T')[0] + 'T' + horaPeru;
      return fechaFormateada;
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