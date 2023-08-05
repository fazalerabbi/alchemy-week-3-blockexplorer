import "./App.css";
import IndexPage from "./pages/IndexPage";
import { Route, Routes } from "react-router";
import TransactionsListingPage from "./pages/TransactionsListingPage";
import BlockListingPage from "./pages/BlockListingPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/transactions" element={<TransactionsListingPage />} />
        <Route path="/blocks" element={<BlockListingPage />} />
      </Routes>
    </>
  );
}

export default App;
