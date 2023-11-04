// import Routes and Route from react router dom
import { Routes, Route } from "react-router-dom";
import Footer from './layouts/Footer'
import Navbar from './layouts/Navbar'
import AddNote from './pages/AddNote'
import About from './pages/About'
import Contact from './pages/Contact'
import Notes from './pages/Notes'
import Home from "./pages/Home";
import UpdateNote from "./pages/UpdateNote";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
function App() {

  return (
    <>
      <Navbar />
      {/* main content */}
      <Routes>
        {/* add note page */}
        <Route exact path="/" element={<Home />} />
        {/* add note page */}
        <Route exact path="/addnote" element={<AddNote />} />
        {/* get notes page */}
        <Route exact path="/notes" element={<Notes />} />
        {/* about page */}
        <Route exact path="/about" element={<About />} />
        {/* contact page */}
        <Route exact path="/contact" element={<Contact />} />
        {/* dynamic update note */}
        <Route path="notes/update/:noteId" element={<UpdateNote />} />
        {/* auth routes */}
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route/>
      </Routes>
      {/* footer component */}
      <Footer />
    </>
  )
}

export default App
