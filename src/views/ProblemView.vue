<script setup>
import { PROBLEM } from '../content/site'
</script>

<template>
  <main class="page">
    <header class="page-head">
      <p class="page-eyebrow">The context</p>
      <h1 class="page-title">{{ PROBLEM.title }}</h1>
    </header>

    <section class="panel">
      <div class="prose">
        <p v-for="(para, i) in PROBLEM.paragraphs" :key="i">{{ para }}</p>
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
</style>
