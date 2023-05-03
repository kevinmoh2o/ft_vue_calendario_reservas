import {ref,onMounted} from 'vue';
import { fetchEvents,storeEvent } from '@/apis/modelo';

export default function useEvents(){
  const getEvents = ref([]);


  /* const setEvents = async  (tabla) => {
    console.log("esta llegando")
    console.log(tabla)
    getEvents.value = await fetchEvents(tabla);
  } */

  const setEvents = async (tabla) => {
    console.log("esta llegando")
    console.log(tabla)
    await fetchEvents(tabla).then((result) => {
      getEvents.value = result;
    });
  }

  const createEvent = async  (event) => {
    storeEvent(event);
  }


  onMounted(setEvents);

  return {
    getEvents,
    setEvents,
    createEvent,

  }
}