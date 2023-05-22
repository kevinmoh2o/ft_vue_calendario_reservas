
<template>
    <div :class="{ container2: true, expanded: expanded }">
        <div class="vacio"></div>

   
        <div  class="botones">
            <button class="btn mx-1 resaltado " @click.prevent="$emit('editarM3')" >
                <i class="fa-solid fa-pen-to-square fa-xs" style="color: #73777b;"></i>
            </button>
            <button class="btn mx-1 resaltado" @click.prevent="$emit('eliminarM3',expandir)">
                <i class="fa-solid fa-trash fa-xs" style="color: #73777b;"></i>
            </button>
            <!-- <button class="btn mx-1 resaltado" @click.prevent="$emit('closeM3',expandir)">
                <i class="fa-solid fa-xmark fa-xs" style="color: #73777b;"></i>
            </button> -->
        </div>


        <div v-if="expanded" class="icon1">   
            <i class="fa-solid fa-square" style="color: #039BE5;"></i>
        </div>
        <div v-if="expanded" class="icon2">   
            <i class="fa-solid fa-bell" style="color: #73777b;"></i>
        </div>
        <div v-if="expanded" class="icon3">   
            <i class="fa-solid fa-calendar" style="color: #73777b;"></i>
        </div>

        <div v-if="expanded" class="titulo">   
            <label>Titulo de la reserva</label>
        </div>

        <div v-if="expanded" class="fecha">   
            <label>Jueves, 11 de mayo⋅3:00 – 4:00am</label>
        </div>

        <div v-if="expanded" class="alarma">   
            <label>30 minutos antes</label>
        </div>

        <div v-if="expanded" class="owner">   
            <label>Kev Montañex Huaman</label>
        </div>

</div>

</template>

<script>



export default {
    name: 'model-tres',
    props:{
        expanded: {
            type: Boolean,
            default: false
        }
    },
    components: {
        
    },
    data() {
        return {
            expandir:this.expanded
        }
        
    },
    methods: {

    },
    computed: {
        cambiar(){
            return !this.expandir;
        }
    },
    async created() {

    }, 
    watch: {

    }

}

</script>

<style scoped>

.resaltado {
  border-radius: 50%;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}


.resaltado:hover {
  opacity: 0.5;
  background-color: #73777b71;
}


.botones{
    height: 40px;
   /*  background-color: blue; */
    grid-area: botones;
    align-items: end;
    align-content: end;
    text-align: right;
    padding-top: 5px;
}



.fecha{
   /*  background-color: yellow; */
   
    grid-area: fecha;
    text-align: left;
    font-size: 12px;

}
.alarma{
   /*  background-color: orange; */
    
    grid-area: alarma;
    text-align: left;
    font-size: 12px;
}

.titulo{
   /*  background-color: brown; */

    grid-area: titulo;
    text-align: left;
    font-size: 12px;

}

.owner{
   /*  background-color: black; */
    grid-area: owner;
    text-align: left;
    font-size: 12px;
}

.icon1{
    grid-area:icon1;
    font-size: 10px;
}
.icon2{
    grid-area:icon2;
    font-size: 10px;

}
.icon3{
    grid-area:icon3;
    font-size: 10px;

}

.container2 {
  /* Estilos por defecto */
  box-shadow: -1px 1px 1px 0px rgba(0, 0, 0, 0.25);
  background-color: #ffffff76;
  display: grid;
  gap: 0;
  width: 100%;
  text-align: center;
  
  margin: 0;
  grid-template:
    "botones botones botones" 40px/
    40px 40px auto;
}

.container2.expanded {
  /* Estilos cuando está expandido */
  box-shadow: -1px 1px 7px 0px rgba(0, 0, 0, 0.75);
  background-color: #fff;
  display: grid;
  gap: 0;
  width: 250px;
  height: 150px;
  border-radius: 10px;
  align-content: center;
  align-items: center;
  align-self: center;
  text-align: center;
  margin: 0;
  grid-template:
    ". botones botones botones" 25px
    "icon1 titulo titulo titulo" 25px
    ". fecha fecha fecha" 25px
    "icon2 alarma alarma alarma" 25px
    "icon3 owner owner owner" 25px/
    50px 40px 40px auto;
}

</style>
