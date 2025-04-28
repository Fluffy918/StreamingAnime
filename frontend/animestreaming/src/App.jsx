import { BrowserRouter as Router, Route, Routes, BrowserRouter} from "react-router-dom"
import Main from "./components/Main"
import Episodes from "./components/Episodes"




function App() {
  

  return (
    <Routes>
      <Route path="/animes" element={<Main/>}/>
      <Route path="/animes/:animeId" element={<Episodes/>}/>
    </Routes>
  )
}

export default App
