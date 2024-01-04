<template>
    <eye-off-icon v-b-tooltip.hover title="hide" size="19" class="text-Dark" style="cursor: pointer;" @click="onClick"></eye-off-icon>
</template>
  
<script lang="ts">
    import {Component, Emit, Vue} from 'vue-property-decorator'
    import { EyeOffIcon } from 'vue-feather-icons';

    @Component({components: {EyeOffIcon}})
    export default class MyEyeOffIcon extends Vue {        
        @Emit() onClick() {}
    }
</script>

<style scoped>

</style>