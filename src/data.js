export const IMAGES = {
  garden: '/AnhSP2.jpg',
  loft: '/AnhSP.jpg',
  mint: '/AnhSp3.jpg',
  bamboo: '/AnhSP4.jpg',
}

export const NAV = [
  { href: '#gioi-thieu', label: 'Giới thiệu' },
  { href: '#phong-nghi', label: 'Phòng nghỉ' },
  { href: '#trai-nghiem', label: 'Trải nghiệm' },
  { href: '#hinh-anh', label: 'Hình ảnh' },
  { href: '#lien-he', label: 'Liên hệ' },
]

export const HIGHLIGHTS = [
  { icon: 'leaf', title: 'Cây xanh bao quanh', text: 'vườn nhiệt đới, ô cửa lớn đón nắng' },
  { icon: 'wood', title: 'Nội thất gỗ, tre', text: 'chất liệu tự nhiên, decor cành khô' },
  { icon: 'moon', title: 'Yên tĩnh, thư giãn', text: 'nghỉ dưỡng, làm việc nhẹ nhàng' },
]

export const ROOMS = [
  {
    id: 'phong-1',
    name: '[Tên phòng 1]',
    image: IMAGES.mint,
    desc: 'Rèm xanh dịu, góc ngồi ban công giữa vườn cây.',
    tags: ['[Số khách]', 'Ban công', '[Loại giường]'],
  },
  {
    id: 'phong-2',
    name: '[Tên phòng 2]',
    image: IMAGES.loft,
    desc: 'Sàn gỗ ấm, đèn treo trên cành cây, cửa sổ nhìn ra vườn.',
    tags: ['[Số khách]', 'Điều hòa', '[Loại giường]'],
  },
  {
    id: 'phong-3',
    name: '[Tên phòng 3]',
    image: IMAGES.bamboo,
    desc: 'Trần tre, màn trắng, góc tiếp khách và cửa kính rộng nhìn ra cánh đồng.',
    tags: ['[Số khách]', 'View đồng', '[Loại giường]'],
  },
]

export const EXPERIENCES = [
  { icon: 'cup', title: 'Cà phê sân vườn', text: 'Ngồi ghế gỗ dưới tán cây, nhâm nhi ly cà phê buổi sáng.' },
  { icon: 'book', title: 'Đọc sách bên ô cửa', text: 'Góc sách nhỏ trong phòng, ánh nắng xuyên qua rèm.' },
  { icon: 'sprout', title: 'Ngắm cánh đồng', text: 'Cửa kính rộng nhìn ra khoảng xanh, đẹp nhất lúc hoàng hôn.' },
  { icon: 'plus', title: '[Hoạt động khác]', text: '[Cần khách cung cấp: BBQ, xe đạp, tour địa phương…]' },
]

export const REVIEWS = [
  { initial: 'A', quote: '“[Nhận xét thật của khách – lấy từ Google Maps hoặc Facebook]”', name: '[Tên khách]', source: '[Nguồn · thời gian]' },
  { initial: 'B', quote: '“[Nhận xét thật của khách – lấy từ Google Maps hoặc Facebook]”', name: '[Tên khách]', source: '[Nguồn · thời gian]' },
  { initial: 'C', quote: '“[Nhận xét thật của khách – lấy từ Google Maps hoặc Facebook]”', name: '[Tên khách]', source: '[Nguồn · thời gian]' },
]

export const FAQS = [
  { q: 'Đặt cọc và hủy phòng như thế nào?', a: '[Cập nhật — cần khách hàng cung cấp]' },
  { q: 'Có chỗ đậu xe ô tô / xe máy không?', a: '[Cập nhật — cần khách hàng cung cấp]' },
  { q: 'Có cho mang theo thú cưng không?', a: '[Cập nhật — cần khách hàng cung cấp]' },
  { q: 'Đường đi đến TỊNH House ra sao?', a: '[Cập nhật — cần khách hàng cung cấp]' },
]

export const CONTACT = {
  address: 'Thôn Quảng Bố, Xã Quảng Phú, Huyện Lương Tài, Tỉnh Bắc Ninh',
  phone: '0389 733 426',
  phoneHref: 'tel:0389733426',
  zaloHref: 'https://zalo.me/0389733426',
  owner: 'Thùy Linh',
  hours: 'Nhận phòng [giờ] · Trả phòng [giờ]',
  facebook: '#',
  maps: '#',
  // Link nhúng bản đồ. Có thể thay bằng link src lấy từ Google Maps → Chia sẻ → Nhúng bản đồ
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d502727.9158143612!2d103.62221603820184!3d10.134905147370873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a78a33a2535057%3A0xbe539bb2d5511a2f!2zUGjDuiBRdeG7kWMsIEFuIEdpYW5nLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1790830383590!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"' +
    encodeURIComponent('Thôn Quảng Bố, Xã Quảng Phú, Huyện Lương Tài, Tỉnh Bắc Ninh') +
    '&z=15&output=embed',
}
