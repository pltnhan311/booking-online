// VietCinema Mock Data - Phase 1

export interface Movie {
  id: string;
  title: string;
  titleEn: string;
  posterUrl: string;
  trailerUrl: string;
  genre: string[];
  duration: number;
  releaseDate: string;
  director: string;
  cast: string[];
  rating: number;
  ageRating: string;
  language: string;
  description: string;
  status: 'now_showing' | 'coming_soon';
  isFeatured?: boolean;
  badges?: string[];
}

export interface Screen {
  id: string;
  name: string;
  totalSeats: number;
  type: '2D' | '3D' | 'IMAX' | '4DX';
}

export interface Theater {
  id: string;
  name: string;
  location: {
    address: string;
    city: string;
    district: string;
  };
  screens: Screen[];
  distance?: string;
}

export interface Showtime {
  id: string;
  movieId: string;
  theaterId: string;
  screenId: string;
  dateTime: string;
  price: number;
  priceVip: number;
  availableSeats: number;
}

export interface SeatConfig {
  rows: string[];
  seatsPerRow: number;
  vipRows: string[];
  aisles: number[];
}

export interface Booking {
  id: string;
  userId: string;
  oderId: string;
  movieId: string;
  theaterId: string;
  showtimeId: string;
  seats: string[];
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  qrCode?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'user' | 'admin' | 'superadmin';
}

