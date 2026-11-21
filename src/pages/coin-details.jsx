import React from "react";

import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";
import Spinner from "../components/Spinner";
import CoinChart from "../components/CoinChart";


const API_COIN_URL = import.meta.env.VITE_API_COIN_URL;

const CoinDetailsPage = () => {
  const { coinId } = useParams();

  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const res = await fetch(`${API_COIN_URL}/${coinId}`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setCoin(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCoinDetails();
  }, [coinId]);

  return (
    <div className="coin-details-container">
      <Link to='/'>  Back to HomePage</Link>
      <h1 className="coin-details-title">{coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : 'Coin Details'}</h1>
      {loading && <Spinner />}
      {error && <p>Error: ❌{error}</p>}

      
      {!loading && !error && (
        <>
          <div className="coin-details-info">
            <img src={coin?.image?.large} alt={coin?.name.toUpperCase()} className="coin-details-image" />
            <p>{coin?.description.en.split('. ')[0] + '.'}</p>
            <h3>Rank: #{coin?.market_cap_rank}</h3>
            <h3>Current Price: ${coin?.market_data.current_price.usd.toLocaleString()}</h3>
            <h4>Market Cap: ${coin?.market_data.market_cap.usd.toLocaleString()}</h4>
            <h4>24h High: ${coin?.market_data.high_24h.usd.toLocaleString()}</h4>
            <h4>24h Low: ${coin?.market_data.low_24h.usd.toLocaleString()}</h4>
            <h4>Price Change 24h: ${coin?.market_data.price_change_24h.toLocaleString()}</h4>
            <h4>Price Change Percentage 24h: {coin?.market_data.price_change_percentage_24h.toFixed(2)}%</h4>
          </div> 
          <CoinChart coinId={coinId} />
          <div className="coin-details-links">
            {coin?.links.homepage[0] && (
              <p>
                🌍 <a href={coin.links.homepage[0]} target="_blank" rel="noopener noreferrer"> Official Website</a>
              </p>
            )}
            {coin?.links.blockchain_site[0] && (
              <p>
                🔗 <a href={coin.links.blockchain_site[0]} target="_blank" rel="noopener noreferrer"> Blockchain Site</a>
              </p>
            )}
          </div>
        </>
      )}
      
    </div>
  );
};

export default CoinDetailsPage;
