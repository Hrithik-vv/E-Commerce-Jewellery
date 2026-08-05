import React from "react";

function About() {
  // Star Icon Helper Component
  const RenderStars = ({ rating, size = 16 }) => {
    return (
      <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={star <= rating ? "#D4AF37" : "#E5E7EB"}
            stroke={star <= rating ? "#D4AF37" : "#E5E7EB"}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
    );
  };

  // Sample Customer Reviews Data
  const reviews = [
    {
      id: 1,
      rating: 5,
      text: "The craftsmanship of the necklace I bought is absolutely world-class! The diamonds shimmer brilliantly under any light, and the service was beyond expectation.",
      name: "Ananya Sharma",
    },
    {
      id: 2,
      rating: 5,
      text: "Bought gold bangles for my wedding anniversary. The purity and delicate work are truly magnificent. Highly recommended for authentic fine jewellery lovers!",
      name: "Meera Nair",
    },
    {
      id: 3,
      rating: 4,
      text: "Exquisite design and top-notch quality. Customer support helped me pick the right ring size smoothly. Delivery was quick and very securely packaged.",
      name: "Priya Sundaram",
    },
  ];

  return (
    <>
      {/* Dynamic Styles & Responsive CSS */}
      <style>{`
        .about-hero-heading {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 700;
          color: #FFFFFF;
          font-size: 56px;
          line-height: 1.15;
          text-align: center;
          width: fit-content;
          position: relative;
          z-index: 2;
          margin: 0;
        }

        .about-review-heading {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 600;
          color: #014D40;
          font-size: 40px;
          text-align: center;
          margin-bottom: 24px;
          margin-top: 0;
        }

        .review-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 40px;
        }

        .review-card {
          padding: 24px;
          border: 1px solid #E5E7EB;
          background-color: #FFFFFF;
          border-radius: 8px;
          transition: all 300ms ease;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        .review-card:hover, .review-card:focus, .review-card:active {
          background-color: #F3F7F5;
          border-color: #046A5A;
        }

        .review-text-clamp {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 15px;
          color: #2B2B2B;
          line-height: 24px;
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .view-all-reviews {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: 15px;
          color: #046A5A;
          text-decoration: none;
          padding: 8px 4px;
          transition: color 200ms ease, text-decoration 200ms ease;
          cursor: pointer;
          display: inline-block;
        }

        .view-all-reviews:hover {
          color: #D4AF37;
          text-decoration: underline;
        }

        .review-wrapper {
          padding-left: 40px;
          padding-right: 40px;
        }

        @media (max-width: 1024px) {
          .about-hero-heading { font-size: 44px; }
          .about-review-heading { font-size: 36px; }
          .review-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 640px) {
          .about-hero-heading { font-size: 32px; }
          .about-review-heading { font-size: 32px; }
          .review-grid { grid-template-columns: 1fr; }
          .review-wrapper { padding-left: 20px; padding-right: 20px; }
        }
      `}</style>

      <div style={{ width: "100%", overflowX: "hidden" }}>
        {/* 1. Hero Section */}
        <section
          style={{
            position: "relative",
            width: "100%",
            minHeight: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url('https://img.magnific.com/premium-photo/green-mandala-background_905450-16905.jpg?semt=ais_hybrid&w=740&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark Gradient Overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(to top, rgba(0,0,0,0.15), rgba(0,0,0,0))",
              zIndex: 1,
            }}
          />

          {/* Content Wrapper */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "40px",
              paddingBottom: "40px",
              width: "100%",
            }}
          >
            <h1 className="about-hero-heading">About Us</h1>
          </div>
        </section>

        {/* 2. Intro Statement Section */}
        <section
          style={{
            width: "100%",
            paddingTop: "48px",
            paddingBottom: "48px",
            backgroundColor: "#FAF9F6",
          }}
        >
          <div
            style={{
              margin: "0 auto",
              maxWidth: "640px",
              textAlign: "center",
              padding: "0 20px",
              boxSizing: "border-box",
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: "24px",
                color: "#014D40",
                lineHeight: "32px",
                textAlign: "center",
                margin: 0,
              }}
            >
              "Jewellery is not merely an ornament; it is a sacred archive of memories, a celebration of heritage, and a timeless pledge of love."
            </p>
          </div>
        </section>

        {/* 3. Brand Story Section */}
        <section
          style={{
            width: "100%",
            paddingTop: "40px",
            paddingBottom: "48px",
            backgroundColor: "#FAF9F6",
          }}
        >
          <div
            style={{
              margin: "0 auto",
              maxWidth: "680px",
              textAlign: "left",
              padding: "0 20px",
              boxSizing: "border-box",
            }}
          >
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                color: "#6B7280",
                lineHeight: "26px",
                textAlign: "left",
                marginBottom: "20px",
                marginTop: 0,
              }}
            >
              Established with a deep commitment to purity and perfection, our journey began as a humble atelier dedicated to handcrafting exquisite fine jewellery. Over the decades, we have preserved traditional Indian goldsmithing techniques while seamlessly infusing modern aesthetics into every single piece.
            </p>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                color: "#6B7280",
                lineHeight: "26px",
                textAlign: "left",
                marginBottom: "20px",
              }}
            >
              Each gemstone is ethically sourced, every diamond meticulously set, and every curve of gold hallmarked for authenticity. We believe that fine jewellery should be both an everyday luxury and a cherished family heirloom passed down through generations.
            </p>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                color: "#6B7280",
                lineHeight: "26px",
                textAlign: "left",
                marginBottom: 0,
              }}
            >
              Today, we serve thousands of discerning patrons worldwide, staying true to our core ethos: uncompromised quality, transparent craftsmanship, and an enduring legacy of elegance.
            </p>
          </div>
        </section>

        {/* 4. Customer Review Section */}
        <section
          style={{
            width: "100%",
            paddingTop: "64px",
            paddingBottom: "64px",
            backgroundColor: "#F3F7F5",
          }}
        >
          <div
            className="review-wrapper"
            style={{
              margin: "0 auto",
              maxWidth: "1024px",
              boxSizing: "border-box",
            }}
          >
            {/* Section Heading */}
            <h2 className="about-review-heading">Loved by Our Patrons</h2>

            {/* Rating Summary Bar */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "12px",
                marginTop: "16px",
                marginBottom: "8px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: "28px",
                  color: "#046A5A",
                  lineHeight: 1,
                }}
              >
                4.9
              </span>
              <RenderStars rating={5} size={20} />
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  color: "#8A8A8A",
                  marginLeft: "4px",
                }}
              >
                (128 reviews)
              </span>
            </div>

            {/* Review Grid */}
            <div className="review-grid">
              {reviews.map((rev) => (
                <div key={rev.id} className="review-card">
                  {/* Star Rating inside Card */}
                  <div style={{ marginBottom: "12px" }}>
                    <RenderStars rating={rev.rating} size={16} />
                  </div>

                  {/* Review Text */}
                  <p className="review-text-clamp">{rev.text}</p>

                  {/* Reviewer Name */}
                  <span
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500,
                      fontSize: "15px",
                      color: "#014D40",
                      marginTop: "auto",
                      marginBottom: "2px",
                    }}
                  >
                    {rev.name}
                  </span>
                </div>
              ))}
            </div>

            {/* View All Reviews Link */}
            <div style={{ textAlign: "center", marginTop: "32px" }}>
              <a href="#reviews" className="view-all-reviews">
                View All Reviews
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default About;