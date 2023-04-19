<template>
    <div>
        <Fullcalendar :options="calendarOptions"></Fullcalendar>
    </div>
</template>

<script>
//import { ref } from 'vue'
import '@fullcalendar/core'
import Fullcalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from "@fullcalendar/core/locales/es";
//import useEvents from '../composables/useEvents.js';
//const id = ref(15);

//const {createEvent,updateEvent,deleteEvent}= useEvents();
import {useUserStore} from '@/stores/user.js'



const counterStore = useUserStore();
export default {
    name: 'calendario-dos',
    components: {
        Fullcalendar
    },
    async setup() {
        
        const rr = await counterStore.getColletion('agenda');
        console.log(rr)
        console.log(rr[0])
        console.log(counterStore.user)
    
        
    },
    data() {
        return {
            calendarOptions: {
                plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
                initialView: 'dayGridMonth',
                locale: esLocale,
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridWeek,dayGridMonth,listDay',
                },
                allDaySlot: false,
                editable: true,
                selectable: true,
                weekends: true,
                slotMinTime: "08:00:00",

                dateClick: this.handleDateclick,
                events: counterStore.user
            },
            eventsData: []

        }
    },
    methods: {
        handleDateclick(clickInfo) {
            this.$emit('dateClick', clickInfo)
        },
    },
    watch: {

    }

}
</script>

<style scoped></style>