// Movies Data
export const movies: Movie[] = [
  {
    id: "mov_001",
    title: "Dune: Hành Tinh Cát - Phần Hai",
    titleEn: "Dune: Part Two",
    posterUrl: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    trailerUrl: "https://www.youtube.com/embed/Way9Dexny3w",
    genre: ["Hành động", "Khoa học viễn tưởng"],
    duration: 166,
    releaseDate: "2024-03-01",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Josh Brolin"],
    rating: 9.5,
    ageRating: "C16",
    language: "Tiếng Anh - Phụ đề Việt",
    description: "Huyền thoại trở lại. Khám phá sử thi hoành tráng nhất năm nay tại VietCinema. Paul Atreides tập hợp người Fremen để trả thù những kẻ đã hủy hoại gia đình mình.",
    status: "now_showing",
    isFeatured: true,
    badges: ["HOT"]
  },
  {
    id: "mov_002",
    title: "Mai",
    titleEn: "Mai",
    posterUrl: "https://image.tmdb.org/t/p/w500/jX41skvhxMXiaFSN1VpEwvVr3lL.jpg",
    trailerUrl: "https://www.youtube.com/embed/H8Jl5nDoMeE",
    genre: ["Tâm lý", "Tình cảm"],
    duration: 131,
    releaseDate: "2024-02-10",
    director: "Trấn Thành",
    cast: ["Phương Anh Đào", "Tuấn Trần", "Hồng Đào", "NSƯT Hữu Châu"],
    rating: 8.9,
    ageRating: "T18",
    language: "Tiếng Việt",
    description: "Mai - cô gái massage với quá khứ đau thương, liệu có tìm được hạnh phúc cho riêng mình? Một bộ phim đầy cảm xúc về tình yêu và sự tha thứ.",
    status: "now_showing",
    badges: ["HOT", "2D", "IMAX"]
  },
  {
    id: "mov_003",
    title: "Kung Fu Panda 4",
    titleEn: "Kung Fu Panda 4",
    posterUrl: "https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
    trailerUrl: "https://www.youtube.com/embed/_inKs4eeHiI",
    genre: ["Hoạt hình", "Hài hước", "Gia đình"],
    duration: 94,
    releaseDate: "2024-03-08",
    director: "Mike Mitchell",
    cast: ["Jack Black", "Awkwafina", "Viola Davis", "Dustin Hoffman"],
    rating: 9.2,
    ageRating: "P",
    language: "Lồng tiếng Việt",
    description: "Po trở lại với cuộc phiêu lưu mới! Khi phải đối mặt với phù thủy Chameleon, Po cần tìm một chiến binh rồng mới để bảo vệ Thung lũng Hòa bình.",
    status: "now_showing",
    badges: ["3D"]
  },
  {
    id: "mov_004",
    title: "Godzilla x Kong: Đế Chế Mới",
    titleEn: "Godzilla x Kong: The New Empire",
    posterUrl: "https://image.tmdb.org/t/p/w500/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
    trailerUrl: "https://www.youtube.com/embed/lV1OOlGwExM",
    genre: ["Hành động", "Viễn tưởng"],
    duration: 115,
    releaseDate: "2024-03-29",
    director: "Adam Wingard",
    cast: ["Rebecca Hall", "Brian Tyree Henry", "Dan Stevens", "Kaylee Hottle"],
    rating: 8.5,
    ageRating: "C13",
    language: "Tiếng Anh - Phụ đề Việt",
    description: "Hai titan huyền thoại - Godzilla và Kong - phải hợp sức chống lại mối đe dọa chết người đang ẩn náu trong thế giới ngầm.",
    status: "now_showing",
    badges: ["IMAX", "4DX"]
  },
  {
    id: "mov_005",
    title: "Exhuma: Quật Mộ Trùng Ma",
    titleEn: "Exhuma",
    posterUrl: "https://image.tmdb.org/t/p/w500/b3mdmjYTEL70j7nuXATUAD9qgu4.jpg",
    trailerUrl: "https://www.youtube.com/embed/SgRiVZ0GXRU",
    genre: ["Kinh dị", "Bí ẩn"],
    duration: 134,
    releaseDate: "2024-02-22",
    director: "Jang Jae-hyun",
    cast: ["Choi Min-sik", "Kim Go-eun", "Yoo Hae-jin", "Lee Do-hyun"],
    rating: 9.1,
    ageRating: "C18",
    language: "Tiếng Hàn - Phụ đề Việt",
    description: "Một thầy phong thủy, một pháp sư và hai đồ đệ khai quật một ngôi mộ bí ẩn để giải thoát linh hồn, nhưng họ không ngờ đã đánh thức một thứ kinh hoàng hơn.",
    status: "now_showing",
    badges: ["18+"]
  },
  {
    id: "mov_006",
    title: "Lật Mặt 7: Một Điều Ước",
    titleEn: "Face Off 7: A Wish",
    posterUrl: "https://image.tmdb.org/t/p/w500/6AdxJoNp4DLjglNLPNbZqLxoKEX.jpg",
    trailerUrl: "https://www.youtube.com/embed/oHSP0zOhfWQ",
    genre: ["Hành động", "Gia đình"],
    duration: 138,
    releaseDate: "2024-04-26",
    director: "Lý Hải",
    cast: ["Trấn Thành", "Ốc Thanh Vân", "Quốc Cường", "Mạc Văn Khoa"],
    rating: 8.7,
    ageRating: "C13",
    language: "Tiếng Việt",
    description: "Phần 7 trong series Lật Mặt kể về câu chuyện gia đình cảm động, xoay quanh tình cảm thiêng liêng giữa cha mẹ và con cái.",
    status: "coming_soon"
  },
  {
    id: "mov_007",
    title: "Bỗng Dưng Trúng Số",
    titleEn: "Lottery Winner",
    posterUrl: "https://image.tmdb.org/t/p/w500/lqoMzCcZYEFK729d6euKWo2tZIN.jpg",
    trailerUrl: "https://www.youtube.com/embed/example7",
    genre: ["Hài", "Tình cảm"],
    duration: 105,
    releaseDate: "2024-03-15",
    director: "Vũ Ngọc Đãng",
    cast: ["Kiều Minh Tuấn", "Thu Trang", "Tiến Luật"],
    rating: 7.8,
    ageRating: "T16",
    language: "Tiếng Việt",
    description: "Một anh chàng bình thường bỗng dưng trúng giải độc đắc. Cuộc sống của anh thay đổi hoàn toàn với những tình huống hài hước không ngờ.",
    status: "now_showing"
  },
  {
    id: "mov_008",
    title: "Ghostbusters: Kỷ Nguyên Băng Giá",
    titleEn: "Ghostbusters: Frozen Empire",
    posterUrl: "https://image.tmdb.org/t/p/w500/e1J2oNzSBdou01sUvriVuoYp0pJ.jpg",
    trailerUrl: "https://www.youtube.com/embed/HpOFzmE6BXQ",
    genre: ["Phiêu lưu", "Hài", "Viễn tưởng"],
    duration: 115,
    releaseDate: "2024-03-22",
    director: "Gil Kenan",
    cast: ["Paul Rudd", "Carrie Coon", "Finn Wolfhard", "Mckenna Grace"],
    rating: 8.0,
    ageRating: "C13",
    language: "Tiếng Anh - Phụ đề Việt",
    description: "Gia đình Spengler trở lại để đối mặt với một thế lực ma quỷ cổ đại có khả năng đóng băng cả thành phố.",
    status: "now_showing",
    badges: ["3D"]
  },
  {
    id: "mov_009",
    title: "Cô Dâu Hào Môn",
    titleEn: "The Billionaire Bride",
    posterUrl: "https://image.tmdb.org/t/p/w500/qsdjk9oAKSQMWs0Vt5Pyfh6O4GZ.jpg",
    trailerUrl: "https://www.youtube.com/embed/example9",
    genre: ["Hài", "Tình cảm"],
    duration: 110,
    releaseDate: "2024-03-20",
    director: "Nhất Trung",
    cast: ["Lan Ngọc", "Kaity Nguyễn", "Isaac"],
    rating: 7.5,
    ageRating: "T13",
    language: "Tiếng Việt",
    description: "Câu chuyện hài hước về một cô gái quê phải đóng vai cô dâu hào môn trong một gia đình giàu có với những tình huống dở khóc dở cười.",
    status: "now_showing"
  },
  {
    id: "mov_010",
    title: "Đào, Phở và Piano",
    titleEn: "Peach, Pho and Piano",
    posterUrl: "https://image.tmdb.org/t/p/w500/6PX0r5TRRU5Rtlb2VPMo1j8zOY8.jpg",
    trailerUrl: "https://www.youtube.com/embed/example10",
    genre: ["Lịch sử", "Tình cảm"],
    duration: 110,
    releaseDate: "2024-02-23",
    director: "Phi Tiến Sơn",
    cast: ["Cao Thái Hà", "Doãn Quốc Đam", "Trần Lực"],
    rating: 8.5,
    ageRating: "T16",
    language: "Tiếng Việt",
    description: "Bộ phim lấy bối cảnh Hà Nội những ngày cuối năm 1946, kể về tình yêu trong hoàn cảnh chiến tranh với những hy sinh cao cả.",
    status: "now_showing"
  },
  {
    id: "mov_011",
    title: "Deadpool & Wolverine",
    titleEn: "Deadpool & Wolverine",
    posterUrl: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    trailerUrl: "https://www.youtube.com/embed/73_1biulkYk",
    genre: ["Hành động", "Hài", "Siêu anh hùng"],
    duration: 127,
    releaseDate: "2024-07-26",
    director: "Shawn Levy",
    cast: ["Ryan Reynolds", "Hugh Jackman", "Emma Corrin"],
    rating: 9.3,
    ageRating: "C18",
    language: "Tiếng Anh - Phụ đề Việt",
    description: "Deadpool và Wolverine lần đầu song kiếm hợp bích trong bom tấn Marvel Studios. Một cuộc phiêu lưu điên rồ xuyên đa vũ trụ.",
    status: "coming_soon",
    badges: ["IMAX"]
  },
  {
    id: "mov_012",
    title: "Furiosa: Câu Chuyện Từ Max Điên",
    titleEn: "Furiosa: A Mad Max Saga",
    posterUrl: "https://image.tmdb.org/t/p/w500/iADOJ8Zymht2JPMoy3R7xceZprc.jpg",
    trailerUrl: "https://www.youtube.com/embed/XJMuhwVlca4",
    genre: ["Hành động", "Phiêu lưu"],
    duration: 148,
    releaseDate: "2024-05-24",
    director: "George Miller",
    cast: ["Anya Taylor-Joy", "Chris Hemsworth", "Tom Burke"],
    rating: 8.8,
    ageRating: "C16",
    language: "Tiếng Anh - Phụ đề Việt",
    description: "Câu chuyện về nguồn gốc của Furiosa, nữ chiến binh huyền thoại, trước khi cô gặp Max trong Fury Road.",
    status: "coming_soon"
  }
];

