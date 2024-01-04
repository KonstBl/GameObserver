<template>
    <vue-editor
        class="bg-white"
        :editorToolbar="customToolbar"
        v-model="model"
    />
</template>

<script lang="ts">
import { Component, ModelSync, Vue } from 'vue-property-decorator';
import { VueEditor } from 'vue2-editor';

@Component({components: {VueEditor}})
export default class BlogTextEditor extends Vue {
    @ModelSync('input', 'input') model!: string

    customToolbar: any[] = [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" }
      ],
    ]
}

</script>