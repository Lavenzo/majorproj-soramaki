import React, { useState, useEffect, useRef } from "react";
import PopularMenuBanner1 from "../assets/images/Popular/PopularMenuBanner1.webp";
import PopularMenuBanner2 from "../assets/images/Popular/PopularMenuBanner2.webp";
import PopularMenuBanner3 from "../assets/images/Popular/PopularMenuBanner3.webp";
import PopularMenuBg from "../assets/audio/PopularMenuBg.mp3";
import PopularMenu01 from "../assets/images/Popular/popularMenu01.png";
import PopularMenu02 from "../assets/images/Popular/popularMenu02.png";
import PopularMenu03 from "../assets/images/Popular/popularMenu03.png";
import PopularMenu04 from "../assets/images/Popular/popularMenu04.png";
import PopularMenu05 from "../assets/images/Popular/popularMenu05.png";
import PopularMenu06 from "../assets/images/Popular/popularMenu06.png";
import SenRyoSelectedSound from "../assets/audio/popularMenu/SenRyoSelectedSound.mp3";
import SignatureMaguroPlatterSound from "../assets/audio/popularMenu/SignatureMaguroPlatterSound.mp3";
import ClassicPlatterSound from "../assets/audio/popularMenu/ClassicPlatterSound.mp3";
import AburiEngawaSound from "../assets/audio/popularMenu/AburiEngawaSound.mp3";
import TrioSushiSetSound from "../assets/audio/popularMenu/TrioSushiSetSound.mp3";
import SashimiPlatterSound from "../assets/audio/popularMenu/SashimiPlatterSound.mp3";
import OrderAddedSound from "../assets/audio/OrderAddedSound.mp3";
import CustomerList from "../customer.json";
const PopularMenuBody = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 820);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [selectedUserID, setSelectedUserID] = useState("");
  const audioRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 820);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5; // Set volume to 50%
      audio.loop = true; // Loop the audio

      const playAudio = async () => {
        try {
          await audio.play();
        } catch (err) {
          console.error("Audio playback error:", err);
        }
      };

      playAudio();

      // Optional: Cleanup if needed
      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, []);

  const handleSelect = (menuItem, id) => {
    setSelectedMenuId(id);

    let narrationSound;
    if (menuItem === "Sen-Ryo Platter") {
      narrationSound = new Audio(SenRyoSelectedSound);
    } else if (menuItem === "Signature Maguro Platter") {
      narrationSound = new Audio(SignatureMaguroPlatterSound);
    } else if (menuItem === "Classic Platter") {
      narrationSound = new Audio(ClassicPlatterSound);
    } else if (menuItem === "Aburi Engawa") {
      narrationSound = new Audio(AburiEngawaSound);
    } else if (menuItem === "Trio Sushi Set") {
      narrationSound = new Audio(TrioSushiSetSound);
    } else if (menuItem === "Sashimi Platter") {
      narrationSound = new Audio(SashimiPlatterSound);
    }

    // Play narration at full volume without interrupting background
    if (narrationSound) {
      narrationSound.volume = 1.0;
      narrationSound.play();
    }
  };

  const handleAddToCart = () => {
    if (!selectedUserID && !selectedMenuId) {
      alert("Please select a Customer and select a dish.");
      return;
    }

    if (!selectedUserID) {
      alert("Please select a Customer.");
      return;
    }

    if (!selectedMenuId) {
      alert("Please select a dish.");
      return;
    }

    const customer = CustomerList.find((c) => c.UserID === selectedUserID);
    const dish = menuItems.find((item) => item.id === selectedMenuId);

    // Play OrderAddedSound
    const audio = new Audio(OrderAddedSound);
    audio.volume = 1.0;
    audio.play();

    // Convert to current date and time to SG time stamp
    const now = new Date().toLocaleString("en-SG", {
      timeZone: "Asia/Singapore",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // Save to localStorage
    const orderItem = {
      userID: customer.UserID,
      dish: dish.menuItem,
      price: dish.price,
      dishID: dish.id,
      timestamp: now,
    };

    const existingCart =
      JSON.parse(localStorage.getItem("soraMakiOrderCart")) || [];
    const updatedCart = [...existingCart, orderItem];
    localStorage.setItem("soraMakiOrderCart", JSON.stringify(updatedCart));

    // New Alert Message (as requested)
    alert(
      `Added to cart:\nCustomer: ${customer.UserID}\nDish: ${dish.menuItem} - ${dish.price}`
    );

    // Reset selections
    setSelectedMenuId(null);
    setSelectedUserID("");
  };

  const SCROLL_SPEED = "25s";

  const styles = {
    body: {
      backgroundColor: "#ffffff",
      minHeight: isMobile ? "calc(150vh - 80px)" : "calc(150vh - 80px)",
      padding: isMobile ? "0px" : "0px",
      overflowX: isMobile ? "hidden" : "hidden",
    },
    bannerWrapper: {
      position: "relative",
      overflow: "hidden",
      backgroundColor: "#1c1c1c",
      height: "50px",
      marginBottom: "0px",
    },
    bannerImageContainer: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "30px",
      gap: "0px",
    },
    bannerImage: {
      width: isMobile ? "100%" : "600px",
      height: isMobile ? "380px" : "600px",
      objectFit: "cover",
      borderRadius: "0px",
      border: "4px solid #0b0b0bff",
    },
    bannerContent: {
      position: "absolute",
      whiteSpace: "nowrap",
      display: "inline-block",
      willChange: "transform",
      animation: `scrollText ${SCROLL_SPEED} linear infinite`,
      pointerEvents: "none",
    },
    bannerText: {
      display: "inline-block",
      color: "#fff",
      fontWeight: "bold",
      fontSize: isMobile ? "14px" : "16px",
      padding: "0 40px",
      lineHeight: "50px",
    },
    section: {
      textAlign: "center",
      color: "#333",
      fontSize: isMobile ? "16px" : "20px",
      fontWeight: "500",
      marginBottom: "20px",
    },
    box: {
      backgroundColor: "#f9f9f9",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      margin: isMobile ? "10px 0" : "20px auto",
      maxWidth: "800px",
    },
  };

  const bannerMessages = [
    "Sora Maki: Where Every Bite Tells a Story.",
    "Dive into Freshness - Only at Sora Maki!",
    "Savor the Art of Sushi - Masterfully Crafted, Always Fresh.",
  ];

  const menuItems = [
    {
      id: 1,
      menuItem: "Sen-Ryo Platter",
      image: PopularMenu01,
      description:
        "22pcs. Aburi Engawa, Aburi Salmon, Aburi Unagi, Ebi Fry Maki, Edo-mae Tamagoyaki, Hamachi, Ikura Gunkan, Maguro (Akami), Salmon, Spicy Salmon Gunkan",
      price: "$35.90",
    },
    {
      id: 2,
      menuItem: "Signature Maguro Platter",
      image: PopularMenu02,
      description:
        "24 Pcs. Chutoro, Maguro(Akami), Maguro (Akami) with Spicy Sauce, Maguro (Akami) Zuke, Negitoro Gunkan, Otoro, Tekka Maki",
      price: "$124.74",
    },
    {
      id: 3,
      menuItem: "Classic Platter",
      image: PopularMenu03,
      description:
        "12pcs. Aburi Salmon, Ebi, Edo-mae Tamagoyaki, Engawa, Tobikko Gunkan, Inari, Maguro (Akami), Salmon, Spicy Salmon Gunkan, Tako",
      price: "$33.16",
    },
    {
      id: 4,
      menuItem: "Aburi Engawa",
      image: PopularMenu04,
      description: "5 Pcs. Aburi Engawa",
      price: "$24.99",
    },
    {
      id: 5,
      menuItem: "Trio Sushi Set",
      image: PopularMenu05,
      description: "6pcs. Hamachi, Hotate, Salmon",
      price: "$24.95",
    },
    {
      id: 6,
      menuItem: "Sashimi Platter",
      image: PopularMenu06,
      description:
        "14pcs. Akaebi, Engawa, Hotate, Maguro (Akami), Salmon, Tako",
      price: "$54.32",
    },
  ];

  return (
    <>
      <style>
        {`
          @keyframes scrollText {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>

      <div style={styles.body}>
        {/* Scrolling banner */}
        <div style={styles.bannerWrapper}>
          <div style={styles.bannerContent}>
            {[...bannerMessages, ...bannerMessages].map((msg, i) => (
              <span key={i} style={styles.bannerText}>
                {msg}
              </span>
            ))}
          </div>
        </div>
        {/* ✅ Popular Menu Banners Side-by-Side */}
        <div style={styles.bannerImageContainer}>
          <img
            src={PopularMenuBanner1}
            alt="Popular Menu Banner 1"
            style={styles.bannerImage}
          />
          <img
            src={PopularMenuBanner2}
            alt="Popular Menu Banner 2"
            style={styles.bannerImage}
          />
          <img
            src={PopularMenuBanner3}
            alt="Popular Menu Banner 3"
            style={styles.bannerImage}
          />
        </div>
        {/* Customer Dropdown */}
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          {isMobile ? (
            // Mobile Version
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h3>Customer:</h3>
              <select
                value={selectedUserID}
                onChange={(e) => setSelectedUserID(e.target.value)}
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  marginBottom: "20px",
                  borderRadius: "5px",
                  width: "250px",
                }}
              >
                <option value="">-- Select Customer --</option>
                {CustomerList.map((customer) => (
                  <option key={customer.UserID} value={customer.UserID}>
                    {customer.UserID}
                  </option>
                ))}
              </select>

              <button
                onClick={handleAddToCart}
                style={{
                  backgroundColor: "#7cb518",
                  color: "white",
                  padding: "12px 20px",
                  borderRadius: "6px",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                  width: "250px",
                }}
              >
                Add to Cart
              </button>
            </div>
          ) : (
            // Desktop Version
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <h3 style={{ margin: 0 }}>Customer:</h3>
              <select
                value={selectedUserID}
                onChange={(e) => setSelectedUserID(e.target.value)}
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  width: "250px",
                }}
              >
                <option value="">-- Select Customer --</option>
                {CustomerList.map((customer) => (
                  <option key={customer.UserID} value={customer.UserID}>
                    {customer.UserID}
                  </option>
                ))}
              </select>

              <button
                onClick={handleAddToCart}
                style={{
                  backgroundColor: "#7cb518",
                  color: "white",
                  padding: "12px 20px",
                  borderRadius: "6px",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                  width: "150px",
                }}
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>

        {/* Popular Menu item 1 and 2*/}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "5px" : "20px",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: isMobile ? "10px" : "20px",
            marginLeft: isMobile ? "-5px" : "0px",
            marginRight: isMobile ? "10px" : "0px",
            marginTop: isMobile ? "10px" : "20px",
          }}
        >
          {menuItems
            .filter((item) => item.id === 1 || item.id === 2) // Only item 1 & 2
            .map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  padding: "15px",
                  height: isMobile ? "100%" : "600px",
                  width: isMobile ? "90%" : "500px",
                  border:
                    selectedMenuId === item.id
                      ? "3px solid gold"
                      : "3px solid transparent",
                  transition: "border 0.3s ease",
                }}
              >
                <img
                  src={item.image}
                  alt={item.menuItem}
                  style={{
                    width: isMobile ? "100%" : "400px",
                    borderRadius: isMobile ? "0px" : "10px",
                  }}
                />
                <h3
                  style={{
                    fontSize: "18px",
                    marginTop: "15px",
                    marginBottom: "10px",
                    color: "#333",
                  }}
                >
                  {item.menuItem}
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#222",
                    marginBottom: "10px",
                  }}
                >
                  <strong>Includes:</strong>{" "}
                  <span style={{ color: "#e60012", fontWeight: "bold" }}>
                    {item.description}
                  </span>{" "}
                  <br />
                  <strong>Price:</strong>
                  <span
                    style={{
                      color: "black",
                      marginLeft: "8px",
                      padding: "2px 6px",
                      borderRadius: "4px",
                    }}
                  >
                    {item.price}
                  </span>
                </p>
                <div
                  style={{
                    textAlign: isMobile ? "center" : "right",
                    marginTop: "10px",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "#7cb518",
                      color: "#fff",
                      border: "none",
                      padding: "12px 20px",
                      borderRadius: "6px",
                      fontSize: "15px",
                      fontWeight: "600",
                      cursor: "pointer",
                      width: isMobile ? "100%" : "150px",
                    }}
                    onClick={() => handleSelect(item.menuItem, item.id)}
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
        </div>
        {/* Popular Menu item 3 and 4 */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "5px" : "20px",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: isMobile ? "10px" : "20px",
            marginLeft: isMobile ? "-5px" : "0px",
            marginRight: isMobile ? "10px" : "0px",
            marginTop: isMobile ? "-20px" : "-20px",
          }}
        >
          {menuItems
            .filter((item) => item.id === 3 || item.id === 4)
            .map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  padding: "15px",
                  height: isMobile ? "100%" : "600px",
                  width: isMobile ? "90%" : "500px",
                  border:
                    selectedMenuId === item.id
                      ? "3px solid gold"
                      : "3px solid transparent",
                  transition: "border 0.3s ease",
                }}
              >
                <img
                  src={item.image}
                  alt={item.menuItem}
                  style={{
                    width: isMobile ? "100%" : "400px",
                    borderRadius: isMobile ? "0px" : "10px",
                  }}
                />
                <h3
                  style={{
                    fontSize: "18px",
                    marginTop: "15px",
                    marginBottom: "10px",
                    color: "#333",
                  }}
                >
                  {item.menuItem}
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#222",
                    marginBottom: "10px",
                  }}
                >
                  <strong>Includes:</strong>{" "}
                  <span style={{ color: "#e60012", fontWeight: "bold" }}>
                    {item.description}
                  </span>{" "}
                  <br />
                  <strong>Price:</strong>
                  <span
                    style={{
                      color: "black",
                      marginLeft: "8px",
                      padding: "2px 6px",
                      borderRadius: "4px",
                    }}
                  >
                    {item.price}
                  </span>
                </p>
                <div
                  style={{
                    textAlign: isMobile ? "center" : "right",
                    marginTop: "10px",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "#7cb518",
                      color: "#fff",
                      border: "none",
                      padding: "12px 20px",
                      borderRadius: "6px",
                      fontSize: "15px",
                      fontWeight: "600",
                      cursor: "pointer",
                      width: isMobile ? "100%" : "150px",
                    }}
                    onClick={() => handleSelect(item.menuItem, item.id)}
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
        </div>
        {/* Popular Menu item 5 and 6 */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "5px" : "20px",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: isMobile ? "10px" : "20px",
            marginLeft: isMobile ? "-5px" : "0px",
            marginRight: isMobile ? "10px" : "0px",
            marginTop: isMobile ? "-20px" : "-20px",
            marginBottom: isMobile ? "0px" : "20px",
          }}
        >
          {menuItems
            .filter((item) => item.id === 5 || item.id === 6)
            .map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  padding: "15px",
                  height: isMobile ? "100%" : "600px",
                  width: isMobile ? "90%" : "500px",
                  border:
                    selectedMenuId === item.id
                      ? "3px solid gold"
                      : "3px solid transparent",
                  transition: "border 0.3s ease",
                }}
              >
                <img
                  src={item.image}
                  alt={item.menuItem}
                  style={{
                    width: isMobile ? "100%" : "400px",
                    borderRadius: isMobile ? "0px" : "10px",
                  }}
                />
                <h3
                  style={{
                    fontSize: "18px",
                    marginTop: "15px",
                    marginBottom: "10px",
                    color: "#333",
                  }}
                >
                  {item.menuItem}
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#222",
                    marginBottom: "10px",
                  }}
                >
                  <strong>Includes:</strong>{" "}
                  <span style={{ color: "#e60012", fontWeight: "bold" }}>
                    {item.description}
                  </span>{" "}
                  <br />
                  <strong>Price:</strong>
                  <span
                    style={{
                      color: "black",
                      marginLeft: "8px",
                      padding: "2px 6px",
                      borderRadius: "4px",
                    }}
                  >
                    {item.price}
                  </span>
                </p>
                <div
                  style={{
                    textAlign: isMobile ? "center" : "right",
                    marginTop: "10px",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "#7cb518",
                      color: "#fff",
                      border: "none",
                      padding: "12px 20px",
                      borderRadius: "6px",
                      fontSize: "15px",
                      fontWeight: "600",
                      cursor: "pointer",
                      width: isMobile ? "100%" : "150px",
                    }}
                    onClick={() => handleSelect(item.menuItem, item.id)}
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
        </div>
        <audio ref={audioRef} src={PopularMenuBg} />
      </div>
    </>
  );
};

export default PopularMenuBody;
