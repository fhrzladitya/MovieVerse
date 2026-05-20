import { useEffect, useState } from "react"

const navText = {
  id: {
    pages: {
      home: "Beranda",
      movies: "Film",
      api: "Data API",
    },
    languageButton: "EN",
  },

  en: {
    pages: {
      home: "Home",
      movies: "Movies",
      api: "API Data",
    },
    languageButton: "ID",
  },
}

function Navbar({
  theme,
  language,
  activePage,
  onNavigate,
  onToggleTheme,
  onToggleLanguage,
}) {
  const text = navText[language]
  const isDark = theme === "dark"

  // =========================
  // SCROLL ANIMATION
  // =========================
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // selalu tampil di atas
      if (currentScrollY <= 10) {
        setShowNavbar(true)
      }

      // scroll ke bawah = hide
      else if (currentScrollY > lastScrollY) {
        setShowNavbar(false)
      }

      // scroll ke atas = show
      else {
        setShowNavbar(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [lastScrollY])

  const navButtonClass = (page) =>
    `
    relative
    rounded-full
    transition-all
    duration-300
    whitespace-nowrap
    px-3 py-2
    text-sm
    font-semibold
    md:px-4
    md:py-2
    md:text-base
    ${
      activePage === page
        ? "bg-red-500 text-white shadow-lg shadow-red-500/25"
        : isDark
        ? "text-gray-200 hover:bg-white/10 hover:text-yellow-300"
        : "text-slate-700 hover:bg-white/80 hover:text-red-500"
    }
  `

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-40
        border-b
        backdrop-blur-xl
        transition-all duration-500

        ${
          showNavbar
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }

        ${
          isDark
            ? "border-white/10 bg-black/40 text-white"
            : "border-slate-200 bg-white/70 text-slate-950"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-4 md:px-5">

        {/* MOBILE */}
        <div className="flex flex-col gap-3 py-3 md:hidden">

          {/* LOGO */}
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="
              self-start
              text-[2rem]
              leading-none
              font-extrabold
              tracking-wide
              bg-gradient-to-r
              from-red-500
              via-orange-400
              to-yellow-300
              bg-clip-text
              text-transparent
            "
          >
            MovieVerse
          </button>

          <div className="flex items-center justify-between gap-3">

            <nav className="flex items-center gap-2">
              {Object.entries(text.pages).map(([page, label]) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => onNavigate(page)}
                  className={navButtonClass(page)}
                >
                  {label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2 shrink-0">

              <button
                type="button"
                onClick={onToggleLanguage}
                className={`
                  flex h-9 w-9 items-center justify-center
                  rounded-full border
                  text-xs font-bold
                  transition-all duration-300
                  ${
                    isDark
                      ? "border-white/15 bg-white/10 hover:bg-white/20"
                      : "border-slate-200 bg-white/80 hover:bg-white"
                  }
                `}
              >
                {text.languageButton}
              </button>

              <button
                type="button"
                onClick={onToggleTheme}
                className={`
                  flex h-9 w-9 items-center justify-center
                  rounded-full border
                  text-sm
                  transition-all duration-300
                  ${
                    isDark
                      ? "border-white/15 bg-white/10 hover:bg-white/20"
                      : "border-slate-200 bg-white/80 hover:bg-white"
                  }
                `}
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </button>

            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-between py-4">

          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="
              text-3xl
              font-extrabold
              tracking-wide
              bg-gradient-to-r
              from-red-500
              via-orange-400
              to-yellow-300
              bg-clip-text
              text-transparent
            "
          >
            MovieVerse
          </button>

          <div className="flex items-center gap-3">

            <nav className="flex items-center gap-2 text-sm font-semibold">
              {Object.entries(text.pages).map(([page, label]) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => onNavigate(page)}
                  className={navButtonClass(page)}
                >
                  {label}
                </button>
              ))}
            </nav>

            <button
              type="button"
              onClick={onToggleLanguage}
              className={`
                flex h-11 w-11 items-center justify-center
                rounded-full border
                text-sm font-bold
                transition-all duration-300
                ${
                  isDark
                    ? "border-white/15 bg-white/10 hover:bg-white/20"
                    : "border-slate-200 bg-white/80 hover:bg-white"
                }
              `}
            >
              {text.languageButton}
            </button>

            <button
              type="button"
              onClick={onToggleTheme}
              className={`
                flex h-11 w-11 items-center justify-center
                rounded-full border
                text-sm
                transition-all duration-300
                ${
                  isDark
                    ? "border-white/15 bg-white/10 hover:bg-white/20"
                    : "border-slate-200 bg-white/80 hover:bg-white"
                }
              `}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

          </div>
        </div>

      </div>
    </header>
  )
}

export default Navbar