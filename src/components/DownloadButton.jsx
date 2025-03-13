"use client";

export default function DownloadButton({ isDownloadable, downloadUrl, id, bookUrl }) {
  // Client-side function to trigger download
  //   const handleDownload = () => {
  //     if (downloadUrl) {
  //       const link = document.createElement("a");
  //       link.href = downloadUrl;
  //       link.download = `${book.title}.pdf`; // Suggest a filename
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //     }
  //   };
  const handleDownload = async () => {
    window.location.href = `/api/download/${id}`;
  };
  return (
    <div className="d-flex mb-3">
      <div className="mt-3">
        {isDownloadable ? (
          <button
            onClick={handleDownload}
            className="downloadButton"
            style={{ marginRight: "10px" }}
          >
            Download Book
          </button>
        ) : (
          <a
            href={bookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="openLibraryLink"
          >
            Read on Google Books
          </a>
        )}
      </div>
    </div>
  );
}
