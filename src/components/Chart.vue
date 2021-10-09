<template>
  <div class="columns">
    <div v-for="planet in planets" :key="planet.name" class="column-container">
      <div class="centerText">{{ planet.population }}</div>
      <div
        class="column-bar series-a"
        :style="{ 'flex-basis': calc(planet.population) + '%' }"
      ></div>
      <div class="centerText">{{ planet.name }}</div>
    </div>
  </div>
</template>
<style scoped>
.columns {
  display: flex;
  height: 50vh;
  max-height: 400px;
  align-items: stretch;
  border: 1px solid #ccc;
  margin-top: 10%;
}

.column-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-end;
}

.column-bar {
  border-right: 1px solid white;
}

.series-a {
  background: salmon;
}
.centerText {
  text-align: center;
}
</style>
<script>
import { userService } from "../api";

export default {
  data() {
    return {
      planets: [],
    };
  },
  mounted() {
    userService.getSpecificPlanets().then((res) => (this.planets = res));
  },

  methods: {
    calc(population) {
      const total = Math.max(...this.planets.map((a) => parseInt(a.population)));
      return (population / total) * 100;
    },
  },
};
</script>


