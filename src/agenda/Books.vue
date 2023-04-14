<template>
    <div>
        <h3>Calendario</h3>
        <div class="pageWhiteBackground">
            <div class="component-a">
                <Calendar @dateClick="dateClick"></Calendar>
            </div>
            <div class="_2H35C-container">
                <modal-calendar v-if="showModal" :forma="newEvent" @closeModal="closeModal" :fechaProgramar="fechaProgramar"></modal-calendar>    
                
            </div>
            
        </div>

    </div>
</template>

<script>
import Calendar from '@/components/Calendar.vue'
import ModalCalendar from './components/CalendarModal.vue'

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
            console.log(this.recortarFecha(date));
            this.fechaProgramar=this.recortarFecha(date);
        },
        closeModal() {
            this.$data.showModal = false;
        },
        recortarFecha(fecha ){
            const fechaOriginal = new Date(fecha);
            const dia = fechaOriginal.getDate();
            const mes = fechaOriginal.getMonth() + 1;
            const anio = fechaOriginal.getFullYear();
            return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anio}`;
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