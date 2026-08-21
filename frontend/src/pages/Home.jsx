import Navbar from "../components/common/Navbar";
import Hero from "../components/home/Hero";
import ShopByBrands from "../components/home/ShopByBrands";
import ProductSection from "../components/home/ProductSection";
import PromoBanner from "../components/home/PromoBanner";
import Footer from "../components/common/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ShopByBrands />
        <ProductSection/>
        <PromoBanner/>
      </main>
      <Footer />
    </>
  );
}

export default Home;