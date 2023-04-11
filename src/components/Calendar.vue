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
export default {
    name:'calendario-dos',
    components: {
        Fullcalendar
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
                    right: 'timeGridWeek,dayGridMonth,dayGridWeek,listDay',
                },
                allDaySlot:false,
                editable: true,
                selectable: true,
                weekends: true,
                dateClick: this.handleDateclick,
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


            }
        }
    },
    methods:{
        handleDateclick(clickInfo){
            this.$emit('dateClick',clickInfo)

        }
    },
    watch:{

    }

}
</script>

<style></style>