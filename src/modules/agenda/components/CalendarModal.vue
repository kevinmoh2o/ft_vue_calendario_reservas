<template>

      <form class="cal-grcontainer">
        <div  class="botones">
            <button v-if="statusButton" class="btn resaltadoVerde " @click.prevent="store(form)" data-toggle="tooltip" title="Guardar">
                <i class="fa-solid fa-floppy-disk istore"></i>
            </button>
            <button v-else class="btn resaltadoYellow " @click.prevent="$emit('editarModal')" data-toggle="tooltip" title="Editar">
                <i class="fa-solid fa-pen-to-square ieditar"></i>
            </button>
            <button v-if="!statusButton" class="btn resaltadoRojo" @click.prevent="$emit('eliminar',expandir)" data-toggle="tooltip" title="Eliminar">
                <i class="fa-solid fa-trash ieliminar"></i>
            </button>
            <button class="btn resaltado" @click.prevent="$emit('closeModal',expandir)" data-toggle="tooltip" title="Cerrar">
                <i class="fa-solid fa-xmark iclose"></i>
            </button>
        </div>

        <div class="titulo">
          <h1 class="typography_h3__AkmD7" style="color: rgb(14, 16, 26);">Agendar una cita</h1>
        </div>

        <div class="automatico">
          <br>
          <label><strong>Licenciado a cargo:</strong></label><label class="lblClass">{{ acortarTexto(form.encargado,15) }}</label><br>
          <label><strong>Fecha de cita:</strong></label><label class="lblClass"> {{getFechaCab}}</label><br>
          <label><strong>Duracion:</strong></label><label class="lblClass"> 1 hora</label><br>
          <hr>
        </div>

        <div class="selecpatient">
          <select v-if="statusButton" class="entradaStyle" name="idSelector" id="idSelector" v-model="form.title" onchange="" required="true">
            <option value="" selected>Selecciona un paciente</option>
            <option v-for="nombre in nombres" :key="nombre.id" :value="nombre.nombre">{{ nombre.nombre }}</option>
          </select>
          <!-- <input v-else v-model="form.title" type="text" name="paciente" class="entradaStyle" size="30" disabled="disabled"> -->
          <label v-else class="lblOculto">{{form.title}}</label>
        </div>

        <!-- <div class="fecha">
          <input placeholder="Fecha" type="text" name="id_agenda" v-model="fFechaDeProgramacion" class="text touched" size="30" maxlength="255" disabled="true" onfocus="" required="">
        </div>

        <div class="duracion">
          <input placeholder="Duración" type="text" name="id_agenda" v-model="indicadorTotalTime" class="text touched" size="30" maxlength="255" disabled="true" onfocus="" required="">
        </div> -->

        <div class="horaini">
          <vue-timepicker v-if="statusButton" style="border: none;" input-width="300px" input-height="50px" drop-direction="auto" placeholder="Desde HH:mm" close-on-complete hide-disabled-items :hour-range="[[8, 22]]" :minute-interval="10"  v-on:change="changeIniHour" v-model="horaInicioDa"></vue-timepicker>
          <!-- <input v-else v-model="form.horaIni.HH" type="text" name="hora" class="entradaStyle" size="30" disabled="false"> -->
          <label v-else class="lblOculto">{{getHoraMin}}</label>
        </div>

        <!-- <div class="horafin">
          <vue-timepicker placeholder="Hasta HH:mm" close-on-complete hide-disabled-items :hour-range="[[8, 22]]" :minute-interval="10" v-model="form.horaFin" v-on:change="changeFinHour"></vue-timepicker>
        </div> -->

        <div class="link">
          <input v-if="statusButton" placeholder="Link ..." v-model="form.link" type="text" name="id_agenda" id="id_agenda" class="entradaStyle" size="30" maxlength="255" onchange="" onfocus="" required="">
          <label v-else class="lblOculto">{{getLinkCab}}</label>
        </div>

        <div class="nota">
          <textarea v-if="statusButton" placeholder="Nota ..." name="message" v-model="form.extendedProps.description"></textarea>
          <label v-else class="lblOculto">{{getCommCab }}</label>
        </div>

        <!-- <div class="boton1">
          <button @click.prevent="store(form)" type="submit" data-qa="btnLogin" class="btn_color_verde"><span class="base_text__vPnqO">Guardar</span></button>
        </div>
        <div class="boton2">
          <button @click.prevent="$emit('closeModal')" type="submit" data-qa="btnLogin" class="btn_color_rojo"><span class="base_text__vPnqO">Cancelar</span></button>
        </div> -->
      </form>
</template>
  
