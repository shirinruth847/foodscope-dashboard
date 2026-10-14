<script setup>
import SectionHeading from '../components/SectionHeading.vue'
import PrevNext from '../components/PrevNext.vue'
import FramedCard from '../components/FramedCard.vue'
import DarkPanel from '../components/DarkPanel.vue'
import TableauCard from '../components/TableauCard.vue'
import StepNav from '../components/StepNav.vue'
import { SECTIONS } from '../content/site'

const section = SECTIONS.find((s) => s.id === 'singapore')
</script>

<template>
  <section class="objective">
    <StepNav />
    <SectionHeading :eyebrow="section.eyebrow" :title="section.title" />

    <FramedCard :sparkle-corners="true" class="objective__narrative" elevated>
      <p class="narrative__question">{{ section.narrative.question }}</p>
      <p class="narrative__framing">{{ section.narrative.framing }}</p>
      <div class="narrative__look">
        <h3>What to look at</h3>
        <ul>
          <li v-for="(item, i) in section.narrative.lookFor" :key="i">{{ item }}</li>
        </ul>
      </div>
    </FramedCard>

    <div class="objective__vizzes">
      <TableauCard
        :src="''"
        :caption="section.placeholders[0].caption"
        viz-type="choropleth"
        viz-title="Singapore in Global Context"
      />
      <TableauCard
        :src="''"
        :caption="section.placeholders[1].caption"
        viz-type="line"
        viz-title="Local Production vs 2035 Targets"
      />
    </div>

    <DarkPanel :sparkle-corners="true" class="objective__takeaway">
      <h3>Takeaway</h3>
      <p>{{ section.narrative.takeaway }}</p>
    </DarkPanel>

    <PrevNext :current-path="section.path" />
  </section>
</template>

<style scoped>
.objective { display: flex; flex-direction: column; gap: var(--space-10); }
.narrative__question {
  margin: 0 0 var(--space-4);
  font-family: var(--font-heading);
  font-weight: 500;
  font-size: var(--text-xl);
  color: var(--color-forest);
}
.narrative__framing { margin: 0 0 var(--space-6); color: var(--color-olive); line-height: var(--leading-relaxed); }
.narrative__look h3 {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: var(--text-xs);
  margin-bottom: var(--space-4);
  color: var(--color-olive-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.narrative__look ul { list-style: none; padding-left: 0; }
.narrative__look li {
  position: relative;
  padding-left: var(--space-5);
  margin-bottom: var(--space-3);
  color: var(--color-olive);
  line-height: var(--leading-normal);
}
.narrative__look li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.6em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-forest);
  opacity: 0.5;
}
.objective__vizzes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: var(--space-6);
  margin-top: var(--space-4);
}
.objective__takeaway { text-align: center; padding: var(--space-2) 0; }
.objective__takeaway h3 {
  color: var(--color-cream);
  margin-bottom: var(--space-3);
}
.objective__takeaway p { color: var(--color-text-on-dark); opacity: 0.9; max-width: 60ch; margin: 0 auto; line-height: var(--leading-relaxed); }
</style>