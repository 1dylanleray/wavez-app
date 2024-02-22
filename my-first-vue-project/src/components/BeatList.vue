<template>
  <div>
    <h1>{{ beats.name }}</h1>
    <img :src="beats.albumCover" alt="Album Cover">
    <ul>
      <li v-for="track in beats.tracks" :key="track.id">
        {{ track.name }} - {{ track.path }}
        <!-- Afficher d'autres détails ici -->
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      beats: {}, // Initialisation avec un objet vide pour l'album
    };
  },
  created() {
    // Appel à l'API pour récupérer les données de l'album
    axios.get('http://localhost:3000/api/beats') // Mettez l'URL correcte de votre backend
      .then(response => {
        this.beats = response.data;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
      });
  },
};
</script>

<style>
/* Vos styles CSS ici */
</style>
