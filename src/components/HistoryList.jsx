// components/HistoryList.jsx
import React from "react";

export default function HistoryList({
  history,
  handleSearchHistory,
  handleDeleteHistory,
}) {
  return (
    <div className="history-card">
      <h2>Search History</h2>
      {history.length === 0 ? (
        <p>No search history yet.</p>
      ) : (
        <ul className="history-list">
          {history.map((item, index) => (
            <li key={index} className="history-item">
              <div>
                <div className="history-city-country">
                  {item.city}, {item.country}
                </div>
                <div className="history-timestamp">{item.timestamp}</div>
              </div>
              <div className="history-buttons">
                <button
                  onClick={() => handleSearchHistory(item)}
                  className="history-button search-button"
                >
                  🔍
                </button>
                <button
                  onClick={() => handleDeleteHistory(index)}
                  className="history-button delete-button"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
