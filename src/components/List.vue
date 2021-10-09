<template>
  <div>
    <v-layout mt-6 align-center justify-center column fill-height>
      <v-flex>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Key</th>
                <th class="text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Vehicle name with the largest sum</td>
                <td>{{ vehicleName }}</td>
              </tr>
              <tr>
                <td>Related home planets and their respective populatio</td>
                <td>{{ planetName }} {{ maxPop }}</td>
              </tr>
              <tr>
                <td>Related pilot names</td>
                <td>{{ pilotName }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-flex>
      <v-flex row align-center>
        <v-progress-circular
          v-if="isLoading === true"
          indeterminate
          :size="50"
          color="primary"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import { userService } from "../api";
export default {
  data() {
    return {
      planets: [],
      planetsFull: [],
      vehicles: [],
      filters: [],
      names: [],
      vehicleName: "",
      pilotName: "",
      planetName: "",
      maxPop: 0,
      isLoading: false,
    };
  },
  async mounted() {
    this.isLoading = true;
    let vehicles = [];
    vehicles = await userService.getVehicles();
    vehicles = vehicles.filter((a) => a.pilots.length > 0);
    for (const vehicle of vehicles) {
      for (const pilot of vehicle.pilots) {
        const numOfPerson = pilot.replace(/\D/g, "");
        const nameOfPlanet = await userService.getPeople(numOfPerson);
        this.names.push(nameOfPlanet.name);
        this.planets.push(nameOfPlanet.homeworld);
      }
    }
    this.planetsFull = await userService.getPlanets();
    const newPlanets = this.planetsFull.filter(
      (a) => !!this.planets.find((b) => b === a.url)
    );
    const maxPopulation = Math.max(
      ...newPlanets.map((a) => a.population).filter((a) => !isNaN(a))
    );
    this.maxPop = maxPopulation;
    const namePlanet = newPlanets.find((a) => a.population == maxPopulation);
    this.planetName = namePlanet.name;
    let pilotId = namePlanet.residents[0].replace(/\D/g, "");
    const objectOfPilot = await userService.getPeople(pilotId);
    this.pilotName = objectOfPilot.name;
    const vecUrl = objectOfPilot.vehicles[0];
    this.vehicleName = vehicles.find((a) => a.url === vecUrl).name;
    this.isLoading = false;
  },
};
</script>
