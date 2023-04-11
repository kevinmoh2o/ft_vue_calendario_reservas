<template>
    <div class="fixed z-10 inset-0 overflow-y-auto ease-out duration-400">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
        <form>
          <div class="form-group">
            <label for="exampleFormControlInput1">Buscar Usuario</label>
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Buscar Usuario" aria-label="Buscar Usuario" aria-describedby="basic-addon2">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button"><i class="fas fa-search"></i></button>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Motivo:</label>
            <input v-model="form.title" type="text" class="form-control" id="exampleFormControlInput1" placeholder="Ingresa el motivo de la consulta" autocomplete="off">
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Fecha</label>
            <input v-model="form.date_at" disabled="true" type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter pass">
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput2">Hora</label>
            <input v-model="form.hour" disabled="true" type="time" class="form-control" id="exampleFormControlInput2">
          </div>
          <div class="form-group">
            <label for="timeSesion" class="block text-sm font-medium leading-5 text-gray-700">Duración</label>
            <select id="timeSesion" class="form-control">
              <option value="30min">30 minutos</option>
              <option value="60min">60 minutos</option>
              <option value="90min">90 minutos</option>
            </select>
          </div>
        </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    name: "modal-calendar",
    props:{
      /* form:{
        type: Object,
        default: ()=>{}
      } */
    },
    data() {
    return {
      form: {
            title:" ",
            date_at:" ",
            hour:" ",
            user_id:" ",
            session:1800,
        }
    }
  },
    components: {
    },
    methods:{
      closeModal(){
        this.$emit('closeModal')
      },
      store(form){
        this.$emit('saveAppt',form)
      },
      setTitle(){
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