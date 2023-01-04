import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@pages/home";
import Search from "@pages/search";
import Character from "@pages/character";
import Comics from "@pages/comics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
       <Route path="/search/:search" element={<Search />} />
        <Route path="/characters/:id" element={<Character />} />
        <Route path="/comics/:id" element={<Comics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
