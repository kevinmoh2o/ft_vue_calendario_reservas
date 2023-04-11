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
          <h1 class="typography_h3__AkmD7" style="color: rgb(14, 16, 26);">Reservar una cita</h1>
        </div>


        <div class="signin_textFieldsContainer__WIXUm">
          <div class>
            <div class="mb-4">
              <p class="form-field  Form_saleshelp pd-select required required-custom    form-field-primary">
                <label class="field-label" for="894581_5546pi_894581_5546">Buscar Usuario: *</label>
                <select name="894581_5546pi_894581_5546" id="894581_5546pi_894581_5546" class="select touched" onchange=""
                  required="">
                  <option value="" selected="selected"></option>
                  <option value="92454">Myself</option>
                  <option value="92456">My corporate team</option>
                  <option value="92458">My company</option>
                  <option value="92460">A governmental organization</option>
                  <option value="92462">A non-profit organization</option>
                  <option value="92464">An educational institution</option>
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
                <input type="text" name="id_agenda" id="id_agenda" value="" class="text touched" size="30" maxlength="255"
                  onchange="" onfocus="" required="">
              </p>

              <div class="uitk-field has-floatedLabel-label has-icon has-placeholder">
                <label for="d1" class="uitk-field-label">
                  <span aria-hidden="true">Departs as early as</span>
                </label>
                <input id="d1" name="d1" data-stid="input-date" type="text" class="uitk-field-input is-hidden"
                  placeholder="Departs as early as" aria-required="false" aria-invalid="false" value="2023-04-20">
                <button aria-label="Departs as early as April 20, 2023" data-name="d1" id="d1-btn"
                  data-stid="open-date-picker" type="button" class="uitk-faux-input uitk-form-field-trigger">Apr
                  20</button><button class="is-visually-hidden" type="button" aria-hidden="true"
                  tabindex="-1"></button><svg class="uitk-icon uitk-field-icon uitk-icon-medium" aria-hidden="true"
                  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <path fill-rule="evenodd"
                    d="M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 0 0-1.99 2L3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 5v11H5V8h14zm-7 2H7v5h5v-5z"
                    clip-rule="evenodd"></path>
                </svg>
              </div>

            </div>

            <!-- <div class="mb-4">
              <label for="exampleFormControlInput1" class="block text-gray-700 text-sm font-bold mb-2">Motivo:</label>
              <input v-model="form.title" type="text"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="exampleFormControlInput1" placeholder="Ingresa el motivo de la consulta" autocomplete="off" />
               <div v-if="$page.errors.title" class="text-red-500">{{ $page.errors.title[0]}}</div> 
            </div> -->

            <div class="mb-4">
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
            <!-- start select -->
            <div class="col-span-6 sm:col-span-3">
              <label for="timeSesion" class="block text-sm font-medium leading-5 text-gray-700">Duración</label>
              <select v-model="form.session" id="timeSesion"
                class="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                <option value="900">15 minutos</option>
                <option value="1800">30 minutos</option>
                <option value="3600">1 hora</option>
              </select>
            </div>
            <!-- end select -->
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button @click.prevent="store(form)" type="button"
            class="inline-flex justify-center w-full border border-teal-500 bg-teal-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline">Guardar</button>
          <button type="button"
            class="inline-flex justify-center w-full border border-red-500 text-red-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-red-600 focus:outline-none focus:shadow-outline">Eliminar</button>
          <button @click.prevent="closeModal" type="button"
            class="inline-flex justify-center w-full border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline">atrás</button>
        </div>
      </form>
      <!-- </div> -->
    </div>
  </div>
</template>
  
<script>

export default {
  name: "modal-calendar",
  props: {
    /* form:{
      type: Object,
      default: ()=>{}
    } */
  },
  data() {
    return {
      form: {
        title: " ",
        date_at: " ",
        hour: " ",
        user_id: " ",
        session: 1800,
      }
    }
  },
  components: {     
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    store(form) {
      this.$emit('saveAppt', form)
    },
    setTitle() {
      return ''
    },
    /* form(){
      return {
          title:" ",
          date_at:" ",
          hour:" ",
          user_id:" ",
          session:1800,
      }
    } */
  }
};
</script>
  
<style scoped>
.with_border_container__04AEG {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 12px 48px rgba(26, 33, 52, .11);
  max-width: 460px;
  min-width: 320px;
  padding: 32px;
  width: 100%;
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







.top-100 {
  top: 100%;
}

.bottom-100 {
  bottom: 100%;
}

.max-h-select {
  max-height: 300px;
}
</style>