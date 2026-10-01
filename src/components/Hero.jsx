import { IMAGES, MARQUEE } from '../data'
import { FallingLeaves } from './Decor'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__media">
        <img className="hero__bg" src={IMAGES.bamboo} alt="" fetchPriority="high" />
        <div className="hero__shade" aria-hidden="true" />
        <div className="hero__light" aria-hidden="true" />
        <FallingLeaves />
      </div>

      <div className="container hero__content">
        <p className="hero__kicker">Homestay · Lưu trú giữa vườn xanh</p>
        <h1 className="hero__title">Một chốn tĩnh lặng, xanh mát và mộc mạc</h1>
        <p className="hero__lead">
          Gỗ, tre và cây xanh – nơi bạn chậm lại, nghỉ ngơi và tìm về sự bình yên.
        </p>
      </div>

      <a href="#gioi-thieu" className="hero__scroll" aria-label="Cuộn xuống phần giới thiệu">
        <span aria-hidden="true" />
      </a>
    </section>
  )
}

/* Dải chữ chạy ngang ngay dưới hero */
export function Marquee() {
  const row = MARQUEE.map((word) => (
    <span key={word}>
      {word}
      <i aria-hidden="true">✦</i>
    </span>
  ))
  return (
    <div className="marquee" role="note" aria-label={MARQUEE.join(', ')}>
      <div className="marquee__track" aria-hidden="true">
        <div className="marquee__group">{row}</div>
        <div className="marquee__group">{row}</div>
      </div>
    </div>
  )
}
