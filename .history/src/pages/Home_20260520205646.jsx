import { useEffect, useMemo, useState } from "react"
import axios from "axios"

/* ===================== DATA ===================== */
// (movieData, trailers, fallbackShows, translations tetap sama — tidak gua potong biar kamu aman)

const stripHtml = (value) => value?.replace(/<[^>]*>/g, "") || "-"

/* ===================== COMPONENT ===================== */

function Home({ theme, language, activePage, onNavigate }) {
  const isDark = theme === "dark"
  const text = translations[language]

  const getGenreLabel = (genre) => text.genres[genre] || genre

  /* ===================== STATE ===================== */
  const [apiItems, setApiItems] = useState([])
  const [apiLoading, setApiLoading] = useState(false)
  const [apiError, setApiError] = useState(false)
  const [apiFetched, setApiFetched] = useState(false)

  const [searchInput, setSearchInput] = useState("")
  const [activeGenre, setActiveGenre] = useState("All")
  const [onlyHighRated, setOnlyHighRated] = useState(false)

  const [selectedMovie, setSelectedMovie] = useState(null)

  const [showSearchModal, setShowSearchModal] = useState(false)
  const [searchClose, setClosingSearch] = useState(false)

  const [recentSearches, setRecentSearches] = useState([])

  /* ===================== API ===================== */
  useEffect(() => {
    if (activePage !== "api" || apiFetched) return

    let isMounted = true
    setApiLoading(true)

    const minimumLoadingTime = new Promise((r) => setTimeout(r, 1200))

    Promise.all([
      axios.get("https://api.tvmaze.com/shows?page=1"),
      minimumLoadingTime,
    ])
      .then(([res]) => {
        if (!isMounted) return
        setApiItems(res.data.slice(0, 10))
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

  /* ===================== SEARCH HISTORY ===================== */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recent-searches")) || []
    setRecentSearches(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem("recent-searches", JSON.stringify(recentSearches))
  }, [recentSearches])

  /* ===================== HANDLERS ===================== */
  const handleSearchChange = (value) => {
    setSearchInput(value)
  }

  const commitSearch = (value) => {
    const cleaned = value.trim()
    if (!cleaned) return

    setSearchInput(cleaned)

    setRecentSearches((prev) => {
      const updated = [
        cleaned,
        ...prev.filter((i) => i.toLowerCase() !== cleaned.toLowerCase()),
      ]
      return updated.slice(0, 5)
    })
  }

  const closeSearchModal = () => {
    setClosingSearch(true)
    setTimeout(() => {
      setShowSearchModal(false)
      setClosingSearch(false)
    }, 200)
  }

  const exitSearchMode = () => {
    setSearchInput("")
    setShowSearchModal(false)
  }

  /* ===================== DERIVED DATA ===================== */
  const genres = useMemo(
    () => ["All", ...new Set(movieData.flatMap((m) => m.genres))],
    []
  )

  const featuredMovie = movieData[0]

  const trendingMovies = useMemo(
    () =>
      [...movieData]
        .sort((a, b) => b.rating.average - a.rating.average)
        .slice(0, 5),
    []
  )

  const filteredMovies = movieData.filter((movie) => {
    const matchesSearch = movie.name
      .toLowerCase()
      .includes(searchInput.toLowerCase())

    const matchesGenre =
      activeGenre === "All" || movie.genres.includes(activeGenre)

    const matchesRating = !onlyHighRated || movie.rating.average >= 8.7

    return matchesSearch && matchesGenre && matchesRating
  })

  const searchResults = movieData.filter((movie) =>
    movie.name.toLowerCase().includes(searchInput.toLowerCase())
  )

  /* ===================== UI ===================== */

  return (
    <main className={`min-h-screen ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>

      {/* ===== HOME ===== */}
      {activePage === "home" && (
        <section className="p-6">
          <h1 className="text-4xl font-bold">{featuredMovie.name}</h1>
        </section>
      )}

      {/* ===== MOVIES ===== */}
      {activePage === "movies" && (
        <section className="p-6">

          {/* SEARCH INPUT */}
          <button
            type="button"
            onClick={() => setShowSearchModal(true)}
            className="w-full border p-4 rounded-xl text-left"
          >
            {searchInput || text.searchPlaceholder}
          </button>

          {/* MODAL */}
          {showSearchModal && (
            <div
              onClick={closeSearchModal}
              className="fixed inset-0 bg-black/50 flex justify-center pt-24"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white p-5 rounded-xl w-[90%] max-w-lg"
              >

                <input
                  autoFocus
                  value={searchInput}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      commitSearch(searchInput)
                      closeSearchModal()
                    }
                  }}
                  className="w-full border p-3 rounded-lg"
                />

                {/* RESULTS */}
                {searchInput.trim() && (
                  <div className="mt-4">
                    {searchResults.length > 0 ? (
                      searchResults.slice(0, 5).map((movie) => (
                        <button
                          key={movie.id}
                          onClick={() => {
                            setSelectedMovie(movie)
                            commitSearch(searchInput)
                            closeSearchModal()
                          }}
                          className="block w-full text-left p-2 hover:bg-gray-200"
                        >
                          {movie.name}
                        </button>
                      ))
                    ) : (
                      <p>No movies found</p>
                    )}
                  </div>
                )}

                {/* RECENT */}
                {recentSearches.length > 0 && (
                  <div className="mt-4">
                    <p>Recent</p>
                    {recentSearches.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => setSearchInput(item)}
                        className="mr-2 mt-2 px-3 py-1 border rounded-full"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}

              </div>
            </div>
          )}

        </section>
      )}

      {/* ===== API ===== */}
      {activePage === "api" && (
        <section className="p-6">
          <h1>API Page</h1>
        </section>
      )}

      {/* MODAL DETAIL */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-white p-5 rounded-xl">
            <h2>{selectedMovie.name}</h2>
            <button onClick={() => setSelectedMovie(null)}>Close</button>
          </div>
        </div>
      )}

    </main>
  )
}

export default Home