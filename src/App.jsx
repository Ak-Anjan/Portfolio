import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import Home from './pages/Home'
import About from './pages/About'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import Certifications from './pages/Certifications'
import Contact from './pages/Contact'
import Resume from './pages/Resume'

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/skills" element={<Skills />} />

        <Route path="/projects" element={<Projects />} />

        <Route path="/resume" element={<Resume />} />

        <Route
          path="/experience"
          element={<Experience />}
        />

        <Route
          path="/certifications"
          element={<Certifications />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App