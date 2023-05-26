<template>
    <div class="containermodal">
      <form class="cal-grcontainer">
        <div  class="botones">
            <button v-if="statusButton" class="btn resaltadoVerde " @click.prevent="store(form)" data-toggle="tooltip" title="Guardar">
                <i class="fa-solid fa-floppy-disk istore"></i>
            </button>
            <button v-else class="btn resaltadoYellow " @click.prevent="$emit('editarModal')" data-toggle="tooltip" title="Editar">
                <i class="fa-solid fa-pen-to-square ieditar"></i>
            </button>
            <button class="btn resaltadoRojo" @click.prevent="$emit('eliminarM1',form.id)" data-toggle="tooltip" title="Eliminar">
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
          <label><strong>Lic. a cargo:</strong></label><label class="lblClass">{{ acortarTexto(selectedOpt.extendedProps.encargado,20) }}</label><br>
          <label><strong>Fecha de cita:</strong></label><label class="lblClass"> {{getFechaCab()}}</label><br>
          <label><strong>Duracion:</strong></label><label class="lblClass"> 1 hora</label><br>
          <hr>
        </div>

        <div class="selecpatient">
          <select v-if="statusButton && flagUpdateMo" class="entradaStyle" name="idSelector" id="idSelector" v-model="iPaciente" onchange="" required="true">
            <option value="" selected>Selecciona un paciente</option>
            <option v-for="nombre in nombres" :key="nombre.id" :value="nombre.nombre">{{ nombre.nombre }}</option>
          </select>
          <!-- <input v-else v-model="form.title" type="text" name="paciente" class="entradaStyle" size="30" disabled="disabled"> -->
          <label v-if="!flagUpdateMo" class="lblOculto">{{form.title}}</label>
        </div>

        <!-- <div class="fecha">
          <input placeholder="Fecha" type="text" name="id_agenda" v-model="fFechaDeProgramacion" class="text touched" size="30" maxlength="255" disabled="true" onfocus="" required="">
        </div>

        <div class="duracion">
          <input placeholder="Duración" type="text" name="id_agenda" v-model="" class="text touched" size="30" maxlength="255" disabled="true" onfocus="" required="">
        </div> -->

        <div class="horaini">
          <vue-timepicker v-if="statusButton" style="border: none;" input-width="300px" input-height="50px" drop-direction="auto" placeholder="Desde HH:mm" close-on-complete hide-disabled-items :hour-range="[[8, 22]]" :minute-interval="10"  v-on:change="changeIniHour" 
          v-model="horaInicioDa"></vue-timepicker>
          <!-- <input v-else v-model="form.horaIni.HH" type="text" name="hora" class="entradaStyle" size="30" disabled="false"> -->
          <label v-else class="lblOculto">{{getHoraFomString(selectedOpt.start)}}</label>
        </div>

        <div class="link">
          <input v-if="statusButton" placeholder="Linkde reunión ..." v-model="iLink" type="url" name="id_agenda" id="id_agenda" class="entradaStyle" size="30" maxlength="255" required>
          <label v-else class="lblOculto">
            <a v-if="form.extendedProps.link.length > 40" :href="form.extendedProps.link" target="_blank">{{ form.extendedProps.link.substring(0, 40) }}...</a>
            <a v-else :href="form.extendedProps.link" target="_blank">{{ form.extendedProps.link }}</a>
          </label>
        </div>


        <div class="nota">
          <textarea v-if="statusButton" placeholder="Nota ..." name="message" v-model="iDescription"></textarea>
          <label v-else class="lblOculto">{{getCommCab }}</label>
        </div>

      </form>
    </div>
      
</template>
  
<script>
import VueTimepicker from 'vue3-timepicker';
import { Formatos } from '@/utils/Formatos.js';
import { mapActions,mapGetters} from 'vuex'

