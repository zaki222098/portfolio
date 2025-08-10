export const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar__left">
        <span className="navbar__logo">Netflix</span>
        <nav className="navbar__links">
          <a href="#">Home</a>
          <a href="#">TV Shows</a>
          <a href="#">Movies</a>
          <a href="#">New & Popular</a>
          <a href="#">My List</a>
        </nav>
      </div>
      <div className="navbar__right">
        <input className="navbar__search" placeholder="Search" />
        <div className="navbar__avatar" aria-label="Profile" />
      </div>
    </header>
  )
}

export default Navbar