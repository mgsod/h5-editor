<template>
  <router-view />
</template>
<script lang="ts">
import jsondiffpatch, {
  diff,
  reverse,
  patch,
  unpatch,
  dateReviver,
} from "jsondiffpatch";

// sample data
var country = {
  name: "Argentina",
  capital: "Buenos Aires",
  independence: new Date(1816, 6, 9),
  unasur: true,
};

console.log(0, country);
// clone country, using dateReviver for Date objects
var country2 = JSON.parse(JSON.stringify(country), dateReviver);

// make some changes
country2.name = "Republica Argentina";
country2.population = 41324992;
delete country2.capital;

var delta = diff(country, country2);

// patch original
//console.log(111, patch(country, delta));

// reverse diff
var reverseDelta = unpatch(country2, delta);
console.log(222, reverseDelta);
// also country2 can be return to original value with: jsondiffpatch.unpatch(country2, delta);

var delta2 = diff(country, country2);

// undefined => no difference

export default {};
</script>
