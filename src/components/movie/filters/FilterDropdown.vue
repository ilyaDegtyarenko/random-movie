<script
  setup
  lang="ts"
>
  import { ref, computed, onMounted, onUnmounted, useTemplateRef } from 'vue'
  import type { FilterOption } from '@/ts/types/movie.ts'

  type Props = {
    label: string
    modelValue: string
    options: FilterOption[]
    verticalOnly?: boolean
  }

  type Emits = {
    (event: 'update:modelValue', value: string): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const isOpen = ref(false)
  const dropdownRef = useTemplateRef('dropdownRef')

  const selectedOption = computed<FilterOption | undefined>(() => {
    return props.options.find(option => option.value === props.modelValue)!
  })

  const toggleDropdown = (): void => {
    isOpen.value = !isOpen.value
  }

  const selectOption = (value: string): void => {
    emit('update:modelValue', value)
    isOpen.value = false
  }

  const closeDropdown = (): void => {
    isOpen.value = false
  }

  const handleClickOutside = (event: Event): void => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
      closeDropdown()
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
</script>

<template>
  <div class="filter-group">
    <label class="filter-label">
      {{ props.label }}
    </label>

    <div
      ref="dropdownRef"
      class="dropdown"
    >
      <button
        key="activator"
        :class="{
          'dropdown-trigger': true,
          'dropdown-trigger--open': isOpen
        }"
        @click="toggleDropdown"
      >
        <span>
          {{ selectedOption?.label || 'Select option' }}
        </span>

        <span
          :class="{
            'dropdown-arrow': true,
            'dropdown-arrow--open': isOpen
          }"
        >
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path
              d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round"
            />
          </svg>
        </span>
      </button>

      <div
        v-if="isOpen"
        key="menu"
        class="dropdown-menu"
      >
        <div
          :class="{
            'dropdown-options': true,
            'dropdown-options--vertical': props.verticalOnly
          }"
        >
          <button
            v-for="option in props.options"
            :key="option.value"
            :class="{
              'dropdown-option': true,
              'dropdown-option--selected': option.value === props.modelValue
            }"
            @click="selectOption(option.value)"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style
  lang="scss"
  scoped
>
    .filter-group {
        margin-bottom: 30px;
        position: relative;
    }

    .filter-label {
        display: block;
        color: #888;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 1px;
        margin-bottom: 12px;
        text-transform: uppercase;
    }

    .dropdown {
        position: relative;
    }

    .dropdown-trigger {
        width: 100%;
        background: rgba(60, 60, 60, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        padding: 12px 16px;
        color: #fff;
        font-size: 15px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: left;
        transition: all var(--transition-default-duration-with-ease);

        &:hover {
            background: rgba(70, 70, 70, 0.8);
            border-color: rgba(255, 255, 255, 0.3);
        }

        &:focus {
            outline: none;
            border-color: #4ade80;
            box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.2);
        }

        &--open {
            border-color: rgba(255, 255, 255, 0.3);
            background: rgba(70, 70, 70, 0.8);
        }
    }

    .dropdown-arrow {
        color: #888;
        transition: transform var(--transition-default-duration-with-ease);

        &--open {
            transform: rotate(180deg);
        }
    }

    .dropdown-menu {
        position: absolute;
        top: calc(100% + 8px);
        left: 0;
        min-width: 100%;
        background: rgba(45, 45, 45, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 12px;
        z-index: 1000;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        animation: dropdownFadeIn 0.2s ease-out;
    }

    .dropdown-options {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px 20px;
        max-height: 300px;
        overflow-y: auto;

        &--vertical {
            grid-template-columns: 1fr;
            gap: 4px;
        }
    }

    .dropdown-option {
        background: transparent;
        border: none;
        color: #ccc;
        font-size: 14px;
        padding: 8px 12px;
        cursor: pointer;
        text-align: left;
        border-radius: 6px;
        transition: all var(--transition-default-duration-with-ease);
        white-space: nowrap;

        &:hover {
            background: rgba(255, 255, 255, 0.1);
            color: #fff;
        }

        &--selected {
            color: #fff;
            background: rgba(255, 255, 255, 0.1);
        }
    }

    @keyframes dropdownFadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 768px) {
        .dropdown-options {
            grid-template-columns: repeat(2, 1fr);
            gap: 8px 16px;
        }
    }

    @media (max-width: 480px) {
        .dropdown-options {
            grid-template-columns: 1fr;
            gap: 4px;
        }
    }
</style>