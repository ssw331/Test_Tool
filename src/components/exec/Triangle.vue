<script setup lang="ts">

import Pannel from "../PannelTemplate.vue";

const versions = ['0.0.1', '0.0.2']

</script>

<template>
  <Suspense>
    <pannel problem="三角形" :versions="versions"></pannel>
  </Suspense>
</template>

<style scoped>

</style>