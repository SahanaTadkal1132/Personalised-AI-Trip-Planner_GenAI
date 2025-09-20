import { Routes, Route, BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Default page is Home */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
