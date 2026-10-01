import { useEffect, useState } from 'react'
import { CONTACT, ROOMS } from '../data'
import { Branch } from './Decor'
import Flora from './Flora'

const PHONE_RE = /^(0|\+84)\d{9,10}$/

function validate(v) {
  const errors = {}
  if (!v.name.trim()) errors.name = 'Nhập họ và tên để chủ nhà xưng hô.'
  if (!PHONE_RE.test(v.phone.replace(/\s/g, ''))) errors.phone = 'Số điện thoại gồm 10 số, ví dụ 0389\u00A0733\u00A0426.'
  if (!v.checkin) errors.checkin = 'Chọn ngày nhận phòng.'
  if (!v.checkout) errors.checkout = 'Chọn ngày trả phòng.'
  else if (v.checkin && v.checkout <= v.checkin) errors.checkout = 'Ngày trả phải sau ngày nhận phòng.'
  if (!(Number(v.guests) >= 1)) errors.guests = 'Tối thiểu 1 khách.'
  return errors
}

export default function Contact({ booking, setBooking }) {
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  // mobile: chỉ hiện một trong hai phần để vừa một màn hình
  const [tab, setTab] = useState('form')
  const today = new Date().toISOString().slice(0, 10)

  const update = (key) => (e) => {
    setBooking((b) => ({ ...b, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const submit = (e) => {
    e.preventDefault()
    const found = validate(booking)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(`bk-${Object.keys(found)[0]}`)?.focus()
      return
    }
    // TODO: gửi yêu cầu tới backend / Zalo OA / Google Sheet
    setSent(true)
  }

  // nút "Đặt phòng" ở nơi khác trên trang luôn mở tab form
  useEffect(() => {
    const show = () => setTab('form')
    window.addEventListener('show-booking-form', show)
    return () => window.removeEventListener('show-booking-form', show)
  }, [])

  const field = (key, label, input) => (
    <label className={`field field--light${errors[key] ? ' field--error' : ''}`}>
      <span>{label}</span>
      {input}
      {errors[key] && (
        <small className="field__error" id={`bk-${key}-err`}>
          {errors[key]}
        </small>
      )}
    </label>
  )
  const aria = (key) => ({
    id: `bk-${key}`,
    'aria-invalid': !!errors[key],
    'aria-describedby': errors[key] ? `bk-${key}-err` : undefined,
  })

  return (
    <>
      <span id="lien-he" className="anchor" aria-hidden="true" />
      <section className="contact">
        <Flora preset="contact" />
        <Branch className="contact__fern" leaves={12} tone="#9cc46a" flip />
        <div className="container contact__grid">
          <div className="contact__head">
            <h2 className="display h2">Hẹn gặp bạn ở TỊNH</h2>
            <p className="contact__lead">
              Để lại thông tin – chúng tôi gọi lại hoặc nhắn Zalo xác nhận.
            </p>
          </div>

          <div className="contact__tabs">
            <button type="button" aria-pressed={tab === 'form'} onClick={() => setTab('form')}>
              Đặt phòng
            </button>
            <button type="button" aria-pressed={tab === 'info'} onClick={() => setTab('info')}>
              Liên hệ &amp; bản đồ
            </button>
          </div>

          <div className={`contact__info${tab === 'info' ? '' : ' is-inactive'}`}>
            <dl className="contact__list">
              <div>
                <dt>Địa chỉ:</dt>
                <dd>{CONTACT.address}</dd>
              </div>
              <div>
                <dt>Zalo:</dt>
                <dd>
                  <a href={CONTACT.phoneHref}>{CONTACT.phone}</a> (Zalo) · {CONTACT.owner}
                </dd>
              </div>
              <div>
                <dt>Giờ:</dt>
                <dd>{CONTACT.hours}</dd>
              </div>
            </dl>
            <iframe
              className="contact__map"
              src={CONTACT.mapEmbed}
              title="Bản đồ đường đến Tịnh House"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className={`booking-card${tab === 'form' ? '' : ' is-inactive'}`}>
            {sent ? (
              <div className="booking-card__done" role="status">
                <h3 className="h3">Đã gửi yêu cầu đặt phòng</h3>
                <p>
                  Cảm ơn {booking.name.trim()}. TỊNH House sẽ gọi lại số {booking.phone} để xác nhận{' '}
                  {booking.room} từ {booking.checkin} đến {booking.checkout}.
                </p>
                <button type="button" className="btn btn--dark" onClick={() => setSent(false)}>
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <h3 className="h3">Yêu cầu đặt phòng</h3>
                <div className="form-row">
                  {field('name', 'Họ và tên', <input type="text" autoComplete="name" placeholder="Nguyễn Văn A" value={booking.name} onChange={update('name')} {...aria('name')} />)}
                  {field('phone', 'Điện thoại / Zalo', <input type="tel" autoComplete="tel" inputMode="tel" placeholder="09xx xxx xxx" value={booking.phone} onChange={update('phone')} {...aria('phone')} />)}
                </div>
                <div className="form-row">
                  {field('checkin', 'Ngày nhận', <input type="date" min={today} value={booking.checkin} onChange={update('checkin')} {...aria('checkin')} />)}
                  {field('checkout', 'Ngày trả', <input type="date" min={booking.checkin || today} value={booking.checkout} onChange={update('checkout')} {...aria('checkout')} />)}
                </div>
                <div className="form-row">
                  {field('guests', 'Số khách', <input type="number" min="1" max="20" value={booking.guests} onChange={update('guests')} {...aria('guests')} />)}
                  {field(
                    'room',
                    'Loại phòng',
                    <select value={booking.room} onChange={update('room')} {...aria('room')}>
                      {ROOMS.map((r) => (
                        <option key={r.id}>{r.name}</option>
                      ))}
                    </select>,
                  )}
                </div>
                {field('note', 'Ghi chú', <textarea rows="2" placeholder="Yêu cầu thêm (nếu có)" value={booking.note} onChange={update('note')} {...aria('note')} />)}
                <button type="submit" className="btn btn--dark btn--block">
                  Gửi yêu cầu đặt phòng
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
