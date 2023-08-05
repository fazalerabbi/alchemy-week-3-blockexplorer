import "./App.css";
import IndexPage from "./pages/IndexPage";
import { Route, Routes } from "react-router";
import TransactionsListingPage from "./pages/TransactionsListingPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/transactions" element={<TransactionsListingPage />} />
      </Routes>
    </>
  );
}

export default App;
