<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () =>
  $fetch<any>('/api/page', { query: { path: route.path } })
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>

<template>
  <div v-if="page" class="note">
    <h1 class="note-title">{{ talkTitle(page.stem) }}</h1>
    <ContentRenderer :value="page" class="markdown-body" />
  </div>
</template>

<style lang="less" scoped>
@import '../assets/css/main.less';

.note-title {
  color: @green;
  font-family: calibri;
  font-size: 1.7rem;
  font-weight: 400;
  letter-spacing: 4px;
  text-align: left;
  padding-bottom: 12px;
  margin: 0 0 2vh 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.markdown-body {
  color: @white;
  line-height: 1.7;
  margin-top: 1.5rem;

  :deep(h2) {
    color: @green;
    font-family: calibri;
    font-size: 1.3rem;
    font-weight: 400;
    letter-spacing: 2px;
    margin: 2vh 0 1vh 0;
  }

  :deep(h3) {
    color: @green;
    font-family: calibri;
    font-size: 1.1rem;
    font-weight: 400;
    letter-spacing: 1px;
    margin: 2vh 0 1vh 0;
  }

  :deep(p) {
    margin: 2vh 0;
  }

  :deep(ul),
  :deep(ol) {
    padding-left: 1.5rem;
    margin: 0;

    li {
      margin-bottom: 0;
    }
  }

  :deep(hr) {
    border: none;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    margin: 2vh 0;
  }

  :deep(strong) {
    color: rgba(255, 255, 255, 0.9);
  }

  :deep(a) {
    color: @green;
    text-decoration: none;

    &:hover {
      color: @blue;
    }
  }

  :deep(code) {
    background: rgba(255, 255, 255, 0.08);
    color: @green;
    padding: 0.15em 0.4em;
    border-radius: 4px;
    font-size: 0.9em;
  }

  :deep(pre) {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 1.25rem;
    overflow-x: auto;
    margin: 2vh 0;

    code {
      background: none;
      padding: 0;
      font-size: 0.88em;
    }
  }

  :deep(.muted) {
    color: @white-light;
  }

  :deep(img) {
    max-width: 100%;
    border-radius: 6px;
    display: block;
    margin: 2vh auto;
  }
}
</style>
