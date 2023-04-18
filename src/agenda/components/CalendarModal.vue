<template>
  <div class="with_border_container__04AEG">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">


      <form class="form_formContainer__au2IZ">
        <div class="base-module_titleContainer__HPPtA">
          <h1 class="typography_h3__AkmD7" style="color: rgb(14, 16, 26);">Agendar una cita</h1>
        </div>


        <div class="signin_textFieldsContainer__WIXUm">
          <div class>
            <div class="mb-4">
              
              <p class="form-field  Form_saleshelp pd-select required required-custom    form-field-primary">
                <label class="field-label" for="idSelector">Buscar Usuario: *</label>
                <select name="idSelector" id="idSelector" class="select touched" v-model="form.paciente" onchange="" required="">
                  <option v-for="nombre in nombres" :key="nombre.id" :value="nombre.nombre">{{ nombre.nombre }}</option>
                </select>
              </p>

              
              <p class="form-field add-text-before email pd-text required required-custom    ">
                <label class="field-label" for="id_agenda">Link:</label>
                <input v-model="form.link" type="text" name="id_agenda" id="id_agenda" class="text touched" size="30" maxlength="255" onchange="" onfocus="" required="">
              </p>

              
              <div class="rf-input--large gutter-top rf-input">
                <div class="rf-input__inner">
                  <div class="rf-input__wrapper arrival-input">
                    <label class="field-label" for="id_agenda">Desde:</label>
                    <vue-timepicker close-on-complete hide-disabled-items :hour-range="[[8, 22]]" :minute-interval="10" v-model="form.horaIni" v-on:change="changeIniHour"></vue-timepicker>
                  </div>
                  <div class="rf-input__wrapper return-date-input">
                    <label class="field-label" for="id_agenda">Hasta:</label>
                    <vue-timepicker close-on-complete hide-disabled-items :hour-range="[[8, 22]]" :minute-interval="10" v-model="form.horaFin" v-on:change="changeFinHour"></vue-timepicker>
                  </div>
                </div>
              </div>

              <div class="rf-input--large gutter-top rf-input">
                <div class="rf-input__inner">
                  <div class="rf-input__wrapper arrival-input">
                    <label class="field-label" for="id_agenda">Fecha:</label>
                    <input type="text" name="id_agenda" v-model="fFechaDeProgramacion" class="text touched" size="30" maxlength="255" disabled="true" onfocus="" required="">
                  </div>
                  <div class="rf-input__wrapper return-date-input">
                    <label class="field-label" for="id_agenda">Duración:</label>
                    <input type="text" name="id_agenda" v-model="indicadorTotalTime" class="text touched" size="30" maxlength="255" disabled="true" onfocus="" required="">
                  </div>
                </div>
              </div>


            </div>


          </div>
        </div>
        <!-- <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"> -->
          <!-- <button type="submit" data-qa="btnLogin" class="base_basic__8rArQ btn_color_verde"><span class="base_text__vPnqO">Continue</span></button> -->

          <!-- <button @click.prevent="store(form)" type="button" >Guardar</button>
          <button type="button">Eliminar</button>
          <button @click.prevent="closeModal" type="button">atrás</button> -->
          <div class="rf-input--large gutter-top rf-input">
            <div class="rf-input__inner">
              <div class="rf-input__wrapper arrival-input">
                <button @click.prevent="store(form)" type="submit" data-qa="btnLogin" class="base_basic__8rArQ btn_color_verde"><span class="base_text__vPnqO">Guardar</span></button>
              </div>
              <div class="rf-input__wrapper return-date-input">
                <button @click.prevent="closeModal" type="submit" data-qa="btnLogin" class="base_basic__8rArQ btn_color_rojo"><span class="base_text__vPnqO">Cancelar</span></button>
              </div>
            </div>
          </div>
      </form>


    </div>
  </div>
</template>
  
<script>
import VueTimepicker from 'vue3-timepicker';
import moment from 'moment';
import {useUserStore} from '@/stores/user.js'
import { Formatos } from '@/utils/Formatos.js';


