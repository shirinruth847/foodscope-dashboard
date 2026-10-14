<script setup>
/**
 * Timeline — horizontal coloured line with circular markers and alternating labels.
 * Uses the refined accent palette.
 */
const milestones = [
  { week: 'Week 6', label: 'Data collection & exploration', color: 'var(--accent-gold)', top: true },
  { week: 'Week 7', label: 'Data cleaning & preparation', color: 'var(--accent-emerald)', top: false },
  { week: 'Week 9', label: 'Dashboard creation', color: 'var(--accent-sky)', top: true },
  { week: 'Week 11', label: 'User testing & refinement', color: 'var(--accent-terracotta)', top: false },
  { week: 'Week 12', label: 'User guidebook creation', color: 'var(--accent-amber)', top: true },
  { week: 'Week 13', label: 'Final report & presentation', color: 'var(--color-forest)', top: false },
]
</script>

<template>
  <div class="timeline" role="list" aria-label="Project timeline">
    <div class="timeline__track" aria-hidden="true">
      <div class="timeline__line" />
      <div
        v-for="(m, i) in milestones"
        :key="i"
        class="timeline__marker"
        :class="{ 'timeline__marker--top': m.top, 'timeline__marker--bottom': !m.top }"
        :style="{ '--marker-color': m.color }"
        role="listitem"
      >
        <div class="timeline__dot" aria-hidden="true" />
        <div class="timeline__label">
          <span class="timeline__week">{{ m.week }}</span>
          <span class="timeline__text">{{ m.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline { overflow-x: auto; padding: var(--space-3) var(--space-2) var(--space-6); margin: calc(var(--space-4) * -1) calc(var(--space-6) * -1); }
.timeline__track {
  display: flex;
  align-items: center;
  position: relative;
  min-width: max-content;
  padding: 0 var(--space-6);
}
.timeline__line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg,
    var(--accent-gold), var(--accent-emerald), var(--accent-sky),
    var(--accent-terracotta), var(--accent-amber), var(--color-forest)
  );
  transform: translateY(-50%);
}
.timeline__marker {
  position: relative;
  flex: none;
  width: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  z-index: 1;
}
.timeline__marker--top { margin-bottom: 72px; }
.timeline__marker--bottom { margin-top: 72px; }
.timeline__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--marker-color);
  box-shadow: 0 0 0 3px var(--color-cream), 0 0 0 4px var(--marker-color);
  flex: none;
}
.timeline__label {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-1);
  width: 100%;
}
.timeline__week {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--marker-color);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.timeline__text {
  font-size: var(--text-sm);
  color: var(--color-olive-soft);
  font-weight: 500;
  white-space: nowrap;
}
.timeline__marker--bottom .timeline__label { flex-direction: column-reverse; }

@media (max-width: 640px) {
  .timeline__marker { width: 130px; }
  .timeline__text { font-size: var(--text-xs); }
  .timeline__marker--top { margin-bottom: 56px; }
  .timeline__marker--bottom { margin-top: 56px; }
}
</style>