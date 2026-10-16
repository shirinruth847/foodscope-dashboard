<script setup>
import { PROBLEM } from '../content/site'
</script>

<template>
  <main class="page">
    <header class="banner">
      <img
        class="banner__img"
        :src="PROBLEM.banner.src"
        :alt="PROBLEM.banner.alt"
        width="1500"
        height="999"
        fetchpriority="high"
      />
      <div class="banner__text">
        <p class="page-eyebrow">The context</p>
        <h1 class="page-title">{{ PROBLEM.title }}</h1>
      </div>
    </header>

    <section class="panel">
      <div class="intro">
        <div class="prose">
          <p v-for="(para, i) in PROBLEM.paragraphs" :key="i">{{ para }}</p>
        </div>

        <figure class="photo">
          <img
            :src="PROBLEM.photo.src"
            :alt="PROBLEM.photo.alt"
            width="1200"
            height="800"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>

      <blockquote class="question">
        <span class="question__label">Our question</span>
        <p>{{ PROBLEM.question }}</p>
      </blockquote>

      <p class="note">{{ PROBLEM.scope }}</p>
    </section>
  </main>
</template>

<style scoped>
/* ── Photo banner ────────────────────────────────────── */
.banner {
  position: relative;
  display: flex;
  align-items: flex-end;
  min-height: clamp(200px, 30vw, 340px);
  padding: clamp(24px, 4vw, 44px);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  isolation: isolate;
}

.banner__img {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 40%;
}

/* Sidebar-green overlay, darkest behind the heading */
.banner::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(to top, rgba(20, 42, 29, 0.92) 0%, rgba(20, 42, 29, 0.55) 45%, rgba(20, 42, 29, 0.2) 100%),
    linear-gradient(to right, rgba(20, 42, 29, 0.5), transparent 70%);
}

/* Same eyebrow + title styles, lightened to read on the dark overlay */
.banner .page-eyebrow {
  color: #d9c79c;
}

.banner .page-title {
  color: var(--cream);
}

/* ── Paragraph + photo ───────────────────────────────── */
.intro {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
  gap: clamp(24px, 4vw, 40px);
  align-items: start;
}

.photo {
  margin: 0;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.photo img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: 60% center;
}

/* ── Question callout ────────────────────────────────── */
.question {
  margin: 28px 0 20px;
  padding: 20px 24px;
  background: var(--wheat-tint);
  border-left: 3px solid var(--wheat);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}

.question__label {
  display: block;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #8a6a2a;
  margin-bottom: 6px;
}

.question p {
  font-family: var(--font-display);
  font-size: clamp(19px, 2vw, 22px);
  line-height: 1.4;
  color: var(--forest);
}

@media (max-width: 760px) {
  .intro {
    grid-template-columns: 1fr;
  }

  .photo img {
    aspect-ratio: 3 / 2;
  }
}
</style>