<script>
import VueTimepicker from 'vue3-timepicker';
import { Formatos } from '@/utils/Formatos.js';
import { mapActions} from 'vuex'
import { mapMutations} from 'vuex'


export default {
  name: "modal-calendar",
  props: {
  fechaProgramar: {
    type: String,
    required: true
  },
  estadoModalOpt:{
    type: Boolean,
    required: true
  },
  nombreOpt:{
    type: Array,
  },
  selectedOpt:{
    type: Object
  }

  
 
},
  mounted: async function() {

  },
  data() {
    
    return {
      form: this.selectedOpt,
      date:this.fechaProgramar,
      horaInicioDa:this.getHoraFomString(this.selectedOpt),
      textoLinkCut:this.acortarTexto(this.selectedOpt.link,35),
      textoCommeCut:this.acortarTexto(this.selectedOpt.extendedProps.description,150),
      fFechaDeProgramacion:this.fechaProgramar,
      nombres: this.nombreOpt,
      format: 'hh:mm',
      indicadorTotalTime:"",
      statusButton:this.estadoModalOpt
    }
  },
  components: {
    VueTimepicker
  },
  methods: {
    ...mapActions('programacionModule', ['createEntry']),
    ...mapMutations('programacionModule', ['addEntry']),
    async store(form) {
      this.$emit('saveAppt', form);
      //var fi = Formatos.fechaStrinToObject(form.fechaIni);
      //var ff = Formatos.fechaStrinToObject(form.fechaFin);
      var objeto = {
        title:form.title,
        link:form.link,
        start:form.fechaIni,
        end:Formatos.fechaZeroToDB(form.fechaFin),
        userid:form.userid,
        backgroundColor: "#3788D8",
        borderColor: "darkred",
        extendedProps:{
          description: form.extendedProps.description
        }
      }
      console.log("objeto POST",objeto);
      var created = await this.createEntry(objeto)
      if(created){
        console.log("created",created);
        this.addEntry(objeto)
      }
      
    },
    changeIniHour: function() {
      this.setTimeView();
    },
    changeFinHour(){
      this.setTimeView();
    },
    setTimeView(){
      
      /* if(this.form.horaIni.HH && this.form.horaIni.mm){
        console.log("setTimeView")
        console.log(this.form.horaIni)
        this.form.fechaIni = this.horaFecha(this.fFechaDeProgramacion,this.form.horaIni);
        
        this.form.fechaFin = this.sumarleUnaHora(this.form.fechaIni)
        console.log(typeof this.form.fechaIni);
        console.log(typeof this.form.fechaFin);
      } */

      
      //this.form.fechaFin = this.horaFecha(this.fFechaDeProgramacion,this.form.horaFin);
     /*  var consultaTime = this.diferencia;
      this.indicadorTotalTime=(consultaTime.estado)
        ?this.minToText(consultaTime.minutos)
        :(this.form.horaIni==undefined || this.form.horaIni==undefined)
            ?'':'Error'; */
    },
    minToText(minutos){
      var hor = minutos>=60?Math.floor(minutos/60):0;
      var min = (minutos-hor*60);
      return `${hor} h y ${min} min`
    },
    horaFecha(fecha, hora){
      var parts = fecha.split("/");
      var day = parts[0];
      var month = parts[1];
      var year = parts[2];
      return `${year + "-" + month + "-" + day}T${hora.HH}:${hora.mm}:00`;
    },
    sumarleUnaHora(input){
      let fecha = new Date(input);
      fecha.setHours(fecha.getHours() + 1);
      return fecha
    },
    getHoraFomString:function (input) {
      
      if(input==undefined){
        const fecha = input.start.split('T')[1];
        const hora = fecha.split(':');
        return {HH: hora[0], mm: hora[1]}
      }else{
        return ""
      }
    },
    getFechaFomString:function(input){
      console.log("getFechaFomString",input)
        const sepa = input.split('-');
        return `${sepa[2]}/${sepa[1]}/${sepa[0]}`

      
    },
    acortarTexto(texto, longitudMaxima) {
      console.log("texto",texto)
      console.log("longitudMaxima",longitudMaxima)
      if(texto){
          if (texto.length <= longitudMaxima) {
            return texto; // El texto no necesita acortarse
          } else {
            console.log(texto.substring(0, longitudMaxima) )
            return texto.substring(0, longitudMaxima) + '...'; // Acortar el texto y agregar puntos suspensivos
          }
      }else{
        return ""
      }
      
    }
    
    
  },
  computed: {    
    getHoraMin() {return `${this.horaInicioDa.HH}:${this.horaInicioDa.mm}`},
    getFechaCab(){return this.date},
    getLinkCab (){return this.textoLinkCut},
    getCommCab (){return this.textoCommeCut},
  },

  watch:{
    estadoModalOpt: function (newStatus, oldStatus) {
        console.log("Watcher estadoModalOpt - Nuevo valor: ", newStatus);
        console.log("Watcher estadoModalOpt - Valor anterior: ", oldStatus);
        this.statusButton = newStatus;
      },
    horaInicioDa: {
      handler(nuevaHora) {
        console.log("nuevaHora",nuevaHora);
        //this.horaInicioDa = this.getFechaFomString()
        // Realizar cualquier acción necesaria cuando cambie la horaInicioDa
        // Aquí puedes agregar código adicional para actualizar otros valores o hacer llamadas a API, etc.
      },
      deep: true,
    },
    
  },
    
};
</script>
  
