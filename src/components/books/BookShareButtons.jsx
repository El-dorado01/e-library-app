"use client";

import { useEffect, useState } from "react";

export default function BookShareButtons({ bookTitle, bookId }) {
  const [currentUrl, setCurrentUrl] = useState("");

  // Get the current URL client-side
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  // Encode the URL for safe sharing
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(bookTitle || "Check out this book!");
  const whatsappText = encodeURIComponent(`${bookTitle} - ${currentUrl}`);

  // Social media share URLs
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
    whatsapp: `https://api.whatsapp.com/send?text=${whatsappText}`,
  };

  // Open share link in a new tab
  const handleShare = (platform) => {
    window.open(shareUrls[platform], "_blank", "noopener,noreferrer");
  };

  return (
    <div className="d-flex pt-2">
      <p className="text-dark font-weight-medium mb-0 mr-2">Share on:</p>
      <div className="d-inline-flex">
        <a className="text-dark px-2" onClick={() => handleShare("facebook")}>
          <i className="fab fa-facebook-f"></i>
        </a>
        <a className="text-dark px-2" onClick={() => handleShare("whatsapp")}>
          <i className="fab fa-whatsapp"></i>
        </a>
        <a className="text-dark px-2" onClick={() => handleShare("twitter")}>
          <i className="fab fa-twitter"></i>
        </a>
        <a className="text-dark px-2" onClick={() => handleShare("linkedin")}>
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a className="text-dark px-2" onClick={() => handleShare("pinterest")}>
          <i className="fab fa-pinterest"></i>
        </a>
      </div>
    </div>
  );
}
