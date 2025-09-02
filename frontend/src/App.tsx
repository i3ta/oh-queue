import { BrowserRouter, Route, Routes } from "react-router";
import { Queue } from "./pages/queue/queue";
import { Toaster } from "./components/sonner";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-left" />
      <Routes>
        <Route path="/" element={<Queue />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
