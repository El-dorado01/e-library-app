import BookCover from "./BookCover";
import BookInfo from "./BookInfo";
import MoreBookInfo from "./MoreBookInfo";

export default function BookDetail() {
  return (
    <div className="container-fluid py-5">
      <div className="row px-xl-5">
        <BookCover />
        <BookInfo />
      </div>
      <MoreBookInfo />
    </div>
  );
}
