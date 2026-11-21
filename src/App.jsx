import React from "react";
import { useState, useEffect } from "react";

import {Route, Routes} from "react-router";

import {HomePage, AboutPage, NotFoundPage, CoinDetailsPage} from "./pages";
import Header from "./components/Header";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`,
        );
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setCoins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [limit]);

  
  return (

    <>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage
        coins={coins}
        loading={loading}
        error={error}
        limit={limit}
        setLimit={setLimit}
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />} />

     <Route path="/about" element={<AboutPage />} />
      <Route path="/coin/:coinId" element={<CoinDetailsPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </>
  );
};

export default App;
