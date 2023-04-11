<template>
  <div>
    <h3>Calendario</h3>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                <Calendar @dateClick="dateClick"></Calendar>
            </div>
        </div>
        <modal-calendar v-if="showModal" :forma="newEvent" @closeModal="closeModal"></modal-calendar>
    </div>
    
</div>
</template>

<script>
import Calendar  from '@/components/Calendar.vue'
import ModalCalendar from './components/CalendarModal.vue'

export default {
name:'book-list',    
components:{
    Calendar,
    ModalCalendar
},
data(){
    return {
        showModal:false,
        newEvent:{
            title:" ",
            date_at:" ",
            hour:" ",
            user_id:" ",
            session:1800,
        }
    }
},
methods:{
    dateClick(arg){
        this.$data.showModal=true;
        console.log('Recibiendo datos: ',arg)
    },
    closeModal(){
        this.$data.showModal=false;
    }
}
}
</script>

<style scoped>

</style>