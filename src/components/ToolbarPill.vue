<script setup>
import { ref, computed } from 'vue'
import Button from './Button.vue'

const props = defineProps({
  searchEnabled: { type: Boolean, default: false },
  searchPlaceholder: { type: String, default: 'Search countries…' },
  notifications: { type: Array, default: () => [] },
  user: { type: Object, default: () => ({}) },
})

const searchQuery = ref('')
const showNotifications = ref(false)
const showUserMenu = ref(false)

const hasNotifications = computed(() => props.notifications.length > 0)
const unreadCount = computed(() => props.notifications.filter(n => !n.read).length)

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}
function formatDate(date) {
  return new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}
function markAllRead() {
  // emit event to parent
}
</script>

<template>
<div class="toolbar-pill" role="search">
  <!-- Search -->
  <div v-if="searchEnabled" class="toolbar-pill__search">
    <svg class="toolbar-pill__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
    <input
      type="search"
      v-model="searchQuery"
      :placeholder="searchPlaceholder"
      class="toolbar-pill__input"
      @keydown.enter="$emit('search', searchQuery)"
      @blur="$emit('search', searchQuery)"
      aria-label="Search"
    />
  </div>

  <!-- Notifications -->
  <div v-if="hasNotifications" class="toolbar-pill__notifications relative">
    <Button
      variant="ghost"
      size="sm"
      class="toolbar-pill__notification-btn"
      @click="showNotifications = !showNotifications"
      :aria-expanded="showNotifications"
      aria-haspopup="true"
      aria-label="Notifications"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
      <span v-if="unreadCount > 0" class="toolbar-pill__badge">{{ unreadCount > 9 ? '9+' : unreadCount }}</span>
    </Button>

    <div v-show="showNotifications" class="toolbar-pill__dropdown" role="menu">
      <div class="toolbar-pill__dropdown-header">
        <span>Notifications</span>
        <Button v-if="unreadCount > 0" variant="ghost" size="xs" @click="markAllRead">Mark all read</Button>
      </div>
      <div class="toolbar-pill__dropdown-list" role="list">
        <div v-for="n in notifications" :key="n.id" class="toolbar-pill__notification" :class="{ unread: !n.read }" role="listitem">
          <p class="notification__text">{{ n.text }}</p>
          <time class="notification__time" :datetime="n.date">{{ formatDate(n.date) }}</time>
        </div>
      </div>
    </div>
  </div>

  <!-- User Menu -->
  <div v-if="user && Object.keys(user).length" class="toolbar-pill__user relative">
    <Button
      variant="ghost"
      size="sm"
      class="toolbar-pill__user-btn"
      @click="showUserMenu = !showUserMenu"
      :aria-expanded="showUserMenu"
      aria-haspopup="true"
      aria-label="User menu"
    >
      <div class="toolbar-pill__avatar">
        <span v-if="user.avatar" class="avatar-img" :style="{ backgroundImage: 'url(' + user.avatar + ')' }" />
        <span v-else class="avatar-initials">{{ getInitials(user.name) }}</span>
      </div>
    </Button>

    <div v-show="showUserMenu" class="toolbar-pill__dropdown toolbar-pill__dropdown--user" role="menu">
      <div class="toolbar-pill__user-info">
        <p class="user-info__name">{{ user.name }}</p>
        <p class="user-info__email">{{ user.email }}</p>
      </div>
      <hr class="toolbar-pill__divider" />
      <Button variant="ghost" size="sm" full-width class="dropdown-item" @click="$emit('profile')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
        Profile
      </Button>
      <Button variant="ghost" size="sm" full-width class="dropdown-item" @click="$emit('settings')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
        Settings
      </Button>
      <hr class="toolbar-pill__divider" />
      <Button variant="ghost" size="sm" full-width class="dropdown-item dropdown-item--danger" @click="$emit('logout')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
        Sign out
      </Button>
    </div>
  </div>
</div>
</template>

<style scoped>
.toolbar-pill {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  height: var(--toolbar-height);
  padding: 0 var(--space-4);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-xs);
}
.toolbar-pill__search { position: relative; flex: 1; max-width: 360px; min-width: 200px; }
.toolbar-pill__search-icon {
  position: absolute;
  left: var(--space-3);
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
  pointer-events: none;
}
.toolbar-pill__input {
  width: 100%;
  height: 40px;
  padding: 0 var(--space-4) 0 var(--space-10);
  border: none;
  background: transparent;
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--color-text);
  outline: none;
}
.toolbar-pill__input::placeholder { color: var(--color-text-muted); }

.relative { position: relative; }
.toolbar-pill__notification-btn,
.toolbar-pill__user-btn { padding: var(--space-1.5); }
.toolbar-pill__badge {
  position: absolute;
  top: 2px;
  right: 2px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: var(--radius-pill);
  background: var(--color-amber-500);
  color: var(--color-text-inverse);
  font-size: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.4);
}
.toolbar-pill__dropdown {
  position: absolute;
  top: calc(100% + var(--space-2));
  right: 0;
  width: 320px;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  z-index: var(--z-dropdown);
  overflow: hidden;
}
.toolbar-pill__dropdown--user { width: 260px; }
.toolbar-pill__dropdown-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-border);
  font-weight: 600;
}
.toolbar-pill__dropdown-list { max-height: 320px; overflow-y: auto; }
.toolbar-pill__notification {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-border);
}
.toolbar-pill__notification:last-child { border-bottom: none; }
.toolbar-pill__notification.unread { background: var(--color-brand-900); }
.notification__text { margin: 0; font-size: var(--text-sm); color: var(--color-text); }
.notification__time { font-size: var(--text-xs); color: var(--color-text-muted); }
.toolbar-pill__user-info { padding: var(--space-3) var(--space-4); }
.user-info__name { margin: 0; font-weight: 600; font-size: var(--text-sm); }
.user-info__email { margin: 0; font-size: var(--text-xs); color: var(--color-text-secondary); }
.toolbar-pill__divider { margin: 0; border: none; border-top: 1px solid var(--color-border); }
.dropdown-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  justify-content: flex-start;
  padding: var(--space-2) var(--space-4);
}
.dropdown-item svg { flex-shrink: 0; color: var(--color-text-secondary); }
.dropdown-item--danger { color: var(--color-error); }
.dropdown-item--danger svg { color: var(--color-error); }
.toolbar-pill__avatar {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  background: var(--color-bg-muted);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: var(--text-sm);
  overflow: hidden;
  border: 1px solid var(--color-border);
}
.avatar-img { width: 100%; height: 100%; background-size: cover; background-position: center; }
</style>