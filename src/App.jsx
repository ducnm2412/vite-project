import { useState } from 'react'
import { ROOMS } from './data'
import Header from './components/Header'
import Hero from './components/Hero'
import Contact from './components/Contact'
import { About, Experience, Faq, Footer, Gallery, Quote, Rooms, Testimonials } from './components/Sections'
import './App.css'

const EMPTY_BOOKING = {
  name: '',
  phone: '',
  checkin: '',
  checkout: '',
  guests: 2,
  room: ROOMS[0].name,
  note: '',
}

function scrollToBooking() {
  window.dispatchEvent(new Event('show-booking-form'))
  document.getElementById('lien-he')?.scrollIntoView({ behavior: 'smooth' })
  setTimeout(() => document.getElementById('bk-name')?.focus({ preventScroll: true }), 600)
}

export default function App() {
  const [booking, setBooking] = useState(EMPTY_BOOKING)

  const handleBookRoom = (room) => {
    setBooking((b) => ({ ...b, room }))
    scrollToBooking()
  }

  return (
    <>
      <a className="skip-link" href="#gioi-thieu">Bỏ qua đến nội dung</a>
      <Header />
      <main>
        <Hero />
        <About />
        <Rooms onBook={handleBookRoom} />
        <Experience />
        <Gallery />
        <Testimonials />
        <Faq />
        <Quote />
        <Contact booking={booking} setBooking={setBooking} />
      </main>
      <Footer />
    </>
  )
}
