<template>
    <filter-icon v-b-tooltip.hover title="filter by genre" size="32" class="text-Dark" style="cursor: pointer;" @click="onClick"></filter-icon>
</template>
  
<script lang="ts">
    import {Component, Emit, Vue} from 'vue-property-decorator'
    import { FilterIcon } from 'vue-feather-icons'    

    @Component({components: {FilterIcon}})
    export default class MyFilterIcon extends Vue {        
        @Emit() onClick() {}
    }
</script>