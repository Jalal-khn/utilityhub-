"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            backgroundColor: "#ffffff",
            color: "#09090b",
          }}
        >
          <div style={{ maxWidth: "24rem", width: "100%", textAlign: "center" }}>
            <div
              style={{
                marginBottom: "1rem",
                display: "flex",
                justifyContent: "center",
              }}
              aria-hidden="true"
            >
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>
            </div>
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                margin: "0 0 0.5rem",
              }}
            >
              Something went wrong
            </h1>
            <p
              style={{
                fontSize: "0.875rem",
                lineHeight: 1.5,
                color: "#52525b",
                margin: "0 0 1.5rem",
              }}
            >
              An unexpected error occurred. Try again or return to the homepage.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <button
                onClick={() => reset()}
                style={{
                  width: "100%",
                  padding: "0.625rem 1rem",
                  borderRadius: "0.375rem",
                  border: "none",
                  backgroundColor: "#4338ca",
                  color: "#ffffff",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Try Again
              </button>
              <a
                href="/"
                style={{
                  width: "100%",
                  padding: "0.625rem 1rem",
                  borderRadius: "0.375rem",
                  border: "1px solid #e4e4e7",
                  backgroundColor: "#ffffff",
                  color: "#09090b",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  textAlign: "center",
                  textDecoration: "none",
                  boxSizing: "border-box",
                }}
              >
                Go to Home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
