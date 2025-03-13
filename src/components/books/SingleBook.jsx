import { notFound } from "next/navigation";
import BookCover from "./BookCover";
import BookInfo from "./BookInfo";
import MoreBookInfo from "./MoreBookInfo";

export default function SingleBook({ bookData, id, name }) {
  const {
    book,
    error,
    notFound: notFoundFlag,
    isDownloadable,
    downloadUrl,
  } = bookData;

  if (notFoundFlag) {
    notFound();
  }

  if (error) {
    throw new Error(error);
  }

  return (
    <>
      <div className="row px-xl-5">
        <BookCover cover={book.cover} />
        <BookInfo
          title={book.title}
          authors={book.authors}
          descriptions={book.excerpts}
          numberOfPages={book.numberOfPages}
          ebooks={book.ebooks}
          isDownloadable={isDownloadable}
          downloadUrl={downloadUrl}
          id={id}
          bookUrl={book.url}
        />
      </div>
      <MoreBookInfo bookInfo={book} />
    </>
  );
}
