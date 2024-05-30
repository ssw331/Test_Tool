<script setup lang="ts">
import {ref} from "vue";
import SideMenu from "./components/nav/SideMenu.vue";
import BreadCrumbNav from "./components/nav/BreadCrumbNav.vue";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';

const collapsed = ref<boolean>(false)
</script>

<template>
  <a-layout style="min-height: 100vh;">
    <a-layout-sider :collapsed="collapsed" :trigger="null" style="width: auto; height: auto; background-color: white" collapsible>
      <SideMenu/>
    </a-layout-sider>
    <a-layout style="height: 100%;">
      <a-layout-header style="padding: 0; background-color: white; height: 3rem; align-content: center">
        <a-row style="height: 100%;">
          <a-col :span="1" class="logo">
            <menu-unfold-outlined
                v-if="collapsed"
                class="trigger"
                @click="() => (collapsed = !collapsed)"
            />
            <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)"/>
          </a-col>
          <a-col :span="4" style="height: 3rem; align-content: center">
            <BreadCrumbNav/>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content>
        <router-view/>
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.logo {
  padding: 0 .5rem;
  border-bottom: 1px solid #eee;
  background-color: white;
  box-sizing: border-box;
  height: 3rem;
  align-items: center;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.trigger {
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}
</style>
