import { useEffect, useMemo, useState } from "react"
import axios from "axios"

const movieData = [
  {
    id: 1,
    name: "Avengers",
    badge: "Trending",
    image: {
      medium: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
      original: "https://image.tmdb.org/t/p/original/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
    },
    rating: { average: 8.7 },
    genres: ["Action", "Adventure"],
    summary:
      "Earth's mightiest heroes must come together to stop Loki and his alien army from enslaving humanity.",
  },
  {
    id: 2,
    name: "Interstellar",
    badge: "Top Rated",
    image: {
      medium: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      original: "https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    },
    rating: { average: 9.0 },
    genres: ["Sci-Fi", "Drama"],
    summary:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
  {
    id: 3,
    name: "Inception",
    badge: "Mind Bender",
    image: {
      medium: "https://image.tmdb.org/t/p/w500/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg",
      original: "https://image.tmdb.org/t/p/original/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg",
    },
    rating: { average: 8.8 },
    genres: ["Action", "Sci-Fi"],
    summary:
      "A skilled thief enters people's dreams to steal secrets but faces his toughest mission yet.",
  },
  {
    id: 4,
    name: "Joker",
    badge: "Critic Pick",
    image: {
      medium: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
      original: "https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    },
    rating: { average: 8.5 },
    genres: ["Crime", "Drama"],
    summary:
      "A failed comedian slowly descends into madness and becomes Gotham City's infamous Joker.",
  },
  {
    id: 5,
    name: "The Batman",
    badge: "New",
    image: {
      medium: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
      original: "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    },
    rating: { average: 8.3 },
    genres: ["Action", "Crime"],
    summary:
      "Batman uncovers corruption in Gotham City while pursuing the Riddler, a serial killer targeting elites.",
  },
  {
    id: 6,
    name: "Dune: Part Two",
    badge: "Blockbuster",
    image: {
      medium: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
      original: "https://image.tmdb.org/t/p/original/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    },
    rating: { average: 8.9 },
    genres: ["Sci-Fi", "Adventure"],
    summary:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against those who destroyed his family.",
  },
  {
    id: 7,
    name: "Inside Out 2",
    badge: "New",
    image: {
      medium: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
      original: "https://image.tmdb.org/t/p/original/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    },
    rating: { average: 8.0 },
    genres: ["Animation", "Comedy"],
    summary:
      "Riley enters her teenage years as new emotions arrive and shake up headquarters.",
  },
  {
    id: 8,
    name: "Deadpool & Wolverine",
    badge: "Fan Favorite",
    image: {
      medium: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
      original: "https://image.tmdb.org/t/p/original/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    },
    rating: { average: 8.1 },
    genres: ["Action", "Comedy"],
    summary:
      "Deadpool teams up with Wolverine for a chaotic mission that could change their universe.",
  },
  {
    id: 9,
    name: "Godzilla x Kong",
    badge: "Epic",
    image: {
      medium: "https://image.tmdb.org/t/p/w500/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
      original: "https://image.tmdb.org/t/p/original/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
    },
    rating: { average: 7.2 },
    genres: ["Action", "Sci-Fi"],
    summary:
      "Godzilla and Kong face a colossal hidden threat that challenges the survival of both monsters and humanity.",
  },
  {
    id: 10,
    name: "Furiosa",
    badge: "New",
    image: {
      medium: "https://image.tmdb.org/t/p/w500/iADOJ8Zymht2JPMoy3R7xceZprc.jpg",
      original: "https://image.tmdb.org/t/p/original/iADOJ8Zymht2JPMoy3R7xceZprc.jpg",
    },
    rating: { average: 7.6 },
    genres: ["Action", "Adventure"],
    summary:
      "Young Furiosa is taken from the Green Place and must survive a brutal wasteland ruled by warlords.",
  },
  {
    id: 11,
    name: "Kingdom of the Planet of the Apes",
    badge: "New",
    image: {
      medium: "https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
      original: "https://image.tmdb.org/t/p/original/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    },
    rating: { average: 7.3 },
    genres: ["Action", "Sci-Fi"],
    summary:
      "Generations after Caesar, a young ape questions a new empire and begins a journey that changes the future.",
  },
  {
    id: 12,
    name: "Oppenheimer",
    badge: "Top Rated",
    image: {
      medium: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
      original: "https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    },
    rating: { average: 8.6 },
    genres: ["Drama", "History"],
    summary:
      "J. Robert Oppenheimer leads the Manhattan Project and faces the consequences of creating the atomic bomb.",
  },
  {
    id: 13,
    name: "Spider-Man: Across the Spider-Verse",
    badge: "Fan Favorite",
    image: {
      medium: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
      original: "https://image.tmdb.org/t/p/original/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    },
    rating: { average: 8.7 },
    genres: ["Animation", "Action"],
    summary:
      "Miles Morales travels across the multiverse and clashes with a team of Spider-People over how to save everyone.",
  },
  {
    id: 14,
    name: "Mission: Impossible - Dead Reckoning",
    badge: "Action Hit",
    image: {
      medium: "https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg",
      original: "https://image.tmdb.org/t/p/original/NNxYkU70HPurnNCSiCjYAmacwm.jpg",
    },
    rating: { average: 7.7 },
    genres: ["Action", "Adventure"],
    summary:
      "Ethan Hunt and his IMF team race against time to stop a dangerous weapon from falling into the wrong hands.",
  },
  {
    id: 15,
    name: "Guardians of the Galaxy Vol. 3",
    badge: "Blockbuster",
    image: {
      medium: "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
      original: "https://image.tmdb.org/t/p/original/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
    },
    rating: { average: 8.0 },
    genres: ["Action", "Comedy"],
    summary:
      "The Guardians rally to protect Rocket and face a mission that could reshape their family forever.",
  },
]

const trailers = {
  Avengers: "https://www.youtube.com/embed/eOrNdBpGMv8",
  Interstellar: "https://www.youtube.com/embed/zSWdZVtXT7E",
  Inception: "https://www.youtube.com/embed/YoHD9XEInc0",
  Joker: "https://www.youtube.com/embed/zAGVQLHvwOY",
  "The Batman": "https://www.youtube.com/embed/mqqft2x_Aa4",
  "Dune: Part Two": "https://www.youtube.com/embed/Way9Dexny3w",
  "Inside Out 2": "https://www.youtube.com/embed/LEjhY15eCx0",
  "Deadpool & Wolverine": "https://www.youtube.com/embed/73_1biulkYk",
  "Godzilla x Kong": "https://www.youtube.com/embed/lV1OOlGwExM",
  Furiosa: "https://www.youtube.com/embed/XJMuhwVlca4",
  "Kingdom of the Planet of the Apes": "https://www.youtube.com/embed/XtFI7SNtVpY",
  Oppenheimer: "https://www.youtube.com/embed/uYPbbksJxIg",
  "Spider-Man: Across the Spider-Verse": "https://www.youtube.com/embed/cqGjhVJWtEg",
  "Mission: Impossible - Dead Reckoning": "https://www.youtube.com/embed/avz06PDqDbM",
  "Guardians of the Galaxy Vol. 3": "https://www.youtube.com/embed/u3V5KDHRQvk",
}

const fallbackShows = [
  "Under the Dome",
  "Person of Interest",
  "Bitten",
  "Arrow",
  "True Detective",
  "The 100",
  "Homeland",
  "Gotham",
  "The Flash",
  "Silicon Valley",
].map((name, index) => ({
  id: index + 1,
  name,
  genres: index % 2 === 0 ? ["Drama", "Science-Fiction"] : ["Action", "Adventure"],
  rating: { average: 7 + index / 10 },
  language: "English",
  premiered: `201${index % 10}-01-01`,
  summary:
    "Fallback TV show data appears only when the TVMaze API cannot be reached during local development.",
}))

const translations = {
  id: {
    featured: "Film Pilihan",
    rating: "Rating",
    watchTrailer: "Tonton Trailer",
    heroDescription:
      "Temukan film-film yang sedang tren, jelajahi trailer resminya, dan nikmati pengalaman sinematik modern.",
    openMovies: "Lihat Katalog Film",
    totalMovies: "Film Populer",
    officialTrailer: "Trailer Resmi",
    freeAccess: "Akses Gratis",
    freeShort: "Gratis",
    explore: "Jelajahi Film",
    popularThisWeek: "Populer Minggu Ini",
    trendingSubtitle: "5 film favorit dengan rating dan tren terbaik di MovieVerse.",
    movieFound: "film ditemukan",
    searchPlaceholder: "Cari film favoritmu...",
    highRated: "Hanya rating 8.7 ke atas",
    genreFilter: "Filter genre",
    notFound: "Film Tidak Ditemukan",
    notFoundHelp: "Coba cari nama film atau genre lain.",
    watchDetail: "Lihat Detail",
    movieSummary: "Ringkasan Film",
    apiEyebrow: "Integrasi Axios",
    apiTitle: "Data dari Public API",
    apiDescription:
      "Halaman ini mengambil 10 data show dari TVMaze API menggunakan Axios dan menampilkannya sebagai daftar film/series eksternal.",
    apiSource: "Sumber API",
    apiLoading: "Mengambil 10 data show dari TVMaze API...",
    apiError: "API sedang tidak tersedia, menampilkan data cadangan agar tampilan tetap bisa diuji.",
    apiLanguage: "Bahasa",
    apiPremiered: "Tayang perdana",
    apiGenres: "Genre",
    apiNoRating: "Belum ada rating",
    footerTech: "Dibuat menggunakan React JS, Tailwind CSS, Axios, dan Public API.",
    footerRights: "(c) 2026 MovieVerse. Semua hak dilindungi.",
    genreAll: "Semua",
    genres: {
      Action: "Aksi",
      Adventure: "Petualangan",
      "Sci-Fi": "Fiksi Ilmiah",
      Drama: "Drama",
      Crime: "Kriminal",
      Animation: "Animasi",
      Comedy: "Komedi",
      History: "Sejarah",
    },
    badges: {
      Trending: "Trending",
      "Top Rated": "Rating Tertinggi",
      "Mind Bender": "Penuh Misteri",
      "Critic Pick": "Pilihan Kritikus",
      New: "Baru",
      Blockbuster: "Blockbuster",
      "Fan Favorite": "Favorit",
      Epic: "Epik",
      "Action Hit": "Aksi",
    },
    summaries: {
      Avengers:
        "Para pahlawan terkuat bumi harus bersatu untuk menghentikan Loki dan pasukan aliennya dari memperbudak umat manusia.",
      Interstellar:
        "Sekelompok penjelajah melakukan perjalanan melalui lubang cacing di luar angkasa demi memastikan kelangsungan hidup manusia.",
      Inception:
        "Seorang pencuri ahli memasuki mimpi orang lain untuk mencuri rahasia, tetapi menghadapi misi tersulit dalam hidupnya.",
      Joker:
        "Seorang komedian gagal perlahan tenggelam dalam kegilaan dan berubah menjadi Joker yang terkenal di Gotham City.",
      "The Batman":
        "Batman mengungkap korupsi di Gotham City saat memburu Riddler, pembunuh berantai yang menargetkan kaum elite.",
      "Dune: Part Two":
        "Paul Atreides bersatu dengan Chani dan bangsa Fremen sambil membalas dendam kepada pihak yang menghancurkan keluarganya.",
      "Inside Out 2":
        "Riley memasuki masa remaja saat emosi-emosi baru datang dan mengguncang pusat kendali pikirannya.",
      "Deadpool & Wolverine":
        "Deadpool bekerja sama dengan Wolverine dalam misi kacau yang dapat mengubah semesta mereka.",
      "Godzilla x Kong":
        "Godzilla dan Kong menghadapi ancaman raksasa tersembunyi yang menguji nasib para titan dan umat manusia.",
      Furiosa:
        "Furiosa muda diculik dari Green Place dan harus bertahan di gurun brutal yang dikuasai para panglima perang.",
      "Kingdom of the Planet of the Apes":
        "Beberapa generasi setelah Caesar, seekor kera muda mempertanyakan kerajaan baru dan memulai perjalanan besar.",
      Oppenheimer:
        "J. Robert Oppenheimer memimpin Proyek Manhattan dan menghadapi konsekuensi dari penciptaan bom atom.",
      "Spider-Man: Across the Spider-Verse":
        "Miles Morales melintasi multiverse dan berselisih dengan para Spider-People tentang cara menyelamatkan semua orang.",
      "Mission: Impossible - Dead Reckoning":
        "Ethan Hunt dan tim IMF berpacu dengan waktu untuk mencegah senjata berbahaya jatuh ke tangan yang salah.",
      "Guardians of the Galaxy Vol. 3":
        "Para Guardians bersatu untuk melindungi Rocket dan menghadapi misi yang dapat mengubah keluarga mereka selamanya.",
    },
  },
  en: {
    featured: "Featured Movie",
    rating: "Rating",
    watchTrailer: "Watch Trailer",
    heroDescription:
      "Discover trending movies, explore official trailers, and enjoy a modern cinematic experience.",
    openMovies: "Explore Movies",
    totalMovies: "Popular Movies",
    officialTrailer: "Official Trailer",
    freeAccess: "Free Access",
    freeShort: "Free",
    explore: "Explore Movies",
    popularThisWeek: "Popular This Week",
    trendingSubtitle: "5 favorite movies with the strongest ratings and trend signals in MovieVerse.",
    movieFound: "movie found",
    searchPlaceholder: "Search your favorite movie...",
    highRated: "Only rating 8.7 and above",
    genreFilter: "Genre filter",
    notFound: "Movie Not Found",
    notFoundHelp: "Try searching another movie name or genre.",
    watchDetail: "Watch Detail",
    movieSummary: "Movie Summary",
    apiEyebrow: "Axios Integration",
    apiTitle: "Public API Data",
    apiDescription:
      "This page fetches 10 shows from the TVMaze API using Axios and displays them as external movie/series data.",
    apiSource: "API Source",
    apiLoading: "Fetching 10 shows from the TVMaze API...",
    apiError: "The API is unavailable, showing fallback data so the interface can still be tested.",
    apiLanguage: "Language",
    apiPremiered: "Premiered",
    apiGenres: "Genres",
    apiNoRating: "No rating yet",
    footerTech: "Built with React JS, Tailwind CSS, Axios, and Public API.",
    footerRights: "(c) 2026 MovieVerse. All rights reserved.",
    genreAll: "All",
    genres: {
      Action: "Action",
      Adventure: "Adventure",
      "Sci-Fi": "Sci-Fi",
      Drama: "Drama",
      Crime: "Crime",
      Animation: "Animation",
      Comedy: "Comedy",
      History: "History",
    },
    badges: {
      Trending: "Trending",
      "Top Rated": "Top Rated",
      "Mind Bender": "Mind Bender",
      "Critic Pick": "Critic Pick",
      New: "New",
      Blockbuster: "Blockbuster",
      "Fan Favorite": "Fan Favorite",
      Epic: "Epic",
      "Action Hit": "Action Hit",
    },
    summaries: {
      Avengers:
        "Earth's mightiest heroes must come together to stop Loki and his alien army from enslaving humanity.",
      Interstellar:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      Inception:
        "A skilled thief enters people's dreams to steal secrets but faces his toughest mission yet.",
      Joker:
        "A failed comedian slowly descends into madness and becomes Gotham City's infamous Joker.",
      "The Batman":
        "Batman uncovers corruption in Gotham City while pursuing the Riddler, a serial killer targeting elites.",
      "Dune: Part Two":
        "Paul Atreides unites with Chani and the Fremen while seeking revenge against those who destroyed his family.",
      "Inside Out 2":
        "Riley enters her teenage years as new emotions arrive and shake up headquarters.",
      "Deadpool & Wolverine":
        "Deadpool teams up with Wolverine for a chaotic mission that could change their universe.",
      "Godzilla x Kong":
        "Godzilla and Kong face a colossal hidden threat that challenges the survival of both monsters and humanity.",
      Furiosa:
        "Young Furiosa is taken from the Green Place and must survive a brutal wasteland ruled by warlords.",
      "Kingdom of the Planet of the Apes":
        "Generations after Caesar, a young ape questions a new empire and begins a journey that changes the future.",
      Oppenheimer:
        "J. Robert Oppenheimer leads the Manhattan Project and faces the consequences of creating the atomic bomb.",
      "Spider-Man: Across the Spider-Verse":
        "Miles Morales travels across the multiverse and clashes with a team of Spider-People over how to save everyone.",
      "Mission: Impossible - Dead Reckoning":
        "Ethan Hunt and his IMF team race against time to stop a dangerous weapon from falling into the wrong hands.",
      "Guardians of the Galaxy Vol. 3":
        "The Guardians rally to protect Rocket and face a mission that could reshape their family forever.",
    },
  },
}

const stripHtml = (value) => value?.replace(/<[^>]*>/g, "") || "-"

function Home({ theme, language, activePage, onNavigate }) {
  const isDark = theme === "dark"
  const text = translations[language]
  const getGenreLabel = (genre) => text.genres[genre] || genre

  const [apiItems, setApiItems] = useState([])
  const [apiLoading, setApiLoading] = useState(false)
  const [apiError, setApiError] = useState(false)
  const [apiFetched, setApiFetched] = useState(false)
  const [search, setSearch] = useState("")
  const [activeGenre, setActiveGenre] = useState("All")
  const [onlyHighRated, setOnlyHighRated] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchClose, setClosingSearch] = useState(false)
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [recentSearches, setRecentSearches] = useState([])

useEffect(() => {
  if (activePage !== "api" || apiFetched) return

  let isMounted = true

  setApiLoading(true)

  const minimumLoadingTime = new Promise((resolve) =>
    setTimeout(resolve, 1200)
  )

  Promise.all([
    axios.get("https://api.tvmaze.com/shows?page=1"),
    minimumLoadingTime,
  ])
    .then(([response]) => {
      if (!isMounted) return

      setApiItems(response.data.slice(0, 10))
      setApiError(false)
    })
    .catch(() => {
      if (!isMounted) return

      setApiItems(fallbackShows)
      setApiError(true)
    })
    .finally(() => {
      if (!isMounted) return

      setApiLoading(false)
      setApiFetched(true)
    })

  return () => {
    isMounted = false
  }
}, [activePage, apiFetched])

useEffect(() => {
  const savedSearches = JSON.parse(localStorage.getItem("recent-searches")) || []
  setRecentSearches(savedSearches)
}, [])

useEffect(() => {
  localStorage.setItem("recent-searches", JSON.stringify(recentSearches))
}, [recentSearches])

const handleSearchChange = (value) => {
  setSearch(value)

  if (!value.trim()) return

  setRecentSearches((prev) => {
    const updated = [
      value,
      ...prev.filter((item) => item.toLowerCase() !== value.toLowerCase()),
    ]

    return updated.slice(0, 5)
  })
}

  const genres = useMemo(
    () => ["All", ...new Set(movieData.flatMap((movie) => movie.genres))],
    []
  )

  const featuredMovie = movieData[0]
  const trendingMovies = useMemo(
    () => [...movieData].sort((firstMovie, secondMovie) => secondMovie.rating.average - firstMovie.rating.average).slice(0, 5),
    []
  )

const closeSearchModal = () => {
  setClosingSearch(true)

  setTimeout(() => {
    closeSearchModal()
    setClosingSearch(false)
  }, 200)
}

  const filteredMovies = movieData.filter((movie) => {
    const matchesSearch = movie.name.toLowerCase().includes(search.toLowerCase())
    const matchesGenre = activeGenre === "All" || movie.genres.includes(activeGenre)
    const matchesRating = !onlyHighRated || movie.rating.average >= 8.7

    return matchesSearch && matchesGenre && matchesRating
  })

  const pageBackground = isDark
    ? "bg-gradient-to-br from-black via-gray-950 to-black text-white"
    : "bg-gradient-to-br from-slate-100 via-white to-orange-50 text-slate-950"
  const cardClass = isDark
    ? "border-white/10 bg-white/10"
    : "border-slate-200 bg-white/90"
  const mutedText = isDark ? "text-gray-300" : "text-slate-600"
  const subtleText = isDark ? "text-gray-400" : "text-slate-500"

  return (
    <main className={`min-h-screen overflow-hidden transition-colors duration-500 ${pageBackground}`}>
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-[360px] h-[360px] bg-red-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[360px] h-[360px] bg-yellow-500/20 blur-3xl rounded-full"></div>
      </div>

      {activePage === "home" && (
        <section className="max-w-7xl mx-auto px-5 pt-0 pb-14">
          <div className="relative min-h-[620px] overflow-hidden rounded-b-[2rem] border border-white/10 bg-black shadow-2xl">
            <img
              src={featuredMovie.image.original}
              alt={featuredMovie.name}
              className="absolute inset-0 h-full w-full object-cover opacity-55"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

            <div className="relative z-10 flex min-h-[620px] max-w-3xl flex-col justify-end px-6 py-10 text-white md:px-12 md:py-16">
              <span className="mb-5 w-fit rounded-full border border-yellow-400/40 bg-yellow-400/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-yellow-200">
                {text.featured}
              </span>

              <h1 className="mb-5 text-5xl font-extrabold leading-tight md:text-7xl">
                {featuredMovie.name}
              </h1>

              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-extrabold text-black">
                  {text.rating} {featuredMovie.rating.average}
                </span>

                {featuredMovie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur"
                  >
                    {getGenreLabel(genre)}
                  </span>
                ))}
              </div>

              <p className="mb-8 max-w-2xl text-base leading-relaxed text-gray-200 md:text-lg">
                {text.summaries[featuredMovie.name]}
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedMovie(featuredMovie)}
                  className="rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 px-7 py-4 text-sm font-extrabold text-white shadow-2xl shadow-red-500/20 transition hover:scale-105"
                >
                  {text.watchTrailer}
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate("movies")}
                  className="rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white/20"
                >
                  {text.openMovies}
                </button>
              </div>
            </div>
          </div>

          <div className="py-14 text-center">
            <h2 className="mb-4 bg-gradient-to-r from-red-500 via-yellow-400 to-orange-500 bg-clip-text text-4xl font-extrabold text-transparent md:text-6xl">
              MovieVerse
            </h2>

            <p className={`mx-auto max-w-3xl text-lg leading-relaxed md:text-xl ${mutedText}`}>
              {text.heroDescription}
            </p>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            <InfoCard value="15+" label={text.totalMovies} color="text-yellow-400" className={cardClass} />
            <InfoCard value="HD" label={text.officialTrailer} color="text-red-400" className={cardClass} />
            <InfoCard value={text.freeShort} label={text.freeAccess} color="text-green-400" className={cardClass} />
          </div>

          <div>
            <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className={`mb-2 text-sm font-bold uppercase tracking-[0.25em] ${isDark ? "text-red-300" : "text-red-500"}`}>
                  {text.explore}
                </p>
                <h2 className="text-3xl font-extrabold md:text-4xl">{text.popularThisWeek}</h2>
              </div>
              <p className={`max-w-xl text-sm leading-relaxed ${subtleText}`}>{text.trendingSubtitle}</p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {trendingMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  text={text}
                  isDark={isDark}
                  getGenreLabel={getGenreLabel}
                  onSelect={setSelectedMovie}
                  compact
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {activePage === "movies" && (
        <section className="max-w-7xl mx-auto px-5 pt-28 pb-14">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={`mb-2 text-sm font-bold uppercase tracking-[0.25em] ${isDark ? "text-red-300" : "text-red-500"}`}>
                {text.explore}
              </p>
              <h1 className="text-4xl font-extrabold md:text-6xl">{text.popularThisWeek}</h1>
            </div>

            <p className={`text-sm font-semibold ${subtleText}`}>
              {filteredMovies.length} {text.movieFound}
            </p>
          </div>

          <form className={`mb-10 rounded-3xl border p-5 shadow-2xl backdrop-blur-xl ${cardClass}`}>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSearchModal(true)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  isDark
                    ? "border-white/10 bg-black/25 text-gray-400"
                    : "border-slate-200 bg-white text-slate-500"
                }`}
              >
                {search || text.searchPlaceholder}
              </button>

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 text-lg font-bold transition ${
                    isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-slate-400 hover:text-slate-950"
                  }`}
                >
                  ✕
                </button>
              )}
            </div>

            <fieldset className="mt-5">
              <legend className={`mb-3 text-sm font-bold ${subtleText}`}>{text.genreFilter}</legend>
              <div className="flex flex-wrap gap-3">
                {genres.map((genre) => (
                  <label
                    key={genre}
                    className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-bold transition ${
                      activeGenre === genre
                        ? "border-red-400 bg-red-500 text-white shadow-lg shadow-red-500/25"
                        : isDark
                          ? "border-white/10 bg-white/10 text-gray-300 hover:border-yellow-400/60 hover:text-yellow-200"
                          : "border-slate-200 bg-white text-slate-700 hover:border-red-300 hover:text-red-500"
                    }`}
                  >
                    <input
                      type="radio"
                      name="genre"
                      value={genre}
                      checked={activeGenre === genre}
                      onChange={() => setActiveGenre(genre)}
                      className="sr-only"
                    />
                    {genre === "All" ? text.genreAll : getGenreLabel(genre)}
                  </label>
                ))}
              </div>
            </fieldset>
          </form>

          {filteredMovies.length === 0 ? (
            <div className="py-20 text-center">
              <h2 className="mb-4 text-4xl font-bold text-red-400">{text.notFound}</h2>
              <p className={subtleText}>{text.notFoundHelp}</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  text={text}
                  isDark={isDark}
                  getGenreLabel={getGenreLabel}
                  onSelect={setSelectedMovie}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {activePage === "api" && (
        <section className="max-w-7xl mx-auto px-5 pt-28 pb-14">
          <div className="mb-8">
            <p className={`mb-2 text-sm font-bold uppercase tracking-[0.25em] ${isDark ? "text-red-300" : "text-red-500"}`}>
              {text.apiEyebrow}
            </p>
            <h1 className="mb-4 text-4xl font-extrabold md:text-6xl">{text.apiTitle}</h1>
            <p className={`max-w-3xl text-lg leading-relaxed ${mutedText}`}>{text.apiDescription}</p>
          </div>

          <div className={`mb-8 rounded-3xl border p-6 shadow-2xl backdrop-blur-xl ${cardClass}`}>
            <p className={`text-sm font-bold uppercase tracking-[0.2em] ${subtleText}`}>{text.apiSource}</p>
            <p className="mt-2 font-mono text-sm">https://api.tvmaze.com/shows?page=1</p>
          </div>

          {apiLoading ? (
            <div className="grid gap-6 md:grid-cols-2">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className={`rounded-3xl border p-6 shadow-xl ${cardClass}`}>
                  <div className={`mb-4 h-5 w-24 animate-pulse rounded-full ${isDark ? "bg-white/10" : "bg-slate-200"}`}></div>
                  <div className={`mb-3 h-6 animate-pulse rounded-full ${isDark ? "bg-white/10" : "bg-slate-200"}`}></div>
                  <div className={`h-4 w-4/5 animate-pulse rounded-full ${isDark ? "bg-white/10" : "bg-slate-200"}`}></div>
                </div>
              ))}
              <p className={`md:col-span-2 text-center font-semibold ${subtleText}`}>{text.apiLoading}</p>
            </div>
          ) : (
            <>
              {apiError && (
                <div className="mb-6 rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-4 text-sm font-semibold text-yellow-500">
                  {text.apiError}
                </div>
              )}

              <div className="grid gap-6 md:grid-cols-2">
                {apiItems.map((show) => (
                  <article key={show.id} className={`rounded-3xl border p-6 shadow-xl transition hover:-translate-y-1 hover:shadow-red-500/20 ${cardClass}`}>
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <span className="inline-flex rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                        TVMaze #{show.id}
                      </span>
                      <span className="inline-flex rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-black">
                        {show.rating?.average ? `${text.rating} ${show.rating.average}` : text.apiNoRating}
                      </span>
                    </div>

                    <h2 className="mb-3 text-xl font-extrabold">{show.name}</h2>

                    <div className={`mb-4 grid gap-2 text-sm ${mutedText}`}>
                      <p>
                        <span className="font-bold">{text.apiLanguage}:</span> {show.language || "-"}
                      </p>
                      <p>
                        <span className="font-bold">{text.apiPremiered}:</span> {show.premiered || "-"}
                      </p>
                      <p>
                        <span className="font-bold">{text.apiGenres}:</span>{" "}
                        {show.genres?.length ? show.genres.join(", ") : "-"}
                      </p>
                    </div>

                    <p className={`line-clamp-3 leading-relaxed ${mutedText}`}>
                      {stripHtml(show.summary)}
                    </p>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          text={text}
          isDark={isDark}
          getGenreLabel={getGenreLabel}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      {showSearchModal && (
          <div
            onClick={() => setShowSearchModal(false)}
className={`fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-24 backdrop-blur-md ${
  closingSearch
    ? "animate-[fadeOut_.2s_ease_forwards]"
    : "animate-[fadeIn_.25s_ease]"
}`}
          >
            <div
              onClick={(event) => event.stopPropagation()}
              className={`mt-28 w-[92%] max-w-2xl rounded-3xl border p-6 shadow-2xl backdrop-blur-2xl transition-all ${
                isDark
                  ? "border-white/10 bg-gray-900/80"
                  : "border-white/40 bg-white/70"
              }`}
            >
              <div className="relative">
                <input
                  autoFocus
                  type="text"
                  placeholder={text.searchPlaceholder}
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" &&
                      search.trim() &&
                      !recentSearches.includes(search)
                    ) {
                      setRecentSearches((prev) => [
                        search,
                        ...prev.slice(0, 4),
                      ])
                    }
                  }}
                  className={`w-full rounded-2xl border p-4 pr-12 outline-none focus:ring-2 focus:ring-red-500 ${
                    isDark
                      ? "border-white/10 bg-black/20 text-white placeholder:text-gray-400"
                      : "border-slate-200 bg-white text-slate-950 placeholder:text-slate-500"
                  }`}
                />

        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className={`absolute right-4 top-1/2 -translate-y-1/2 text-lg font-bold ${
              isDark
                ? "text-gray-400 hover:text-white"
                : "text-slate-400 hover:text-black"
            }`}
          >
            ✕
          </button>
        )}
      </div>

      {recentSearches.length > 0 && (
        <div className="mt-5">
          <p className={`mb-3 text-sm font-bold ${
            isDark ? "text-gray-300" : "text-slate-600"
          }`}>
            Recent Searches
          </p>

          <div className="flex flex-wrap gap-3">
            {recentSearches.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSearch(item)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  isDark
                    ? "bg-white/10 text-white hover:bg-red-500"
                    : "bg-slate-200 text-slate-800 hover:bg-red-500 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
)}

      <footer className={`mt-16 border-t ${isDark ? "border-white/10" : "border-slate-200"}`}>
        <div className="max-w-7xl mx-auto px-5 py-10 text-center">
          <h2 className="mb-3 bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-3xl font-bold text-transparent">
            MovieVerse
          </h2>

          <p className={`mb-4 ${mutedText}`}>{text.footerTech}</p>

          <p className={`text-sm ${subtleText}`}>{text.footerRights}</p>
        </div>
      </footer>
    </main>
  )
}

function InfoCard({ value, label, color, className }) {
  return (
    <article className={`rounded-3xl border p-6 shadow-2xl backdrop-blur-xl transition hover:scale-105 ${className}`}>
      <h3 className={`mb-2 text-4xl font-bold ${color}`}>{value}</h3>
      <p>{label}</p>
    </article>
  )
}

function MovieCard({ movie, text, isDark, getGenreLabel, onSelect, compact = false }) {
  return (
    <article
      className={`group overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-y-3 hover:shadow-red-500/20 ${
        isDark ? "border-white/10 bg-white/10" : "border-slate-200 bg-white/90"
      }`}
    >
      <div className="relative overflow-hidden">
        <img
          src={movie.image.medium}
          alt={movie.name}
          className={`${compact ? "h-[360px]" : "h-[380px]"} w-full object-cover transition duration-500 group-hover:scale-110`}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>

        <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-2">
          <div className="max-w-[58%] truncate rounded-full bg-red-500 px-3 py-2 text-[11px] font-extrabold uppercase tracking-wide text-white shadow-lg">
            {text.badges[movie.badge]}
          </div>

          <div className="shrink-0 rounded-full bg-black/75 px-3 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-lg">
            {text.rating} {movie.rating.average}
          </div>
        </div>
      </div>

      <div className={compact ? "p-4" : "p-5"}>
        <h2 className="mb-4 line-clamp-1 text-2xl font-bold">{movie.name}</h2>

        <div className="mb-4 flex flex-wrap gap-2">
          {movie.genres.map((genre) => (
            <span
              key={genre}
              className={`rounded-full px-3 py-1 text-xs ${
                isDark ? "bg-red-500/20 text-red-300" : "bg-red-50 text-red-600"
              }`}
            >
              {getGenreLabel(genre)}
            </span>
          ))}
        </div>

        <p className={`mb-6 line-clamp-3 text-sm leading-relaxed ${isDark ? "text-gray-300" : "text-slate-600"}`}>
          {text.summaries[movie.name]}
        </p>

        <button
          type="button"
          onClick={() => onSelect(movie)}
          className="w-full rounded-2xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 py-3 font-bold text-white transition hover:scale-105"
        >
          {text.watchDetail}
        </button>
      </div>
    </article>
  )
}

function MovieModal({ movie, text, isDark, getGenreLabel, onClose }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-md"
    >
      <article
        onClick={(event) => event.stopPropagation()}
        className={`relative my-10 w-full max-w-5xl overflow-hidden rounded-3xl border shadow-2xl ${
          isDark ? "border-white/10 bg-gray-900" : "border-slate-200 bg-white text-slate-950"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 h-11 w-11 rounded-full bg-red-500 font-bold text-white shadow-lg transition hover:bg-red-600"
        >
          X
        </button>

        <div className="relative w-full">
          <img
            src={movie.image.original}
            alt={movie.name}
            className="max-h-[70vh] w-full object-cover md:max-h-[80vh]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h2 className="mb-4 text-3xl font-extrabold md:text-5xl">{movie.name}</h2>

            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-yellow-500 px-4 py-1 font-bold text-black">
                {text.rating} {movie.rating.average}
              </span>

              {movie.genres.map((genre) => (
                <span key={genre} className="rounded-full bg-red-500/80 px-4 py-1 text-sm">
                  {getGenreLabel(genre)}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 md:p-10">
          <h3 className="mb-5 text-2xl font-bold">{text.movieSummary}</h3>

          <p className={`mb-10 leading-relaxed ${isDark ? "text-gray-300" : "text-slate-600"}`}>
            {text.summaries[movie.name]}
          </p>

          <h3 className="mb-5 text-2xl font-bold">{text.officialTrailer}</h3>

          <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <iframe
              className="h-[220px] w-full sm:h-[320px] md:h-[450px] lg:h-[550px]"
              src={trailers[movie.name]}
              title={`${movie.name} Trailer`}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </article>
    </div>
  )
}

export default Home
