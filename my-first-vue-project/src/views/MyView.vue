<script setup lang="ts">
import { ref, type Ref } from 'vue';
type Pizza = {
  name: string;
  price: number;
};
const pizzas: Ref<Pizza[]> = ref([
  {
    name: 'Margharita',
    price: 8,
  },
  {
    name: 'Campione',
    price: 12,
  },
  {
    name: 'Fromaggi',
    price: 13,
  }
]);
const pizzaToAdd: Ref<string> = ref('');
function addPizza(pizzaName: string): void {
  pizzas.value.push(
    {
      name: pizzaName,
      price: 10,
    }
  );
}
</script>

<template>
  <main>
    <ul>
      <li v-for="pizza in pizzas">
        {{ pizza.name }}, coûte {{ pizza.price }} euros
      </li>
    </ul>

    Pizza à ajouter : {{ pizzaToAdd }}
    <input type="text" v-model="pizzaToAdd" />
    <button @click="addPizza(pizzaToAdd)">
      Ajouter ma pizza
    </button>
  </main>
</template>

<style>
</style>