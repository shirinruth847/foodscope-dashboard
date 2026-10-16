<script setup>
import { SITE, REFERENCES } from '../content/site'
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__about">
        <p class="footer__brand">{{ SITE.brand }}</p>
        <p class="footer__team">By {{ SITE.team.join(', ') }} (G1T1)</p>
        <p class="footer__data">Data: FAOSTAT Food Balances, Production Indices and Trade (2010–2023); data.gov.sg.</p>
      </div>

      <div class="footer__refs">
        <h2 class="footer__heading">References</h2>
        <ul>
          <li v-for="ref in REFERENCES" :key="ref.short">
            <a :href="ref.url" target="_blank" rel="noopener">{{ ref.short }}</a>. {{ ref.text }}
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--forest-deep);
  color: rgba(246, 241, 230, 0.75);
  font-size: 14px;
  line-height: 1.6;
}

.footer__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
  gap: 48px;
  padding-top: 56px;
  padding-bottom: 56px;
}

.footer__brand {
  font-family: var(--font-display);
  font-size: 22px;
  color: var(--cream);
}

.footer__team,
.footer__data {
  margin-top: 8px;
}

.footer__heading {
  font-size: 13px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #d9c79c;
  font-family: var(--font-body);
  font-weight: 400;
}

.footer ul {
  list-style: none;
  margin: 12px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.footer a {
  color: var(--cream);
}

.footer a:hover {
  color: #d9c79c;
}

@media (max-width: 760px) {
  .footer__inner {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
</style>
