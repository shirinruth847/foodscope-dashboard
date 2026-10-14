<script setup>
import FramedCard from './FramedCard.vue'
import Sparkle from './Sparkle.vue'
</script>

<template>
  <footer class="app-footer">
    <!-- Farmland background -->
    <div class="farmland-bg" aria-hidden="true" />

    <div class="app-footer__inner">
      <div class="app-footer__brand">
        <div class="app-footer__mark" aria-hidden="true">
          <Sparkle variant="cream" size="lg" rotate />
        </div>
        <div>
          <p class="app-footer__name">FoodScope</p>
          <p class="app-footer__blurb">
            A university data visualisation project exploring global food
            self-sufficiency with FAOSTAT data and live Tableau views.
          </p>
        </div>
      </div>
      <nav class="app-footer__links" aria-label="Footer">
        <router-link to="/about">About & methods</router-link>
        <a href="https://www.fao.org/faostat/en/#data/FBS" target="_blank" rel="noopener">FAOSTAT Food Balance Sheets</a>
        <a href="https://www.sfa.gov.sg/" target="_blank" rel="noopener">Singapore Food Agency</a>
      </nav>
    </div>

    <div class="app-footer__credits">
      <p class="app-footer__credit">By G1T1: Anjali, Anumitaa, Shirin, Shree, and Sreya</p>
    </div>

    <div class="app-footer__refs" aria-label="References">
      <p class="app-footer__ref">[1] Baer-Nawrocka & Sadowski (2019). <em>PLOS ONE</em> 14(3): e0213448.</p>
      <p class="app-footer__ref">[2] Clapp (2017). <em>Food Policy</em> 66: 88-96.</p>
      <p class="app-footer__ref">[3] FAO (2025). Food Balance Sheets 2010-2023.</p>
      <p class="app-footer__ref">[4] MSE (2025). Speech by Grace Fu at APAFIS.</p>
      <p class="app-footer__ref">[5] SFA (2026). Singapore Food Statistics 2025.</p>
      <p class="app-footer__ref">[6] Takahashi (2025). <em>Agriculture & Food Security</em>.</p>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  position: relative;
  color: var(--color-text-on-dark);
  padding-bottom: var(--space-8);
}
.app-footer__inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--space-12) var(--space-6) 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-8);
  flex-wrap: wrap;
}
.app-footer__brand {
  display: flex;
  gap: var(--space-4);
  max-width: 420px;
}
.app-footer__mark {
  width: 48px;
  height: 48px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.app-footer__name {
  margin: 0 0 var(--space-2);
  font-family: var(--font-heading);
  font-weight: 500;
  font-size: var(--text-lg);
  letter-spacing: 0.01em;
  text-transform: uppercase;
}
.app-footer__blurb { margin: 0; font-size: var(--text-sm); opacity: 0.75; line-height: var(--leading-normal); }
.app-footer__links {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  font-weight: 500;
  font-size: var(--text-sm);
}
.app-footer__links a,
.app-footer__links router-link { color: var(--color-text-on-dark); opacity: 0.8; text-decoration: none; transition: opacity var(--transition-fast); }
.app-footer__links a:hover,
.app-footer__links router-link:hover { opacity: 1; text-decoration: underline; }

.app-footer__credits {
  margin-top: var(--space-10);
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-border-on-dark);
  opacity: 0.2;
}
.app-footer__credit {
  margin: 0;
  font-size: var(--text-xs);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.app-footer__refs {
  margin-top: var(--space-4);
  font-size: var(--text-xs);
  line-height: 1.8;
  opacity: 0.55;
}
.app-footer__ref { margin: 0; }
.app-footer__ref em { font-style: italic; }

@media (max-width: 720px) {
  .app-footer__inner { padding: var(--space-8) var(--space-4) 0; flex-direction: column; }
  .app-footer__links { font-size: var(--text-xs); }
  .app-footer__refs { font-size: 0.6rem; }
}
</style>