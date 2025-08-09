import React, { useState, useEffect } from "react";
import AppStoreIcon from "../assets/images/AppSoreIcon.png";
import GooglePlayIcon from "../assets/images/GooglePlayIcon.png";

const HomePageFooter = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 820);
  const styles = {
    footer: {
      backgroundColor: "#1a1a1a",
      color: "#eee",
      padding: "40px 80px 20px",
      fontSize: "14px",
      paddingLeft: "30px",
      paddingRight: "50px",
      marginTop: isMobile ? "0px" : "-20px",
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: "30px",
      marginTop: isMobile ? "-25px" : "-25px",
    },
    column: {
      flex: "1 1 200px",
      minWidth: "180px",
    },
    heading: {
      fontWeight: "bold",
      color: "#fff",
      marginBottom: "10px",
    },
    appButtons: {
      display: "flex",
      gap: "10px",
      margin: "10px 0",
    },
    storeIcon: {
      width: "120px",
      height: "40px",
      objectFit: "contain",
    },
    subscribeSection: {
      display: "flex",
      marginTop: "10px",
    },
    emailInput: {
      flex: 1,
      padding: "8px",
      border: "1px solid #ccc",
    },
    subscribeButton: {
      backgroundColor: "#e4002b",
      color: "#fff",
      border: "none",
      padding: "8px 16px",
      fontWeight: "bold",
      cursor: "pointer",
    },
    policyText: {
      marginTop: "10px",
      fontSize: "12px",
      color: "#ccc",
    },
    linkText: {
      color: "#e4002b",
      cursor: "pointer",
    },
    socialIcons: {
      display: "flex",
      gap: "15px",
      marginTop: "15px",
      fontSize: "18px",
    },
    copyRight: {
      textAlign: "center",
      fontSize: "12px",
      color: "#aaa",
      marginTop: "30px",
    },
    anchor: {
      color: "#e4002b",
      textDecoration: "underline",
      cursor: "pointer",
      display: "block",
      marginBottom: "5px",
    },
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 820);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <style>
        {`
        a, span[role="link"] {
          color: white !important;
          text-decoration: none !important;
        }

        a:hover, span[role="link"]:hover {
          color: green !important;
        }
      `}
      </style>

      <footer style={styles.footer}>
        <div style={styles.container}>
          {/* Column 1 */}
          <div style={styles.column}>
            <h4 style={styles.heading}>My React JS Projects</h4>
            <a
              style={styles.anchor}
              href="https://gorgeous-croissant-81191d.netlify.app/"
              target="_blank"
            >
              Customer FAQ
            </a>
            <a
              style={styles.anchor}
              href="https://imaginative-stardust-8a0c37.netlify.app/"
              target="_blank"
            >
              Contact Form
            </a>
            <a
              style={styles.anchor}
              href="https://incredible-centaur-071f6a.netlify.app/"
              target="_blank"
            >
              Calculator Loan Exposure
            </a>
            <a
              style={styles.anchor}
              href="https://dreamy-kulfi-3607f2.netlify.app/"
              target="_blank"
            >
              Dessert Shopping Cart
            </a>
            <a
              style={styles.anchor}
              href="https://681ff99fff7cb35e2f7842d2--taupe-sherbet-c9f3a6.netlify.app/"
              target="_blank"
            >
              Ticket Generator
            </a>
            <a
              style={styles.anchor}
              href="https://dreamy-conkies-cc51a8.netlify.app/"
              target="_blank"
            >
              Extension List
            </a>
            <a
              style={styles.anchor}
              href="https://fastidious-shortbread-0f0426.netlify.app/"
              target="_blank"
            >
              Calculator App
            </a>
          </div>

          {/* Column 2 */}
          <div style={styles.column}>
            <h4 style={styles.heading}>JavaScript Projects (Deprecated)</h4>
            <a
              style={styles.anchor}
              href="https://lavenzo.github.io/frontendmentor-challenge10/"
              target="_blank"
            >
              Time Tracker Dashboard
            </a>
            <a
              style={styles.anchor}
              href="https://lavenzo.github.io/frontendmentor-challenge9/"
              target="_blank"
            >
              Monthly News Letter
            </a>
            <a
              style={styles.anchor}
              href="https://lavenzo.github.io/frontendmentor-challenge8/"
              target="_blank"
            >
              Furniture Layout Advert
            </a>
            <a
              style={styles.anchor}
              href="https://lavenzo.github.io/challenge7/"
              target="_blank"
            >
              Testimony Layout
            </a>
          </div>

          {/* Column 3 */}
          <div style={styles.column}>
            <h4 style={styles.heading}>Java Selenium Automation Script</h4>
            <a
              style={styles.anchor}
              href="https://guileless-hotteok-71ca40.netlify.app/video/AutomationVideo08.mp4"
              target="_blank"
            >
              Automating Customer FAQ
            </a>
            <a
              style={styles.anchor}
              href="https://guileless-hotteok-71ca40.netlify.app/video/AutomationVideo07.mp4"
              target="_blank"
            >
              Automating Contact Form
            </a>
            <a
              style={styles.anchor}
              href="https://guileless-hotteok-71ca40.netlify.app/video/AutomationVideo06.mp4"
              target="_blank"
            >
              Automating Calculator Loan Exposure
            </a>
            <a
              style={styles.anchor}
              href="https://guileless-hotteok-71ca40.netlify.app/video/AutomationVideo05.mp4"
              target="_blank"
            >
              Automating Dessert Shopping Cart
            </a>
            <a
              style={styles.anchor}
              href="https://guileless-hotteok-71ca40.netlify.app/video/AutomationVideo04.mp4"
              target="_blank"
            >
              Automating Calculator App + Others
            </a>
          </div>

          {/* Column 4 */}
          <div style={styles.column}>
            <h4 style={styles.heading}>Major Projects</h4>
            <span role="link" style={styles.anchor}>
              <a
                style={styles.anchor}
                href="https://thunderous-torte-89680e.netlify.app/"
                target="_blank"
              >
                NeoFist Federation (NFF)
              </a>
              <a
                style={styles.anchor}
                href="https://inspiring-kataifi-0a2f6d.netlify.app/"
                target="_blank"
              >
                Windtail Racing
              </a>
              <a
                style={styles.anchor}
                href="https://bright-horse-db9e29.netlify.app/"
                target="_blank"
              >
                BlackjackRoyale
              </a>
              <a
                style={styles.anchor}
                href="https://zingy-custard-2099c6.netlify.app/"
                target="_blank"
              >
                DigiDoor (Property)
              </a>
              <a
                style={styles.anchor}
                href="https://dapper-sawine-0e56d1.netlify.app/"
                target="_blank"
              >
                HCF (HotChikFeast)
              </a>
            </span>
          </div>

          {/* Column 5 */}
          <div style={styles.column}>
            <h4 style={styles.heading}>Download App</h4>
            <div style={styles.appButtons}>
              <a
                href="https://apps.apple.com/sg/app/my-sushi-story/id6444689949"
                target="_blank"
                rel="noopener noreferrer"
                style={{ transition: "transform 0.3s" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.children[0].style.transform = "scale(1.2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.children[0].style.transform = "scale(1)")
                }
              >
                <img
                  src={AppStoreIcon}
                  alt="App Store"
                  style={{ ...styles.storeIcon, transition: "transform 0.3s" }}
                />
              </a>

              <a
                href="https://play.google.com/store/search?q=my+sushi+story&c=apps&hl=en_SG"
                target="_blank"
                rel="noopener noreferrer"
                style={{ transition: "transform 0.3s" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.children[0].style.transform = "scale(1.2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.children[0].style.transform = "scale(1)")
                }
              >
                &nbsp;&nbsp;
                <img
                  src={GooglePlayIcon}
                  alt="Google Play"
                  style={{ ...styles.storeIcon, transition: "transform 0.3s" }}
                />
              </a>
            </div>
            <div style={styles.subscribeSection}>
              <input
                type="text"
                placeholder="Enter email for exclusive offers"
                style={styles.emailInput}
              />
              <button style={styles.subscribeButton}>SUBSCRIBE</button>
            </div>
            <p style={styles.policyText}>
              By subscribing, you agree to Sora Maki's{" "}
              <span style={styles.linkText}>Privacy Policy</span>.
            </p>
            <div style={styles.socialIcons}>
              <span>🔘</span>
              <span>📷</span>
              <span>💬</span>
              <span>▶️</span>
              <span>🎵</span>
            </div>
          </div>
        </div>

        {isMobile ? (
          <p
            style={{
              ...styles.copyRight,
              textAlign: "left",
              padding: "0 20px",
              lineHeight: "1.6",
            }}
          >
            <strong>Sora Maki – Disclaimer:</strong>
            <br />
            Sora Maki is a fictional restaurant concept designed for
            entertainment and simulation purposes only.
            <br />
            All menu items, images, prices, and promotions shown are entirely
            fictional and meant for illustrative display.
            <br />
            This simulation does not involve actual food services, real-world
            orders, or financial transactions.
            <br />
            Any experiences, rewards, or listings displayed are purely simulated
            and carry no monetary or real-world value.
          </p>
        ) : (
          <p
            style={{
              ...styles.copyRight,
              textAlign: "center",
              padding: "0",
              lineHeight: "1.6",
            }}
          >
            <strong>Sora Maki – Disclaimer:</strong>
            <br />
            Sora Maki is a fictional restaurant concept designed for
            entertainment and simulation purposes only.
            <br />
            All menu items, images, prices, and promotions shown are entirely
            fictional and meant for illustrative display.
            <br />
            This simulation does not involve actual food services, real-world
            orders, or financial transactions.
            <br />
            Any experiences, rewards, or listings displayed are purely simulated
            and carry no monetary or real-world value.
          </p>
        )}
      </footer>
    </>
  );
};

export default HomePageFooter;
