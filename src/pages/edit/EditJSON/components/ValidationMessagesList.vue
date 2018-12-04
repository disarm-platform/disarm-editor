<template>
  <div v-if="filtered_messages.length > 0">
    <h4>Validation messages</h4>
    <ul>
      <li
          v-for="(val, index) in filtered_messages"
          :key="index"
      >
        {{val.message}}
        [<em>{{val.source_node ? val.source_node :'Unknown/schema'}}</em>]
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import {ValidationMessage} from '@/types'

  export default Vue.extend({
    props: {
      priority_messages: Array as () => ValidationMessage[],
      filtered_for_node: Object as () => string | null,
    },
    computed: {
      filtered_messages(): ValidationMessage[] {
        if (this.filtered_for_node) {
          return this.priority_messages.filter((msg: ValidationMessage) => {
            return msg.source_node === this.filtered_for_node;
          });
        } else {
          return this.priority_messages;
        }
      },
    },
    methods: {
      colour_me(text: string): string {
        // take a string that has a color in it, return the color
        const matched = text.match(/(\bred\b|\bblue\b|\bgreen\b)/i);
        if (matched) {
          return matched[0].toLocaleLowerCase();
        } else {
          return 'yellow';
        }
      },
    }
  });
</script>

<style lang='scss' scoped>
  .red {
    color: red;
  }

  .green {
    color: green;
  }

  .blue {
    color: blue;
  }

  .yellow {
    color: yellow;
  }
</style>