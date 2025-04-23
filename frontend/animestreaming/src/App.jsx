import { BrowserRouter as Router, Route, Routes, BrowserRouter} from "react-router-dom"
import Main from "./components/Main"




function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/animes" element={<Main/>}/>
    </Routes>
  )
}

export default App
