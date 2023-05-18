<template>

      <form class="cal-grcontainer">

        <div class="titulo">
          <h1 class="typography_h3__AkmD7" style="color: rgb(14, 16, 26);">Agendar una cita</h1>
        </div>

        <div class="automatico">
          <label><strong>Licenciado a cargo:</strong></label><label class="lblClass"> Carlos Perez</label><br>
          <label><strong>Fecha de cita:</strong></label><label class="lblClass"> 01/06/2023</label><br>
          <label><strong>Duracion:</strong></label><label class="lblClass"> 1h 20min</label><br>
         
          


          <hr>
        </div>

        <div class="selecpatient">
          <select class="entradaStyle" name="idSelector" id="idSelector" v-model="form.title" onchange="" required="true">
            <option value="" selected>Selecciona un paciente</option>
            <option v-for="nombre in nombres" :key="nombre.id" :value="nombre.nombre">{{ nombre.nombre }}</option>
          </select>
        </div>

        <!-- <div class="fecha">
          <input placeholder="Fecha" type="text" name="id_agenda" v-model="fFechaDeProgramacion" class="text touched" size="30" maxlength="255" disabled="true" onfocus="" required="">
        </div>

        <div class="duracion">
          <input placeholder="Duración" type="text" name="id_agenda" v-model="indicadorTotalTime" class="text touched" size="30" maxlength="255" disabled="true" onfocus="" required="">
        </div> -->

        <div class="horaini">
          <vue-timepicker style="border: none;" input-width="300px" input-height="50px" drop-direction="auto" placeholder="Desde HH:mm" close-on-complete hide-disabled-items :hour-range="[[8, 22]]" :minute-interval="10" v-model="form.horaIni" v-on:change="changeIniHour"></vue-timepicker>
          
        </div>

        <!-- <div class="horafin">
          <vue-timepicker placeholder="Hasta HH:mm" close-on-complete hide-disabled-items :hour-range="[[8, 22]]" :minute-interval="10" v-model="form.horaFin" v-on:change="changeFinHour"></vue-timepicker>
        </div> -->

        <div class="link">
          <input  placeholder="Link ..." v-model="form.link" type="text" name="id_agenda" id="id_agenda" class="entradaStyle" size="30" maxlength="255" onchange="" onfocus="" required="">
        </div>

        <div class="nota">
          <textarea placeholder="Nota ..." name="message" v-model="form.extendedProps.description"></textarea>
        </div>

        <div class="boton1">
          <button @click.prevent="store(form)" type="submit" data-qa="btnLogin" class="btn_color_verde"><span class="base_text__vPnqO">Guardar</span></button>
        </div>
        <div class="boton2">
          <button @click.prevent="$emit('closeModal')" type="submit" data-qa="btnLogin" class="btn_color_rojo"><span class="base_text__vPnqO">Cancelar</span></button>
        </div>
      </form>
</template>
  
<script>
import VueTimepicker from 'vue3-timepicker';
import moment from 'moment';
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
  itemVar:{
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
 
},
  mounted: async function() {

  },
  data() {
    
    return {
      form: this.itemVar,
      date: null,
      fFechaDeProgramacion:this.fechaProgramar,
      nombres: [
        { id: 1, nombre: 'Juan' },
        { id: 2, nombre: 'Maria' },
        { id: 3, nombre: 'Pedro' }
      ],
      format: 'hh:mm',
      indicadorTotalTime:""
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
      console.log(objeto);
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
      
      if(this.form.horaIni.HH && this.form.horaIni.mm){
        console.log("setTimeView")
        console.log(this.form.horaIni)
        this.form.fechaIni = this.horaFecha(this.fFechaDeProgramacion,this.form.horaIni);
        
        this.form.fechaFin = this.sumarleUnaHora(this.form.fechaIni)
        console.log(typeof this.form.fechaIni);
        console.log(typeof this.form.fechaFin);
      }

      
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
    }
    
  },
  computed: {
    diferencia() {
      const inicio = moment(this.form.fechaIni, 'YYYY-MM-DD HH:mm:ss');
      const fin = moment(this.form.fechaFin, 'YYYY-MM-DD HH:mm:ss');
      const diff = moment.duration(fin.diff(inicio));
      var minutos = diff._milliseconds/60000;
      if(minutos>=0  ){
        return {
          estado: true,
          minutos: diff._milliseconds/60000
        };
      }else{
        return {
          estado: false,
          minutos:0
        }
      }
    },
    
  },

  watch:{
    /* form: {
      handler: function(newForm, oldForm) {
        console.log("newForm",newForm);
        console.log("oldForm",oldForm);
      },
      deep: true
    } */
  }
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

.titulo{
  grid-area:titulo;
  font-family:  Inter, Helvetica, Arial, sans-serif;

}

.automatico{
  grid-area:automatico;
  text-align: left;
  margin-left: 10px;
  margin-right: 10px;
}



.selecpatient{
  grid-area:selecpatient;
  text-align: right;
  margin-left: 10px;
  margin-right: 10px;
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
        "titulo titulo"50px
        "automatico automatico"200px
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
        "titulo titulo" 50px
        "automatico automatico" 90px
        "selecpatient horaini" 50px
        "link link" 50px 
        "nota nota" 110px
        "boton1 boton2" 60px /
        320px 320px;
    }
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
  font-size: 24px;
  line-height: 32px;
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
    border-radius: 6px;
    border-width: 1px;
    height: 48px;
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
