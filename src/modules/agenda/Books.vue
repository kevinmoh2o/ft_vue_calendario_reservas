<template>
    <div>

            <div class="_2H35C-container">
                
                <Suspense>
                    <Calendar @dateClick="dateClick"></Calendar>
                </Suspense>
            </div>
            <div class="_2H35C-container">
                <CalendarModal v-if="showModal" :forma="newEvent" @closeModal="closeModal" @saveAppt="saveAppt" :fechaProgramar="fechaProgramar"></CalendarModal>    
            </div>

    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { Formatos } from '@/utils/Formatos.js';

export default{
    name: 'book-list',
    components: {
        Calendar: defineAsyncComponent(() => import('./components/Calendar.vue')),
        CalendarModal: defineAsyncComponent(() => import('./components/CalendarModal.vue')),

    },
    data() {
        return {
            showModal: false,
            newEvent: {
                title: " ",
                date_at: " ",
                hour: " ",
                user_id: " ",
                session: 1800,
            },
            fechaProgramar:''
        }
    },
    methods: {
        
        dateClick(arg) {
            this.$data.showModal = true;
            console.log('Recibiendo datos: ', arg);
            const {date} = arg;

            this.fechaProgramar=Formatos.soloFechaDMY(date);
        },
        async registrarUser() {
            
           // var respuesta = await createUserWithEmailAndPassword(auth,'kevsssinmohu@gmail.com',"1234567");
           // console.log("consultando xD",respuesta)

        },
        async autenticar() {
            
            //var respuesta = await counterStore.login('kevinmohu@gmail.com',"1234567");
            //console.log("respuesta",respuesta)
            //console.log(counterStore.user)


            //console.log(await counterStore.insert('sexo',{ label: "0", value: 'Femenino' }));
            //console.log(await counterStore.insert('sexo',{ label: "1", value: 'Masculino' }));
            //console.log(await counterStore.getColletionById('sexo',0));
            //console.log(await counterStore.getColletion('sexo'));
            //console.log(await counterStore.update('sexo',"aFPROV8y3KHsnBsxN4x6",{ id: '1', valor: "Masculino" }));
            //console.log(await counterStore.deleteCollection('sexo'));
            //console.log(await counterStore.deleteDocument('sexo',"OKPvmXuEB0hPNeyoudR0"));
        },
        closeModal() {
            this.$data.showModal = false;
        },
        recortarFecha(fecha){
            const fechaOriginal = new Date(fecha);
            const dia = fechaOriginal.getDate();
            const mes = fechaOriginal.getMonth() + 1;
            const anio = fechaOriginal.getFullYear();
            return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anio}`;
        },
        saveAppt(param){
            console.log("param")
            console.log({param})
            this.$data.showModal = false;
        }
    },
};
/* options.events=getEvents.value;
watch(getEvents,()=>{
    options.events=getEvents.value;
})
 */
</script>

<style scoped>
.py-12 {
  position: relative;
  overflow: visible;
}
.component-a {
  position: absolute;
  top: 200;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
  
.component-b {
  position: relative;


  width: 100%;
  max-width: 500px;
  height: 50%;
  background-color: transparent;
  z-index: 2;
}
._2H35C-container {
    -moz-box-align: center;
    -moz-box-flex: 1;
    -moz-box-orient: vertical;
    -ms-flex: 1;
    -ms-flex-align: center;
    -ms-flex-direction: column;
    -o-box-align: center;
    -o-box-flex: 1;
    -o-box-orient: vertical;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -webkit-box-flex: 1;
    -webkit-box-orient: vertical;
    -webkit-flex: 1;
    -webkit-flex-direction: column;
    align-items: center;
    box-flex: 1;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    /* display: flex; */
    display: center;
    flex: 1;
    flex-direction: column;
    padding: 40px 0 0;
    position: absolute;
    z-index: 2;
    width: 100%;
}</style>