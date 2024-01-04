<template>
    <x-icon v-b-tooltip.hover title="delete"  size="27" class="text-danger" style="cursor: pointer;" @click="onClick"></x-icon>
</template>
  
<script lang="ts">
    import {Component, Emit, Vue} from 'vue-property-decorator'
    import { XIcon } from 'vue-feather-icons'    

    @Component({components: {XIcon}})
    export default class MyXIcon extends Vue {        
        @Emit() onClick() {}
    }
</script>
  
<style scoped>

</style>