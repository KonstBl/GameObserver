<template>
    <trending-up-icon v-b-tooltip.hover title="rating Up" size="32" class="text-dark" style="cursor: pointer;" @click="onClick"></trending-up-icon>
</template>
  
<script lang="ts">
    import {Component, Emit, Vue} from 'vue-property-decorator'
    import { TrendingUpIcon } from 'vue-feather-icons'    

    @Component({components: {TrendingUpIcon}})
    export default class MyTrendingUpIcon extends Vue {        
        @Emit() onClick() {}
    }
</script>