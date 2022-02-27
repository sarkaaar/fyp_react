import Header from "./Components/Header";
import MediaCard from "./Components/MediaCard";
import Banner from "./Components/Banner";
import Footer from "./Components/Footer";

export default function HomePage() {
  const prod = {
    image: "https://source.unsplash.com/random",
    name: "Dog Food",
    salePrice: "$100",
    id: "1",
  };
  return (
    <div className="relative bg-white overflow-hidden">
      <Header />
      <Banner />
      <hr />
      <div>
        <h1 className="text-4xl mt-12 mx-36 underline underline-offset-8">
          Foods
        </h1>
        <div className="lg:flex justify-center gap-8 mt-6">
          <div className="md:flex gap-8 mb-8">
            <MediaCard obj={prod} />
            <MediaCard obj={prod}/>
          </div>
          <div className="md:flex gap-8 mb-8">
            <MediaCard obj={prod}/>
            <MediaCard obj={prod}/>
          </div>
          <div className="md:flex gap-8 mb-8">
            <MediaCard obj={prod}/>
            <MediaCard obj={prod}/>
          </div>
        </div>
      </div>
      {/* <div>
        <h1 className="text-4xl mt-12 mx-36 underline underline-offset-8">
          Foods
        </h1>
        <div className="lg:flex justify-center gap-8 mt-6">
          <div className="md:flex gap-8 mb-8">
            <MediaCard />
            <MediaCard />
          </div>
          <div className="md:flex gap-8 mb-8">
            <MediaCard />
            <MediaCard />
          </div>
          <div className="md:flex gap-8mb-8">
            <MediaCard />
            <MediaCard />
          </div>
        </div>
      </div> */}
      {/* <div>
        <h1 className="text-4xl mt-12 mx-36 underline underline-offset-8">
          Foods
        </h1>
        <div className="lg:flex justify-center gap-8 mt-6">
          <div className="md:flex gap-8 mb-8">
            <MediaCard />
            <MediaCard />
          </div>
          <div className="md:flex gap-8 mb-8">
            <MediaCard />
            <MediaCard />
          </div>
          <div className="md:flex gap-8 mb-8">
            <MediaCard />
            <MediaCard />
          </div>
        </div>
      </div> */}
      <Footer />
    </div>
  );
}
