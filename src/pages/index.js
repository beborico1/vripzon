import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

function Home({products}) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Vripzon</title>
      </Head>
      {/* Header */}
      <Header/>
      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner/>
        {/* Product Feed */}
        <ProductFeed products={products}/>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  )
  console.log("ADSSAD")
  return { 
    props : {
      products,
    },
  }
}

export default Home