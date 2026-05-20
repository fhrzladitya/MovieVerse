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

function Navbar({ theme, language, activePage, onNavigate, onToggleTheme, onToggleLanguage }) {
  const text = navText[language]
  const isDark = theme === "dark"

  const navButtonClass = (page) =>
    `px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-full transition whitespace-nowrap ${
      activePage === page
        ? "bg-red-500 text-white shadow-lg shadow-red-500/25"
        : isDark
          ? "hover:bg-white/10 hover:text-yellow-300"
          : "hover:bg-white/80 hover:text-red-500"
    }`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b shadow-2xl backdrop-blur-xl ${
        isDark
          ? "border-white/10 bg-black/30 text-white"
          : "border-slate-900/10 bg-white/45 text-slate-950"
      }`}
    >
   
      <div className="max-w-7xl mx-auto grid grid-cols-12 items-center px-4 py-3 md:px-5 md:py-4 gap-2">
        
        <div className="col-span-4 md:col-span-3 flex items-center">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="text-xl md:text-2xl font-extrabold tracking-wide bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 bg-clip-text text-transparent truncate"
          >
            MovieVerse
          </button>
        </div>

        <nav className="col-span-8 md:col-span-6 flex justify-start md:justify-center items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar py-1 order-2 sm:order-none">
          {Object.entries(text.pages).map(([page, label]) => (
            <button key={page} type="button" onClick={() => onNavigate(page)} className={navButtonClass(page)}>
              {label}
            </button>
          ))}
        </nav>

        <div className="absolute right-4 top-3 md:static col-span-12 md:col-span-3 flex justify-end items-center gap-1.5 md:gap-2 text-xs md:text-sm font-semibold">
          <button
            type="button"
            onClick={onToggleLanguage}
            className={`rounded-full border px-3 py-1.5 md:px-4 md:py-2 font-bold transition whitespace-nowrap ${
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
            className={`rounded-full border px-3 py-1.5 md:px-4 md:py-2 font-bold transition flex items-center justify-center ${
              isDark
                ? "border-white/15 bg-white/10 hover:bg-white/20"
                : "border-slate-200 bg-white/75 hover:bg-white"
            }`}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>

      </div>
    </header>
  )
}

export default Navbar