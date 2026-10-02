import { useCallback, useEffect, useRef, useState } from 'react'

/*
 * Slider dựa trên scroll-snap của CSS:
 * - theo dõi slide đang hiện từ vị trí cuộn
 * - prev/next/goTo cuộn mượt tới slide
 * - tự trượt khi người dùng không thao tác (dừng khi chạm, rê chuột, focus,
 *   khi slider ra khỏi màn hình hoặc tab bị ẩn; chạy thưa hơn nếu giảm chuyển động)
 * Chỉ hoạt động khi danh sách thật sự cuộn được (mobile/tablet).
 */
export default function useCarousel(count, { interval = 4500, resumeAfter = 6000 } = {}) {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [scrollable, setScrollable] = useState(false)
  const pausedUntil = useRef(0)
  const hovering = useRef(false)
  const visible = useRef(false)

  const goTo = useCallback(
    (i) => {
      const track = trackRef.current
      if (!track) return
      const next = (i + count) % count
      const slide = track.children[next]
      const padding = parseFloat(getComputedStyle(track).paddingLeft) || 0
      track.scrollTo({ left: slide.offsetLeft - padding, behavior: 'smooth' })
    },
    [count],
  )

  const pause = useCallback(() => {
    pausedUntil.current = Date.now() + resumeAfter
  }, [resumeAfter])

  const prev = useCallback(() => {
    pause()
    goTo(index - 1)
  }, [goTo, index, pause])

  const next = useCallback(() => {
    pause()
    goTo(index + 1)
  }, [goTo, index, pause])

  // slide hiện tại + có cuộn được hay không
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const measure = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        setScrollable(track.scrollWidth > track.clientWidth + 4)
        const padding = parseFloat(getComputedStyle(track).paddingLeft) || 0
        let nearest = 0
        let best = Infinity
        Array.from(track.children).forEach((child, i) => {
          const d = Math.abs(child.offsetLeft - padding - track.scrollLeft)
          if (d < best) {
            best = d
            nearest = i
          }
        })
        setIndex(nearest)
      })
    }
    measure()
    track.addEventListener('scroll', measure, { passive: true })
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener('scroll', measure)
      ro.disconnect()
    }
  }, [])

  // người dùng thao tác thì tạm dừng tự trượt
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    // chỉ tính "đang rê" với chuột thật: chạm trên điện thoại sinh mouseenter giả
    // nhưng không có mouseleave, khiến slider dừng tự trượt mãi mãi
    const onEnter = (e) => {
      if (e.pointerType === 'mouse') hovering.current = true
    }
    const onLeave = () => (hovering.current = false)
    const io = new IntersectionObserver(([entry]) => (visible.current = entry.isIntersecting), {
      threshold: 0.5,
    })
    io.observe(track)
    track.addEventListener('pointerdown', pause)
    track.addEventListener('touchstart', pause, { passive: true })
    track.addEventListener('wheel', pause, { passive: true })
    track.addEventListener('focusin', pause)
    track.addEventListener('pointerenter', onEnter)
    track.addEventListener('pointerleave', onLeave)
    return () => {
      io.disconnect()
      track.removeEventListener('pointerdown', pause)
      track.removeEventListener('touchstart', pause)
      track.removeEventListener('wheel', pause)
      track.removeEventListener('focusin', pause)
      track.removeEventListener('pointerenter', onEnter)
      track.removeEventListener('pointerleave', onLeave)
    }
  }, [pause])

  // tự trượt
  useEffect(() => {
    if (!scrollable) return
    // giảm chuyển động (thường do tiết kiệm pin tự bật): vẫn tự trượt nhưng thưa hơn
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const id = setInterval(() => {
      if (document.hidden || !visible.current || hovering.current) return
      if (Date.now() < pausedUntil.current) return
      goTo(index + 1)
    }, reduced ? interval * 1.8 : interval)
    return () => clearInterval(id)
  }, [scrollable, index, interval, goTo])

  return { trackRef, index, scrollable, prev, next, goTo: (i) => (pause(), goTo(i)) }
}
