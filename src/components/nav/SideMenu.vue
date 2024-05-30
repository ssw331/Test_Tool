<script setup lang="ts">
import {MailOutlined, Html5TwoTone} from "@ant-design/icons-vue"
import type {ItemType, MenuProps} from "ant-design-vue";
import {reactive, ref, VueElement, watch, h} from "vue";
import {useRouter} from "vue-router";

const selectedKeys = ref<string[]>(['/exec/triangle'])
const openKeys = ref<string[]>(['/exec'])

// let NavActive = ref('')
const router = useRouter();

function getItem(
    label: string | VueElement,
    key: string,
    icon?: any,
    children?: ItemType[],
    type?: 'group',
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as ItemType
}

const items: ItemType[] = reactive([
  getItem('课程练习', '/exec', () => h(MailOutlined), [
    getItem('三角形', '/exec/triangle'),
    getItem('万年历', '/exec/calender'),
  ]),
])

const handleClick: MenuProps['onClick'] = (e) => {
  if (e.key.toString() !== router.currentRoute.value.path) {
    router.push(e.key.toString())
  }
  selectedKeys.value = [e.key.toString()]
};

watch(openKeys, val => {
  console.log('openKeys', val);
})
</script>

<template>
  <div
      id="logo"
      class="logo"
  >
      <Html5TwoTone style="font-size: 32px"/>
  </div>
  <a-menu
      id="sideNav"
      mode="inline"
      :openKeys="openKeys"
      :selectedKeys="selectedKeys"
      :items="items"
      @click="handleClick"
  ></a-menu>
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

.title {
  font-size: 1.25rem;
  color: #54b1bf;
  margin-top: 0.5em;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>