export const FEATURE = {
    'Cereals': 'mouthCurve', 'Dairy/Eggs': 'eyeSize', 'Fish/Seafood': 'mouthWidth',
    'Fruits': 'noseLen', 'Meat/Animal Fats': 'faceW', 'Oilcrops/Oils': 'browH',
    'Other': 'earSize', 'Pulses/Nuts': 'pupil', 'Starchy Roots': 'eyeGap',
    'Sugar': 'faceH', 'Vegetables': 'noseW'
  }
export const clamp = (x, a, b) => Math.max(a, Math.min(b, x))
export const toT = (v, m) => (v > 0 && m > 0) ? clamp(Math.log2(v / m) / 2, -1, 1) : 0
  
export function drawFace(g, f) {
   const s = (base, k, key) => base * (1 + k * f[key])
   const W = s(60, 0.35, 'faceW'), H = s(75, 0.3, 'faceH')
   const eyeR = s(9, 0.5, 'eyeSize'), gap = s(22, 0.4, 'eyeGap')
   const pupilR = Math.min(eyeR * 0.9, s(eyeR * 0.45, 0.6, 'pupil'))
   const eyeY = -H * 0.25, browY = eyeY - eyeR - 7 - 8 * f.browH
   const noseL = s(16, 0.6, 'noseLen'), noseW = s(8, 0.5, 'noseW')
   const mouthW = s(24, 0.5, 'mouthWidth'), mouthY = H * 0.5, curve = 14 * f.mouthCurve
   const earR = s(8, 0.6, 'earSize')
 
   g.append('ellipse').attr('rx', earR).attr('ry', earR * 1.3).attr('cx', -W).attr('class', 'ear')
   g.append('ellipse').attr('rx', earR).attr('ry', earR * 1.3).attr('cx', W).attr('class', 'ear')
   g.append('ellipse').attr('rx', W).attr('ry', H).attr('class', 'head')
   for (const sx of [-1, 1]) {
     g.append('circle').attr('cx', sx * gap).attr('cy', eyeY).attr('r', eyeR).attr('class', 'eye')
     g.append('circle').attr('cx', sx * gap).attr('cy', eyeY).attr('r', pupilR).attr('class', 'pupil')
     g.append('line').attr('x1', sx * gap - 12).attr('x2', sx * gap + 12)
       .attr('y1', browY).attr('y2', browY).attr('class', 'brow')
   }
   g.append('path').attr('class', 'nose')
     .attr('d', `M0,${-5} L${-noseW},${-5 + noseL} L${noseW},${-5 + noseL}`)
   g.append('path').attr('class', 'mouth')
     .attr('d', `M${-mouthW},${mouthY} Q0,${mouthY + 2 * curve} ${mouthW},${mouthY}`)
 }
  