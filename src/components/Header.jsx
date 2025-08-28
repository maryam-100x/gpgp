import { useState } from "react";
import { Link } from "react-router-dom";
import { FaCopy } from "react-icons/fa";
import { CONTRACT_ADDRESS } from "../contract";

function Header() {
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

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="brand">
          Great Pacific Garbage Patch
        </Link>
        <div className="header-right">
          <nav className="nav">
            <Link to="/content">Content</Link>
          </nav>
          <button
            className={`header-copy-btn ${copied ? "copied" : ""}`}
            onClick={copyCA}
            title="Click to copy contract address"
          >
            <FaCopy className="header-copy-icon" />
            {copied ? "Copied!" : CONTRACT_ADDRESS}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
