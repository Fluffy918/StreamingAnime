import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Menu, X, Search } from "lucide-react"
import "../css/Nav.css"




function Nav() {
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const navigate = useNavigate()

    function handleSearch() {
        if (searchQuery.trim()) {
            navigate(`/animes?search=${encodeURIComponent(searchQuery.trim())}`)
        }
    }
    
    return(
        <nav className="nav">
            <div className="nav-container">
                <h1 className="logo">AnimeStream</h1>
                
                <ul className="nav-links">
                    <li><Link to="/animes" className="hover:text-gray-300 transition">Accueil</Link></li>
                    <li><Link to="/animes/derniers" className="hover:text-gray-300 transition">Derniers épisodes</Link></li>
                </ul>

                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleSearch()
                }} className="search-container">
                    <input type="text" placeholder="Rechercher un anime..." className="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                    <button onClick={handleSearch} className="hidden md:block hover:text-gray-300 transition">
                        <Search size={24}/>
                    </button>
                    
                </form>
                

                <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28}/> : <Menu size={28}/>}
                </button>
            </div>

            {isOpen && (
                <ul className="mobile-menu">
                    <li><Link to="/" >Accueil</Link></li>
                    <li><Link to="/animes" >Annuaire des Mangas</Link></li>
                    <li><Link to="/animes" >Derniers chapitres</Link></li>
                </ul>
            )}
        </nav>
    )
}

export default Nav