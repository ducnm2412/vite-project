import { Blossoms, Branch } from './Decor'

const LEAF = 'M0 0C7-6 19-7 28 0C19 7 7 6 0 0Z'

/* Cụm cỏ: mỗi ngọn đung đưa quanh gốc, lệch nhịp nhau */
function Grass({ blades = 11, tone }) {
  return (
    <svg className="grass" viewBox="0 0 120 120" aria-hidden="true">
      {Array.from({ length: blades }, (_, i) => {
        const x = 8 + (i * 104) / (blades - 1)
        const h = 55 + ((i * 37) % 55)
        const lean = ((i * 53) % 34) - 17
        const d = `M${x - 3} 120Q${x + lean * 0.3} ${120 - h * 0.6} ${x + lean} ${120 - h}Q${x + lean * 0.3 + 2} ${
          120 - h * 0.55
        } ${x + 3} 120Z`
        return (
          <path
            key={i}
            d={d}
            fill={tone}
            className="grass__blade"
            style={{ animationDelay: `-${(i * 0.7) % 4}s`, animationDuration: `${3.4 + (i % 3) * 0.8}s` }}
          />
        )
      })}
    </svg>
  )
}

/* Vài chiếc lá bay lơ lửng trong một vùng */
function DriftLeaves({ count = 4, tone }) {
  return (
    <span className="drift" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <svg
          key={i}
          viewBox="-2 -8 32 16"
          style={{
            left: `${(i * 29) % 90}%`,
            top: `${(i * 41) % 80}%`,
            width: `${14 + (i % 3) * 5}px`,
            animationDelay: `-${i * 3.1}s`,
            animationDuration: `${14 + (i % 3) * 4}s`,
          }}
        >
          <path d={LEAF} fill={tone} />
        </svg>
      ))}
    </span>
  )
}

const DARK = '#4f7a45'
const DARK_2 = '#5f8c52'
const ON_LIME = '#8fb85a'

/*
 * Bố cục hoa lá cho từng section. Vị trí và kích thước dùng clamp/vw nên tự co
 * theo màn hình; `hideSm` ẩn bớt trên điện thoại cho đỡ rối.
 */
const PRESETS = {
  about: [
    { kind: 'fern', tone: DARK, style: { left: '-28px', bottom: '-12px', width: 'clamp(90px, 11vw, 150px)', transform: 'rotate(14deg)' } },
    { kind: 'grass', tone: DARK_2, style: { right: '3%', bottom: 0, width: 'clamp(110px, 13vw, 180px)' } },
    { kind: 'drift', tone: DARK_2, hideSm: true, style: { right: '6%', top: '8%', width: '22%', height: '40%' } },
  ],
  rooms: [
    { kind: 'grass', tone: DARK, style: { left: '1%', bottom: 0, width: 'clamp(100px, 12vw, 170px)' } },
    { kind: 'fern', tone: DARK_2, flip: true, hideSm: true, style: { right: '-22px', top: '6%', width: 'clamp(90px, 10vw, 140px)' } },
    { kind: 'flower', style: { right: '4%', bottom: '4px', width: 'clamp(46px, 5vw, 70px)', opacity: 0.45 } },
  ],
  experience: [
    { kind: 'fern', tone: DARK, style: { left: '-26px', top: '12%', width: 'clamp(90px, 10vw, 150px)' } },
    { kind: 'grass', tone: DARK_2, style: { right: '2%', bottom: 0, width: 'clamp(100px, 12vw, 170px)' } },
  ],
  gallery: [
    { kind: 'flower', style: { left: '2%', bottom: '6px', width: 'clamp(50px, 5.5vw, 78px)', opacity: 0.5 } },
    { kind: 'drift', tone: DARK_2, style: { left: '30%', top: '4%', width: '40%', height: '30%' } },
    { kind: 'grass', tone: DARK, hideSm: true, style: { right: '1%', bottom: 0, width: 'clamp(100px, 11vw, 160px)' } },
  ],
  testimonials: [
    { kind: 'fern', tone: DARK, flip: true, style: { right: '-24px', top: '18%', width: 'clamp(90px, 11vw, 160px)' } },
    { kind: 'grass', tone: DARK_2, hideSm: true, style: { left: '3%', bottom: 0, width: 'clamp(100px, 11vw, 160px)' } },
  ],
  faq: [
    { kind: 'grass', tone: DARK, style: { right: '4%', bottom: 0, width: 'clamp(90px, 10vw, 150px)' } },
    { kind: 'flower', hideSm: true, style: { left: '1%', bottom: '4px', width: 'clamp(44px, 4.5vw, 64px)', opacity: 0.4 } },
  ],
  contact: [
    { kind: 'grass', tone: ON_LIME, style: { left: '2%', bottom: 0, width: 'clamp(110px, 13vw, 190px)' } },
    { kind: 'drift', tone: ON_LIME, style: { left: '8%', top: '6%', width: '30%', height: '35%' } },
  ],
}

export default function Flora({ preset }) {
  return (
    <div className="flora" aria-hidden="true">
      {PRESETS[preset].map((item, i) => {
        const cls = `flora__item flora__item--${item.kind}${item.hideSm ? ' flora__item--hide-sm' : ''}`
        return (
          <span key={i} className={cls} style={item.style}>
            {item.kind === 'fern' && <Branch leaves={10} tone={item.tone} flip={item.flip} />}
            {item.kind === 'grass' && <Grass tone={item.tone} />}
            {item.kind === 'flower' && <Blossoms />}
            {item.kind === 'drift' && <DriftLeaves tone={item.tone} />}
          </span>
        )
      })}
    </div>
  )
}
