"use client";
import { useState } from "react";

export default function BookDescription({ descriptions }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const TRUNCATE_LENGTH = 400;  

  return (
    <>
      {descriptions.length > 0
        ? descriptions.map((desc) => {
            // Truncate the text if not expanded (strip HTML for length check)
            const plainText = desc.text.replace(/<[^>]+>/g, ""); // Remove HTML tags for length calculation
            const shouldTruncate =
              plainText.length > TRUNCATE_LENGTH && !isExpanded;
            const displayText = shouldTruncate
              ? `${plainText.slice(0, TRUNCATE_LENGTH)}...`
              : desc.text;

            return (
              <div
                className="mb-4"
                key={desc.text}
                dangerouslySetInnerHTML={{ __html: displayText }}
              />
            );
          })
        : "No description"}
      {descriptions?.some(
        (desc) => desc.text.replace(/<[^>]+>/g, "").length > TRUNCATE_LENGTH
      ) && (
        <button
          className="read-more"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </>
  );
}
