<template>
  <nav>
    <router-link to="/">Home</router-link> 
    <router-link to="/agenda/books/list">About</router-link>
    <router-link to="/holas"> modal1 </router-link>
    <router-link to="/modal2"> modal2 </router-link>
    <router-link to="/modal3"> modal3 </router-link>
    <router-link to="/cargando"> cargando </router-link>
    <router-link to="/confirmacion"> confirmacion </router-link>
    <router-link to="/calendar-before"> calendar-before </router-link>
    
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}

nav {
  /* position: fixed; */
  padding: 30px;
  overflow: hidden;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

a{
  text-decoration: none !important;
  color: inherit !important;
}

nav a.router-link-exact-active {
  color: #42b983;
}

:root {
  --fc-daygrid-event-dot-width: 8px;
}


</style>
