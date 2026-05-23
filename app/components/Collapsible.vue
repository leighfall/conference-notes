<script setup lang="ts">
defineOptions({ name: 'Collapsible' });

const props = defineProps<{
  mainText?: string
  id: string
  modelValue?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const internalExpanded = ref(false)

const expanded = computed({
  get: () => props.modelValue ?? internalExpanded.value,
  set: (val) => {
    if (props.modelValue !== undefined) {
      emit('update:modelValue', val)
    } else {
      internalExpanded.value = val
    }
  }
})

const bodyRef = ref<HTMLElement | null>(null)
const height = ref('0px')

const toggle = () => {
  expanded.value = !expanded.value
}

const style = computed(() => ({
  maxHeight: height.value,
  transition: 'max-height 0.5s ease',
  overflow: 'hidden',
}))

watch(expanded, async () => {
  await nextTick()
  if (expanded.value && bodyRef.value) {
    height.value = `${bodyRef.value.scrollHeight}px`
  } else {
    height.value = '0px'
  }
})
</script>

<template>
  <div class="collapsible">
    <button
      class="collapsible-header"
      :aria-expanded="expanded"
      :aria-controls="`collapsible-body-${id}`"
      type="button"
      @click="toggle">
      <slot name="header">
        <span class="main-text">{{ mainText }}</span>
      </slot>
      <span class="caret" :class="{ rotated: expanded }" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 18 18" style="display: block">
          <polyline
            points="4,7 9,12 14,7"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </span>
    </button>
    <div
      :id="`collapsible-body-${id}`"
      ref="bodyRef"
      :style="style"
      role="region"
      :aria-hidden="!expanded">
      <div class="collapsible-body-inner">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '../assets/css/main.less';

.collapsible {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.collapsible-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border: none;
  background: none;
  padding: 0.5rem 0;
  width: 100%;
  text-align: left;
  color: @white;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15rem;
  border-bottom: 1px solid fade(@white, 15%);

  &:hover {
    color: @blue;
  }

  .main-text {
    flex: 1;
  }

  .caret {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5em;
    height: 1.5em;
    transition: transform 0.5s ease;
    transform: rotate(0deg);
    transform-origin: 50% 50%;

    &.rotated {
      transform: rotate(180deg);
    }
  }
}

.collapsible-body-inner {
  padding: 0.5rem 0 0 0;
}
</style>
