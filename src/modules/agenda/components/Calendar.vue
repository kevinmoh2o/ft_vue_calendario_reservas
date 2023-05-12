<template>
    <div>
      <Fullcalendar ref="fullCalendar" :options="calendarOptions">
        <template v-slot:eventContent='arg'>
          <b>{{ arg.event.title }}</b>
          <div>
            <button>
              <font-awesome-icon icon="user" />
              Click me
            </button>
          </div>
        </template>
      </Fullcalendar>
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
//import { ref } from 'vue';

export default {
    name: 'calendario-dos',
    components: {
        Fullcalendar
    },
   /*  async setup() {
      const calendarRef = ref(null);
    
    const handleEventClick = (clickInfo) => {
      console.log('Event clicked', clickInfo.event);
    };
    
    const eventContent = (arg) => {
      return {
        html: `
          <div class="fc-content">
            <div class="fc-title">${arg.event.title}</div>
            <div class="fc-buttons">
              <button class="fc-button fc-edit-button">Editar</button>
              <button class="fc-button fc-delete-button">Eliminar</button>
            </div>
          </div>
        `,
        backgroundColor: arg.event.backgroundColor,
        borderColor: arg.event.borderColor,
        textColor: arg.event.textColor,
        classNames: ['fc-event']
      };
    };
    
    const calendarOptions = {
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
      events: [],
      dateClick: this.handleDateclick,
      eventClick: handleEventClick,
      eventContent: eventContent
    };

    return {
      calendarRef,
      calendarOptions
    };
    }, */
    data() {
     /*  const calendarRef = ref(null);
    
    const handleEventClick = (clickInfo) => {
      console.log('Event clicked', clickInfo.event);
    };
    
    const eventContent = (arg) => {
      return {
        html: `
          <div class="fc-content">
            <div class="fc-title">${arg.event.title}</div>
            <div class="fc-buttons">
              <button class="fc-button fc-edit-button">Editar</button>
              <button class="fc-button fc-delete-button">Eliminar</button>
            </div>
          </div>
        `,
        backgroundColor: arg.event.backgroundColor,
        borderColor: arg.event.borderColor,
        textColor: arg.event.textColor,
        classNames: ['fc-event']
      };
    }; */
        
      const  calendarOptions= {
                plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
                initialView: 'dayGridMonth',
                locale: esLocale,
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridWeek,dayGridMonth,listDay',
                },
                allDaySlot: false,
                nowIndicator: true,
                editable: true,
                selectable: true,
                weekends: true,
                slotMinTime: "08:00:00",
                events: [],
                dateClick: this.handleDateclick,
                eventChange:this.eventChangeClick,
                //eventClick: handleEventClick,
                //eventContent: eventContent
            };
            //eventsData: this.getentriesTest()
      return {
        //calendarRef,
      calendarOptions
      }
    },
    /* mounted(){
      let calendarApi = this.$refs.fullCalendar.getApi()
      calendarApi.next()
    },  */ 
    methods: {
        handleDateclick(clickInfo) {
            this.$emit('dateClick', clickInfo)
        },
        eventChangeClick(arg){
          console.log("arg",arg);
        },
        ...mapActions('programacionModule', ['loadEntries']),
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
    },
    async created() {
      
      this.loadEntries();
      this.calendarOptions.events = this.getentriesTest();
      //this.$store.dispatch('programacionModule/loadEntries')
    }, 
    watch: {
      entries() {
        this.calendarOptions.events = this.entries;
      }
    }

}
</script>

<style scoped>

</style>

  
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