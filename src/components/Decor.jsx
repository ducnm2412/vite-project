const LEAF = 'M0 0C7-6 19-7 28 0C19 7 7 6 0 0Z'

/* Cành lá vẽ bằng SVG — dùng làm hoạ tiết ở mép các section */
export function Branch({ className = '', leaves = 9, flip = false, tone = 'var(--leaf)' }) {
  const items = Array.from({ length: leaves }, (_, i) => {
    const t = i / (leaves - 1)
    const y = 230 - t * 210
    const x = 60 + Math.sin(t * 2.4) * 14
    const side = i % 2 === 0 ? 1 : -1
    const scale = 1.25 - t * 0.6
    const angle = side === 1 ? -35 - t * 20 : 215 + t * 20
    return (
      <path
        key={i}
        d={LEAF}
        transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}
        fill={tone}
        opacity={0.75 + (i % 3) * 0.08}
      />
    )
  })
  return (
    <svg
      className={`branch ${className}`}
      viewBox="0 0 120 250"
      aria-hidden="true"
      style={{
        // lệch pha để các cành không đung đưa cùng nhịp
        animationDelay: `-${leaves * 0.9}s`,
        animationDuration: `${6 + (leaves % 4)}s`,
      }}
    >
      {/* lật trong SVG (không dùng CSS transform) để không đè lên animation đung đưa */}
      <g transform={flip ? 'matrix(-1 0 0 1 120 0)' : undefined}>
        <path
          d="M58 248C62 190 76 120 70 60 68 40 64 28 62 18"
          fill="none"
          stroke={tone}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {items}
      </g>
    </svg>
  )
}

/* Lá rơi lững lờ — chỉ dùng trong hero */
const FALLING = [
  { left: 8, size: 18, dur: 19, delay: 0, drift: 60 },
  { left: 22, size: 13, dur: 24, delay: -9, drift: -40 },
  { left: 41, size: 16, dur: 21, delay: -15, drift: 80 },
  { left: 58, size: 12, dur: 26, delay: -4, drift: -60 },
  { left: 73, size: 17, dur: 22, delay: -12, drift: 50 },
  { left: 88, size: 14, dur: 25, delay: -19, drift: -30 },
]

export function FallingLeaves() {
  return (
    <div className="falling" aria-hidden="true">
      {FALLING.map((l, i) => (
        <span
          key={i}
          style={{
            left: `${l.left}%`,
            '--size': `${l.size}px`,
            '--drift': `${l.drift}px`,
            animationDuration: `${l.dur}s`,
            animationDelay: `${l.delay}s`,
          }}
        >
          <svg viewBox="-2 -8 32 16">
            <path d={LEAF} fill={i % 2 ? '#c9d6b4' : '#a9bd98'} />
          </svg>
        </span>
      ))}
    </div>
  )
}

/* Khóm hoa trắng nhỏ */
export function Blossoms({ className = '' }) {
  const flower = (cx, cy, r) => (
    <g transform={`translate(${cx} ${cy})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} rx={r * 0.45} ry={r} transform={`rotate(${a}) translate(0 ${-r * 0.9})`} fill="#fbf8f1" stroke="var(--leaf)" strokeWidth="0.8" />
      ))}
      <circle r={r * 0.4} fill="#d8b75a" />
    </g>
  )
  return (
    <svg className={`blossoms ${className}`} viewBox="0 0 120 140" aria-hidden="true">
      <g stroke="var(--leaf)" strokeWidth="1.3" fill="none" strokeLinecap="round">
        <path d="M60 138C60 110 58 80 40 44" />
        <path d="M60 138C62 104 70 74 86 52" />
        <path d="M60 138C60 112 60 92 62 70" />
      </g>
      <path d={LEAF} transform="translate(58 112) rotate(-150) scale(1)" fill="var(--leaf)" opacity=".8" />
      <path d={LEAF} transform="translate(61 104) rotate(-30) scale(.9)" fill="var(--leaf)" opacity=".8" />
      {flower(40, 40, 9)}
      {flower(87, 48, 8)}
      {flower(62, 66, 6)}
    </svg>
  )
}

const ICONS = {
  leaf: <path d="M5 19C5 10 11 5 20 4c0 9-5 15-14 15m0 0 7-7" />,
  wood: (
    <>
      <rect x="4" y="5" width="16" height="14" rx="1.5" />
      <path d="M4 10h16M4 14.5h16M9 5v5M15 10v4.5M11 14.5V19" />
    </>
  ),
  moon: <path d="M19 14.5A7.5 7.5 0 1 1 9.5 5a6 6 0 0 0 9.5 9.5Z" />,
  cup: (
    <>
      <path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V9Z" />
      <path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16M9 3.5c-.8 1 .8 2 0 3M12.5 3.5c-.8 1 .8 2 0 3" />
    </>
  ),
  book: <path d="M4 5.5C6.5 4.5 9.5 4.5 12 6c2.5-1.5 5.5-1.5 8-.5V19c-2.5-1-5.5-1-8 .5-2.5-1.5-5.5-1.5-8-.5V5.5ZM12 6v13.5" />,
  sprout: <path d="M12 20v-8m0 0C12 8 9 6 5 6c0 4 3 6 7 6Zm0-1c0-3.5 2.5-6 7-6 0 4-3 6-7 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  'arrow-right': <path d="M5 12h14m-5-5 5 5-5 5" />,
  bike: (
    <>
      <circle cx="6" cy="16" r="3.5" />
      <circle cx="18" cy="16" r="3.5" />
      <path d="M6 16l4-7h5l3 7M10 9l2 7h-6M14 6h2.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  phone: <path d="M6.5 4h3l1.5 4-2 1.3a10 10 0 0 0 5.7 5.7l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  'chevron-left': <path d="M14.5 6 8.5 12l6 6" />,
  'chevron-right': <path d="m9.5 6 6 6-6 6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
}

export function Icon({ name, size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  )
}

/* Chữ thương hiệu theo logo: mái nhà trên chữ TỊNH, "House" viết tay bên cạnh */
export function Brand({ className = '' }) {
  return (
    <span className={`brand ${className}`}>
      <span className="brand__mark">
        <svg className="brand__roof" viewBox="0 0 60 22" aria-hidden="true">
          <path d="M4 20 30 4l26 16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M44 12V3h5v12" fill="none" stroke="currentColor" strokeWidth="2.6" />
          <path d="M26.5 10.5h3v3h-3zM30.5 10.5h3v3h-3zM26.5 14.5h3v3h-3zM30.5 14.5h3v3h-3z" fill="currentColor" />
        </svg>
        <span className="brand__name">TỊNH</span>
      </span>
      <span className="brand__script">House</span>
    </span>
  )
}
