<script setup>
import { computed, nextTick, ref } from 'vue'
import { FOODS, formatShare, getQuiz, getStats } from './data.js'

const props = defineProps({ data: { type: Object, required: true } })
const emit = defineEmits(['select', 'continue'])
const questions = getQuiz(props.data)
const index = ref(0)
const selected = ref(null)
const score = ref(0)
const announcement = ref('')
const questionHeading = ref(null)
const scoreHeading = ref(null)
const question = computed(() => questions[index.value])
const answered = computed(() => selected.value !== null)
const stats = computed(() => question.value && getStats(props.data, question.value.commodity, question.value.year))
const segments = computed(() => {
  if (!stats.value) return []
  const suppliers = stats.value.suppliers
  return [
    ...suppliers.slice(0, 3),
    { partner: 'Others', share: suppliers.slice(3).reduce((total, supplier) => total + supplier.share, 0) },
  ]
})
const segmentColours = ['var(--d5-supplier-1)', 'var(--d5-supplier-2)', 'var(--d5-supplier-3)', 'var(--d5-supplier-other)']
const barLabel = computed(() => segments.value.map((segment) => `${segment.partner}: ${formatShare(segment.share)}%`).join('; '))

function answer(option) {
  if (answered.value) return
  selected.value = option
  const correct = option === question.value.answer
  if (correct) score.value += 1
  announcement.value = `${correct ? 'Correct.' : `The correct answer is ${question.value.answer}.`} ${formatShare(stats.value.share)}% of ${question.value.commodity.toLowerCase()} imports came from ${stats.value.partner} in ${stats.value.year}. ${question.value.explanation}`
}

async function nextQuestion() {
  index.value += 1
  selected.value = null
  if (!question.value) announcement.value = `Quiz complete. You got ${score.value} of ${questions.length}.`
  await nextTick()
  const heading = questionHeading.value ?? scoreHeading.value
  heading?.focus({ preventScroll: true })
}

async function restart() {
  index.value = 0
  selected.value = null
  score.value = 0
  announcement.value = ''
  await nextTick()
  questionHeading.value?.focus({ preventScroll: true })
}
</script>

<template>
  <div class="import-quiz">
    <div class="quiz-panel">
      <template v-if="question">
        <div class="quiz-progress">
          <span>Question {{ index + 1 }} of {{ questions.length }}</span>
          <span class="quiz-progress-dots" aria-hidden="true">
            <i v-for="(_, dotIndex) in questions" :key="dotIndex" :class="{ 'is-current': dotIndex <= index }" />
          </span>
        </div>
        <span class="quiz-food" aria-hidden="true">{{ FOODS[question.commodity] }}</span>
        <h3 id="quiz-question" ref="questionHeading" tabindex="-1">{{ question.question }}</h3>
        <div class="quiz-options" role="group" aria-labelledby="quiz-question">
          <button
            v-for="option in question.options"
            :key="option"
            type="button"
            class="quiz-option"
            :data-answer="option"
            :disabled="answered"
            :class="{
              'is-correct': answered && option === question.answer,
              'is-wrong': answered && option === selected && option !== question.answer,
            }"
            @click="answer(option)"
          >
            <span>{{ option }}</span>
            <span v-if="answered && option === question.answer" class="answer-mark" aria-hidden="true">✓ Correct</span>
            <span v-else-if="answered && option === selected" class="answer-mark" aria-hidden="true">✕ Your guess</span>
          </button>
        </div>
        <div v-if="answered" id="quiz-result" class="quiz-result">
          <p class="answer-kicker">{{ selected === question.answer ? 'You got it.' : 'A surprising answer.' }} {{ stats.partner }} · {{ stats.year }}</p>
          <p class="answer-number">{{ formatShare(stats.share) }}% <small>of {{ question.commodity.toLowerCase() }} imports</small></p>
          <p class="answer-explanation">{{ question.explanation }}</p>
          <div class="mini-bar" role="img" :aria-label="barLabel">
            <span v-for="(segment, segmentIndex) in segments" :key="segment.partner" :style="{ flex: segment.share, background: segmentColours[segmentIndex] }" />
          </div>
          <div class="mini-legend">
            <span v-for="(segment, segmentIndex) in segments" :key="segment.partner">
              <i :style="{ background: segmentColours[segmentIndex] }" aria-hidden="true" />
              {{ segment.partner }} {{ formatShare(segment.share) }}%
            </span>
          </div>
          <div class="quiz-buttons">
            <button id="quiz-map" type="button" class="secondary" @click="emit('select', ...question.target)">
              See it on the map{{ question.target[1] !== question.year ? ` · ${question.target[1]}` : '' }} →
            </button>
            <button id="quiz-next" type="button" @click="nextQuestion">
              {{ index === questions.length - 1 ? 'See my score' : 'Next question →' }}
            </button>
          </div>
        </div>
      </template>
      <template v-else>
        <p class="answer-kicker">Your food origins quiz</p>
        <h3 id="quiz-score" ref="scoreHeading" tabindex="-1">You got {{ score }} of {{ questions.length }}</h3>
        <p class="score" aria-hidden="true">🍚 🥚 🍗</p>
        <p>Now follow the routes behind those answers—and see what happens when one supplier dominates.</p>
        <div class="quiz-buttons">
          <button id="read-story" type="button" @click="emit('continue')">Read the full story ↓</button>
          <button id="quiz-restart" type="button" class="secondary" @click="restart">Try again</button>
        </div>
      </template>
    </div>
    <p class="sr-only" aria-live="polite" aria-atomic="true">{{ announcement }}</p>
  </div>
