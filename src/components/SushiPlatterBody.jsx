import React, { useState, useEffect, useRef } from "react";
import SushiPlatterBanner1 from "../assets/images/SushiPlatter/SushiPlatterBanner1.webp";
import SushiPlatterBanner2 from "../assets/images/SushiPlatter/SushiPlatterBanner2.webp";
import SushiPlatterBanner3 from "../assets/images/SushiPlatter/SushiPlatterBanner3.webp";
import SushiPlatterBg from "../assets/audio/SushiPlatterBg.mp3";
import SushiPlatter01 from "../assets/images/SushiPlatter/sushiPlatter01.png";
import SushiPlatter02 from "../assets/images/SushiPlatter/sushiPlatter02.png";
import SushiPlatter03 from "../assets/images/SushiPlatter/sushiPlatter03.png";
import SushiPlatter04 from "../assets/images/SushiPlatter/sushiPlatter04.png";
import PopularMenu05 from "../assets/images/Popular/popularMenu05.png";
import PopularMenu06 from "../assets/images/Popular/popularMenu06.png";
import SushiPlatterSound from "../assets/audio/sushiPlatter/SushiPlatterSound.mp3";
import PremiumPlatterSound from "../assets/audio/sushiPlatter/PremiumPlatterSound.mp3";
import GrandeurPartySetSound from "../assets/audio/sushiPlatter/GrandeurPartySetSound.mp3";
import SenRyoPartySetSound from "../assets/audio/sushiPlatter/SenRyoPartySetSound.mp3";
import MaguroTrioSetSound from "../assets/audio/sushiPlatter/MaguroTrioSetSound.mp3";
import SupremeAssortedSashimiPlatterSound from "../assets/audio/sushiPlatter/SupremeAssortedSashimiPlatterSound.mp3";
import OrderAddedSound from "../assets/audio/OrderAddedSound.mp3";
import CustomerList from "../customer.json";
const SushiPlatterBody = () => {
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
    if (menuItem === "Deluxe Platter") {
      narrationSound = new Audio(SushiPlatterSound);
    } else if (menuItem === "Premium Platter") {
      narrationSound = new Audio(PremiumPlatterSound);
    } else if (menuItem === "Grandeur Party Set") {
      narrationSound = new Audio(GrandeurPartySetSound);
    } else if (menuItem === "Sen-Ryo Party Set") {
      narrationSound = new Audio(SenRyoPartySetSound);
    } else if (menuItem === "Supreme Assorted Sashimi Platter") {
      narrationSound = new Audio(SupremeAssortedSashimiPlatterSound);
    } else if (menuItem === "Maguro Trio Set") {
      narrationSound = new Audio(MaguroTrioSetSound);
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
      id: 7,
      menuItem: "Deluxe Platter",
      image: SushiPlatter01,
      description:
        "22pcs. Aburi Engawa, Aburi Salmon, Aburi Unagi, Ebi Fry Maki, Edo-mae Tamagoyaki, Hamachi, Ikura Gunkan, Maguro (Akami), Salmon, Spicy Salmon Gunkan",
      price: "$72.36",
    },
    {
      id: 8,
      menuItem: "Premium Platter",
      image: SushiPlatter02,
      description:
        "22pcs. Akaebi, Chutoro, Ebi Fry Maki, Hotate, Ikura Gunkan, Maguro (Akami), Negitoro Gunkan, Salmon, Tsubugai, Snow Crab with Crab Miso Gunkan",
      price: "$97.63",
    },
    {
      id: 9,
      menuItem: "Grandeur Party Set",
      image: SushiPlatter03,
      description:
        "42pcs. Aburi Engawa, Aburi Salmon, Aburi Unagi, California Maki, Ebi, Hamachi, Inari, Maguro (Akami), Salmon, Snow Crab with Crab Miso Gunkan, Spicy Salmon Gunkan, Tako, Tobikko Gunkan",
      price: "$120.42",
    },
    {
      id: 10,
      menuItem: "Sen-Ryo Party Set",
      image: SushiPlatter04,
      description:
        "42pcs. Aburi Salmon, Aburi Unagi, Akaebi, California Maki, Chutoro, Ebi, Hamachi, Hotate, Ikura Gunkan, Salmon, Salmon Belly, Spicy Salmon Gunkan, Tobikko Gunkan",
      price: "$157.90",
    },
    {
      id: 11,
      menuItem: "Supreme Assorted Sashimi Platter",
      image: PopularMenu05,
      description:
        "30pcs. Akaebi – Chutoro – Hamachi – Hotate – Maguro (Akami) – Salmon – Toyosu Specials",
      price: "$106.92",
    },
    {
      id: 12,
      menuItem: "Maguro Trio Set",
      image: PopularMenu06,
      description: "6pcs. Chutoro, Maguro (Akami) Zuke, Otoro",
      price: "$49.57",
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
        {/* ✅ Sushi Platter Menu Banners Side-by-Side */}
        <div style={styles.bannerImageContainer}>
          <img
            src={SushiPlatterBanner1}
            alt="Sushi Platter Banner 1"
            style={styles.bannerImage}
          />
          <img
            src={SushiPlatterBanner2}
            alt="Sushi Platter Banner 2"
            style={styles.bannerImage}
          />
          <img
            src={SushiPlatterBanner3}
            alt="Sushi PLatter Banner 3"
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

        {/* Popular Menu item 7 and 8*/}
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
            .filter((item) => item.id === 7 || item.id === 8) // Only item 1 & 2
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
        {/* Popular Menu item 9 and 10 */}
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
            .filter((item) => item.id === 9 || item.id === 10)
            .map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  padding: "15px",
                  height: isMobile ? "100%" : "625px",
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
        {/* Popular Menu item 11 and 12 */}
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
            .filter((item) => item.id === 11 || item.id === 12)
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
        <audio ref={audioRef} src={SushiPlatterBg} />
      </div>
    </>
  );
};

export default SushiPlatterBody;
