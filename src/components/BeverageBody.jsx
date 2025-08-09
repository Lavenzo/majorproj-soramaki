import React, { useState, useEffect, useRef } from "react";
import BeverageBanner1 from "../assets/images/Beverage/BeverageBanner1.webp";
import BeverageBanner2 from "../assets/images/Beverage/BeverageBanner2.webp";
import BeverageBanner3 from "../assets/images/Beverage/BeverageBanner3.webp";
import BeverageBg from "../assets/audio/BeverageBg.mp3";
import beverage01 from "../assets/images/Beverage/beverage01.png";
import beverage02 from "../assets/images/Beverage/beverage02.png";
import beverage03 from "../assets/images/Beverage/beverage03.png";
import beverage04 from "../assets/images/Beverage/beverage04.png";
import beverage05 from "../assets/images/Beverage/beverage05.png";
import beverage06 from "../assets/images/Beverage/beverage06.png";
import CokeZeroSound from "../assets/audio/beverages/CokeZeroSound.mp3";
import SummerSplashSetSound from "../assets/audio/beverages/SummerSplashSetSound.mp3";
import VitalityTrioSmoothiesSound from "../assets/audio/beverages/VitalityTrioSmoothiesSound.mp3";
import BoozeCollectionSound from "../assets/audio/beverages/BoozeCollectionSound.mp3";
import GreenVitalitySmoothieSound from "../assets/audio/beverages/GreenVitalitySmoothieSound.mp3";
import IceMotionDrinkSound from "../assets/audio/beverages/IceMotionDrinkSound.mp3";
import OrderAddedSound from "../assets/audio/OrderAddedSound.mp3";
import CustomerList from "../customer.json";
const BeverageBody = () => {
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
    if (menuItem === "Coke Zero") {
      narrationSound = new Audio(CokeZeroSound);
    } else if (menuItem === "Summer Splash Set") {
      narrationSound = new Audio(SummerSplashSetSound);
    } else if (menuItem === "Vitality Trio Smoothies") {
      narrationSound = new Audio(VitalityTrioSmoothiesSound);
    } else if (menuItem === "Booze Collection") {
      narrationSound = new Audio(BoozeCollectionSound);
    } else if (menuItem === "Green Vitality Smoothie") {
      narrationSound = new Audio(GreenVitalitySmoothieSound);
    } else if (menuItem === "Ice Motion Drink") {
      narrationSound = new Audio(IceMotionDrinkSound);
    }

    // Play narration at full volume without interrupting background
    if (narrationSound) {
      narrationSound.volume = 1.0;
      narrationSound.play();
    }
  };

  const handleAddToCart = () => {
    if (!selectedUserID && !selectedMenuId) {
      alert("Please select a Customer and select a drink.");
      return;
    }

    if (!selectedUserID) {
      alert("Please select a Customer.");
      return;
    }

    if (!selectedMenuId) {
      alert("Please select a drink.");
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
      id: 13,
      menuItem: "Coke Zero",
      image: beverage01,
      description:
        "Coke Zero Sugar is a refreshing, zero-calorie cola that delivers the same bold Coca-Cola taste—without the sugar. It’s crisp, smooth, and designed for those who love classic Coke flavor but want a sugar-free option.",
      price: "$5.00",
    },
    {
      id: 14,
      menuItem: "Summer Splash Set",
      image: beverage02,
      description:
        "Summer Splash Set is a vibrant trio of refreshing cocktails, each crafted to capture the essence of summer. Enjoy crisp cucumber-lime, sweet strawberry-mint, and cool apple-mint blends—served over ice in tall glasses, perfect for relaxing in a cozy bar atmosphere.",
      price: "$25.50",
    },
    {
      id: 15,
      menuItem: "Vitality Trio Smoothies",
      image: beverage03,
      description:
        "The Vitality Trio Smoothies offer a burst of color and nutrition in every sip. Enjoy the refreshing Watermelon Splash, the green-powered Kiwi & Greens Boost, and the zesty Citrus Glow—each crafted with fresh fruits, leafy greens, and superfood garnishes for a wholesome, energizing experience.",
      price: "$22.35",
    },
    {
      id: 16,
      menuItem: "Booze Collection",
      image: beverage04,
      description:
        "The Booze Collection brings together a bold mix of beers, wines, and spirits—all in one lineup. Whether you’re into crisp lagers, smooth vodka, or rich red wines, every drink is yours to enjoy at a flat rate of $20. No frills, just good booze.",
      price: "$20.00",
    },
    {
      id: 17,
      menuItem: "Green Vitality Smoothie",
      image: beverage05,
      description:
        "The Green Vitality Smoothie blends fresh spinach, kiwi, avocado, banana, lime, and green apple into a creamy, nutrient-packed drink. Served in a rustic jar with a natural twist, it’s the perfect choice for a wholesome refreshment.",
      price: "$12.00",
    },
    {
      id: 18,
      menuItem: "Ice Motion Drink",
      image: beverage06,
      description:
        "The Ice Motion Drinks offer a refreshing burst of cool hydration with vibrant flavors in every bottle. With eye-catching blue labels and a variety of cap colors indicating different tastes, these chilled beverages are designed to energize and quench your thirst, perfect for hot days or active moments.",
      price: "$6.50",
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
        {/* ✅ Beverage Banners Side-by-Side */}
        <div style={styles.bannerImageContainer}>
          <img
            src={BeverageBanner1}
            alt="Beverage Banner 1"
            style={styles.bannerImage}
          />
          <img
            src={BeverageBanner2}
            alt="Beverage Banner 2"
            style={styles.bannerImage}
          />
          <img
            src={BeverageBanner3}
            alt="Beverage Banner 3"
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

        {/* Beverage Menu item 13 and 14*/}
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
            .filter((item) => item.id === 13 || item.id === 14) // Only item 1 & 2
            .map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  padding: "15px",
                  height: isMobile ? "100%" : "650px",
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
        {/* Beverage item 15 and 16 */}
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
            .filter((item) => item.id === 15 || item.id === 16)
            .map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  padding: "15px",
                  height: isMobile ? "100%" : "650px",
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
        {/* Beverage item 17 and 18 */}
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
            .filter((item) => item.id === 17 || item.id === 18)
            .map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  padding: "15px",
                  height: isMobile ? "100%" : "650px",
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
        <audio ref={audioRef} src={BeverageBg} />
      </div>
    </>
  );
};

export default BeverageBody;
