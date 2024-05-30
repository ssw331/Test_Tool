<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter();

</script>

<template>
    <a-breadcrumb style="padding-left: 5px; align-self: center">
      <a-breadcrumb-item @click="() => router.replace('/')"> Home </a-breadcrumb-item>
      <a-breadcrumb-item v-if="router.currentRoute.value.path.includes('/exec/')">
        Exec
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <router-link to="/exec/triangle">Triangle</router-link>
            </a-menu-item>
            <a-menu-item>
              <router-link to="/exec/calender">Calender</router-link>
            </a-menu-item>
          </a-menu>
        </template>
      </a-breadcrumb-item>
      <a-breadcrumb-item v-else>  </a-breadcrumb-item>
      <a-breadcrumb-item v-if="router.currentRoute.value.name === 'Triangle'">
        Triangle
      </a-breadcrumb-item>
      <a-breadcrumb-item v-if="router.currentRoute.value.name === 'Calender'">
        Calender
      </a-breadcrumb-item>
    </a-breadcrumb>
</template>

<style scoped>

</style>