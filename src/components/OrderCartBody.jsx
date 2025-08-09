import React, { useState, useEffect, useRef } from "react";
import OrderCartBg from "../assets/audio/OrderCartBg.mp3";
import orderCartConfirmation from "../assets/audio/orderCartConfirmation.mp3";

const OrderCartBody = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 820);
  const [orderCart, setOrderCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const audioRef = useRef(null);
  const recordsPerPage = 10;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 820);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Set initial volume
    }
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("soraMakiOrderCart");
    if (storedData) {
      setOrderCart(JSON.parse(storedData));
    }
  }, []);

  const SCROLL_SPEED = "25s";

  const styles = {
    body: {
      backgroundColor: "#1c1c1c",
      minHeight: isMobile ? "calc(150vh - 80px)" : "calc(150vh - 80px)",
      padding: isMobile ? "0px" : "0px",
    },
    bannerWrapper: {
      position: "relative",
      overflow: "hidden",
      backgroundColor: "#1c1c1c",
      height: "50px",
      marginBottom: "30px",
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
      backgroundColor: "#000000",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(255,255,255,0.08)",
      margin: isMobile ? "10px" : "30px auto",
      maxWidth: "900px",
      color: "#fff",
      marginTop: isMobile ? "-30px" : "0px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: isMobile ? "13px" : "15px",
      color: "#fff",
      minWidth: "600px",
    },
    th: {
      padding: "12px",
      borderBottom: "1px solid #888",
      textAlign: "center",
    },
    td: {
      padding: "10px",
      borderBottom: "1px solid #444",
      textAlign: "center",
    },
    scrollContainer: {
      maxHeight: isMobile ? "300px" : "none", // ✅ Internal vertical scroll for mobile
      overflowY: isMobile ? "auto" : "visible",
      overflowX: "auto", // ✅ Allow left-right scroll for the table
      border: "1px solid #444",
      borderRadius: "8px",
      whiteSpace: "nowrap", // ✅ Prevent wrapping for horizontal scroll
    },
    pagination: {
      marginTop: "15px",
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      color: "#fff",
    },
    button: {
      backgroundColor: "#7cb518",
      color: "#fff",
      border: "none",
      padding: "8px 16px",
      borderRadius: "6px",
      fontSize: "14px",
      cursor: "pointer",
    },
    disabledButton: {
      backgroundColor: "#444",
      color: "#aaa",
      border: "none",
      padding: "8px 16px",
      borderRadius: "6px",
      fontSize: "14px",
      cursor: "not-allowed",
    },
  };

  const bannerMessages = [
    "Sora Maki: Where Every Bite Tells a Story.",
    "Dive into Freshness - Only at Sora Maki!",
    "Savor the Art of Sushi - Masterfully Crafted, Always Fresh.",
  ];

  const totalPages = Math.ceil(orderCart.length / recordsPerPage);

  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = orderCart.slice(startIndex, endIndex);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handleRemove = (timestampToRemove) => {
    const updatedCart = orderCart.filter(
      (item) => item.timestamp !== timestampToRemove
    );
    setOrderCart(updatedCart);
    localStorage.setItem("soraMakiOrderCart", JSON.stringify(updatedCart));

    // If the current page is empty after deletion, go back to previous page if possible
    const maxPage = Math.ceil(updatedCart.length / recordsPerPage);
    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
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
        {/* Order Cart Summary */}
        <div style={styles.box}>
          <h2
            style={{ textAlign: "center", color: "gold", marginBottom: "20px" }}
          >
            Customer's Order Cart Summary
          </h2>

          <div style={styles.scrollContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Customer ID</th>
                  <th style={styles.th}>Menu Item</th>
                  <th style={styles.th}>Price</th>
                  <th style={styles.th}>Ordered Date/Time</th>
                  <th style={styles.th}>Remove</th>
                </tr>
              </thead>
              <tbody>
                {orderCart.length === 0 ? (
                  <tr>
                    <td style={styles.td} colSpan="4">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  currentRecords.map((item, idx) => (
                    <tr key={idx}>
                      <td style={styles.td}>{item.userID}</td>
                      <td style={styles.td}>{item.dish}</td>
                      <td style={styles.td}>{item.price}</td>
                      <td style={styles.td}>{item.timestamp}</td>
                      <td style={styles.td}>
                        <span
                          style={{
                            color: "red",
                            cursor: "pointer",
                            fontWeight: "bold",
                          }}
                          onClick={() => handleRemove(item.timestamp)}
                        >
                          ❌
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Pagination Controls */}
        {orderCart.length > 10 && (
          <div style={styles.pagination}>
            <button
              style={currentPage === 1 ? styles.disabledButton : styles.button}
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span style={{ alignSelf: "center" }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              style={
                currentPage === totalPages
                  ? styles.disabledButton
                  : styles.button
              }
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}

        {/* Buttons */}
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px", // Space between buttons
          }}
        >
          <button
            style={{
              backgroundColor: isSubmitting ? "#555" : "#00aaff",
              color: "#fff",
              border: "none",
              padding: isMobile ? "12px 18px" : "12px 24px",
              borderRadius: "8px",
              fontSize: isMobile ? "14px" : "15px",
              width: isMobile ? "80%" : "auto",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              opacity: isSubmitting ? 0.6 : 1,
            }}
            disabled={isSubmitting}
            onClick={async () => {
              setIsSubmitting(true); // ✅ Show "In Progress"

              const orderCart =
                JSON.parse(localStorage.getItem("soraMakiOrderCart")) || [];

              if (orderCart.length === 0) {
                alert("Order Cart is empty!");
                setIsSubmitting(false);
                return;
              }

              const now = new Date().toLocaleString("en-SG", {
                timeZone: "Asia/Singapore",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              });

              const payload = {
                orders: orderCart.map((item) => ({
                  CustomerID: item.userID,
                  MenuItem: item.dish,
                  Price: item.price,
                  OrderedDateTime: item.timestamp,
                  SubmittedDateTime: now,
                })),
              };

              try {
                await fetch(
                  "https://script.google.com/macros/s/AKfycbxaWdS-I-9Uo6PZmQcVmh9a-ORWv9uTvS1z7w1kNGPHAhuOWNxW12izxw0CN2MWnXRRdA/exec",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    mode: "no-cors", // ✅ Required for Apps Script endpoint
                    body: JSON.stringify(payload),
                  }
                );

                // ✅ Play confirmation audio
                const audio = new Audio(orderCartConfirmation);
                audio.volume = 1.0; // 100% volume
                audio.play();

                alert(
                  "Order submitted successfully.\n" +
                    "Your order has been captured in the Google Sheet.\n" +
                    "To view your order details, please click on the 'View Google Sheet' button."
                );

                localStorage.removeItem("soraMakiOrderCart");
                setOrderCart([]);
                setCurrentPage(1);
              } catch (error) {
                console.error("Error submitting order:", error);
                alert("Failed to submit order.");
              }

              setIsSubmitting(false); // ✅ Reset button state
            }}
          >
            {isSubmitting ? "Order Submission in Progress..." : "Submit Order"}
          </button>

          <button
            style={{
              backgroundColor: "#ffaa00",
              color: "#fff",
              border: "none",
              padding: isMobile ? "12px 18px" : "12px 24px",
              borderRadius: "8px",
              fontSize: isMobile ? "14px" : "15px",
              width: isMobile ? "80%" : "auto",
              cursor: "pointer",
            }}
            onClick={() => {
              window.open(
                "https://docs.google.com/spreadsheets/d/14owuvpQ2gTIGaLxDRlTuBtROHbHmN5l3JUyY2WKTPH0/edit?gid=1753220802#gid=1753220802",
                "_blank"
              );
            }}
          >
            View Google Sheet
          </button>
        </div>
        <audio ref={audioRef} src={OrderCartBg} autoPlay loop />
      </div>
    </>
  );
};

export default OrderCartBody;
