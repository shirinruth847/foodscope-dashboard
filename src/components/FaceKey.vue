<script setup>
import { FEATURE } from '../lib/chernoff'

defineEmits(['hl'])

const LABEL = {
  mouthCurve: ['Mouth curve (smile to frown)', 'mouth'], eyeSize: ['Eye size', 'eye'],
  mouthWidth: ['Mouth width', 'mouth'], noseLen: ['Nose length', 'nose'],
  faceW: ['Face width', 'head'], browH: ['Eyebrow height', 'brow'],
  earSize: ['Ear size', 'ear'], pupil: ['Pupil size', 'pupil'],
  eyeGap: ['Eye spacing', 'eye'], faceH: ['Face height', 'head'], noseW: ['Nose width', 'nose']
}
const NAMES = { 'Other': 'Other (stimulants, spices, alcohol, misc.)' }
const rows = Object.entries(FEATURE).map(([group, f]) => ({
  group: NAMES[group] || group, feature: LABEL[f][0], part: LABEL[f][1]
}))
</script>

<template>
  <div class="face-key">
    <h3>Which feature shows which food group</h3>
    <table>
      <thead><tr><th>Food group</th><th>Feature</th></tr></thead>
      <tbody>
        <tr v-for="r in rows" :key="r.group" tabindex="0"
            @mouseenter="$emit('hl', r.part)" @mouseleave="$emit('hl', null)"
            @focus="$emit('hl', r.part)" @blur="$emit('hl', null)">
          <td>{{ r.group }}</td><td>{{ r.feature }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.face-key table { border-collapse: collapse; margin: 12px 0 }
.face-key td, .face-key th { padding: 4px 12px; border-bottom: 1px solid #ddd; text-align: left }
.face-key tr:hover, .face-key tr:focus { background: #fdf0e6; outline: none }
.hl-mouth .mouth, .hl-nose .nose, .hl-brow .brow, .hl-eye .eye,
.hl-ear .ear, .hl-head .head { stroke: #d9480f !important; stroke-width: 4 }
.hl-pupil .pupil { fill: #d9480f }
</style>