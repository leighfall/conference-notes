<script setup lang="ts">
defineOptions({ name: 'TopNav' });

const route = useRoute();
const router = useRouter();
const mobileMenuOpen = ref(false);

const responsive = useResponsiveDetector();

watch(
  () => responsive?.isDesktop?.value,
  (isDesktop) => {
    if (isDesktop && mobileMenuOpen.value) {
      closeMenu();
    }
  }
);

onMounted(() => {
  document.addEventListener('mousedown', handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleOutsideClick);
});

function openMenu() {
  mobileMenuOpen.value = true;
}

function closeMenu() {
  mobileMenuOpen.value = false;
}

function handleLinkClick(path: string) {
  closeMenu();
  router.push(path);
}

function handleOutsideClick(e: MouseEvent) {
  const menu = document.getElementById('mobile-nav-menu');
  const hamburger = document.getElementById('hamburger-btn');
  if (
    mobileMenuOpen.value &&
    menu &&
    !menu.contains(e.target as Node) &&
    hamburger &&
    !hamburger.contains(e.target as Node)
  ) {
    closeMenu();
  }
}
</script>

<template>
  <nav class="nav-wrap">
    <!-- Desktop Nav -->
    <div class="nav-links-desktop">
      <NuxtLink to="/" class="nav-link" :class="{ active: route.path === '/' }" title="Home">
        Home
      </NuxtLink>
      <a href="https://github.com/leighfall/conference-notes" class="nav-link" target="_blank" rel="noopener noreferrer" title="GitHub">
        Github
      </a>
      <a href="https://www.autumnhenderson.com/" class="nav-link" target="_blank" rel="noopener noreferrer" title="Portfolio">
        Portfolio
      </a>
    </div>
    <!-- Hamburger Icon (Mobile) -->
    <button
      id="hamburger-btn"
      class="hamburger"
      @click="openMenu"
      aria-label="Open menu"
      aria-controls="mobile-nav-menu"
      :aria-expanded="mobileMenuOpen">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <rect y="7" width="32" height="3" rx="1.5" fill="currentColor" />
        <rect y="15" width="32" height="3" rx="1.5" fill="currentColor" />
        <rect y="23" width="32" height="3" rx="1.5" fill="currentColor" />
      </svg>
    </button>
    <!-- Mobile Slide-in Menu -->
    <div
      id="mobile-nav-menu"
      class="mobile-menu"
      :class="{ open: mobileMenuOpen }"
      role="menu"
      aria-label="Mobile navigation"
      tabindex="-1">
      <button class="close-btn" @click="closeMenu" aria-label="Close menu">&times;</button>
      <NuxtLink
        to="/"
        class="nav-link"
        :class="{ active: route.path === '/' }"
        title="Home"
        @click="handleLinkClick('/')">
        Home
      </NuxtLink>
      <a
        href="https://github.com/leighfall/conference-notes"
        class="nav-link"
        target="_blank"
        rel="noopener noreferrer"
        title="GitHub"
        @click="closeMenu()">
        Github
      </a>
      <a
        href="https://www.autumnhenderson.com/"
        class="nav-link"
        target="_blank"
        rel="noopener noreferrer"
        title="Portfolio"
        @click="closeMenu()">
        Portfolio
      </a>
    </div>
    <!-- Overlay -->
    <div v-if="mobileMenuOpen" class="menu-overlay"></div>
  </nav>
</template>

<style lang="less" scoped>
@import '../assets/css/main.less';

.nav-wrap {
  display: flex;
  flex-flow: row nowrap;
  gap: 1.5rem;
  justify-content: end;
  background-color: @background;
  position: sticky;
  z-index: 10;
  padding: 20px 0;
  width: 100%;
  top: 0;

  .phone({
    top: -1px;
    width: calc(100% + 4px);
    overflow-x: hidden;
  });
}

.nav-links-desktop {
  display: flex;
  gap: 1.5rem;

  .phone({
    display: none;
  });
}

.hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
  color: @blue;
  z-index: 102;

  .phone({
    display: flex;
  });
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: -300px;
  width: 260px;
  height: 100vh;
  background: @background;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  gap: 2rem;
  z-index: 200;
  transition: right 0.35s cubic-bezier(0.4, 0, 0.2, 1);

  &.open {
    right: 0;
  }

  .close-btn {
    align-self: flex-end;
    background: none;
    border: none;
    font-size: 2rem;
    color: @blue;
    cursor: pointer;
    margin-bottom: 1rem;
  }

  .nav-link {
    font-size: 1.2rem;
    color: @blue;
    padding: 0.5rem 0;
    border-bottom: 1px solid transparent;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    &.active {
      color: @green;
      border-bottom: 1px solid @green;
    }
  }

  @media (min-width: 768px) {
    display: none;
  }
}

.menu-overlay {
  display: none;
  .phone({
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.2);
    z-index: 101;
  });
}

.nav-link {
  padding-bottom: 5px;
  color: @blue;
  border-bottom: 2px solid transparent;
  text-transform: uppercase;
  font-size: 1rem;
  letter-spacing: 0.2rem;
  padding-left: 0.2rem;
  position: relative;
  display: inline-flex;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: @blue;
    width: 100%;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.5s ease, transform-origin 0s ease 0.5s;
  }

  &:hover::after {
    transform: scaleX(1);
  }

  &:not(:hover)::after {
    transform-origin: left;
  }

  &.active {
    color: @green;

    &::after {
      background-color: @green;
    }
  }
}
</style>
