<template>
    <trending-down-icon v-b-tooltip.hover title="rating Down" size="32" class="text-dark" style="cursor: pointer;" @click="onClick"></trending-down-icon>
</template>
  
<script lang="ts">
    import {Component, Emit, Vue} from 'vue-property-decorator'
    import { TrendingDownIcon } from 'vue-feather-icons'    

    @Component({components: {TrendingDownIcon}})
    export default class MyTrendingDownIcon extends Vue {        
        @Emit() onClick() {}
    }
</script>