import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { TICKER, CONTRACT_ADDRESS } from "../contract";
import { FaHandHoldingHeart, FaCopy, FaPlayCircle } from "react-icons/fa";

function Landing() {
  const [copied, setCopied] = useState(false);

  const copyCA = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  // Add floating background elements
  const floatingElements = Array.from({ length: 15 }, (_, i) => (
    <div
      key={i}
      className="floating"
      style={{
        width: `${Math.random() * 30 + 10}px`,
        height: `${Math.random() * 30 + 10}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 20}s`,
        animationDuration: `${Math.random() * 30 + 20}s`,
        opacity: Math.random() * 0.1 + 0.05,
      }}
    />
  ));

  return (
    <div className="wrapper">
      <Header />

      <main className="main">
        {floatingElements}

        <h1 className="title">Great Pacific Garbage Patch</h1>
        <p className="desc">
          Nobody's talking about it but we are! Welcome to the Great Pacific Garbage Patch on Solana, 
          this is a commitment to our future with sea animal friends welcome! Long term project, supply locked.
        </p>

        <div className="buttons">
          <a
            className="btn"
            href="https://x.com/gpgpsolana"
            target="_blank"
            rel="noreferrer"
          >
            Follow on 𝕏
          </a>
          <a
            className="btn"
            href={`https://dexscreener.com/solana/${CONTRACT_ADDRESS}`}
            target="_blank"
            rel="noreferrer"
          >
            <img src="/dex.png" alt="DexScreener" className="btn-icon" />
            DexScreener
          </a>
          <a
            className="btn"
            href={`https://pump.fun/coin/${CONTRACT_ADDRESS}`}
            target="_blank"
            rel="noreferrer"
          >
            <img src="/pump.png" alt="Pump.fun" className="btn-icon" />
            Pump.fun
          </a>
          <a
            className="btn"
            href="https://theoceancleanup.com/"
            target="_blank"
            rel="noreferrer"
          >
            <FaHandHoldingHeart className="btn-icon" />
            Charity
          </a>
        </div>
        
        {/* Hero Graphic with Content Button at the bottom */}
        <div className="hero-container">
          <img src="/hero.png" alt="Great Pacific Garbage Patch" className="hero-image" />
          <Link to="/content" className="hero-content-btn">
            <FaPlayCircle className="hero-btn-icon" />
            Watch $GPGP Content
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Landing;