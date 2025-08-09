import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/BrandLogo.webp";
import sound03 from "../assets/audio/sound03.mp3";

const HomePageHeader = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 820);
  const navigate = useNavigate();
  const location = useLocation();
  const audio = new Audio(sound03);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 820);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { label: "HOME", displayPath: "/", actualPath: "/" },
    {
      label: "POPULAR MENU",
      displayPath: "/popular",
      actualPath: "/popular",
    },
    {
      label: "SUSHI PLATTERS",
      displayPath: "/platters",
      actualPath: "/platters",
    },
    {
      label: "BEVERAGE",
      displayPath: "/beverage",
      actualPath: "/beverage",
    },
    {
      label: "ORDER CART",
      displayPath: "/cart",
      actualPath: "/cart",
    },
    {
      label: "VIEW CUSTOMERS ORDERS",
      displayPath: "/orders",
      actualPath: "/orders",
    },
  ];

  const handleMouseEnter = () => {
    audio.currentTime = 0;
    audio.play().catch((error) => {
      console.warn("Audio playback failed silently:", error.message);
    });
  };

  return (
    <>
      <style>
        {`
          @media (min-width: 821px) {
            .nav-bar {
              display: flex !important;
              gap: 25px;
              justify-content: center;
              align-items: center;
            }
          }

          @media (max-width: 820px) {
            .nav-dropdown-wrapper {
              width: 100%;
              display: flex;
              justify-content: center;
              margin-top: 10px;
            }

            .nav-dropdown {
              width: 90%;
              padding: 10px;
              font-size: 16px;
              font-family: Arial, sans-serif;
            }

            .logo {
              height: 60px !important;
            }
          }
        `}
      </style>

      <header
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderBottom: "1px solid #ccc",
          backgroundColor: "#fff",
          padding: "10px 0",
          overflowX: "clip",
        }}
      >
        {/* Top Row: Logo and Brand */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            maxWidth: "1200px",
            padding: "0 20px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: isMobile ? "center" : "flex-start",
              width: isMobile ? "100%" : "auto",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            <img
              src={logo}
              alt="Sora Maki Logo"
              className="logo"
              style={{
                height: isMobile ? "60px" : "100px",
                transition: "0.3s",
              }}
            />
            <span
              style={{
                fontSize: isMobile ? "20px" : "26px",
                fontWeight: "bold",
                fontFamily: "Arial, sans-serif",
              }}
            >
              SORA <br />
              MAKI
            </span>
          </div>

          {!isMobile && (
            <nav
              className="nav-bar"
              style={{
                marginTop: "10px",
                marginRight: isMobile ? "0px" : "50px",
              }}
            >
              {navItems.map((item) => {
                const isActive = location.pathname === item.displayPath;
                return (
                  <span
                    key={item.label}
                    onClick={() => navigate(item.actualPath)}
                    onMouseEnter={(e) => {
                      handleMouseEnter();
                      if (!isActive) e.target.style.color = "blue";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.target.style.color = "#000";
                    }}
                    style={{
                      fontFamily: "Arial, sans-serif",
                      fontWeight: isActive ? "bold" : "normal",
                      color: isActive ? "green" : "#000",
                      cursor: "pointer",
                      fontSize: "16px",
                      textDecoration: isActive ? "underline" : "none",
                      transition: "color 0.2s",
                    }}
                  >
                    {item.label}
                  </span>
                );
              })}
            </nav>
          )}
        </div>

        {/* Mobile Dropdown on Second Line */}
        {isMobile && (
          <div className="nav-dropdown-wrapper">
            <select
              className="nav-dropdown"
              value={location.pathname}
              onChange={(e) => navigate(e.target.value)}
            >
              {navItems.map((item) => (
                <option key={item.label} value={item.actualPath}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </header>
    </>
  );
};

export default HomePageHeader;
