<script setup>
import SectionHeading from '../components/SectionHeading.vue'
import PrevNext from '../components/PrevNext.vue'
import FramedCard from '../components/FramedCard.vue'
import DarkPanel from '../components/DarkPanel.vue'
import Timeline from '../components/Timeline.vue'
import { SECTIONS, ABOUT } from '../content/site'

const section = SECTIONS.find((s) => s.id === 'about')
</script>

<template>
  <section class="about">
    <SectionHeading :eyebrow="section.eyebrow" :title="section.title" />

    <!-- Data sources & Methodology in elevated cards -->
    <div class="about__top-grid">
      <FramedCard class="about__card" elevated>
        <h2>{{ ABOUT.blocks[0].title }}</h2>
        <p>{{ ABOUT.blocks[0].body }}</p>
      </FramedCard>
      <FramedCard class="about__card" elevated>
        <h2>{{ ABOUT.blocks[1].title }}</h2>
        <p>{{ ABOUT.blocks[1].body }}</p>
      </FramedCard>
    </div>

    <!-- Limitations & References in dark panels -->
    <div class="about__bottom-grid">
      <DarkPanel class="about__panel">
        <h2>{{ ABOUT.blocks[2].title }}</h2>
        <p>{{ ABOUT.blocks[2].body }}</p>
      </DarkPanel>
      <DarkPanel class="about__panel">
        <h2>{{ ABOUT.blocks[3].title }}</h2>
        <p>{{ ABOUT.blocks[3].body }}</p>
      </DarkPanel>
    </div>

    <!-- Project timeline -->
    <FramedCard :sparkle-corners="true" class="about__timeline" elevated>
      <h2>Project Timeline</h2>
      <Timeline />
    </FramedCard>

    <PrevNext :current-path="section.path" />
  </section>
</template>

<style scoped>
.about__top-grid,
.about__bottom-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-10);
}
.about__card h2,
.about__panel h2 {
  font-size: var(--text-lg);
  margin-bottom: var(--space-4);
}
.about__card h2 { color: var(--color-forest); }
.about__panel h2 { color: var(--color-cream); }
.about__card p { color: var(--color-olive); line-height: var(--leading-relaxed); }
.about__panel p { color: var(--color-text-on-dark); opacity: 0.9; line-height: var(--leading-relaxed); }

.about__timeline h2 {
  color: var(--color-forest);
  margin-bottom: var(--space-8);
  text-align: center;
}
</style>