<script setup>
import {ref, reactive,watch} from 'vue'
import '@fullcalendar/core'
import Fullcalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from "@fullcalendar/core/locales/es";
import useEvents from '../composables/useEvents.js'

const id = ref(15);

const {getEvents,createEvent,updateEvent,deleteEvent}= useEvents();

const options = reactive({
    plugins:[dayGridPlugin,timeGridPlugin,listPlugin,interactionPlugin],
    initialView:'dayGridMonth',
    locale: esLocale,
    headerToolbar:{
        left:'prev,next today',
        center:'title',
        right:'dayGridMonth,dayGridWeek,listDay',
    },
    editable:true,
    selectable:true,
    weekends:true,
    dateClick:(arg)=>{
        
        console.log("dateClick")
        console.log(arg)
    },
    select:(arg)=>{
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
    eventClick:(arg)=>{
        console.log("eventClick")
        console.log(arg)
        if(arg.event){
            arg.event.remove();
        }
    },
    events:[],
    eventAdd:(arg)=>{
        console.log("create")
        console.log(arg)
        createEvent({
            id: arg.event.id,
            title: arg.event.title,
            start: arg.event.start,
            end: arg.event.end,
            allDay:arg.event.allDay
        })
    },
    eventChange:(arg)=>{
        updateEvent({
            id: arg.event.id,
            title: arg.event.title,
            start: arg.event.start,
            end: arg.event.end,
            allDay:arg.event.allDay
        },arg.event.id)
    },
    eventRemove:(arg)=>{
        deleteEvent(arg.event.id)
    }
    

});
options.events=getEvents.value;
watch(getEvents,()=>{
    options.events=getEvents.value;
})
//dayGridMonth,dayGridWeek,timeGridWeek,timeGridDay,listWeek
</script>

<template>
    <Fullcalendar v-bind:options="options"></Fullcalendar>
    <a>hi</a>
</template>