<style scoped>

/* Or, with node_module alias path like: */
@import '~vue3-timepicker/dist/VueTimepicker.css';

label{
  font-size: 15px;
}

.lblClass{
  padding-left: 10px;
}


.lblOculto {
  border-radius: 5px;

  border: 1.5px solid #746f6f;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}


input{
  width: 100%;
  height: 40px;
  border-radius: 5px;
  padding-left: 10px;
  border: 1px solid #A9A9A9;
  font-size: 14px;
}

input::placeholder {
  font-size: 14px; /* Cambiar el tamaño de letra a 16 píxeles */
}

.botones{
    height: 40px;
   /*  background-color: blue; */
    grid-area: botones;
    align-items: flex-start;
    align-content: top;
    text-align: right;
    /* padding-top: 5px; */
    font-size: 18px;
}


.resaltado {
  font-size: 22px;
  border-radius: 50%;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
  background-color: #ebe8e865;
}

.resaltado:hover {
  opacity: 0.5;
  background-color: #73777b71;
}

.titulo{
  grid-area:titulo;
  font-family:  Inter, Helvetica, Arial, sans-serif;

}

.automatico{
  grid-area:automatico;
  text-align: left;
  margin-left: 10px;
  margin-right: 10px;
  align-content: center;
}



.selecpatient{
  grid-area:selecpatient;
  text-align: right;
  margin-left: 10px;
  margin-right: 10px;
  height: 40px;
  display: flex;
  

}
.fecha{
  /* padding: 4.8px; */
  grid-area:fecha;
}

.duracion{
  /* padding: 4.8px; */
  grid-area:duracion;
}


.link{
  grid-area:link;
  margin-left: 10px;
  margin-right: 10px;
  height: 40px;
  display: flex;
}

.horaini{
  display:flex;
  grid-area:horaini;
  box-sizing: border-box;
  border-radius:5px;
  border-width: 1px;
  margin-left: 10px;
  margin-right: 10px;
  text-align: center;
  align-items: center;
  align-content: center;
  height: 40px;
  /* background-color: #A9A9A9; */
}

.horafin{
  /* text-align:right ; */
  grid-area:horafin;
}

.nota{
  margin: 0;
  grid-area:nota;
  height: 100px;
  margin-left: 10px;
  margin-right: 10px;
}


textarea{
  width: 100%;
  height: 100%;
  box-sizing: border-box; /* Incluye el tamaño del borde y el relleno en el ancho y la altura */
  resize: none;
  font-family:  "sans-serif";
  font-size: 14px;
  padding-left:10px ;
  border-radius: 5px;
}

.boton1{
  grid-area:boton1;
  text-align: center;
  text-align: left;
  margin-left: 10px;
  
}

.boton2{
  grid-area:boton2;
  text-align: right;
  margin-right: 10px;
}


.cal-grcontainer {
  border-radius: 8px;
  box-shadow: -1px 1px 5px 0px rgba(0, 0, 0, 0.75);
  background-color: #fff;
  align-items: center;
  align-content: center;
  padding: 20px;
  margin: auto;
  display: grid;
  width: 360px;
  grid-template: 
        "titulo botones"50px
        "automatico automatico"100px
        "selecpatient selecpatient"50px
        "horaini horaini"50px
        "link link"50px
        "nota nota"110px
        "boton1 boton2"60px/
        160px 160px
        ;
}

@media (min-width:700px){
    .cal-grcontainer{
      width: 682px;
        grid-template:
        "titulo botones" 50px
        "automatico automatico" 90px
        "selecpatient horaini" 50px
        "link link" 50px 
        "nota nota" 110px
        "boton1 boton2" 60px /
        320px 320px;
    }
}


.istore{
  color: #0f893b;
}

.istore:hover {
  color: white;
}


.ieditar{
  color: #fbc020;
}

.ieditar:hover {
  color: white;
}

.ieliminar{
  color: #cb1a1de8;
}

.ieliminar:hover {
  color: white;
}

.iclose{
  color: #73777b;
}

.iclose:hover {
  color: white;
}
.resaltadoVerde {
  font-size: 22px;
  border-radius: 50%;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
  background-color: #ebe8e865;
}

.resaltadoVerde:hover {
  opacity: 0.9;
  background-color: #0f893b;
  color: #fff;
}

.resaltadoYellow {
  font-size: 22px;
  border-radius: 50%;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
  background-color: #ebe8e865;
}

.resaltadoYellow:hover {
  opacity: 0.9;
  background-color: #fbc020;
  color: #fff;
}


.resaltadoRojo {
  font-size: 22px;
  border-radius: 50%;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
  background-color: #ebe8e865;
}

.resaltadoRojo:hover {
  opacity: 0.9;
  background-color: #cb1a1de8;
  color: #ffd207;
}

.resaltadoRojo:hover i {
  color: #ffffff;
}

.entradaStyle{
  border-color: #A9A9A9;

}
.form_formContainer__au2IZ {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  font-family: Inter, sans-serif;
}

.base-module_titleContainer__HPPtA {
  align-items: center;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;

  width: 100%;
}

.typography_h3__AkmD7,
h3.typography_h3__AkmD7 {
  font-size: 19px;
  text-align: start;
  padding-left: 10px;
  align-content: center;
  margin: 0;
  /* line-height: 32px; */
}









form.form p.form-field:not(:last-of-type) {
  margin: 0 0 16px !important;
  padding: 0 !important;
}

form.form label.required,
form.form p.required,
form.form span.required {
  font-weight: 700;
}

p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

span.required label {
  background-position: top left;
  background: none;
  padding-left: 0px;
}

p.form-field label,
.g-recaptcha:before {
  min-height: 32px;
  line-height: 24px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: #0e101a;
  padding: 0;
}

label,
.g-recaptcha:before {
  font-family: Inter, Helvetica, Arial, sans-serif;
  font-feature-settings: 'ss03' on, 'ss01' on;
}

select {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid #e7e9f5;
  border-radius: 4px;
  width: 100% !important;
  height: 40px;
  padding: 0 31px 0 8px;
  font-size: 14px;
  line-height: 21px;
  color: #0e101a;
}

select option {
  margin: 0;
  padding: 0 0.3em;
}

option {
  font-weight: normal;
  display: block;
  white-space: nowrap;
  min-height: 1.2em;
  padding: 0px 2px 1px;
}


form.form p.form-field:not(:last-of-type) {
  margin: 0 0 16px !important;
  padding: 0 !important;
}

form.form label.required,
form.form p.required,
form.form span.required {
  font-weight: 700;
}

p.required label span.required label {
  background-position: top left;
  background: none;
  padding-left: 0px;
}

p.form-field label,
.g-recaptcha:before {
  min-height: 32px;
  line-height: 24px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: #0e101a;
  padding: 0;
}


textarea,
select,
p.form-field label,
.g-recaptcha:before {
  font-family: Inter, Helvetica, Arial, sans-serif;
  font-feature-settings: 'ss03' on, 'ss01' on;
}


form.form textarea,
form.form select {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid #e7e9f5;
  border-radius: 4px;
  width: 100% !important;
  height: 40px;
  padding: 0 31px 0 8px;
  font-size: 14px;
  line-height: 21px;
  color: #0e101a;
}


textarea,
select,
p.form-field label,
.g-recaptcha:before {
  font-family: Inter, Helvetica, Arial, sans-serif;
  font-feature-settings: 'ss03' on, 'ss01' on;
}








.gutter-top {
    margin-top: 20px;
}





.base_text__vPnqO {
    font-size: 14px;
    font-weight: 700;
    line-height: 32px;
    font-family: Inter, Helvetica, Arial, sans-serif;
}
.btn_color_verde {
    background: #0d8065;
    color: #fff;
    align-items: left;
    border-radius: 50px;
    border-width: 1px;
    height: 60px;
    justify-content: left;
    padding:0;
    margin: none;
    width: 90%;
}

.btn_color_rojo {
    background: #dc3545;
    color: #fff;
    align-items: center;
    border-radius: 6px;
    border-width: 1px;
    height: 48px;
    justify-content: center;
    padding:0;
    margin: none;
    width: 90%;
}


.max-h-select {
  max-height: 300px;
}

</style>

/*
{
  title: "",
  link: "",
  horaIni: {},
  horaFin: {},
  fechaIni: "",
  fechaFin: "",
  backgroundColor: "",
  userid: "",
  extendedProps: {
    description: ""
  }
}
*/