const counterStore = useUserStore();
export default {
  name: "modal-calendar",
  props: {
    fechaProgramar:String,

  },
  mounted: async function() {

  },
  data() {
    
    return {
      form: {
        paciente: "",
        link: "",
        horaIni: {},
        horaFin: {},
        fechaIni:'',
        fechaFin:'',
        userid: counterStore.user
      },
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
    closeModal() {
      this.$emit('closeModal')
    },
    async store(form) {
      this.$emit('saveAppt', form);
      var fi = Formatos.fechaStrinToObject(form.fechaIni);
      var ff = Formatos.fechaStrinToObject(form.fechaFin);
      var objeto = {
        paciente:form.paciente,
        link:form.link,
        fechaIni:fi,
        fechaFin:ff,
        userid:form.userid
      }
      console.log(objeto)
      await counterStore.insert('agenda',objeto);
    },
    changeIniHour: function() {
      this.setTimeView();
    },
    changeFinHour(){
      this.setTimeView();
    },
    setTimeView(){
      this.form.fechaIni = this.horaFecha(this.fFechaDeProgramacion,this.form.horaIni);
      this.form.fechaFin = this.horaFecha(this.fFechaDeProgramacion,this.form.horaFin);
      var consultaTime = this.diferencia;
      this.indicadorTotalTime=(consultaTime.estado)
        ?this.minToText(consultaTime.minutos)
        :(this.form.horaIni==undefined || this.form.horaIni==undefined)
            ?'':'Error';
    },
    minToText(minutos){
      var hor = minutos>=60?Math.floor(minutos/60):0;
      var min = (minutos-hor*60);
      return `${hor} h y ${min} min`
    },
    horaFecha(fecha, hora){
      return `${fecha} ${hora.HH}:${hora.mm}:00`;
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
};
</script>
  
<style scoped>
@import 'vue3-timepicker/dist/VueTimepicker.css';

/* Or, with node_module alias path like: */
@import '~vue3-timepicker/dist/VueTimepicker.css';

/* .with_border_container__04AEG {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 12px 48px rgba(26, 33, 52, .11);
  max-width: 460px;
  min-width: 20%;
  padding: 32px;
  width: 100%;
} */
.with_border_container__04AEG {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 12px 48px rgba(26, 33, 52, .11);
  align-items: center;
  align-content: center;
  max-width: 460px;
  padding: 32px;
  width: 50%;
  margin: auto;
  min-width: 400px;
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
  margin-bottom: 24px;
  width: 100%;
}

.typography_h3__AkmD7,
h3.typography_h3__AkmD7 {
  font-size: 24px;
  line-height: 32px;
}

.signin_textFieldsContainer__WIXUm {
  margin-bottom: 16px;
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

input,
textarea,
select,
p.form-field label,
.g-recaptcha:before {
  font-family: Inter, Helvetica, Arial, sans-serif;
  font-feature-settings: 'ss03' on, 'ss01' on;
}

input[type='text'],
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

input,
textarea,
select,
p.form-field label,
.g-recaptcha:before {
  font-family: Inter, Helvetica, Arial, sans-serif;
  font-feature-settings: 'ss03' on, 'ss01' on;
}







.rf-input--large {
    display: block;
    width: 100%;
}
.gutter-top {
    margin-top: 20px;
}
.rf-input {
    display: inline-block;
    vertical-align: bottom;
}
.rf-input__inner {
    box-shadow: 0 4px 15px transparent;
    display: flex;
    transition: box-shadow .2s ease-in-out;
    border-radius: 3px;
}
.flight-search__panel__fieldset--date .rf-input__wrapper {
    flex: 0 0 50%;
    max-width: 50%;
    min-width: 0;
}
.flight-search__panel__fieldset--date .rf-input__wrapper {
    -webkit-box-flex: 0;
    flex: 0 0 50%;
    max-width: 50%;
    min-width: 0;
}
.rf-input__wrapper {
    display: block;
    flex: 1 0 100px;
    max-width: 100%;
    position: relative;
    vertical-align: middle;
}

.base_basic__8rArQ {
    align-items: center;
    border-radius: 6px;
    display: flex;
    height: 48px;
    justify-content: center;
    padding:0;
    position: relative;
    margin: none;
    width: 90%;

}

.base_text__vPnqO {
    font-size: 14px;
    font-weight: 700;
    line-height: 32px;
}
.btn_color_verde {
    background: #0d8065;
    color: #fff;
}

.btn_color_rojo {
    background: #dc3545;
    color: #fff;
}

.top-100 {
  top: 100%;
}

.bottom-100 {
  bottom: 100%;
}

.max-h-select {
  max-height: 300px;
}</style>