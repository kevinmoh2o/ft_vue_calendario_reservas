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
import { onMounted } from 'vue'



const counterStore = useUserStore();
export default {
    name: 'calendario-dos',
    components: {
        Fullcalendar
    },
    setup() {
        const variablecitaCalendario = []

        onMounted(fetchEvents)

        async function fetchEvents() {
            // Llamar a la API y obtener los datos
            const eventsData = await counterStore.getColletion('agenda')
            console.log(eventsData)

            variablecitaCalendario.events = eventsData.map(event => ({
            title: event.paciente,
            start: event.fechaIni,
            end: event.fechaFin
            }))
        }

        
           return variablecitaCalendario
        
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
                dateClick: this.handleDateclick,
                events: []
                /* select: (arg) => {
                    id.value = id.value + 1;
                    const cal = arg.view.calendar;
                    cal.unselect();
                    cal.addEvent({
                        id: `${id.value}`,
                        title: `New event ${id.value}`,
                        start: arg.start,
                        end: arg.end,
                        allDay: true
                    })
                },
                eventClick: (arg) => {
                    console.log("eventClick")
                    console.log(arg)
                    if (arg.event) {
                        arg.event.remove();
                    }
                },
                events: [],
                eventAdd: (arg) => {
                    console.log("create")
                    console.log(arg)
                    createEvent({
                        id: arg.event.id,
                        title: arg.event.title,
                        start: arg.event.start,
                        end: arg.event.end,
                        allDay: arg.event.allDay
                    })
                },
                eventChange: (arg) => {
                    updateEvent({
                        id: arg.event.id,
                        title: arg.event.title,
                        start: arg.event.start,
                        end: arg.event.end,
                        allDay: arg.event.allDay
                    }, arg.event.id)
                },
                eventRemove: (arg) => {
                    deleteEvent(arg.event.id)
                } */


            },
            eventsData: []

        }
    },
    methods: {
        handleDateclick(clickInfo) {
            this.$emit('dateClick', clickInfo)
        },
        async fetchEvents() {
            // Llamar a la API y obtener los datos
        this.eventsData  =await counterStore.getColletionById('sexo',0);
        this.calendarOptions.events = this.eventsData.map(event => ({
            title: event.paciente,
            start: event.fechaIni,
            end: event.fechaFin
        }));

    },
    },
    watch: {

    }

}
</script>

<style scoped></style>