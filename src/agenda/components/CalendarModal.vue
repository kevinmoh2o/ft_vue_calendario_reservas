<template>
  <div class="with_border_container__04AEG">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span> -->
      <!-- <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog" aria-modal="true" aria-labelledby="modal-headline"> -->
      <form class="form_formContainer__au2IZ">
        <div class="base-module_titleContainer__HPPtA">
          <h1 class="typography_h3__AkmD7" style="color: rgb(14, 16, 26);">Agendar una cita</h1>
        </div>


        <div class="signin_textFieldsContainer__WIXUm">
          <div class>
            <div class="mb-4">
              <p class="form-field  Form_saleshelp pd-select required required-custom    form-field-primary">
                <label class="field-label" for="894581_5546pi_894581_5546">Buscar Usuario: *</label>
                <select name="894581_5546pi_894581_5546" id="894581_5546pi_894581_5546" class="select touched" onchange="" required="">
                  <option v-for="nombre in nombres" :key="nombre.id" :value="nombre.nombre">{{ nombre.nombre }}</option>
                </select>
              </p>

              <!-- <label for="exampleFormControlInput1" class="block text-gray-700 text-sm font-bold mb-2">Buscar
                  Usuario</label>
                <div class="flex flex-col relative">
                  <div class="w-full">
                    <div class="my-2 p-1 bg-white flex border border-gray-200 rounded">
                      <div class="flex flex-auto flex-wrap"></div>
                      <input placeholder="Buscar Usuario"
                        class="p-1 px-2 appearance-none outline-none w-full text-gray-800" />
                      <div class="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
                        <button type="button" class="cursor-pointer w-6 h-6 text-red-600 outline-none focus:outline-none">
                          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" class="feather feather-chevron-up w-4 h-4">
                            <polyline points="18 15 12 9 6 15" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    class="absolute shadow bg-white top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj">
 
                  </div>

                </div> -->
              <p class="form-field add-text-before email pd-text required required-custom    ">
                <label class="field-label" for="id_agenda">Motivo:</label>
                <input v-model="form.title" type="text" name="id_agenda" id="id_agenda" class="text touched" size="30" maxlength="255" onchange="" onfocus="" required="">
              </p>

              <div class="rf-input--large gutter-top rf-input">
                <div class="rf-input__inner">
                  <div class="rf-input__wrapper arrival-input">
                    <label class="field-label" for="id_agenda">Desde:</label>
                    <vue-timepicker v-on:touchend="closeModal" hide-disabled-items :hour-range="[[8, 22]]" :minute-interval="10" v-model="horaIni" v-on:change="changeIniHour"></vue-timepicker>
                  </div>
                  <div class="rf-input__wrapper return-date-input">
                    <label class="field-label" for="id_agenda">Hasta:</label>
                    <vue-timepicker hide-disabled-items :hour-range="[[8, 17]]" :minute-interval="10" v-model="horaFin" v-on:change="changeFinHour"></vue-timepicker>
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

            <!-- <div class="mb-4">
              <label for="exampleFormControlInput1" class="block text-gray-700 text-sm font-bold mb-2">Motivo:</label>
              <input v-model="form.title" type="text"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="exampleFormControlInput1" placeholder="Ingresa el motivo de la consulta" autocomplete="off" />
               <div v-if="$page.errors.title" class="text-red-500">{{ $page.errors.title[0]}}</div> 
            </div> -->

            <!-- <div class="mb-4">
              <label for="exampleFormControlInput1" class="block text-gray-700 text-sm font-bold mb-2">Fecha</label>
              <input v-model="form.date_at" disabled="true" type="text"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="exampleFormControlInput1" placeholder="Enter pass" />
            </div>

            <div class="mb-4">
              <label for="exampleFormControlInput2" class="block text-gray-700 text-sm font-bold mb-2">Hora</label>
              <input v-model="form.hour" disabled="true" type="time"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="exampleFormControlInput2" />
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label for="timeSesion" class="block text-sm font-medium leading-5 text-gray-700">Duración</label>
              <select v-model="form.session" id="timeSesion"
                class="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                <option value="900">15 minutos</option>
                <option value="1800">30 minutos</option>
                <option value="3600">1 hora</option>
              </select>
            </div> -->

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
                    <button @click.prevent="store(form)" type="submit" data-qa="btnLogin" class="base_basic__8rArQ btn_color_verde"><span class="base_text__vPnqO">Programar</span></button>
                  </div>
                  <div class="rf-input__wrapper return-date-input">
                    <button @click.prevent="closeModal" type="submit" data-qa="btnLogin" class="base_basic__8rArQ btn_color_rojo"><span class="base_text__vPnqO">Cancelar</span></button>
                  </div>
                </div>
              </div>
        <!-- </div> -->
      </form>
      <!-- </div> -->
    </div>
  </div>
</template>
  
<script>
import VueTimepicker from 'vue3-timepicker';
import moment from 'moment';

export default {
  name: "modal-calendar",
  props: {
    fechaProgramar:String,

    /* form:{
      type: Object,
      default: ()=>{}
    } */
  },
  data() {
    
    return {
      form: {
        title: "",
        date_at: " ",
        hour: " ",
        user_id: " ",
        session: 1800,
      },
      date: null,
      fFechaDeProgramacion:this.fechaProgramar,
      nombres: [
        { id: 1, nombre: 'Juan' },
        { id: 2, nombre: 'Maria' },
        { id: 3, nombre: 'Pedro' }
      ],
      format: 'hh:mm',
      horaIni:{
        HH: '12',
        mm: '00',
      },
      horaFin:{
        HH: '12',
        mm: '00',
      },
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
    store(form) {
      this.$emit('saveAppt', form)
    },
    changeIniHour: function() {
      this.setTimeView();
    },
    changeFinHour(){
      this.setTimeView();
    },
    setTimeView(){
      var consultaTime = this.diferencia;
      this.indicadorTotalTime=consultaTime.estado?`${consultaTime.horas} h y ${consultaTime.minutos} min`:'Error';
    },
    
  },
  computed: {
    diferencia() {
      const inicio = moment(`2023-04-14 ${this.horaIni.HH}:${this.horaIni.mm}:00`, 'YYYY-MM-DD HH:mm:ss');
      const fin = moment(`2023-04-14 ${this.horaFin.HH}:${this.horaFin.mm}:00`, 'YYYY-MM-DD HH:mm:ss');
      const diff = moment.duration(fin.diff(inicio));
      if(diff.hours()>=0){
        if(diff.minutes()>=0){
          return {
            estado:true,
            horas:diff.hours(),
            minutos:diff.minutes()
          }
        }else{
          return {
            estado:false
          }
        }
      }else{
        return {
            estado:false
          }
      }
    }
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