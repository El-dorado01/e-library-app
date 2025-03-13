import Image from "next/image";
import SciencesImg from "@/assets/img/sciences.jpg";
import ArtsImg from "@/assets/img/arts.jpg";
import AccountingImg from "@/assets/img/accounting.jpg";
import ArchitectureImg from "@/assets/img/architecture.jpg";
import AstronomyImg from "@/assets/img/astronomy.jpg";
import NeurologyImg from "@/assets/img/neurology.jpg";
import CardiosurgeryImg from "@/assets/img/cardiosurgery.jpg";
import Link from "next/link";

export default function Categories() {
  return (
    <div className="container-fluid pt-5">
      <div className="row px-xl-5 pb-3">
        <div className="col-lg-4 col-md-6 pb-1">
          <div
            className="cat-item d-flex flex-column border mb-4"
            style={{ padding: "30px" }}
          >
            <p className="text-right">2756 Books</p>
            <Link
              href="/category/sciences"
              className="cat-img position-relative overflow-hidden mb-3"
            >
              <Image
                width={100}
                height={100}
                layout="responsive"
                className="img-fluid"
                src={SciencesImg}
                alt=""
              />
            </Link>
            <h5 className="font-weight-semi-bold m-0">Sciences</h5>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 pb-1">
          <div
            className="cat-item d-flex flex-column border mb-4"
            style={{ padding: "30px" }}
          >
            <p className="text-right">15 Books</p>
            <Link
              href="/category/arts"
              className="cat-img position-relative overflow-hidden mb-3"
            >
              <Image
                width={100}
                height={100}
                layout="responsive"
                className="img-fluid"
                src={ArtsImg}
                alt=""
              />
            </Link>
            <h5 className="font-weight-semi-bold m-0">Arts</h5>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 pb-1">
          <div
            className="cat-item d-flex flex-column border mb-4"
            style={{ padding: "30px" }}
          >
            <p className="text-right">15 Books</p>
            <Link
              href="/category/accounting"
              className="cat-img position-relative overflow-hidden mb-3"
            >
              <Image
                width={100}
                height={100}
                layout="responsive"
                className="img-fluid"
                src={AccountingImg}
                alt=""
              />
            </Link>
            <h5 className="font-weight-semi-bold m-0">Accounting</h5>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 pb-1">
          <div
            className="cat-item d-flex flex-column border mb-4"
            style={{ padding: "30px" }}
          >
            <p className="text-right">15 Books</p>
            <Link
              href="/category/architecture"
              className="cat-img position-relative overflow-hidden mb-3"
            >
              <Image
                width={100}
                height={100}
                layout="responsive"
                className="img-fluid"
                src={ArchitectureImg}
                alt=""
              />
            </Link>
            <h5 className="font-weight-semi-bold m-0">Architecture</h5>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 pb-1">
          <div
            className="cat-item d-flex flex-column border mb-4"
            style={{ padding: "30px" }}
          >
            <p className="text-right">15 Books</p>
            <Link
              href="/category/astronomy"
              className="cat-img position-relative overflow-hidden mb-3"
            >
              <Image
                width={100}
                height={100}
                layout="responsive"
                className="img-fluid"
                src={AstronomyImg}
                alt=""
              />
            </Link>
            <h5 className="font-weight-semi-bold m-0">Astronomy</h5>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 pb-1">
          <div
            className="cat-item d-flex flex-column border mb-4"
            style={{ padding: "30px" }}
          >
            <p className="text-right">15 Books</p>
            <Link
              href="/category/neurology"
              className="cat-img position-relative overflow-hidden mb-3"
            >
              <Image
                width={100}
                height={100}
                layout="responsive"
                className="img-fluid"
                src={NeurologyImg}
                alt=""
              />
            </Link>
            <h5 className="font-weight-semi-bold m-0">Neurology</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
