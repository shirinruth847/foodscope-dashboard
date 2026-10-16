<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { NAV, SITE } from '../content/site'

const active = ref(NAV[0].id)
const menuOpen = ref(false)
let observer = null

// Scroll-spy: highlight the section currently crossing the upper part of the viewport.
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) active.value = entry.target.id
      }
    },
    { rootMargin: '-35% 0px -60% 0px' },
  )
  for (const { id } of NAV) {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  }
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <nav class="nav" aria-label="Main">
    <div class="nav__inner container">
      <a href="#home" class="nav__brand" @click="menuOpen = false">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
          <path d="M12 21V10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
          <path d="M12 13c0-4 3-7 7-7 0 4-3 7-7 7Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
          <path d="M12 16c0-3-2.5-5.5-6-5.5 0 3 2.5 5.5 6 5.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
        </svg>
        {{ SITE.brand }}
      </a>

      <button
        class="nav__toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="nav-links"
        @click="menuOpen = !menuOpen"
      >
        <span class="sr-only">Menu</span>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
          <path v-if="!menuOpen" d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" />
          <path v-else d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
        </svg>
      </button>

      <ul id="nav-links" class="nav__links" :class="{ 'is-open': menuOpen }">
        <li v-for="item in NAV" :key="item.id">
          <a
            :href="`#${item.id}`"
            class="nav__link"
            :class="{ 'is-active': active === item.id }"
            :aria-current="active === item.id ? 'location' : undefined"
            @click="menuOpen = false"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(246, 241, 230, 0.88);
  backdrop-filter: saturate(140%) blur(10px);
  -webkit-backdrop-filter: saturate(140%) blur(10px);
  border-bottom: 1px solid var(--line);
}

.nav__inner {
  height: var(--nav-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.nav__brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 600;
  color: var(--forest);
  text-decoration: none;
  letter-spacing: -0.01em;
}

.nav__links {
  display: flex;
  gap: 4px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav__link {
  display: block;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 15px;
  color: var(--ink-soft);
  text-decoration: none;
  transition: color 0.15s, background-color 0.15s;
}

.nav__link:hover {
  color: var(--forest);
  background: var(--cream-deep);
}

.nav__link.is-active {
  color: var(--cream);
  background: var(--forest);
}

.nav__toggle {
  display: none;
  background: none;
  border: 0;
  padding: 8px;
  margin-right: -8px;
  color: var(--forest);
  cursor: pointer;
}

@media (max-width: 860px) {
  .nav__toggle {
    display: inline-flex;
  }

  .nav__links {
    display: none;
    position: absolute;
    top: var(--nav-h);
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 2px;
    padding: 12px var(--gutter) 16px;
    background: var(--cream);
    border-bottom: 1px solid var(--line);
    box-shadow: var(--shadow);
  }

  .nav__links.is-open {
    display: flex;
  }

  .nav__link {
    padding: 10px 12px;
    border-radius: var(--radius-sm);
  }
}
</style>
