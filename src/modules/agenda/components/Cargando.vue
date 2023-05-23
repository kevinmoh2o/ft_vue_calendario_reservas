
<template>
    <div class="generalLoading">
        <div  class="containerLoad">
            <div class="imgCl">
                <img class="imgComponent" src="@/assets/loading2.gif" alt="Loading" />
            </div>
            <label class="labelCl" >Cargando...</label>
        </div>
    </div>
        
</template>

<script>



export default {
    name: 'cargando-template',
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

.generalLoading {
  width: 100%;
  height: 100vh;

  align-items: center;
  justify-content: center;
}

.imgCl{
    grid-area:imgCl;
    align-self: end;
    display: flex;
    align-items: center;
    justify-content: center;
    
}

.imgComponent{
    width: 200px; /* Ancho deseado de la imagen */
    height: 200px;
}
.labelCl{
    padding-top: 20px;
    grid-area:labelCl;
    font-size: 15px;
    display: inline-block;
    animation: wave 2s infinite;

}

.containerLoad {

  background-color: #ffffff76;
  display: grid;
  gap: 0;
  margin: 0;
  grid-template:
    "imgCl" 300px
    "labelCl" auto/
    100%; /* Columna para la etiqueta con altura automática */
}

@media (min-width: 700px) {
    .imgComponent{
        width: 300px; /* Ancho deseado de la imagen */
        height: 300px;
    }
    .labelCl{
        grid-area:labelCl;
        font-size: 20px;
    }
    
  .containerLoad {

    background-color: #fff;
    display: grid;
    gap: 0;
    border-radius: 10px;
    margin: 0;
    width: 100%;
  height: 100%;
    grid-template:
      "imgCl" 500px
      "labelCl" auto/
      100%; /* Columna para la etiqueta con altura automática */
  }
}


@keyframes wave {
  0% { transform: scale(1); }
  50% { transform: scale(1.09); }
  100% { transform: scale(1); }
}
</style>
