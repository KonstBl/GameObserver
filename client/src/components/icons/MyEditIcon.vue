<template>
    <edit-icon v-b-tooltip.hover title="edit" size="25" class="text-Dark" style="cursor: pointer;" @click="onClick"></edit-icon>
</template>
  
<script lang="ts">
    import {Component, Emit, Vue} from 'vue-property-decorator'
    import { EditIcon } from 'vue-feather-icons';

    @Component({components: {EditIcon}})
    export default class MyEditIcon extends Vue {        
        @Emit() onClick() {}
    }
</script>

<style scoped>

</style>