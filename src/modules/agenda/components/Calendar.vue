<template>
    <div>
      <Fullcalendar :options="calendarOptions"></Fullcalendar>
    </div>
  </template>
  
  <script>
  import '@fullcalendar/core'
  import Fullcalendar from '@fullcalendar/vue3'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import timeGridPlugin from '@fullcalendar/timegrid'
  import listPlugin from '@fullcalendar/list'
  import interactionPlugin from '@fullcalendar/interaction'
  import esLocale from "@fullcalendar/core/locales/es";

import { mapActions, mapState ,mapGetters,mapMutations} from 'vuex'
//import investigacionApi from '@/apis/investigacionapi'
  //import modeloEvents from '../../composables/modeloEvents.js'
  //import { reactive, watch,onMounted   } from 'vue';
  
/*   
const { getEvents,setEvents } = modeloEvents();
  
  export default {
    name: 'calendario-dos',
    components: {
      Fullcalendar,
    },
    methods: {
        ...mapActions('journal', ['loadEntries'])
    },
    computed: {
        ...mapState( 'journal', ['isLoading'])
    },
    created() {
        this.loadEntries()
    },
    setup() {

      const calendarOptions = reactive({
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        locale: esLocale,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,listDay',
        },
        editable: true,
        selectable: true,
        weekends: true,
        dateClick: (arg) => {
          console.log('dateClick')
          console.log(arg)
        },
        select: (arg) => {
          console.log('select')
          console.log(arg)
        },
        eventClick: (arg) => {
          console.log('eventClick')
          console.log(arg)
        },
        events: [],
        eventAdd: (arg) => {
          console.log('create')
          console.log(arg)
        },
        eventChange: (arg) => {
          console.log('eventChange')
          console.log(arg)
        },
        eventRemove: (arg) => {
          console.log('eventRemove')
          console.log(arg)
        },
        
      })
  
      watch(getEvents, (valor) => {
        
        console.log(valor);
        
        calendarOptions.events = [
            {
                "id": "asdasdasdf",
                "backgroundColor": "#4286f4",
                "title": "Cumpleaños de Ana",
                "end": "2023-05-10T21:00:00",
                "start": "2023-05-10T18:00:00",
                "description": "Celebración del cumpleaños de Ana en su casa"
            }
        ]
        console.log("despues: ");
        console.log(calendarOptions.events);
        console.log(calendarOptions.events[0]);
      })
        onMounted( () => {
        console.log('Component mounted!')
        console.log( setEvents("agenda"))
        })
  
      return {
        calendarOptions,
        
      }
    },
  }
   */
export default {
    name: 'calendario-dos',
    components: {
        Fullcalendar
    },
    async setup() {
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
                events: this.getentriesTest()
            },
            //eventsData: this.getentriesTest()

        }
    },
    methods: {
        handleDateclick(clickInfo) {
            this.$emit('dateClick', clickInfo)
        },
        //...mapActions('programacionModule', ['loadEntries']),
        ...mapGetters('programacionModule', ['getEntriesByTerm']),
        ...mapMutations('programacionModule', ['setEntries']),
        getentriesTest(){
          //console.log(this.loadEntries);
          return this.getEntriesByTerm()
        },
        setearInicio(value){
          return value;
        }
    },
    computed: {
        ...mapState( 'programacionModule', ['isLoading']),
        ...mapActions('programacionModule', ['loadEntries']),
    },
    async created() {
      this.setEntries();
      this.getentriesTest();
      console.log("created")
      console.log(this.getentriesTest())
      /* var data = [];
    var respuesta = await investigacionApi.get(`/resultados.json`);
    
    const myObj = respuesta.data;
    console.log(myObj);
    for (const key in myObj) {
        const value = myObj[key];
        
        data.push(value);
      }
      console.log(data);
      this.setearInicio(data) */
    },
    watch: {

    }

}
</script>

<style scoped>
</style>