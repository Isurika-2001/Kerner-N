
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import SearchFlight from './pages/searchFlight'
import BookFlight from './pages/bookFlight'
import MyBookings from './pages/MyBookings';
import Login from './pages/login';
import Register from './pages/register';
import './App.css'

function App() {

  return (
    <>
      <Router>
      <Navbar />
        <Routes>
          {/* auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<SearchFlight />} />
          <Route path="/bookFlight/:flightId/:departureCity/:arrivalCity" element={<BookFlight />} />
          <Route path="/myBookings/:userId" element={<MyBookings />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
