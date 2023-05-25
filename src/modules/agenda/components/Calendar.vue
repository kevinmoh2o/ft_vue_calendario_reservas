<template>
  <div class="column-container">
    <Fullcalendar ref="fullCalendar" :options="calendarOptions" class="full-calendar" />
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


export default {
    name: 'calendario-dos',
    components: {
        Fullcalendar,
    },

    data() {
      const  calendarOptions= {
                plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
                initialView: 'dayGridMonth',
                locale: esLocale,
                headerToolbar: {
                  left: 'prev,next today',
                  center: 'title',
                  right: 'timeGridDay,timeGridWeek,dayGridMonth,listDay',
                },
                allDaySlot: false,
                nowIndicator: true,
                editable: true,
                selectable: true,
                weekends: true,
                themeSystem: 'bootstrap5',
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
                viewDidMount: function () {
                  // Obtener el elemento del encabezado de la columna
                  const columnHeaders = document.querySelectorAll('.fc-col-header-cell');

                  // Obtener el elemento del encabezado del día de la semana
                  const dayHeaders = document.querySelectorAll('.fc-day-header');

                  // Quitar el subrayado de los nombres de las columnas y los días de la semana
                  columnHeaders.forEach((header) => {
                    header.style.textDecoration = 'none';
                  });

                  dayHeaders.forEach((header) => {
                    header.style.textDecoration = 'none';
                  });
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
        const cal = info.event;
        console.log('selected SCHEDULE',cal)
        this.selectedItem = cal;
        this.$emit('dateClick', info,false)
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
      },
      eliminarM3(){
        console.log("eliminarM3")
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

<style lang="scss" scoped>
.column-container {
  display: flex;
  flex-direction: column;
}



/* 
.full-calendar .fc-col-header-cell a,
.full-calendar .fc-day-header a {
  text-decoration: none !important;
} */
</style>

  
<!-- {
  id: 1,
  title: 'Evento 1',
  start: '2023-05-01',
  end: '2023-05-01',
  backgroundColor: '#1f64fd',
  borderColor: '#039555',
  textColor: 'white',
} -->