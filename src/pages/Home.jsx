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
]

const trailers = {
  Avengers: "https://www.youtube.com/embed/eOrNdBpGMv8",
  Interstellar: "https://www.youtube.com/embed/zSWdZVtXT7E",
  Inception: "https://www.youtube.com/embed/YoHD9XEInc0",
  Joker: "https://www.youtube.com/embed/zAGVQLHvwOY",
  "The Batman": "https://www.youtube.com/embed/mqqft2x_Aa4",
}

const translations = {
  id: {
    featured: "Film Pilihan",
    rating: "Rating",
    watchTrailer: "Tonton Trailer",
    heroDescription:
      "Temukan film-film yang sedang tren, jelajahi trailer resminya, dan nikmati pengalaman sinematik modern.",
    popularMovies: "Film Populer",
    officialTrailer: "Trailer Resmi",
    freeAccess: "Akses Gratis",
    freeShort: "Gratis",
    explore: "Jelajahi Film",
    popularThisWeek: "Populer Minggu Ini",
    loadingCollection: "Memuat koleksi...",
    movieFound: "film ditemukan",
    searchPlaceholder: "Cari film favoritmu...",
    notFound: "Film Tidak Ditemukan",
    notFoundHelp: "Coba cari nama film atau genre lain.",
    watchDetail: "Lihat Detail",
    movieSummary: "Ringkasan Film",
    footerTech: "Dibuat menggunakan React JS, Tailwind CSS, Axios, dan Public API.",
    footerRights: "(c) 2026 MovieVerse. Semua hak dilindungi.",
    genreAll: "Semua",
    genres: {
      Action: "Aksi",
      Adventure: "Petualangan",
      "Sci-Fi": "Fiksi Ilmiah",
      Drama: "Drama",
      Crime: "Kriminal",
    },
    badges: {
      Trending: "Trending",
      "Top Rated": "Rating Tertinggi",
      "Mind Bender": "Penuh Misteri",
      "Critic Pick": "Pilihan Kritikus",
      New: "Baru",
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
    },
  },
  en: {
    featured: "Featured Movie",
    rating: "Rating",
    watchTrailer: "Watch Trailer",
    heroDescription:
      "Discover trending movies, explore official trailers, and enjoy a modern cinematic experience.",
    popularMovies: "Popular Movies",
    officialTrailer: "Official Trailer",
    freeAccess: "Free Access",
    freeShort: "Free",
    explore: "Explore Movies",
    popularThisWeek: "Popular This Week",
    loadingCollection: "Loading collection...",
    movieFound: "movie found",
    searchPlaceholder: "Search your favorite movie...",
    notFound: "Movie Not Found",
    notFoundHelp: "Try searching another movie name or genre.",
    watchDetail: "Watch Detail",
    movieSummary: "Movie Summary",
    footerTech: "Built with React JS, Tailwind CSS, Axios, and Public API.",
    footerRights: "(c) 2026 MovieVerse. All rights reserved.",
    genreAll: "All",
    genres: {
      Action: "Action",
      Adventure: "Adventure",
      "Sci-Fi": "Sci-Fi",
      Drama: "Drama",
      Crime: "Crime",
    },
    badges: {
      Trending: "Trending",
      "Top Rated": "Top Rated",
      "Mind Bender": "Mind Bender",
      "Critic Pick": "Critic Pick",
      New: "New",
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
    },
  },
}

