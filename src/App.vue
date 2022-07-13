<script setup lang="ts">
import { ConfigProvider } from "ant-design-vue";
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
const { fullPath } = useRoute();
</script>

<template>
  <ConfigProvider :locale="zh_CN">
    <router-view :key="fullPath" />
  </ConfigProvider>
</template>
