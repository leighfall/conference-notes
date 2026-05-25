<script setup lang="ts">
const { data: navigation } = await useAsyncData('nav', () =>
  $fetch<any[]>('/api/navigation')
)

const openSections = ref<Record<string, boolean>>({})

const conferences = computed(() =>
  navigation.value?.filter((item: any) => item.children?.length) ?? []
)

function isOpen(path: string) {
  return openSections.value[path] ?? false
}

function handleToggle(path: string, opening: boolean) {
  openSections.value = {}
  if (opening) openSections.value[path] = true
}

function formatTitle(title: string) {
  return title.replace(/(\d{4})$/, ' $1')
}
</script>

<template>
  <div class="container">
    <aside class="sidenav">
      <Collapsible
        v-for="conference in conferences"
        :key="conference.path"
        :id="conference.path"
        :main-text="formatTitle(conference.title)"
        :model-value="isOpen(conference.path)"
        @update:model-value="opening => handleToggle(conference.path, opening)">
        <ul class="talk-list">
          <li
            v-for="talk in conference.children"
            :key="talk.path">
            <NuxtLink :to="talk.path" class="talk-link" :title="talkTitle(talk.stem ?? talk.path)">
              {{ talkTitle(talk.stem ?? talk.path) }}
            </NuxtLink>
          </li>
        </ul>
      </Collapsible>
    </aside>
    <main class="content" id="main-content">
      <a href="#main-content" class="skip-link">Skip to main content</a>
      <slot />
    </main>
  </div>
</template>

<style lang="less" scoped>
@import '../assets/css/main.less';

.container {
  display: flex;
  flex-flow: row;
  margin: 0 auto;
  width: 85vw;
  min-width: 300px;
  max-width: 1300px;
  color: @white;
  font-size: 18px;
  gap: 40px;

  .laptop({
    flex-flow: column;
    width: 100%;
    font-size: 1rem;
  });
}

.sidenav {
  display: flex;
  flex-flow: column;
  width: 280px;
  flex-shrink: 0;
  align-self: start;
  position: sticky;
  top: 0;
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 6px;
  scrollbar-width: thin;
  scrollbar-color: fade(@white, 20%) transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: fade(@white, 20%);
    border-radius: 2px;
  }

  .laptop({
    width: 100%;
    position: initial;
    max-height: none;
    overflow-y: visible;
  });
}

.conference-section {
  margin-bottom: 1rem;
}

.conference-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: none;
  border: none;
  color: @white;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15rem;
  padding: 0.5rem 0;
  cursor: pointer;
  border-bottom: 1px solid fade(@white, 15%);

  &:hover {
    color: @blue;
  }
}

.chevron {
  display: inline-block;
  transition: transform 0.2s ease;
  transform: rotate(0deg);
  font-size: 1.2rem;

  &.open {
    transform: rotate(90deg);
  }
}

.talk-list {
  list-style: none;
  padding: 0.5rem 0 0 0;
  margin: 0;
  display: flex;
  flex-flow: column;
  gap: 0.25rem;
}

.talk-link {
  display: block;
  font-size: 0.9rem;
  overflow-wrap: break-word;
  word-break: break-word;
  color: @white-light;
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  line-height: 1.4;
  transition: color 0.2s, background 0.2s;

  &:hover {
    color: @white;
    background: @box-background;
  }

  &.router-link-active {
    color: @green;
  }
}

.content {
  flex: 1;
  min-width: 0;
  padding-bottom: 4rem;
  line-height: 1.7;
  align-self: start;

  .laptop({
    width: 100%;
  });
}

.skip-link {
  position: fixed;
  top: -100px;
  left: 6px;
  background: @blue;
  color: @background;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1000;
  transition: top 0.3s;

  &:focus {
    top: 6px;
  }
}
</style>
