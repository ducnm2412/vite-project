import { useState } from 'react'
import { CONTACT, EXPERIENCES, FAQS, HIGHLIGHTS, IMAGES, REVIEWS, ROOMS } from '../data'
import { Blossoms, Branch, Eyebrow, Icon } from './Decor'
import useCarousel from '../hooks/useCarousel'

export function About() {
  return (
    <section className="section about" id="gioi-thieu">
      <Branch className="deco deco--about" leaves={10} />
      <div className="container about__grid">
        <div className="about__text">
          <Eyebrow index="01">Về TỊNH House</Eyebrow>
          <h2 className="h2">Chữ “Tịnh” là sự an yên</h2>
          <p className="muted">
            [Đoạn giới thiệu về TỊNH House – câu chuyện, chủ nhà, ý tưởng không gian. Cần khách hàng
            cung cấp.]
          </p>
          <ul className="highlights">
            {HIGHLIGHTS.map((h) => (
              <li key={h.title}>
                <Icon name={h.icon} size={16} />
                <span>
                  <strong>{h.title}</strong> – {h.text}
                </span>
              </li>
            ))}
          </ul>
          <a href="#phong-nghi" className="text-link">
            Khám phá các phòng nghỉ
          </a>
        </div>

        <div className="about__media">
          <img className="about__img-main" src={IMAGES.garden} alt="Ghế gỗ dưới tán cây trong sân vườn TỊNH House" loading="lazy" />
          <img className="about__img-small" src={IMAGES.loft} alt="Phòng ngủ sàn gỗ với cửa sổ nhìn ra vườn" loading="lazy" />
          <Blossoms className="about__blossom" />
        </div>
      </div>
    </section>
  )
}

function CarouselNav({ labels, index, onPrev, onNext, onGoTo, prevLabel, nextLabel }) {
  return (
    <div className="carousel-nav">
      <button type="button" className="carousel-nav__btn" onClick={onPrev} aria-label={prevLabel}>
        <Icon name="chevron-left" size={20} />
      </button>
      <div className="carousel-nav__dots">
        {labels.map((label, i) => (
          <button
            type="button"
            key={i}
            className={i === index ? 'is-active' : undefined}
            aria-label={label}
            aria-current={i === index}
            onClick={() => onGoTo(i)}
          />
        ))}
      </div>
      <button type="button" className="carousel-nav__btn" onClick={onNext} aria-label={nextLabel}>
        <Icon name="chevron-right" size={20} />
      </button>
    </div>
  )
}

