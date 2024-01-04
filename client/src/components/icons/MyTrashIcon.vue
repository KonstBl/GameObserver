<template>
    <trash-2-icon v-b-tooltip.hover title="delete"  size="27" class="text-danger" style="cursor: pointer;" @click="onClick"></trash-2-icon>
</template>
  
<script lang="ts">
    import {Component, Emit, Vue} from 'vue-property-decorator'
    import { Trash2Icon } from 'vue-feather-icons'    

    @Component({components: {Trash2Icon}})
    export default class MyTrashIcon extends Vue {        
        @Emit() onClick() {}
    }
</script>
  
<style scoped>

</style>