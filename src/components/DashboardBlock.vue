<script setup>
import TableauEmbed from './TableauEmbed.vue'

defineProps({
  id: { type: String, required: true },
  index: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  src: { type: String, default: '' },
  height: { type: String, default: '820px' },
})
</script>

<template>
  <article :id="id" class="dash">
    <header class="dash__head">
      <span class="dash__num" aria-hidden="true">{{ String(index).padStart(2, '0') }}</span>
      <div>
        <h3 class="dash__title">{{ title }}</h3>
        <p v-if="description" class="dash__desc">{{ description }}</p>
      </div>
    </header>

    <TableauEmbed v-if="src" :src="src" :height="height" :title="title" />

    <div v-else class="dash__placeholder" role="img" :aria-label="`${title}: coming soon`">
      <svg viewBox="0 0 48 48" width="40" height="40" fill="none" aria-hidden="true">
        <rect x="6" y="8" width="36" height="32" rx="3" stroke="currentColor" stroke-width="1.5" />
        <path d="M14 32v-8M22 32V18M30 32v-11M38 32v-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
      <p>Dashboard coming soon</p>
    </div>
  </article>
</template>

<style scoped>
.dash {
  padding-top: 32px;
  border-top: 1px solid var(--line);
}

.dash:first-child {
  padding-top: 0;
  border-top: 0;
}

.dash__head {
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 20px;
}

.dash__num {
  font-family: var(--font-display);
  font-size: 15px;
  color: var(--wheat);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
}

.dash__title {
  font-size: clamp(22px, 2.4vw, 26px);
}

.dash__desc {
  margin-top: 6px;
  color: var(--ink-soft);
  max-width: 70ch;
}

.dash__placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  aspect-ratio: 16 / 9;
  min-height: 260px;
  border: 1.5px dashed var(--line-strong);
  border-radius: var(--radius-sm);
  background:
    repeating-linear-gradient(135deg, transparent 0 14px, rgba(176, 138, 62, 0.05) 14px 15px),
    var(--cream);
  color: var(--ink-muted);
  font-size: 15px;
  letter-spacing: 0.02em;
}
</style>
