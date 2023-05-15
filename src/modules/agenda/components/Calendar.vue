<template>
    <div>
      <Fullcalendar ref="fullCalendar" :options="calendarOptions">
        <template v-slot:eventContent='arg'>
          <b>{{ arg.event.title }}</b>
          <div>
            <button>
              <i class="fa-solid fa-pen-to-square" style="color: #73777b;"></i>
              Click me
            </button>
          </div>
        </template>
      </Fullcalendar>
      <Dialogs v-model="showModal">
        <CalendarModal2 v-if="showModal" :event="selectedEvent" @close="closeModal" />
      </Dialogs>
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
  import CalendarModal2 from "@/modules/agenda/components/CalendarModal2.vue";
  import { Dialogs } from 'v-dialogs'
  import { mapActions, mapState ,mapGetters,mapMutations} from 'vuex'
//import { ref } from 'vue';

export default {
    name: 'calendario-dos',
    components: {
        Fullcalendar,
        CalendarModal2,
        Dialogs
    },

    data() {
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
                eventClick: (info) => {
                  console.log('select')
                  console.log(info)
                  const cal = info.event;
                  console.log("cal",cal)
                  console.log("cal",cal.start)
                  console.log("cal",cal.title)
                  console.log("cal",cal.end)
                  console.log("cal",cal.extendedProps.link)
                  console.log("cal",cal.extendedProps.description)
                  console.log("cal",cal.backgroundColor)

                  /* var clickX = info.jsEvent.pageX;
                  var clickY = info.jsEvent.pageY;
                  
                  // calcula la posición del modal
                  var modalX = clickX + 20; // ajuste el número 20 a la distancia que desee del clic
                  var modalY = clickY + 20; // ajuste el número 20 a la distancia que desee del clic
                  
                  // abre el modal en la posición calculada */
                  this.showModal = true;
                },
                eventAdd: (info) => {
                  console.log('create')
                  console.log(info)
                },
                eventRemove: (arg) => {
                  console.log('eventRemove')
                  console.log(arg)
                },
                //eventClick: handleEventClick,
                //eventContent: eventContent
            };
            var showModal = false;
            //eventsData: this.getentriesTest()
      return {
      calendarOptions,
      showModal
      }
    },
    methods: {
        handleDateclick(clickInfo) {
            this.$emit('dateClick', clickInfo)
            console.log("dateClick")
        },
        eventChangeClick(arg){
          console.log('eventChange')
          console.log("arg",arg);
        },
        ...mapActions('programacionModule', ['loadEntries']),
        ...mapGetters('programacionModule', ['getEvents']),
        ...mapMutations('programacionModule', ['setEntries']),
        getentriesTest(){
          return this.getEvents()
        },
        setearInicio(value){
          return value;
        },
        openModal() {
          this.showModal = true;
        },
        closeModal() {
          this.showModal = false
        }
    },
    computed: {
        ...mapState( 'programacionModule', ['isLoading']),
    },
    async created() {
      
      await this.loadEntries();
      this.calendarOptions.events = this.getentriesTest();
    }, 
    watch: {
      entries() {
        this.calendarOptions.events = this.entries;
      },
      getEventsWatch() {
        this.calendarOptions.events = this.getEvents();
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
