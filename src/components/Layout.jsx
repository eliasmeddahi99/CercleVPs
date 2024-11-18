import React from 'react';

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-dark text-gray-100 relative">
      <div className="cvp-pattern">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="cvp-text"
            style={{
              top: `${Math.random() * 120 - 10}%`,
              left: `${Math.random() * 120 - 10}%`,
              transform: 'rotate(-30deg)',
              color: 'rgba(255, 255, 255, 0.02)',
              position: 'fixed',
              zIndex: 0,
              userSelect: 'none',
              pointerEvents: 'none',
              fontSize: `${Math.random() * 40 + 160}px` // Tailles variées entre 160px et 200px
            }}
          >
            CVP
          </div>
        ))}
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}