import { useEffect } from 'react'

/*
 * Tạm dừng animation của các khối đang nằm ngoài màn hình (hero, dải chữ chạy,
 * từng section) để máy yếu chỉ phải vẽ phần người xem đang nhìn thấy.
 * CSS dùng thuộc tính data-offscreen để đặt animation-play-state: paused.
 */
export default function usePauseOffscreen(containerRef) {
  useEffect(() => {
    const root = containerRef.current
    if (!root || typeof IntersectionObserver !== 'function') return
    const blocks = Array.from(root.querySelectorAll(':scope > section, :scope > .marquee'))
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.removeAttribute('data-offscreen')
          else e.target.setAttribute('data-offscreen', '')
        }),
      // chạy lại sớm một chút trước khi khối vào màn hình
      { rootMargin: '150px 0px' },
    )
    blocks.forEach((el) => io.observe(el))
    return () => {
      io.disconnect()
      blocks.forEach((el) => el.removeAttribute('data-offscreen'))
    }
  }, [containerRef])
}
