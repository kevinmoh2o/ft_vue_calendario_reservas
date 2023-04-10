<template>
  <div>
    <h3>Calendario</h3>
    <div class="py-12">
        <div class="max-w-7xl mx-auto">
            <Calendar></Calendar>
        </div>
        
    </div>
    
</div>
</template>

<script>
import Calendar  from '@/components/Calendar.vue'

export default {
name:'book-list',    
components:{
    Calendar
}
}
</script>

<style scoped>

</style>