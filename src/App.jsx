import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Content from "./pages/Content";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/content" element={<Content />} />
    </Routes>
  );
}

export default App;