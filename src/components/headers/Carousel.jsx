import Image from "next/image";
import bg1 from "@/assets/img/bg1.jpg";
import bg2 from "@/assets/img/bg2.jpg";

export default function Carousel(params) {
  return (
    <div id="header-carousel" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active" style={{ height: "410px" }}>
          <Image
            className="img-fluid"
            layout="responsive"
            src={bg1}
            alt="Image"
            height={100}
            width={100}
          />
          <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
            <div className="p-3" style={{ maxWidth: "700px" }}>
              <h4 className="text-light text-uppercase font-weight-medium mb-3">
                10% Off Your First Order
              </h4>
              <h3 className="display-4 text-white font-weight-semi-bold mb-4">
                Find Your Next Great Read
              </h3>
              <a href="" className="btn btn-light py-2 px-3">
                Explore Now
              </a>
            </div>
          </div>
        </div>
        <div className="carousel-item" style={{ height: "410px" }}>
          <Image
            src={bg2}
            width={100}
            height={100}
            layout="responsive"
            className="img-fluid"
            alt="Image"
          />
          <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
            <div className="p-3" style={{ maxWidth: "700px" }}>
              <h4 className="text-light text-uppercase font-weight-medium mb-3">
                10% Off Your First Order
              </h4>
              <h3 className="display-4 text-white font-weight-semi-bold mb-4">
                Explore, Imageine, Inspire
              </h3>
              <a href="" className="btn btn-light py-2 px-3">
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#header-carousel"
        data-slide="prev"
      >
        <div className="btn btn-dark" style={{ width: "45px", height: "45px" }}>
          <span className="carousel-control-prev-icon mb-n2"></span>
        </div>
      </a>
      <a
        className="carousel-control-next"
        href="#header-carousel"
        data-slide="next"
      >
        <div className="btn btn-dark" style={{ width: "45px", height: "45px" }}>
          <span className="carousel-control-next-icon mb-n2"></span>
        </div>
      </a>
    </div>
  );
}
