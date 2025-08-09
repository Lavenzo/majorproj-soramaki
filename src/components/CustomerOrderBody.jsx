import React, { useState, useEffect, useRef } from "react";
import CustomerOrdersBg from "../assets/audio/CustomerOrdersBg.mp3";

const CustomerOrderBody = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 820);
  const [isLoading, setIsLoading] = useState(true);
  const [orderData, setOrderData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const audioRef = useRef(null);
  const recordsPerPage = 10;

  const parseSGDate = (dateStr) => {
    if (!dateStr || typeof dateStr !== "string") return 0; // Defensive: undefined/null/non-string

    // Remove comma, split parts
    const parts = dateStr.replace(",", "").split(" ");
    if (parts.length < 3) return 0; // Defensive: not enough parts

    const [datePart, timePart, meridiem] = parts;
    if (!datePart || !timePart || !meridiem) return 0;

    const dateArr = datePart.split("/");
    const timeArr = timePart.split(":");
    if (dateArr.length !== 3 || timeArr.length !== 3) return 0;

    const [day, month, year] = dateArr.map(Number);
    let [hour, minute, second] = timeArr.map(Number);

    if (
      isNaN(day) ||
      isNaN(month) ||
      isNaN(year) ||
      isNaN(hour) ||
      isNaN(minute) ||
      isNaN(second)
    )
      return 0;

    if (meridiem.toLowerCase() === "pm" && hour !== 12) {
      hour += 12;
    }
    if (meridiem.toLowerCase() === "am" && hour === 12) {
      hour = 0;
    }

    return new Date(year, month - 1, day, hour, minute, second);
  };

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
    fetch("https://soramakiproxy.livboy29.workers.dev")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          if (data.data && data.data.length > 0) {
            const sortedData = data.data.sort((a, b) => {
              return (
                parseSGDate(b.SubmittedDateTime) -
                parseSGDate(a.SubmittedDateTime)
              );
            });
            setOrderData(sortedData);
          } else {
            setOrderData([]); // Explicitly set to empty
          }
        } else {
          alert("Failed to retrieve order data.");
          setOrderData([]); // Safe fallback
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching order data:", err);
        alert("Unable to fetch order history.");
        setOrderData([]); // Safe fallback
        setIsLoading(false);
      });
  }, []);

  const SCROLL_SPEED = "25s";

  const totalPages = Math.ceil(orderData.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = orderData.slice(startIndex, endIndex);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

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
      maxHeight: isMobile ? "300px" : "none",
      overflowY: isMobile ? "auto" : "visible",
      overflowX: "auto",
      border: "1px solid #444",
      borderRadius: "8px",
      whiteSpace: "nowrap",
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
        {/* Customer Orders */}
        <div style={styles.box}>
          <h2
            style={{ textAlign: "center", color: "gold", marginBottom: "20px" }}
          >
            Customer Orders
          </h2>

          <div style={styles.scrollContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Customer ID</th>
                  <th style={styles.th}>Menu Item</th>
                  <th style={styles.th}>Price</th>
                  <th style={styles.th}>Ordered Date/Time</th>
                  <th style={styles.th}>Submitted Date/Time</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td style={styles.td} colSpan="5">
                      Loading orders...
                    </td>
                  </tr>
                ) : currentRecords.length === 0 ? (
                  <tr>
                    <td style={styles.td} colSpan="5">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  currentRecords.map((item, idx) => (
                    <tr key={idx}>
                      <td style={styles.td}>{item.CustomerID}</td>
                      <td style={styles.td}>{item.MenuItem}</td>
                      <td style={styles.td}>
                        ${parseFloat(item.Price).toFixed(2)}
                      </td>
                      <td style={styles.td}>{item.OrderedDateTime}</td>
                      <td style={styles.td}>{item.SubmittedDateTime}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {orderData.length > recordsPerPage && (
            <div style={styles.pagination}>
              <button
                style={
                  currentPage === 1 ? styles.disabledButton : styles.button
                }
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
        </div>
        <audio ref={audioRef} src={CustomerOrdersBg} autoPlay loop />
      </div>
    </>
  );
};

export default CustomerOrderBody;
