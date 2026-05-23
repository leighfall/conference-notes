<script setup lang="ts">
useResponsiveDetectorRoot();
</script>

<template>
  <NuxtRouteAnnouncer />
  <TopNav />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="less">
@import './assets/css/main.less';

html {
  background-color: @background;
  font-family: calibri;
  width: 98%;
  margin: 0 auto;
}

a {
  text-decoration: none;
  color: @green;
  transition: 0.3s;

  &:hover {
    color: @blue;
  }
}

body {
  margin: 0 8px 8px 8px;
}

*:focus-visible {
  outline-offset: 0px;
  outline: 0px;
}
</style>
