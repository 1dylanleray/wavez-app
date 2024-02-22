<script setup lang="ts">

defineProps<{
  msg: string
}>()


</script>

<template>
  <div class="greetings">
    <h2 class="display-1">Messages</h2>

    <v-list>
      <v-list-item v-for="message in messages" @click="">
      <v-list-item-content>
        <v-list-item-title v-text="message"></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    </v-list>
  </div>

</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>

<script lang="ts">
import axios from 'axios';
console.log(axios.isCancel('something'));

export default {
  data() {
    return {
      messages: ["frontend ", "message ", "is ", "displayed"]
    };
},
async created() {
  this.messages = ((await axios.get('http://localhost:3000/messages')).data);
}
};
</script>
