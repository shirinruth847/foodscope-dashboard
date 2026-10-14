<script setup>
import SectionHeading from '../components/SectionHeading.vue'
import PrevNext from '../components/PrevNext.vue'
import FramedCard from '../components/FramedCard.vue'
import CalloutCard from '../components/CalloutCard.vue'
import Sparkle from '../components/Sparkle.vue'
import ArchImage from '../components/ArchImage.vue'
import { INTRO, SECTIONS } from '../content/site'

const introPath = SECTIONS[0].path
</script>

<template>
  <section class="intro">
    <SectionHeading :eyebrow="INTRO.eyebrow" :title="INTRO.title" size="large" />

    <!-- Hero: centred elevated card with arch image below -->
    <FramedCard :sparkle-corners="true" class="intro__hero-card" elevated>
      <CalloutCard accent="forest" leadIn="Central question">
        <p class="intro__big-question">
          Does growing your own food <strong>mean greater food availability?</strong>
        </p>
      </CalloutCard>

      <div class="intro__hero-image">
        <ArchImage
          src="/images/hero-farmland.jpg"
          alt="Green farmland rows from above"
          aspect="4 / 3"
          class="intro__arch-image"
        />
        <p class="intro__image-credit">Photo: <slot name="image-credit" /></p>
      </div>

      <p class="intro__credit">By G1T1: Anjali, Anumitaa, Shirin, Shree, and Sreya</p>
    </FramedCard>

    <!-- Three info cards -->
    <div class="intro__grid">
      <FramedCard class="intro__info-card" elevated>
        <h2>{{ INTRO.scopeTitle }}</h2>
        <p>{{ INTRO.scope }}</p>
      </FramedCard>
      <FramedCard class="intro__info-card" elevated>
        <h2>{{ INTRO.audienceTitle }}</h2>
        <p>{{ INTRO.audience }}</p>
      </FramedCard>
      <FramedCard class="intro__info-card" elevated>
        <h2>{{ INTRO.dataTitle }}</h2>
        <p>{{ INTRO.data }}</p>
      </FramedCard>
    </div>

    <PrevNext :current-path="introPath" />
  </section>
</template>

<style scoped>
.intro__hero-card { margin: var(--space-8) 0 var(--space-10); }
.intro__big-question {
  margin: 0;
  font-family: var(--font-heading);
  font-weight: 500;
  font-size: clamp(1.6rem, 3.8vw, 2.4rem);
  line-height: var(--leading-tight);
  text-transform: uppercase;
  letter-spacing: 0.015em;
  color: var(--color-forest);
  text-align: center;
}
.intro__big-question strong { color: var(--color-forest); }
.intro__hero-image { margin-top: var(--space-8); }
.intro__arch-image { border-radius: var(--radius-arch); }
.intro__image-credit {
  margin: var(--space-3) 0 0;
  font-size: var(--text-xs);
  color: var(--color-olive-muted);
  text-align: center;
}
.intro__credit {
  margin: var(--space-6) 0 0;
  text-align: center;
  font-size: var(--text-xs);
  color: var(--color-olive-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.intro__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6);
  margin-top: var(--space-4);
}
.intro__info-card h2 {
  font-size: var(--text-lg);
  margin-bottom: var(--space-3);
  color: var(--color-forest);
}
.intro__info-card p { color: var(--color-olive); line-height: var(--leading-relaxed); }

@media (max-width: 640px) {
  .intro__big-question { font-size: clamp(1.4rem, 4.5vw, 1.9rem); }
  .intro__grid { grid-template-columns: 1fr; }
}
</style>