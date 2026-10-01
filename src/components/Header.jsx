import { useEffect, useState } from 'react'
import { NAV } from '../data'
import { Brand, Icon } from './Decor'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`header${scrolled || open ? ' header--solid' : ''}`}>
      <div className="container header__inner">
        <a href="#top" className="logo" aria-label="TỊNH House – về đầu trang">
          <Brand />
        </a>

        <nav id="main-nav" className={`nav${open ? ' nav--open' : ''}`} aria-label="Điều hướng chính">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href="#lien-he" className="btn btn--lime nav__cta-mobile" onClick={() => setOpen(false)}>
            Đặt phòng
          </a>
        </nav>

        <a href="#lien-he" className="btn btn--lime header__cta">
          Đặt phòng
        </a>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? 'Đóng menu' : 'Mở menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} size={22} />
        </button>
      </div>
    </header>
  )
}
