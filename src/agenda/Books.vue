<template>
    <div>
        <h3>Calendario</h3>
        <div class="py-12">
            <div class="component-a">
                <Calendar @dateClick="dateClick"></Calendar>
            </div>
            <div class="component-b">
                <modal-calendar v-if="showModal" :forma="newEvent" @closeModal="closeModal"></modal-calendar>        
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
            }
        }
    },
    methods: {
        dateClick(arg) {
            this.$data.showModal = true;
            console.log('Recibiendo datos: ', arg)
        },
        closeModal() {
            this.$data.showModal = false;
        }
    }
}
</script>

<style scoped>
.py-12 {
  position: relative;
  overflow: visible;
}
.component-a {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
  
.component-b {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 500px;
  height: 50%;
  background-color: transparent;
  z-index: 2;
}</style>