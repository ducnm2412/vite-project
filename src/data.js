export const IMAGES = {
  garden: '/AnhSP2.jpg',
  loft: '/AnhSP.jpg',
  mint: '/AnhSp3.jpg',
  bamboo: '/AnhSP4.jpg',
}

/* Bộ ảnh xem toàn màn hình — mọi ảnh trên trang đều mở vào bộ này */
export const PHOTOS = [
  { src: IMAGES.garden, alt: 'Ghế gỗ dưới tán cây trong sân vườn TỊNH House' },
  { src: IMAGES.mint, alt: 'Phòng rèm xanh với góc ngồi ban công' },
  { src: IMAGES.loft, alt: 'Giường trên bục gỗ, đèn treo trên cành cây' },
  { src: IMAGES.bamboo, alt: 'Phòng trần tre, màn trắng, cửa kính nhìn ra cánh đồng' },
]
export const PHOTO_INDEX = { garden: 0, mint: 1, loft: 2, bamboo: 3 }

export const NAV = [
  { href: '#gioi-thieu', label: 'Về chúng tôi' },
  { href: '#phong-nghi', label: 'Phòng' },
  { href: '#trai-nghiem', label: 'Trải nghiệm' },
  { href: '#hinh-anh', label: 'Hình ảnh' },
  { href: '#lien-he', label: 'Liên hệ' },
]

export const MARQUEE = ['Tĩnh lặng', 'Xanh mát', 'Mộc mạc', 'Gỗ & tre', 'Sống chậm']

/*
 * NỘI DUNG MẪU — tên phòng, giá, đánh giá, câu trả lời FAQ bên dưới là nội dung
 * minh hoạ. Cần thay bằng thông tin thật của TỊNH House trước khi đưa web lên mạng
 * (đặc biệt là đánh giá: chỉ dùng nhận xét thật của khách).
 */
// số liệu ở phần Về TỊNH (đánh giá, số năm là nội dung mẫu)
export const STATS_SAMPLE = [
  { value: '4.9', label: 'Điểm đánh giá' },
  { value: '5+', label: 'Năm đón khách' },
]

export const ROOMS = [
  {
    id: 'phong-suong',
    name: 'Phòng Sương',
    image: IMAGES.mint,
    photo: 'mint',
    desc: 'Rèm xanh dịu, góc ngồi ban công giữa vườn cây.',
    badge: 'Ban công',
    tags: ['2 khách', '1 giường đôi'],
    price: '450.000đ',
  },
  {
    id: 'phong-canh',
    name: 'Phòng Cành',
    image: IMAGES.loft,
    photo: 'loft',
    desc: 'Sàn gỗ ấm, đèn treo trên cành cây, cửa sổ nhìn ra vườn.',
    badge: 'Gác gỗ',
    tags: ['2 khách', '1 giường đôi'],
    price: '550.000đ',
  },
  {
    id: 'phong-tre',
    name: 'Phòng Tre',
    image: IMAGES.bamboo,
    photo: 'bamboo',
    desc: 'Trần tre, màn trắng, góc tiếp khách và cửa kính rộng nhìn ra cánh đồng.',
    badge: 'View đồng',
    tags: ['4 khách', 'Giường đôi + sofa'],
    price: '750.000đ',
  },
]

export const EXPERIENCES = [
  { icon: 'cup', title: 'Cà phê sân vườn', text: 'Ngồi ghế gỗ dưới tán cây, nhâm nhi ly cà phê buổi sáng.' },
  { icon: 'book', title: 'Đọc sách bên ô cửa', text: 'Góc sách nhỏ trong phòng, ánh nắng xuyên qua rèm.' },
  { icon: 'sprout', title: 'Ngắm cánh đồng', text: 'Cửa kính rộng nhìn ra khoảng xanh, đẹp nhất lúc hoàng hôn.' },
  { icon: 'bike', title: 'Đạp xe quanh làng', text: 'Mượn xe đạp miễn phí, men theo đường làng và bờ ruộng.' },
]

export const REVIEWS = [
  {
    initial: 'M',
    quote: '“Phòng sạch, thơm mùi gỗ, sáng ra mở cửa là thấy cả vườn cây. Chị chủ nhà nhiệt tình, cuối tuần ở đây đúng là được nghỉ thật sự.”',
    name: 'Minh Anh',
    date: '12/08/2026',
  },
  {
    initial: 'H',
    quote: '“Cả nhà mình thuê Phòng Tre, bé con mê nhất cái màn trắng với cửa kính nhìn ra đồng lúa. Yên tĩnh mà ra trung tâm Dương Đông cũng gần.”',
    name: 'Hoàng Nam',
    date: '27/07/2026',
  },
  {
    initial: 'T',
    quote: '“Mình đến để làm việc vài hôm, wifi ổn, góc ngồi ban công rất dễ tập trung. Buổi chiều đạp xe quanh làng rất thích.”',
    name: 'Thu Trang',
    date: '15/06/2026',
  },
]

export const FAQS = [
  {
    q: 'Đặt cọc và hủy phòng như thế nào?',
    a: 'Bạn đặt cọc 50% qua chuyển khoản để giữ phòng. Hủy trước 3 ngày được hoàn toàn bộ tiền cọc; hủy sát ngày có thể đổi sang ngày khác trong vòng 1 tháng.',
  },
  {
    q: 'Có chỗ đậu xe ô tô / xe máy không?',
    a: 'Có. Sân trước nhà để được 3–4 ô tô và xe máy, miễn phí cho khách lưu trú.',
  },
  {
    q: 'Có cho mang theo thú cưng không?',
    a: 'Có nhận thú cưng nhỏ, báo trước khi đặt phòng. Phụ thu 100.000đ/đêm để vệ sinh phòng.',
  },
  {
    q: 'Đường đi đến TỊNH House ra sao?',
    a: 'TỊNH House ở đường Nguyễn Trung Trực, gần trung tâm Dương Đông, cách sân bay Phú Quốc khoảng 15 phút đi xe. Khi đặt phòng, chủ nhà sẽ gửi vị trí Google Maps qua Zalo.',
  },
]

const ADDRESS = '320a Nguyễn Trung Trực, Phú Quốc, An Giang'

export const CONTACT = {
  address: ADDRESS,
  // dùng dấu cách không ngắt dòng (\u00A0) để số không bị xuống dòng giữa chừng
  phone: '0389\u00A0733\u00A0426',
  phoneHref: 'tel:0389733426',
  zaloHref: 'https://zalo.me/0389733426',
  owner: 'Thùy Linh',
  hours: 'Nhận phòng 14:00 · Trả phòng 12:00',
  facebook: 'https://www.facebook.com/tinhhousephuquoc/',
  // mở vị trí TỊNH House trên Google Maps (link ở footer)
  maps: 'https://maps.app.goo.gl/Mj94WPEN53RmikwV6',
  // bản đồ nhúng ở phần Liên hệ — ghim theo tọa độ của link trên
  mapEmbed: 'https://maps.google.com/maps?q=10.2271407,103.9777362&z=16&hl=vi&output=embed',
}