export function Rooms({ onBook }) {
  const { trackRef, index, scrollable, prev, next, goTo } = useCarousel(ROOMS.length)

  return (
    <section className="section rooms" id="phong-nghi">
      <Branch className="deco deco--rooms-l" leaves={8} />
      <Branch className="deco deco--rooms-r" leaves={11} flip />
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <Eyebrow index="02">Phòng nghỉ</Eyebrow>
            <h2 className="h2">Mỗi phòng một góc thiên nhiên</h2>
          </div>
          <p className="muted small">Cùng tinh thần gỗ – tre – cây xanh, mỗi phòng mang một cảm giác riêng.</p>
        </div>

        <div className="rooms__grid" ref={trackRef} aria-roledescription="carousel" aria-label="Danh sách phòng">
          {ROOMS.map((room, i) => (
            <article
              className="room-card"
              key={room.id}
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${ROOMS.length}`}
            >
              <div className="room-card__media">
                <img src={room.image} alt={`Ảnh ${room.name}`} loading="lazy" />
              </div>
              <div className="room-card__body">
                <h3 className="h3">{room.name}</h3>
                <p className="muted small">{room.desc}</p>
                <ul className="tags">
                  {room.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div className="room-card__foot">
                  <p className="price">
                    <strong>[GIÁ]</strong> / đêm
                  </p>
                  <button type="button" className="btn btn--forest btn--sm" onClick={() => onBook(room.name)}>
                    Đặt phòng
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {scrollable && (
          <CarouselNav
            labels={ROOMS.map((r) => `Xem ${r.name}`)}
            index={index}
            onPrev={prev}
            onNext={next}
            onGoTo={goTo}
            prevLabel="Phòng trước"
            nextLabel="Phòng tiếp theo"
          />
        )}
      </div>
    </section>
  )
}

export function Experience() {
  return (
    <section className="section experience" id="trai-nghiem">
      <Branch className="deco deco--exp" leaves={9} />
      <div className="container experience__grid">
        <figure className="experience__media">
          <img src={IMAGES.garden} alt="Sân vườn với ghế gỗ và cây chuối" loading="lazy" />
          <figcaption>Sáng thức dậy bằng tiếng chim, chiều thong thả giữa vườn.</figcaption>
        </figure>
        <div>
          <Eyebrow index="03">Trải nghiệm</Eyebrow>
          <h2 className="h2">Chậm lại một nhịp</h2>
          <p className="muted">Những điều nhỏ làm nên một kỳ nghỉ trọn vẹn tại TỊNH House.</p>
          <div className="exp-grid">
            {EXPERIENCES.map((x) => (
              <div className="exp-card" key={x.title}>
                <span className="exp-card__icon">
                  <Icon name={x.icon} />
                </span>
                <h3>{x.title}</h3>
                <p>{x.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Gallery() {
  return (
    <section className="section gallery" id="hinh-anh">
      <Branch className="deco deco--gallery" leaves={10} flip />
      <div className="container">
        <div className="section-head section-head--split section-head--end">
          <div>
            <Eyebrow index="04">Hình ảnh</Eyebrow>
            <h2 className="h2">Khoảnh khắc ở TỊNH</h2>
          </div>
          <a href={CONTACT.facebook} className="text-link">
            Xem thêm trên Facebook
          </a>
        </div>
        <div className="gallery__grid">
          <img className="g-a" src={IMAGES.garden} alt="Sân vườn xanh mát" loading="lazy" />
          <img className="g-b" src={IMAGES.mint} alt="Phòng rèm xanh với góc ngồi ban công" loading="lazy" />
          <img className="g-c" src={IMAGES.loft} alt="Giường trên bục gỗ, đèn treo cành cây" loading="lazy" />
          <img className="g-d" src={IMAGES.bamboo} alt="Phòng trần tre và màn trắng" loading="lazy" />
        </div>
      </div>
    </section>
  )
}

export function Testimonials() {
  const { trackRef, index, scrollable, prev, next, goTo } = useCarousel(REVIEWS.length, { interval: 5500 })

  return (
    <section className="section testimonials">
      <div className="container">
        <div className="testimonials__panel">
          <Branch className="deco deco--panel" leaves={9} tone="var(--leaf-soft)" flip />
          <div className="section-head section-head--center">
            <Eyebrow index="05">Cảm nhận của khách</Eyebrow>
            <h2 className="h2">Khách nói gì về TỊNH</h2>
          </div>
          <div className="reviews" ref={trackRef} aria-roledescription="carousel" aria-label="Cảm nhận của khách">
            {REVIEWS.map((r, i) => (
              <figure
                className="review"
                key={i}
                aria-roledescription="slide"
                aria-label={`${i + 1} / ${REVIEWS.length}`}
              >
                <p className="stars" aria-label="5 trên 5 sao">★★★★★</p>
                <blockquote>{r.quote}</blockquote>
                <figcaption>
                  <span className="avatar">{r.initial}</span>
                  <span>
                    <strong>{r.name}</strong>
                    <small>{r.source}</small>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          {scrollable && (
            <CarouselNav
              labels={REVIEWS.map((_, i) => `Xem cảm nhận ${i + 1}`)}
              index={index}
              onPrev={prev}
              onNext={next}
              onGoTo={goTo}
              prevLabel="Cảm nhận trước"
              nextLabel="Cảm nhận tiếp theo"
            />
          )}
        </div>
      </div>
    </section>
  )
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState(-1)
  return (
    <section className="section faq">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <Eyebrow index="06">Hỏi đáp</Eyebrow>
            <h2 className="h2">Trước khi bạn đến</h2>
          </div>
          <p className="muted small">
            Chưa thấy câu trả lời? Nhắn Zalo {CONTACT.phone}, TỊNH House luôn sẵn lòng hỗ trợ.
          </p>
        </div>
        <div className="faq__list">
          {FAQS.map((f, i) => {
            const open = openIndex === i
            return (
              <div className={`faq-item${open ? ' faq-item--open' : ''}`} key={f.q}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`faq-${i}`}
                    id={`faq-btn-${i}`}
                    onClick={() => setOpenIndex(open ? -1 : i)}
                  >
                    <span className="faq-item__caret" aria-hidden="true">▸</span>
                    {f.q}
                  </button>
                </h3>
                <div id={`faq-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} className="faq-item__panel">
                  <div>
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Quote() {
  return (
    <section className="quote">
      <Blossoms className="quote__flower quote__flower--l" />
      <blockquote className="container quote__text">
        “Thích không gian này? Giữ một góc chuyến đi sắp tới của bạn.”
      </blockquote>
      <Blossoms className="quote__flower quote__flower--r" />
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a href="#top" className="footer__logo">
          <img src="/Logo.jpg" alt="" width="36" height="36" />
          TỊNH House
        </a>
        <nav className="footer__links" aria-label="Liên kết">
          <a href={CONTACT.facebook}>Facebook</a>
          <a href={CONTACT.maps}>Google Maps</a>
          <a href={CONTACT.zaloHref} target="_blank" rel="noreferrer">Zalo: {CONTACT.phone}</a>
        </nav>
        <p className="footer__copy">© {new Date().getFullYear()} TỊNH House</p>
      </div>
    </footer>
  )
}
