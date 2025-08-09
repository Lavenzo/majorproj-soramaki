import React, { useState, useEffect } from "react";
import HomeBanner from "../assets/images/HomeBanner.webp";
import HomeBanner2 from "../assets/images/HomeBanner2.webp";
import HomeBanner3 from "../assets/images/HomeBanner3.webp";
import HomeBanner4 from "../assets/images/HomeBanner4.webp";
import HomeGallery1 from "../assets/images/HomeGallery1.png";
import HomeGallery2 from "../assets/images/HomeGallery2.png";
import HomeGallery3 from "../assets/images/HomeGallery3.png";
import HomeGallery4 from "../assets/images/HomeGallery4.png";
import HomeGallery5 from "../assets/images/HomeGallery5.png";
import HomeGallery6 from "../assets/images/HomeGallery6.png";

const HomePageBody = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 820);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 820);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const lockOverflowX = () => {
      document.body.style.overflowX = "hidden";
      document.documentElement.style.overflowX = "hidden";
    };

    // Apply on first load
    lockOverflowX();

    // Re-apply on window resize (mobile vs desktop)
    window.addEventListener("resize", lockOverflowX);

    return () => {
      // Cleanup
      window.removeEventListener("resize", lockOverflowX);
      document.body.style.overflowX = "auto";
      document.documentElement.style.overflowX = "auto";
    };
  }, []);

  const SCROLL_SPEED = "25s";

  const styles = {
    body: {
      backgroundColor: "#ffffff",
      minHeight: isMobile ? "calc(150vh - 80px)" : "calc(150vh - 80px)",
      padding: "0px",
      overflowX: isMobile ? "hidden" : "hidden",
    },
    bannerWrapper: {
      position: "relative",
      overflow: "hidden",
      backgroundColor: "#1c1c1c",
      height: "50px",
      marginBottom: "0px",
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
      height: isMobile ? "380px" : "100%",
      objectFit: "cover",
      borderRadius: "0px",
      border: "4px solid #0b0b0bff",
    },
    bannerImage1: {
      width: isMobile ? "100%" : "530px",
      height: isMobile ? "380px" : "482px",
      objectFit: "cover",
      borderRadius: "0px",
      border: "4px solid #0b0b0bff",
    },
  };

  const bannerMessages = [
    "Sora Maki: Where Every Bite Tells a Story.",
    "Dive into Freshness - Only at Sora Maki!",
    "Savor the Art of Sushi - Masterfully Crafted, Always Fresh.",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent Duplicate submission
    if (isSubmitting) return;
    setIsSubmitting(true);

    const url =
      "https://script.google.com/macros/s/AKfycbxaWdS-I-9Uo6PZmQcVmh9a-ORWv9uTvS1z7w1kNGPHAhuOWNxW12izxw0CN2MWnXRRdA/exec";

    const payload = {
      FirstName: firstName.trim(),
      LastName: lastName.trim(),
      Email: email.trim(),
      Message: message.trim(),
    };

    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        mode: "no-cors", // ✅ Required for Google Apps Script Web App
      });

      alert(
        "Contact saved. Data has been saved in Google Sheet.\n" +
          'Please click on the "View Google Sheet" button to view this information.'
      );

      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");

      // Re-apply overflow hidden after DOM update
      document.body.style.overflowX = "hidden";
    } catch (err) {
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        {/* Scrolling Banner */}
        <div style={styles.bannerWrapper}>
          <div style={styles.bannerContent}>
            {[...bannerMessages, ...bannerMessages].map((msg, i) => (
              <span key={i} style={styles.bannerText}>
                {msg}
              </span>
            ))}
          </div>
        </div>

        {/* ✅ Home Banners Side-by-Side */}
        <div style={styles.bannerImageContainer}>
          <img
            src={HomeBanner}
            alt="Sora Maki Home Banner 1"
            style={styles.bannerImage}
          />
          <img
            src={HomeBanner2}
            alt="Sora Maki Home Banner 2"
            style={styles.bannerImage}
          />
          <img
            src={HomeBanner3}
            alt="Sora Maki Home Banner 3"
            style={styles.bannerImage1}
          />
        </div>
        {/* ✅ About Sora Maki Section */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f9f9f9",
            padding: isMobile ? "20px" : "20px",
            borderRadius: "0px",
            margin: isMobile ? "0 20px 30px 20px" : "0 105px 30px 105px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginTop: isMobile ? "-40px" : "0px",
            marginLeft: isMobile ? "-10px" : "105px",
            width: isMobile ? "375px" : "87.5%",
          }}
        >
          <div
            style={{
              flex: 1,
              paddingRight: isMobile ? "0" : "30px",
              paddingBottom: isMobile ? "20px" : "0",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            <h2
              style={{
                fontSize: isMobile ? "20px" : "28px",
                marginBottom: "15px",
                color: "#1c1c1c",
              }}
            >
              About Sora Maki
            </h2>
            <p
              style={{
                fontSize: isMobile ? "18px" : "25px",
                lineHeight: "1.8",
                color: "#333",
              }}
            >
              Sora Maki started as a small neighborhood sushi spot, founded by
              friends who shared a love for Japanese food and a simple goal—make
              good sushi accessible to everyone. Since opening its first outlet
              in 2018, Sora Maki has grown into a go-to place for casual sushi
              dining.
            </p>
            <p
              style={{
                fontSize: isMobile ? "18px" : "25px",
                lineHeight: "1.8",
                marginTop: "10px",
                color: "#333",
              }}
            >
              The restaurant serves a wide range of maki rolls, sashimi, and
              rice bowls, all made fresh to order. Whether you're grabbing a
              quick lunch or enjoying dinner with friends, Sora Maki offers a
              laid-back environment where you can relax and enjoy quality
              Japanese food without breaking the bank.
            </p>
          </div>

          <div style={{ flex: 1, textAlign: "center" }}>
            <img
              src={HomeBanner4}
              alt="Sora Maki Food"
              style={{
                width: isMobile ? "100%" : "700px",
                height: "auto",
                borderRadius: isMobile ? "0px" : "60px",
                border: "4px solid #0b0b0bff",
                marginLeft: isMobile ? "-5px" : "60px",
              }}
            />
          </div>
        </div>
        {/* ✅ Gallery Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#9b2c53",
            padding: isMobile ? "12px 20px" : "15px 50px",
            borderRadius: isMobile ? "0px" : "40px",
            margin: isMobile ? "20px auto" : "40px auto",
            width: isMobile ? "353px" : "1280px",
            height: isMobile ? "10px" : "15px",
            marginLeft: isMobile ? "0px" : "100px",
            marginTop: isMobile ? "-30px" : "0px",
          }}
        >
          <h2
            style={{
              color: "#fff",
              fontSize: isMobile ? "20px" : "28px",
              fontWeight: "bold",
              margin: "0",
            }}
          >
            Gallery
          </h2>
        </div>
        {/* ✅ Gallery Images */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
            gridTemplateRows: isMobile ? "auto" : "repeat(3, 200px)",
            gap: "5px",
            padding: isMobile ? "10px 20px" : "30px 100px",
            marginBottom: "30px",
            marginTop: isMobile ? "-30px" : "-55px",
          }}
        >
          {/* HomeGallery1 */}
          <img
            src={HomeGallery1}
            alt="Gallery 1"
            style={{
              width: isMobile ? "108.5%" : "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: isMobile ? "0px" : "20px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              gridColumn: isMobile ? "auto" : "1 / span 2",
              gridRow: isMobile ? "auto" : "1 / span 1",
              marginLeft: isMobile ? "-20px" : "0px",
              border: isMobile ? "4px solid #0b0b0bff" : "none",
            }}
          />
          {/* HomeGallery2 */}
          <img
            src={HomeGallery2}
            alt="Gallery 2"
            style={{
              width: "108.5%",
              height: "100%",
              objectFit: "cover",
              borderRadius: isMobile ? "0px" : "20px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              gridColumn: isMobile ? "auto" : "3 / span 2",
              gridRow: isMobile ? "auto" : "1 / span 2",
              border: isMobile ? "4px solid #0b0b0bff" : "none",
              marginLeft: isMobile ? "-20px" : "0px",
            }}
          />
          {/* HomeGallery3 */}
          <img
            src={HomeGallery3}
            alt="Gallery 3"
            style={{
              width: isMobile ? "108.5%" : "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: isMobile ? "0px" : "20px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              gridColumn: isMobile ? "auto" : "1 / span 1",
              gridRow: isMobile ? "auto" : "2 / span 2",
              border: isMobile ? "4px solid #0b0b0bff" : "none",
              marginLeft: isMobile ? "-20px" : "0px",
            }}
          />
          {/* HomeGallery4 */}
          <img
            src={HomeGallery4}
            alt="Gallery 4"
            style={{
              width: isMobile ? "108.5%" : "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: isMobile ? "0px" : "20px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              gridColumn: isMobile ? "auto" : "2 / span 1",
              gridRow: isMobile ? "auto" : "2 / span 1",
              border: isMobile ? "4px solid #0b0b0bff" : "none",
              marginLeft: isMobile ? "-20px" : "0px",
            }}
          />
          {/* HomeGallery5 */}
          <img
            src={HomeGallery5}
            alt="Gallery 5"
            style={{
              width: isMobile ? "108.5%" : "105.5%",
              height: "100%",
              objectFit: "cover",
              borderRadius: isMobile ? "0px" : "20px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              gridColumn: isMobile ? "auto" : "2 / span 2",
              gridRow: isMobile ? "auto" : "3 / span 1",
              border: isMobile ? "4px solid #0b0b0bff" : "none",
              marginLeft: isMobile ? "-20px" : "0px",
            }}
          />

          {/* HomeGallery6 */}
          <img
            src={HomeGallery6}
            alt="Gallery 6"
            style={{
              width: isMobile ? "108.5%" : "105%",
              height: "100%",
              objectFit: "cover",
              borderRadius: isMobile ? "0px" : "20px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              gridColumn: isMobile ? "auto" : "4 / span 1",
              gridRow: isMobile ? "auto" : "3 / span 1",
              border: isMobile ? "4px solid #0b0b0bff" : "none",
              marginLeft: isMobile ? "-20px" : "38px",
            }}
          />
        </div>
        {/* ✅ Contact Us Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#9b2c53",
            padding: isMobile ? "12px 20px" : "15px 50px",
            borderRadius: isMobile ? "0px" : "40px",
            margin: isMobile ? "20px auto" : "40px auto",
            width: isMobile ? "353px" : "648px",
            height: isMobile ? "10px" : "15px",
            marginLeft: isMobile ? "0px" : "388px",
            marginTop: isMobile ? "0px" : "-20px",
          }}
        >
          <h2
            style={{
              color: "#fff",
              fontSize: isMobile ? "20px" : "28px",
              fontWeight: "bold",
              margin: "0",
            }}
          >
            Contact Us
          </h2>
        </div>
        {/* Contact us Form Details Section*/}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: isMobile ? "20px" : "40px",
            margin: isMobile ? "20px" : "60px 100px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            width: isMobile ? "700px" : "670px",
            marginLeft: isMobile ? "-18px" : "auto",
            marginRight: "auto",
            marginTop: isMobile ? "-20px" : "-15px",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* Name Fields */}
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: "15px",
              }}
            >
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    marginBottom: "5px",
                    display: "block",
                  }}
                >
                  First Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{
                    width: isMobile ? "360px" : "300px",
                    padding: "12px",
                    borderRadius: isMobile ? "0px" : "8px",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                  }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <label
                  style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    marginBottom: "5px",
                    display: "block",
                  }}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={{
                    width: isMobile ? "360px" : "300px",
                    padding: "12px",
                    borderRadius: isMobile ? "0px" : "8px",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                style={{
                  fontWeight: "600",
                  fontSize: "14px",
                  marginBottom: "5px",
                  display: "block",
                }}
              >
                Email *
              </label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: isMobile ? "360px" : "300px",
                  padding: "12px",
                  borderRadius: isMobile ? "0px" : "8px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                }}
              />
            </div>

            {/* Message */}
            <div>
              <label
                style={{
                  fontWeight: "600",
                  fontSize: "14px",
                  marginBottom: "5px",
                  display: "block",
                }}
              >
                Message *
              </label>
              <textarea
                rows="5"
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  width: isMobile ? "360px" : "96%",
                  padding: "12px",
                  borderRadius: isMobile ? "0px" : "8px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                  resize: "vertical",
                }}
              ></textarea>
            </div>

            {/* Button Group */}
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: "15px",
                alignItems: "flex-start",
              }}
            >
              {/* Send Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: isMobile ? "385px" : "230px",
                  padding: "12px 20px",
                  backgroundColor: isSubmitting ? "#999999" : "#9b2c53",
                  color: "#fff",
                  border: "none",
                  borderRadius: isMobile ? "0px" : "8px",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  opacity: isSubmitting ? 0.6 : 1,
                }}
              >
                {isSubmitting ? "Sending..." : "Send Your Message"}
              </button>

              {/* View Google Sheet Button */}
              <button
                type="button"
                onClick={() => {
                  window.open(
                    "https://docs.google.com/spreadsheets/d/14owuvpQ2gTIGaLxDRlTuBtROHbHmN5l3JUyY2WKTPH0/edit?gid=0#gid=0",
                    "_blank"
                  );
                }}
                style={{
                  width: isMobile ? "385px" : "230px",
                  padding: "12px 20px",
                  backgroundColor: "#9b2c53",
                  color: "#fff",
                  border: "none",
                  borderRadius: isMobile ? "0px" : "8px",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                View Google Sheet
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default HomePageBody;