var rellenar = {
          backgroundColor: "",
          borderColor: "",
          end: "",
          extendedProps: {
              description: "",
              encargado:"",
              link: "",
          },
          groupId:"",
          start: "",
          title: "",
          id:""
      }

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
  },
  flagUpdateMo:{
    type:Boolean
  }
},
  mounted: async function() {
    this.actualizarFormulario();
    this.grabarFormularioInit()
    
    
    console.log("this.grabar",this.grabar)
    console.log("this.selectedOpt",this.selectedOpt)
  },
  data() {
    return {
      form: this.selectedOpt,
      date:this.fechaProgramar,
      iLink:this.selectedOpt.extendedProps.link,
      iDescription:this.selectedOpt.extendedProps.description,
      iPaciente:this.selectedOpt.title,
      update:rellenar,
      grabar:rellenar,
      horaInicioDa:{},
      textoCommeCut:this.acortarTexto(this.selectedOpt.extendedProps.description,150),
      fFechaDeProgramacion:this.fechaProgramar,
      nombres: this.nombreOpt,
      format: 'hh:mm',
      statusButton:this.estadoModalOpt
    }
  },
  created() {
    

  },
  components: {
    VueTimepicker
  },
  methods: {
    ...mapActions('programacionModule', ['createEntry','updateEntry','setIsLoading']),
    ...mapGetters('programacionModule', ['getEstado']),
    async store(form) {
      this.setIsLoading(false);
      this.$emit('saveAppt', form);
      console.log("this.flagUpdateMo",this.flagUpdateMo)
      if(this.flagUpdateMo){
        console.log("this.grabar",this.grabar)
          try {
            await this.createEntry(this.grabar)
          } catch (error) {
            console.log("Error en creacion",error);
          }
      }else{
        try {
          console.log("this.update",this.update)
            await this.updateEntry(this.update)
          } catch (error) {
            console.log("Error en update",error);
          }
      }
      this.setIsLoading(true);
    },
    changeIniHour: function() {
      /* this.setTimeView(this.horaInicioDa); */
    },
    changeFinHour(){
      /* this.setTimeView(this.horaInicioDa); */
    },
    setTimeView(input){
      if(input.HH && input.mm){
        var fecIni = this.horaFecha(this.fFechaDeProgramacion,input);        
        var tempor = this.sumarleUnaHora(fecIni);
        var fecFin = Formatos.fechaZeroToDB(tempor) ; 
        return {fecIni,fecFin}
      }
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
      /* console.log("hora inicio: ",input) */
      if(input!=undefined){
        var fechaStr = Formatos.fechaZeroToDB(input);
        const fecha = fechaStr.split('T')[1];
        const hora = fecha.split(':');
        this.horaInicioDa={HH: hora[0], mm: hora[1]};
        /* console.log("this.horaInicioDa: ",this.horaInicioDa) */
        return `${hora[0]}:${hora[1]}`
      }else{
        return {}
      }
    },
    getFechaFomString:function(input){
      /* console.log("getFechaFomString",input) */
        const sepa = input.split('-');
        return `${sepa[2]}/${sepa[1]}/${sepa[0]}`
    },
    acortarTexto(texto, longitudMaxima) {
      /* console.log("texto",texto)
      console.log("longitudMaxima",longitudMaxima) */
      if(texto){
          if (texto.length <= longitudMaxima) {
            return texto; // El texto no necesita acortarse
          } else {
            return texto.substring(0, longitudMaxima) + '...'; // Acortar el texto y agregar puntos suspensivos
          }
      }else{
        return ""
      }
      
    },
    getFechaCab(){
      /* console.log("this.date",this.date,this.selectedOpt,this.fFechaDeProgramacion) */
      if(this.date!=="NaN/NaN/NaN"){
        return this.date
      }else{
        var fechaStr    = Formatos.fechaZeroToDB(this.selectedOpt.start);
        var fechaString = this.getFechaFomString(fechaStr.substring(0,10));
        this.fFechaDeProgramacion =fechaString
        return fechaString
      }
    },
    actualizarFormulario(){
      this.update.id=this.selectedOpt.id
      this.update.title=this.selectedOpt.title;
      this.update.start=this.selectedOpt.fechaIni;
      this.update.end=this.selectedOpt.fechaFin;
      this.update.groupId=this.selectedOpt.groupId;
      this.update.backgroundColor= this.selectedOpt.backgroundColor;
      this.update.borderColor= this.selectedOpt.borderColor;
      this.update.extendedProps.description= this.selectedOpt.extendedProps.description;
      this.update.extendedProps.encargado= this.selectedOpt.extendedProps.encargado;
      this.update.extendedProps.link= this.selectedOpt.extendedProps.link;
      
      
      /* console.log("this.update",this.update)
      console.log("this.selectedOpt",this.selectedOpt) */
    },
    grabarFormularioInit(){
      this.grabar.id=this.selectedOpt.id
      this.grabar.title=this.selectedOpt.title;
      this.grabar.start=this.selectedOpt.fechaIni;
      this.grabar.end=this.selectedOpt.fechaFin;
      this.grabar.groupId=this.selectedOpt.groupId;
      this.grabar.backgroundColor= this.selectedOpt.backgroundColor;
      this.grabar.borderColor= this.selectedOpt.borderColor;
      this.grabar.extendedProps.description= this.selectedOpt.extendedProps.description;
      this.grabar.extendedProps.encargado= this.selectedOpt.extendedProps.encargado;
      this.grabar.extendedProps.link= this.selectedOpt.extendedProps.link;
    }
    
    
  },
  computed: {    
    getHoraMin() {return `${this.horaInicioDa.HH}:${this.horaInicioDa.mm}`},
    /* getFechaCab(){return this.date?getFechaFomString():this.date}, */
    getCommCab (){return this.textoCommeCut},
  },

  watch:{
    estadoModalOpt: function (newStatus) {
        /* console.log("Watcher estadoModalOpt - Nuevo valor: ", newStatus);
        console.log("Watcher estadoModalOpt - Valor anterior: ", oldStatus); */
        this.statusButton = newStatus;
      },
    horaInicioDa: {
      handler(nuevaHora) {
        /* console.log("nuevaHora",nuevaHora); */
        var fecha = this.setTimeView(nuevaHora)
        if(fecha){
          this.grabar.start=fecha.fecIni;
          this.grabar.end  =fecha.fecFin;
          this.update.start=fecha.fecIni;
          this.update.end  =fecha.fecFin;
          this.form.fechaIni = fecha.fecIni;        
          this.form.fechaFin = fecha.fecFin;
        }
      },
      deep: true,
    },
    iLink: function (newStatus) {
      /* console.log("Watcher iLink - Nuevo valor: ", newStatus);
      console.log("Watcher iLink - Valor anterior: ", oldStatus); */
      this.update.extendedProps.link = newStatus;
      this.grabar.extendedProps.link = newStatus;
      /* console.log("this.update",this.update) */
    },
    iDescription: function (newStatus) {
      this.update.extendedProps.description = newStatus;
      this.grabar.extendedProps.description = newStatus;
    },
    iPaciente:function(newStatus){
      this.update.title = newStatus;
      this.grabar.title = newStatus;
    },

    
  },
    
};
</script>
  
<style lang="scss" scoped>

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

.containermodal {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: transparent;
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
        "nota nota"110px /
        160px 160px
        ;
}

@media (min-width:700px){
    .cal-grcontainer{
      width: 682px;
        grid-template:
        "titulo botones" 50px
        "automatico automatico" 100px
        "selecpatient horaini" 50px
        "link link" 50px 
        "nota nota" 110px /
        320px 320px;
    }
}


.istore{
  color: #0f893b;
  font-size: 25px;
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
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 25px;
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

