<script setup lang="ts">
import { queryCollection } from '@nuxt/content/server';
import { useAsyncData, createError } from 'nuxt/app';
import { useRoute } from 'vue-router';

const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
  />
</template>
