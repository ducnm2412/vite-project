import { useEffect } from 'react'

// Chữ, thẻ: mờ dần hiện lên + nhích từ dưới lên
const FADE = [
  '.section-head',
  '.about__text',
  '.room-card',
  '.exp-panel__text > *',
  '.review',
  '.faq-item',
  '.contact__head',
  '.contact__info',
  '.booking-card',
]
// Ảnh lớn: mở ra từ giữa như kéo rèm. Theo dõi khung chứa (ảnh bị cắt về 0
// thì trình duyệt không báo là đã vào màn hình), khung hiện thì mở mọi ảnh bên trong
const CURTAIN_GROUPS = ['.about__media', '.exp-panel__media', '.gallery__grid']
// slider: card chưa vuốt tới vẫn phải hiện cùng hàng
const TRACKS = '.rooms__grid, .reviews'

/*
 * Hiệu ứng hiện dần khi cuộn tới. Class chỉ được gắn bằng JS, nên nếu JS lỗi
 * thì nội dung vẫn hiện bình thường. Khi máy bật giảm chuyển động, CSS chỉ giữ
 * hiệu ứng mờ dần (không nhích, không kéo rèm).
 */
export default function useReveal(containerRef) {
  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const mark = (selectors, cls) =>
      selectors.flatMap((sel) =>
        Array.from(root.querySelectorAll(sel)).map((el) => {
          // các phần tử cùng hàng hiện lần lượt
          const siblings = Array.from(el.parentElement.children).filter((c) => c.matches(sel))
          el.style.setProperty('--reveal-i', Math.min(siblings.indexOf(el), 5))
          el.classList.add(cls)
          return el
        }),
      )

    const fades = mark(FADE, 'reveal')
    const groups = CURTAIN_GROUPS.flatMap((sel) => Array.from(root.querySelectorAll(sel)))
    groups.forEach((group) =>
      Array.from(group.querySelectorAll('img')).forEach((img, i) => {
        img.style.setProperty('--reveal-i', i)
        img.classList.add('reveal-curtain')
      }),
    )
    const targets = [...fades, ...groups]

    const show = (el) => {
      if (groups.includes(el)) {
        el.querySelectorAll('.reveal-curtain').forEach((img) => img.classList.add('is-visible'))
      } else if (el.parentElement.matches(TRACKS)) {
        Array.from(el.parentElement.children).forEach((card) => {
          card.classList.add('is-visible')
          io.unobserve(card)
        })
      } else {
        el.classList.add('is-visible')
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          show(entry.target)
          io.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 },
    )
    targets.forEach((el) => io.observe(el))

    // nhảy thẳng xuống (bấm menu) hoặc cuộn quá nhanh trên máy yếu: phần tử bị lướt
    // qua không bao giờ "giao" với màn hình nên IntersectionObserver không báo —
    // kiểm tra khi cuộn và cho hiện mọi phần tử đã nằm phía trên mép dưới màn hình
    let frame = 0
    const catchUp = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const limit = window.innerHeight * 0.88
        targets.forEach((el) => {
          if (el.dataset.revealed) return
          if (el.getBoundingClientRect().top < limit) {
            el.dataset.revealed = '1'
            show(el)
            io.unobserve(el)
          }
        })
      })
    }
    window.addEventListener('scroll', catchUp, { passive: true })

    return () => {
      window.removeEventListener('scroll', catchUp)
      cancelAnimationFrame(frame)
      targets.forEach((el) => delete el.dataset.revealed)
      io.disconnect()
      root
        .querySelectorAll('.reveal, .reveal-curtain')
        .forEach((el) => el.classList.remove('reveal', 'reveal-curtain', 'is-visible'))
    }
  }, [containerRef])
}
