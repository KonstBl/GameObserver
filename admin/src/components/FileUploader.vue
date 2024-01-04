<template>
    <b-form-file 
    v-model="file"
    accept="image/*">

    </b-form-file>
</template>

<script lang="ts">
import {Component, Vue, ModelSync} from 'vue-property-decorator';

@Component({})
export default class FileUploader extends Vue {
    @ModelSync('input', 'input') file!: any
}
</script>