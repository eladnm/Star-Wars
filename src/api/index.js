const swapiRootUrl = "https://swapi.dev/api/";

const getPlanets = async () => {
  const results = [];
  let url = `${swapiRootUrl}planets`;
  do {
    const res = await fetch(url);
    const data = await res.json();
    url = data.next;
    results.push(...data.results);
  } while (url);
  console.log(results);
  return results;
};
const getSpecificPlanets = async () => {
  const arr = ["Tatooine", "Alderaan", "Naboo", "Bespin", "Endor"];
  return Promise.all(
    arr.map((request) => {
      return fetch(`${swapiRootUrl}planets/?search=${request}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.results[0]);
          return data.results[0];
        });
    })
  );
};
const getVehicles = async () => {
  const results = [];
  let url = `${swapiRootUrl}vehicles/`;

  do {
    const res = await fetch(url);
    const data = await res.json();
    url = data.next;
    results.push(...data.results);
  } while (url);

  return results;
};
const getPeople = (id) => {
  return fetch(`${swapiRootUrl}people/${id}`)
    .then((response) => response.json())
    .then((data) => data);
};

export const userService = {
  getPlanets,
  getVehicles,
  getPeople,
  getSpecificPlanets,
};
