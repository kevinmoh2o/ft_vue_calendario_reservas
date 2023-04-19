/* import {useUserStore} from '@/stores/user.js'
const counterStore = useUserStore();

export default function useEvents(){
  const getEvents = ref([]);


  const setEvents = async  () => {
    getEvents.value = await fetchEvents();
  }

  const createEvent = async  (event) => {
    storeEvent(event);
  }

  const updateEvent = async  (event) => {
    mutateEvent(event);
  }

  const deleteEvent = async  (event) => {
    destroyEvent(event);
  }

  onMounted(setEvents);

  return {
    getEvents,
    setEvents,
    createEvent,
    updateEvent,
    deleteEvent
  }
} */