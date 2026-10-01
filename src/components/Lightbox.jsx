import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { PHOTOS } from '../data'
import { Icon } from './Decor'

const LightboxContext = createContext(() => {})

export function LightboxProvider({ children }) {
  const [index, setIndex] = useState(null)
  const open = useCallback((i) => setIndex(i), [])

  return (
    <LightboxContext.Provider value={open}>
      {children}
      {index !== null && <Lightbox index={index} onChange={setIndex} onClose={() => setIndex(null)} />}
    </LightboxContext.Provider>
  )
}

/* Ảnh bấm được để xem toàn màn hình. `photo` là vị trí trong PHOTOS */
export function Photo({ photo, className, ...rest }) {
  const open = useContext(LightboxContext)
  const { src, alt } = PHOTOS[photo]
  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      open(photo)
    }
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`zoomable${className ? ` ${className}` : ''}`}
      role="button"
      tabIndex={0}
      aria-label={`Xem ảnh lớn: ${alt}`}
      onClick={() => open(photo)}
      onKeyDown={onKeyDown}
      {...rest}
    />
  )
}

function Lightbox({ index, onChange, onClose }) {
  const dialogRef = useRef(null)
  const startX = useRef(null)
  const count = PHOTOS.length
  const { src, alt } = PHOTOS[index]

  const go = useCallback((step) => onChange((index + step + count) % count), [index, count, onChange])

  // mở modal, khóa cuộn trang, trả focus về ảnh đã bấm khi đóng
  useEffect(() => {
    const dialog = dialogRef.current
    const opener = document.activeElement
    const html = document.documentElement
    const prevOverflow = html.style.overflow
    html.style.overflow = 'hidden'
    dialog.showModal()
    return () => {
      html.style.overflow = prevOverflow
      if (dialog.open) dialog.close()
      opener?.focus?.({ preventScroll: true })
    }
  }, [])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  // vuốt trái/phải trên điện thoại
  const onPointerDown = (e) => {
    startX.current = e.clientX
  }
  const onPointerUp = (e) => {
    if (startX.current === null) return
    const dx = e.clientX - startX.current
    startX.current = null
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
  }

  // bấm ra vùng tối quanh ảnh để đóng
  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label="Xem ảnh toàn màn hình"
      onCancel={(e) => {
        e.preventDefault()
        onClose()
      }}
      onKeyDown={onKeyDown}
      onClick={onBackdropClick}
    >
      <div
        className="lightbox__stage"
        onClick={onBackdropClick}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <img key={src} className="lightbox__img" src={src} alt={alt} draggable="false" />
      </div>

      <p className="lightbox__caption">
        <span>{alt}</span>
        <span className="lightbox__count">
          {index + 1} / {count}
        </span>
      </p>

      <button type="button" className="lightbox__btn lightbox__close" onClick={onClose} aria-label="Đóng" autoFocus>
        <Icon name="close" size={22} />
      </button>
      <button type="button" className="lightbox__btn lightbox__prev" onClick={() => go(-1)} aria-label="Ảnh trước">
        <Icon name="chevron-left" size={24} />
      </button>
      <button type="button" className="lightbox__btn lightbox__next" onClick={() => go(1)} aria-label="Ảnh tiếp theo">
        <Icon name="chevron-right" size={24} />
      </button>
    </dialog>
  )
}