</template>

<style scoped>
button {
  padding: 10px 18px;
  border: 1px solid var(--forest);
  border-radius: var(--radius-sm);
  background: var(--forest);
  color: #fff;
  font: inherit;
  cursor: pointer;
}
button:disabled { cursor: default; }
.secondary { background: transparent; color: var(--forest); }
.quiz-panel { padding: clamp(22px, 4vw, 44px); border: 1px solid var(--line); border-radius: var(--radius); background: var(--paper); }
.quiz-progress { display: flex; justify-content: space-between; gap: 16px; color: var(--ink-soft); font-size: 14px; }
.quiz-progress-dots { display: flex; align-items: center; gap: 7px; }
.quiz-progress-dots i { width: 30px; height: 4px; background: var(--line); border-radius: 2px; }
.quiz-progress-dots i.is-current { background: var(--forest); }
.quiz-food { display: block; margin-block: 18px 8px; font-size: 40px; line-height: 1.2; }
h3 { max-width: 34ch; font-size: clamp(25px, 2.7vw, 36px); }
.quiz-options { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; max-width: 760px; margin-top: 25px; }
.quiz-option { display: flex; justify-content: space-between; align-items: center; gap: 12px; min-height: 58px; padding: 12px 18px; border-color: var(--line); background: #fff; color: var(--forest); text-align: left; }
.quiz-option:not(:disabled):hover { border-color: var(--forest); background: var(--sage-tint); }
.quiz-option.is-correct { border-color: var(--d5-correct); background: var(--d5-correct-tint); color: var(--d5-correct); }
.quiz-option.is-wrong { border-color: var(--d5-wrong); background: var(--d5-wrong-tint); color: var(--d5-wrong); }
.answer-mark { font-size: 13px; font-weight: bold; }
.quiz-result { margin-top: 28px; padding-top: 25px; border-top: 1px solid var(--line); }
.answer-kicker { color: var(--ink-soft); font-size: 14px; }
.answer-number { margin-block: 5px; color: var(--forest); font-size: 54px; line-height: 1.2; }
.answer-number small { font-size: 20px; }
.answer-explanation { max-width: 70ch; margin-block: 12px 20px; }
.mini-bar { display: flex; overflow: hidden; height: 16px; border-radius: 3px; background: var(--line); }
.mini-bar span { min-width: 0; }
.mini-legend { display: flex; flex-wrap: wrap; gap: 6px 24px; margin-top: 9px; font-size: 14px; }
.mini-legend i { display: inline-block; width: 9px; height: 9px; margin-right: 6px; border-radius: 2px; }
.quiz-buttons { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
.score { margin-block: 20px; font-size: 48px; }
@media (max-width: 599px) {
  .quiz-options { grid-template-columns: minmax(0, 1fr); }
  .quiz-buttons > button { width: 100%; }
}
</style>