// Theaters Data
export const theaters: Theater[] = [
  {
    id: "tht_001",
    name: "VietCinema Vincom Center",
    location: {
      address: "72 Lê Thánh Tôn, Phường Bến Nghé",
      city: "TP. Hồ Chí Minh",
      district: "Quận 1"
    },
    distance: "0.5 km",
    screens: [
      { id: "scr_001", name: "Phòng 1", totalSeats: 120, type: "2D" },
      { id: "scr_002", name: "Phòng 2 IMAX", totalSeats: 200, type: "IMAX" },
      { id: "scr_003", name: "Phòng 3", totalSeats: 100, type: "2D" }
    ]
  },
  {
    id: "tht_002",
    name: "VietCinema Landmark 81",
    location: {
      address: "208 Nguyễn Hữu Cảnh, Phường 22",
      city: "TP. Hồ Chí Minh",
      district: "Bình Thạnh"
    },
    distance: "3.2 km",
    screens: [
      { id: "scr_004", name: "Phòng 1 4DX", totalSeats: 80, type: "4DX" },
      { id: "scr_005", name: "Phòng 2", totalSeats: 150, type: "3D" },
      { id: "scr_006", name: "Phòng 3 IMAX", totalSeats: 250, type: "IMAX" }
    ]
  },
  {
    id: "tht_003",
    name: "VietCinema Aeon Mall Tân Phú",
    location: {
      address: "30 Bờ Bao Tân Thắng",
      city: "TP. Hồ Chí Minh",
      district: "Tân Phú"
    },
    distance: "8.5 km",
    screens: [
      { id: "scr_007", name: "Phòng 1", totalSeats: 120, type: "2D" },
      { id: "scr_008", name: "Phòng 2", totalSeats: 120, type: "3D" }
    ]
  },
  {
    id: "tht_004",
    name: "VietCinema Times City Hà Nội",
    location: {
      address: "458 Minh Khai, Phường Vĩnh Tuy",
      city: "Hà Nội",
      district: "Hai Bà Trưng"
    },
    distance: "12 km",
    screens: [
      { id: "scr_009", name: "Phòng 1 IMAX", totalSeats: 220, type: "IMAX" },
      { id: "scr_010", name: "Phòng 2", totalSeats: 140, type: "2D" },
      { id: "scr_011", name: "Phòng 3", totalSeats: 100, type: "3D" }
    ]
  },
  {
    id: "tht_005",
    name: "VietCinema Royal City",
    location: {
      address: "72A Nguyễn Trãi",
      city: "Hà Nội",
      district: "Thanh Xuân"
    },
    distance: "15 km",
    screens: [
      { id: "scr_012", name: "Phòng 1 Gold Class", totalSeats: 40, type: "2D" },
      { id: "scr_013", name: "Phòng 2 4DX", totalSeats: 80, type: "4DX" }
    ]
  }
];

