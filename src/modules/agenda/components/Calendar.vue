<template>
    <div>
      <Fullcalendar ref="fullCalendar" :options="calendarOptions">
        
        <template v-slot:eventContent='arg' >
          <div class="column-container" >
            <b>{{ arg.event.title }}</b>
            <div>
              <CalendarModal3  @editarModal="editarModal" @closeModal="closeModal"></CalendarModal3>
            </div>
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
  //import CalendarModal2 from "@/modules/agenda/components/CalendarModal2.vue";
  import CalendarModal3 from "@/modules/agenda/components/CalendarModal3.vue";
  //import { Dialogs } from 'v-dialogs'
  import { mapActions, mapState ,mapGetters,mapMutations} from 'vuex'
//import { ref } from 'vue';

export default {
    name: 'calendario-dos',
    components: {
        Fullcalendar,
        //CalendarModal2,
        CalendarModal3,
        //Dialogs
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
                eventClick: this.handleEventClick,
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
            var selectedItem = {};
            //eventsData: this.getentriesTest()
      return {
      calendarOptions,
      showModal,
      selectedItem
      }
    },
    methods: {
      handleEventClick(info) {
        console.log('selected')
        console.log(info)
        const cal = info.event;
        
        this.selectedItem = cal;
        console.log("cal",this.selectedItem)
        this.$emit('dateClick', info,false)

        /* console.log("cal",cal.start)
        console.log("cal",cal.title)
        console.log("cal",cal.end)
        console.log("cal",cal.extendedProps.link)
        console.log("cal",cal.extendedProps.description)
        console.log("cal",cal.backgroundColor) */

        /* var clickX = info.jsEvent.pageX;
        var clickY = info.jsEvent.pageY;
        
        // calcula la posición del modal
        var modalX = clickX + 20; // ajuste el número 20 a la distancia que desee del clic
        var modalY = clickY + 20; // ajuste el número 20 a la distancia que desee del clic
        
        // abre el modal en la posición calculada */
        //this.showModal = !this.showModal;
      },
        handleDateclick(clickInfo) {
            this.$emit('dateClick', clickInfo,true)
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
        editarModal() {
          this.$emit('editarPadre', this.selectedItem);
          console.log("editarModal")
          this.showModal = true;
        },
        closeModal() {
          console.log("closeModal")

          this.showModal = false;
        },
        recortarTexto(texto) {
        if (texto.length > 30) {
          return texto.substring(0, 30);
        }
        return texto;
      }
    },
    computed: {
        ...mapState( 'programacionModule', ['isLoading']),
        /* textoRecortado() {
        return recortarTexto(this.textoOriginal);
      } */
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
.column-container {
  display: flex;
  flex-direction: column;
}
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
