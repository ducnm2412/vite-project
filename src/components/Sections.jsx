import { useState } from 'react'
import { CONTACT, EXPERIENCES, FAQS, PHOTO_INDEX, REVIEWS, ROOMS, STATS_SAMPLE } from '../data'
import { Blossoms, Branch, Icon } from './Decor'
import useCarousel from '../hooks/useCarousel'
import { Photo } from './Lightbox'

const STATS = [{ value: String(ROOMS.length).padStart(2, '0'), label: 'Phòng nghỉ' }, ...STATS_SAMPLE]

export function About() {
  return (
    <>
      <span id="gioi-thieu" className="anchor" aria-hidden="true" />
      <section className="section about">
        <div className="container about__grid">
          <div className="about__media">
            <Photo className="arch about__img-a" photo={PHOTO_INDEX.garden} />
            <Photo className="arch about__img-b" photo={PHOTO_INDEX.loft} />
          </div>

          <div className="about__text">
            <p className="kicker">Về TỊNH House</p>
            <h2 className="display h2">Một khu vườn để trở về</h2>
            <p className="soft">
              TỊNH House là ngôi nhà nhỏ giữa vườn xanh Phú Quốc, được chủ nhà tự tay sửa sang bằng gỗ,
              tre và cành cây khô. Không ồn ào, không vội vã – chỉ có vườn xanh, ô cửa đầy nắng và những
              buổi sáng thức dậy thật chậm.
            </p>
            <dl className="stats">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
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
    <>
      <span id="phong-nghi" className="anchor" aria-hidden="true" />
      <section className="section rooms">
        <div className="container">
          <div className="section-head section-head--split">
            <h2 className="display h2">
              Chọn phòng <span className="accent">của bạn</span>
            </h2>
            <p className="soft small">Mỗi phòng một tính cách, cùng chung tinh thần gỗ – tre – cây xanh.</p>
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
                  <Photo className="arch" photo={PHOTO_INDEX[room.photo]} aria-label={`Xem ảnh lớn: ${room.name}`} />
                </div>
                <span className="badge">{room.badge}</span>
                <h3 className="room-card__name">{room.name}</h3>
                <p className="room-card__desc">{room.desc}</p>
                <p className="room-card__meta">{room.tags.join(' · ')}</p>
                <div className="room-card__foot">
                  <p className="price">
                    <strong>{room.price}</strong> /đêm
                  </p>
                  <button type="button" className="btn btn--lime btn--sm" onClick={() => onBook(room.name)}>
                    Đặt phòng
                  </button>
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
    </>
  )
}

export function Experience() {
  return (
    <>
      <span id="trai-nghiem" className="anchor" aria-hidden="true" />
      <section className="section experience">
        <div className="container">
          <div className="exp-panel">
            <Branch className="exp-panel__fern" leaves={11} tone="#9fbf86" flip />
            <div className="exp-panel__text">
              <p className="kicker kicker--clay">Trải nghiệm</p>
              <h2 className="display h2">
                Một ngày <span className="accent-clay">ở TỊNH</span>
              </h2>
              <div className="exp-grid">
                {EXPERIENCES.map((x) => (
                  <div className="exp-card" key={x.title}>
                    <span className="exp-card__icon">
                      <Icon name={x.icon} size={17} />
                    </span>
                    <h3>{x.title}</h3>
                    <p>{x.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="exp-panel__media">
              <Photo className="arch" photo={PHOTO_INDEX.garden} />
              <span className="sticker" aria-hidden="true">
                Sống chậm thôi!
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export function Gallery() {
  return (
    <>
      <span id="hinh-anh" className="anchor" aria-hidden="true" />
      <section className="section gallery">
        <div className="container">
          <div className="section-head section-head--split section-head--end">
            <h2 className="display h2">
              Góc nào <span className="accent">cũng xanh</span>
            </h2>
            <a href={CONTACT.facebook} className="text-link" target="_blank" rel="noreferrer">
              #TINHHOUSE
              <Icon name="arrow-right" size={16} />
            </a>
          </div>
          <div className="gallery__grid">
            <Photo className="arch g-a" photo={PHOTO_INDEX.mint} />
            <Photo className="g-b" photo={PHOTO_INDEX.garden} />
            <Photo className="arch g-c" photo={PHOTO_INDEX.bamboo} />
            <Photo className="g-d" photo={PHOTO_INDEX.loft} />
          </div>
        </div>
      </section>
    </>
  )
}

export function Testimonials() {
  const { trackRef, index, scrollable, prev, next, goTo } = useCarousel(REVIEWS.length, { interval: 5500 })

  return (
    <section className="section testimonials">
      <Blossoms className="testimonials__flower" />
      <div className="container">
        <div className="section-head section-head--center">
          <p className="kicker">Cảm nhận của khách</p>
          <h2 className="display h2">
            Họ đã đến
            <br />
            và <span className="accent">muốn quay lại</span>
          </h2>
        </div>
        <div className="reviews" ref={trackRef} aria-roledescription="carousel" aria-label="Cảm nhận của khách">
          {REVIEWS.map((r, i) => (
            <figure
              className="review"
              key={i}
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${REVIEWS.length}`}
            >
              <span className="review__mark" aria-hidden="true">
                “
              </span>
              <blockquote>{r.quote.replace(/^“|”$/g, '')}</blockquote>
              <p className="stars" aria-label="5 trên 5 sao">
                ★★★★★
              </p>
              <figcaption>
                <span className="avatar">{r.initial}</span>
                <span>
                  <strong>{r.name}</strong>
                  <small>{r.date}</small>
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
    </section>
  )
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState(-1)
  return (
    <section className="section faq">
      <div className="container">
        <div className="section-head section-head--split">
          <h2 className="display h2">
            Trước khi <span className="accent">bạn đến</span>
          </h2>
          <p className="soft small">
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
                    {f.q}
                    <span className="faq-item__toggle" aria-hidden="true" />
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

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a href="#top" className="footer__logo">
          TỊNH<em>.house</em>
        </a>
        <nav className="footer__links" aria-label="Liên kết">
          <a href={CONTACT.facebook} target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a href={CONTACT.maps} target="_blank" rel="noreferrer">
            Google Maps
          </a>
          <a href={CONTACT.zaloHref} target="_blank" rel="noreferrer">
            Zalo {CONTACT.phone}
          </a>
        </nav>
        <p className="footer__copy">© {new Date().getFullYear()} TỊNH House</p>
      </div>
    </footer>
  )
}
