
<template>
    <div class="container2">
        <div class="vacio"></div>

        <div class="botones">
            <button class="btn mx-1 resaltado " >
                <i class="fa-solid fa-pen-to-square" style="color: #73777b;"></i>
            </button>
            <button class="btn mx-1 resaltado">
                <i class="fa-solid fa-trash" style="color: #73777b;"></i>
            </button>
            <button class="btn mx-1 resaltado">
                <i class="fa-solid fa-xmark" style="color: #73777b;"></i>
            </button>
        </div>

        <!-- <div class="eliminar">
            <button class="btn mx-2">
                <i class="fa-solid fa-trash" style="color: #73777b;"></i>
            </button>
        </div>

        <div class="close">
            <button class="btn mx-2">
                <i class="fa-solid fa-xmark" style="color: #73777b;"></i>
            </button>
        </div> -->

        <div class="icon1">   
            <i class="fa-solid fa-square" style="color: #039BE5;"></i>
        </div>
        <div class="icon2">   
            <i class="fa-solid fa-bell" style="color: #73777b;"></i>
        </div>
        <div class="icon3">   
            <i class="fa-solid fa-calendar" style="color: #73777b;"></i>
        </div>

        <div class="titulo">   
            <label>Titulo de la reserva</label>
        </div>

        <div class="fecha">   
            <label>Jueves, 11 de mayo⋅3:00 – 4:00am</label>
        </div>

        <div class="alarma">   
            <label>30 minutos antes</label>
        </div>

        <div class="owner">   
            <label>Kev Montañex Huaman</label>
        </div>

</div>

</template>

<script>



export default {
    name: 'model-dos',
    components: {
        
    },
    data() {

    },
    methods: {

    },
    computed: {
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
    height: 40px;
    grid-area: fecha;
    text-align: left;

}
.alarma{
   /*  background-color: orange; */
    height: 40px;
    grid-area: alarma;
    text-align: left;
}

.titulo{
   /*  background-color: brown; */
    height: 40px;
    grid-area: titulo;
    text-align: left;

}

.owner{
   /*  background-color: black; */
    height: 40px;
    grid-area: owner;
    text-align: left;
}

.icon1{
    grid-area:icon1;
}
.icon2{
    grid-area:icon2;

}
.icon3{
    grid-area:icon3;

}

.container2  {
  box-shadow: -1px 1px 7px 0px rgba(0, 0, 0, 0.75);
  background-color: #fff;
  display: grid;
  gap: 0;
  width: 450px;
  height: 200px;
  border-radius: 10px;
  grid-template:
  ". botones botones botones" 40px
        "icon1 titulo titulo titulo" 40px
        ". fecha fecha fecha" 40px
        "icon2 alarma alarma alarma" 40px
        "icon3 owner owner owner" 40px/
        50px 40px 40px auto
        ;
}

/* @media (min-width:400px){
    .container2{

        grid-template:
        "vacio editar  "  50px
        "eliminar close  "  50px
        "icon1 titulo " 50px
        "fecha fecha  " 50px
        "icon2 alarma " 50px
        "icon3 owner " 50px/
        50px 50px 50px 50px
        ;
    }
} */

</style>
