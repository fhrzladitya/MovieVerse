const navText = {
  id: {
    home: "Beranda",
    movies: "Film",
    theme: {
      dark: "Terang",
      light: "Gelap",
    },
    languageButton: "EN",
  },
  en: {
    home: "Home",
    movies: "Movies",
    theme: {
      dark: "Light",
      light: "Dark",
    },
    languageButton: "ID",
  },
}

function Navbar({ theme, language, onToggleTheme, onToggleLanguage }) {
  const text = navText[language]
  const isDark = theme === "dark"

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b shadow-2xl backdrop-blur-xl ${
        isDark
          ? "border-white/10 bg-black/25 text-white"
          : "border-slate-900/10 bg-white/35 text-slate-950"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3 px-5 py-4">
        <h1 className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
          MovieVerse
        </h1>

        <div className="flex items-center gap-2 text-sm font-semibold">
          <nav className="flex items-center gap-2">
            <a
              href="#"
              className={`px-4 py-2 rounded-full transition ${
                isDark ? "hover:bg-white/10 hover:text-yellow-300" : "hover:bg-white/80 hover:text-red-500"
              }`}
            >
              {text.home}
            </a>

            <a
              href="#movies"
              className={`px-4 py-2 rounded-full transition ${
                isDark ? "hover:bg-white/10 hover:text-yellow-300" : "hover:bg-white/80 hover:text-red-500"
              }`}
            >
              {text.movies}
            </a>
          </nav>

          <button
            type="button"
            onClick={onToggleLanguage}
            className={`rounded-full border px-4 py-2 font-bold transition ${
              isDark
                ? "border-white/15 bg-white/10 hover:bg-white/20"
                : "border-slate-200 bg-white/75 hover:bg-white"
            }`}
          >
            {text.languageButton}
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            className={`rounded-full border px-4 py-2 font-bold transition ${
              isDark
                ? "border-white/15 bg-white/10 hover:bg-white/20"
                : "border-slate-200 bg-white/75 hover:bg-white"
            }`}
          >
            {text.theme[theme]}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