function Home({ theme, language }) {
  const isDark = theme === "dark"
  const text = translations[language]
  const getGenreLabel = (genre) => text.genres[genre] || genre
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [activeGenre, setActiveGenre] = useState("All")
  const [selectedMovie, setSelectedMovie] = useState(null)

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(() => {
        console.log("API Connected")
      })
      .catch(() => {
        console.log("API unavailable, using local movie data")
      })

    const loadingTimer = setTimeout(() => {
      setMovies(movieData)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(loadingTimer)
  }, [])

  const genres = useMemo(
    () => ["All", ...new Set(movieData.flatMap((movie) => movie.genres))],
    []
  )

  const featuredMovie = movies[0] || movieData[0]

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.name.toLowerCase().includes(search.toLowerCase())
    const matchesGenre = activeGenre === "All" || movie.genres.includes(activeGenre)

    return matchesSearch && matchesGenre
  })

  return (
    <main
      className={`min-h-screen overflow-hidden transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-black via-gray-950 to-black text-white"
          : "bg-gradient-to-br from-slate-100 via-white to-orange-50 text-slate-950"
      }`}
    >
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-[360px] h-[360px] bg-red-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[360px] h-[360px] bg-yellow-500/20 blur-3xl rounded-full"></div>
      </div>

      <section className="max-w-7xl mx-auto px-5 pt-0 pb-14">
        <div className="relative min-h-[560px] overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-2xl">
          <img
            src={featuredMovie.image.original}
            alt={featuredMovie.name}
            className="absolute inset-0 h-full w-full object-cover opacity-55"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

          <div className="relative z-10 flex min-h-[560px] max-w-3xl flex-col justify-end px-6 py-10 text-white md:px-12 md:py-14">
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

            <button
              onClick={() => setSelectedMovie(featuredMovie)}
              className="w-fit rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 px-7 py-4 text-sm font-extrabold text-white shadow-2xl shadow-red-500/20 transition hover:scale-105"
            >
              {text.watchTrailer}
            </button>
          </div>
        </div>

        <div className="py-14 text-center">
          <h2 className="mb-4 bg-gradient-to-r from-red-500 via-yellow-400 to-orange-500 bg-clip-text text-4xl font-extrabold text-transparent md:text-6xl">
            MovieVerse
          </h2>

          <p className={`mx-auto max-w-3xl text-lg leading-relaxed md:text-xl ${isDark ? "text-gray-300" : "text-slate-600"}`}>
            {text.heroDescription}
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className={`rounded-3xl border p-6 shadow-2xl backdrop-blur-xl transition hover:scale-105 ${isDark ? "border-white/10 bg-white/10" : "border-slate-200 bg-white/80"}`}>
            <h2 className="mb-2 text-4xl font-bold text-yellow-400">5+</h2>
            <p className={isDark ? "text-gray-300" : "text-slate-600"}>{text.popularMovies}</p>
          </div>

          <div className={`rounded-3xl border p-6 shadow-2xl backdrop-blur-xl transition hover:scale-105 ${isDark ? "border-white/10 bg-white/10" : "border-slate-200 bg-white/80"}`}>
            <h2 className="mb-2 text-4xl font-bold text-red-400">HD</h2>
            <p className={isDark ? "text-gray-300" : "text-slate-600"}>{text.officialTrailer}</p>
          </div>

          <div className={`rounded-3xl border p-6 shadow-2xl backdrop-blur-xl transition hover:scale-105 ${isDark ? "border-white/10 bg-white/10" : "border-slate-200 bg-white/80"}`}>
            <h2 className="mb-2 text-4xl font-bold text-green-400">{text.freeShort}</h2>
            <p className={isDark ? "text-gray-300" : "text-slate-600"}>{text.freeAccess}</p>
          </div>
        </div>

        <section id="movies" className="scroll-mt-24">
          <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={`mb-2 text-sm font-bold uppercase tracking-[0.25em] ${isDark ? "text-red-300" : "text-red-500"}`}>
                {text.explore}
              </p>
              <h2 className="text-3xl font-extrabold md:text-4xl">{text.popularThisWeek}</h2>
            </div>

            <p className={`text-sm font-semibold ${isDark ? "text-gray-400" : "text-slate-500"}`}>
              {loading ? text.loadingCollection : `${filteredMovies.length} ${text.movieFound}`}
            </p>
          </div>

          <form className="mb-6">
            <input
              type="text"
              placeholder={text.searchPlaceholder}
              className={`w-full rounded-3xl border p-5 outline-none backdrop-blur-xl focus:ring-2 focus:ring-red-500 ${
                isDark
                  ? "border-white/10 bg-white/10 text-white placeholder:text-gray-400"
                  : "border-slate-200 bg-white/80 text-slate-950 placeholder:text-slate-500"
              }`}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </form>

          <div className="mb-10 flex flex-wrap gap-3">
            {genres.map((genre) => (
              <button
                key={genre}
                type="button"
                onClick={() => setActiveGenre(genre)}
                className={`rounded-full border px-5 py-2 text-sm font-bold transition ${
                  activeGenre === genre
                    ? "border-red-400 bg-red-500 text-white shadow-lg shadow-red-500/25"
                    : isDark
                      ? "border-white/10 bg-white/10 text-gray-300 hover:border-yellow-400/60 hover:text-yellow-200"
                      : "border-slate-200 bg-white/80 text-slate-700 hover:border-red-300 hover:text-red-500"
                }`}
              >
                {genre === "All" ? text.genreAll : getGenreLabel(genre)}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className={`overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-xl ${
                    isDark ? "border-white/10 bg-white/10" : "border-slate-200 bg-white/80"
                  }`}
                >
                  <div className={`h-[380px] animate-pulse ${isDark ? "bg-white/10" : "bg-slate-200"}`}></div>
                  <div className="space-y-4 p-5">
                    <div className={`h-7 w-3/4 animate-pulse rounded-full ${isDark ? "bg-white/10" : "bg-slate-200"}`}></div>
                    <div className="flex gap-2">
                      <div className={`h-6 w-16 animate-pulse rounded-full ${isDark ? "bg-white/10" : "bg-slate-200"}`}></div>
                      <div className={`h-6 w-20 animate-pulse rounded-full ${isDark ? "bg-white/10" : "bg-slate-200"}`}></div>
                    </div>
                    <div className="space-y-2">
                      <div className={`h-3 animate-pulse rounded-full ${isDark ? "bg-white/10" : "bg-slate-200"}`}></div>
                      <div className={`h-3 w-5/6 animate-pulse rounded-full ${isDark ? "bg-white/10" : "bg-slate-200"}`}></div>
                      <div className={`h-3 w-2/3 animate-pulse rounded-full ${isDark ? "bg-white/10" : "bg-slate-200"}`}></div>
                    </div>
                    <div className={`h-12 animate-pulse rounded-2xl ${isDark ? "bg-white/10" : "bg-slate-200"}`}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredMovies.length === 0 ? (
            <div className="py-20 text-center">
              <h2 className="mb-4 text-4xl font-bold text-red-400">{text.notFound}</h2>
              <p className={isDark ? "text-gray-400" : "text-slate-500"}>{text.notFoundHelp}</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  className={`group overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-y-3 hover:shadow-red-500/20 ${
                    isDark ? "border-white/10 bg-white/10" : "border-slate-200 bg-white/90"
                  }`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={movie.image.medium}
                      alt={movie.name}
                      className="h-[380px] w-full object-cover transition duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>

                    <div className="absolute left-4 top-4 rounded-full bg-red-500 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-white shadow-lg">
                      {text.badges[movie.badge]}
                    </div>

                    <div className="absolute right-4 top-4 rounded-full bg-black/70 px-4 py-2 text-sm font-semibold text-white backdrop-blur-lg">
                      {text.rating} {movie.rating.average}
                    </div>
                  </div>

                  <div className="p-5">
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
                      onClick={() => setSelectedMovie(movie)}
                      className="w-full rounded-2xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 py-3 font-bold transition hover:scale-105"
                    >
                      {text.watchDetail}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </section>

      {selectedMovie && (
        <div
          onClick={() => setSelectedMovie(null)}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-md"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className={`relative my-10 w-full max-w-5xl overflow-hidden rounded-3xl border shadow-2xl ${
              isDark ? "border-white/10 bg-gray-900" : "border-slate-200 bg-white text-slate-950"
            }`}
          >
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute right-4 top-4 z-20 h-11 w-11 rounded-full bg-red-500 font-bold text-white shadow-lg transition hover:bg-red-600"
            >
              X
            </button>

            <div className="relative w-full">
              <img
                src={selectedMovie.image.original}
                alt={selectedMovie.name}
                className="max-h-[70vh] w-full object-cover md:max-h-[80vh]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h2 className="mb-4 text-3xl font-extrabold md:text-5xl">
                  {selectedMovie.name}
                </h2>

                <div className="flex flex-wrap gap-3">
                  <span className="rounded-full bg-yellow-500 px-4 py-1 font-bold text-black">
                    {text.rating} {selectedMovie.rating.average}
                  </span>

                  {selectedMovie.genres.map((genre) => (
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
                {text.summaries[selectedMovie.name]}
              </p>

              <h3 className="mb-5 text-2xl font-bold">{text.officialTrailer}</h3>

              <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <iframe
                  className="h-[220px] w-full sm:h-[320px] md:h-[450px] lg:h-[550px]"
                  src={trailers[selectedMovie.name]}
                  title={`${selectedMovie.name} Trailer`}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className={`mt-16 border-t ${isDark ? "border-white/10" : "border-slate-200"}`}>
        <div className="max-w-7xl mx-auto px-5 py-10 text-center">
          <h2 className="mb-3 bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-3xl font-bold text-transparent">
            MovieVerse
          </h2>

          <p className={`mb-4 ${isDark ? "text-gray-400" : "text-slate-600"}`}>
            {text.footerTech}
          </p>

          <p className={`text-sm ${isDark ? "text-gray-500" : "text-slate-500"}`}>
            {text.footerRights}
          </p>
        </div>
      </footer>
    </main>
  )
}

export default Home
