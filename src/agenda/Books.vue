<template>
    <div>
        <button @click.prevent="autenticar" type="submit" ><span class="base_text__vPnqO">Cancelar</span></button>

        <h3>Calendario</h3>
        <div class="pageWhiteBackground">
            <div class="component-a">
                <Calendar @dateClick="dateClick"></Calendar>
            </div>
            <div class="_2H35C-container">
                <modal-calendar v-if="showModal" :forma="newEvent" @closeModal="closeModal" @saveAppt="saveAppt" :fechaProgramar="fechaProgramar"></modal-calendar>    
            </div>
        </div>

    </div>
</template>

<script>
import Calendar from './components/Calendar.vue'
import ModalCalendar from './components/CalendarModal.vue'
import { Formatos } from '@/utils/Formatos.js';
import { auth,firestore} from "../firebase"


import { createUserWithEmailAndPassword } from "firebase/auth";
import {useUserStore} from '@/stores/user.js'

import { collection, addDoc } from 'firebase/firestore';
//import { ref } from 'vue';
//const data = ref({ id: 1, sexo: 'Masculino' });

const counterStore = useUserStore();
export default {
    name: 'book-list',
    components: {
        Calendar,
        ModalCalendar
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
            
            var respuesta = await createUserWithEmailAndPassword(auth,'kevsssinmohu@gmail.com',"1234567");
            console.log("consultando xD",respuesta)

        },
        async autenticar() {
            
            var respuesta = await counterStore.login('kevinmohu@gmail.com',"1234567");
            console.log("respuesta",respuesta)
            console.log(counterStore.user)
            console.log("firestore",firestore);
            /* const usuario = {
                id:1,
                value:"Masculino"
            }; 
            await firestore.collection('sexo')
            .add(usuario); */
            try {
                const docRef = await addDoc(collection(firestore, 'sexo'), { id: 0, sexo: 'Femenino' });
                console.log('Document written with ID: ', docRef.id);
            } catch (e) {
                console.error('Error adding document: ', e);
            }

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
            /* if(param.link===''){
                alert("Complete el campo Link")
            } */
            this.$data.showModal = false;
        }
    },
}
</script>

<style scoped>
.py-12 {
  position: relative;
  overflow: visible;
}
.component-a {
  position: absolute;
  top: 100;
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
    display: box;
    display: center;
    flex: 1;
    flex-direction: column;
    padding: 40px 0 0;
    position: absolute;
    z-index: 2;
    width: 100%;
}</style>