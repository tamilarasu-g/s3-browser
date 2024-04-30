<template>
  <!-- {{ prefixobjects.data.arrays }}
    this is the prefix page -->
  <Objectlist :objects="prefixobjects.data.arrays" :folders="prefixobjects.data.folders" :currentpath="result2" />

</template>

<script setup>
const route = useRoute()
// console.log(typeof(route.path));
// console.log(route.path);

function removePrefix(text, prefix) {
  if (!text.startsWith(prefix)) {
    return text; // Return the original string if it doesn't start with the prefix
  }
  return text.slice(prefix.length); // Remove the prefix and return the remaining string
}

const result = removePrefix(route.path, "/objects/");
const result2 = result.replace('/prefix', '')
// console.log(`the prefix sent to backend is ${result2}`);
const { data: prefixobjects } = await useFetch(`/api/prefix/${result2}`)
// console.log(`objects under prefix ${result2}`)
// console.log(prefixobjects);
</script>