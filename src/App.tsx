import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "@/pages/Homepage";
import SearchPage from "@/pages/SearchPage";
import MovieDetailsPage from "@/pages/MovieDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";
import { ThemeToggle } from "@/components/theme-toggle";

function App() {
  return (
    <Router>
      <header className="p-4 flex justify-end">
        <ThemeToggle />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/movie/:imdbID" element={<MovieDetailsPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
