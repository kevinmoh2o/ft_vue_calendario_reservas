<template>
    <div class="confirmation-dialog">
      <div class="overlay" v-if="isActive" @click="cancel"></div> <!-- Agrega esta línea -->
      <div class="dialog-content">
        <h2>{{ title }}</h2>
        <p>{{ message }}</p>
        <div class="buttons">
          <button @click="cancel"  class="cancel-button">Cancelar</button>
          <button @click="confirm" class="confirm-button">Confirmar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'confirmation-dialog',
    props: {
      title: String,
      message: String,
      onConfirm: Function,
      onCancel: Function
    },
    methods: {
      confirm() {
        this.onConfirm();
        console.log("elimiandr desde adentro")
      },
      cancel() {
        this.onCancel();
      }
    }
  };
  </script>
  
  <style scoped>

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Ajusta la opacidad según tus necesidades */
  z-index: 999; /* Asegúrate de que la capa esté por encima del contenido principal */
}
  .confirmation-dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    background-color: transparent;
    background-color: #fbc02d;
  }
  
  .dialog-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
  }
  
  h2 {
    margin-top: 0;
  }
  
  .buttons {
    margin-top: 20px;
  }
  
  button {
    margin: 0 10px;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .confirm-button {
    background-color: #13ae4b;
    color: white;
  }

  .cancel-button{
    background-color: #ef4b4c;
    color:white
  }

  </style>
  