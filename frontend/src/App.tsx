import { BrowserRouter, Route, Routes } from "react-router";
import { Queue } from "./pages/queue/queue";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Queue />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