// Seat Configuration
export const seatConfig: SeatConfig = {
  rows: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
  seatsPerRow: 12,
  vipRows: ["G", "H", "I", "J"],
  aisles: [3, 9] // Gaps after seat 3 and 9
};

// Seat prices (VNĐ)
export const seatPrices = {
  standard: 70000,
  vip: 120000
};

// Generate showtimes for next 7 days
const generateShowtimes = (): Showtime[] => {
  const showtimes: Showtime[] = [];
  const times = ["09:00", "11:30", "14:00", "16:30", "19:00", "21:30"];

  const today = new Date();

  movies.filter(m => m.status === 'now_showing').forEach(movie => {
    theaters.forEach(theater => {
      theater.screens.slice(0, 2).forEach(screen => {
        for (let day = 0; day < 7; day++) {
          const date = new Date(today);
          date.setDate(date.getDate() + day);
          const dateStr = date.toISOString().split('T')[0];

          // 3-4 showtimes per day per screen
          const selectedTimes = times.slice(0, 3 + Math.floor(Math.random() * 2));

          selectedTimes.forEach((time, idx) => {
            const isImax = screen.type === 'IMAX';
            const is4DX = screen.type === '4DX';

            showtimes.push({
              id: `sht_${movie.id}_${theater.id}_${screen.id}_${day}_${idx}`,
              movieId: movie.id,
              theaterId: theater.id,
              screenId: screen.id,
              dateTime: `${dateStr}T${time}:00`,
              price: isImax ? 150000 : is4DX ? 180000 : 90000,
              priceVip: isImax ? 200000 : is4DX ? 230000 : 120000,
              availableSeats: Math.floor(Math.random() * 50) + 70
            });
          });
        }
      });
    });
  });

  return showtimes;
};

export const showtimes = generateShowtimes();

// Generate sold seats for a showtime (random)
export const generateSoldSeats = (showtimeId: string): string[] => {
  const soldCount = Math.floor(Math.random() * 30) + 10;
  const soldSeats: string[] = [];
  const rows = seatConfig.rows;

  while (soldSeats.length < soldCount) {
    const row = rows[Math.floor(Math.random() * rows.length)];
    const seatNum = Math.floor(Math.random() * seatConfig.seatsPerRow) + 1;
    const seatId = `${row}${seatNum}`;
    if (!soldSeats.includes(seatId)) {
      soldSeats.push(seatId);
    }
  }

  return soldSeats;
};

// Mock users
export const mockUsers: User[] = [
  {
    id: "usr_001",
    email: "user@vietcinema.vn",
    name: "Nguyễn Văn A",
    phone: "0901234567",
    role: "user"
  },
  {
    id: "usr_002",
    email: "admin@vietcinema.vn",
    name: "Admin VietCinema",
    phone: "0909999888",
    role: "admin"
  },
  {
    id: "usr_003",
    email: "superadmin@vietcinema.vn",
    name: "Super Admin",
    phone: "0900000000",
    role: "superadmin"
  }
];

// Helper functions
export const getMovieById = (id: string): Movie | undefined =>
  movies.find(m => m.id === id);

export const getTheaterById = (id: string): Theater | undefined =>
  theaters.find(t => t.id === id);

export const getShowtimesByMovie = (movieId: string): Showtime[] =>
  showtimes.filter(s => s.movieId === movieId);

export const getShowtimesByTheater = (theaterId: string): Showtime[] =>
  showtimes.filter(s => s.theaterId === theaterId);

export const getShowtimeById = (id: string): Showtime | undefined =>
  showtimes.find(s => s.id === id);

export const formatPrice = (price: number): string =>
  new Intl.NumberFormat('vi-VN').format(price) + ' VNĐ';

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const formatTime = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit'
  });
};
