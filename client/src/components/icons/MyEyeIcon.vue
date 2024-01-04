<template>
    <eye-icon v-b-tooltip.hover title="show" size="19" class="text-Dark" style="cursor: pointer;" @click="onClick"></eye-icon>
</template>
  
<script lang="ts">
    import {Component, Emit, Vue} from 'vue-property-decorator'
    import { EyeIcon } from 'vue-feather-icons';

    @Component({components: {EyeIcon}})
    export default class MyEyeIcon extends Vue {        
        @Emit() onClick() {}
    }
</script>

<style scoped>

</style>