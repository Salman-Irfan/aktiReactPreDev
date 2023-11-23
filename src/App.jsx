// import Routes and Route from react router dom
import { Routes, Route } from "react-router-dom";
import Footer from './layouts/Footer'
import Navbar from './layouts/Navbar'
import AddNote from './pages/AddNote'
import MyNotes from './pages/MyNotes'
import Contact from './pages/Contact'
import Notes from './pages/Notes'
import Home from "./pages/Home";
import UpdateNote from "./pages/UpdateNote";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import AdminLogin from "./pages/auth/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
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
        {/* MyNotes page */}
        <Route exact path="/my-notes" element={<MyNotes />} />
        {/* contact page */}
        <Route exact path="/contact" element={<Contact />} />
        {/* dynamic update note */}
        <Route path="notes/update/:noteId" element={<UpdateNote />} />
        {/* auth routes */}
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin-login" element={<AdminLogin/>}/>
        {/* admin dashboard */}
        <Route path="/admin-dashboard" element={<AdminDashboard /> }/>
      </Routes>
      {/* footer component */}
      <Footer />
    </>
  )
}

export default App
