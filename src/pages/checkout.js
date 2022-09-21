import Image from "next/image"
import { useSelector } from "react-redux"
import CheckoutProduct from "../components/CheckoutProduct"
import Header from "../components/Header"
import { selectItems, selectTotal } from "../slices/basketSlice"
import Currency from "react-currency-formatter"
import { useSession } from "next-auth/react"
import {loadStripe} from "@stripe/stripe-js"
const stripePromise = loadStripe(process.env.stripe_public_key)
const axios = require('axios').default;

function Checkout() {
    const items = useSelector(selectItems)
    const total = useSelector(selectTotal)
    const { data: session } = useSession()
    
    const createCheckoutSession = async () => {
        const stripe = await stripePromise;
        
        const checkoutSession = await axios.post("/api/create-checkout-session", {
            items: items,
            email: session.user.email
        })
        
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id
        })

        if (result.error) alert(result.error.message)
    };

  return (
    <div className="bg-gray-100">
        <Header/>
        <main className="lg:flex max-w-screen-2xl">
            {/* Left */}
            <div className="flex-grow m-5 shadow-sm">
                <Image 
                    src="https://drive.google.com/uc?export=view&id=1IIMIhc7BXy-XnJDBqg8OUVmYyPiJ78HM"
                    width={1020} 
                    height={250}
                    objectFit="contain"
                />
                <div className="flex flex-col p-5 space-y-10 bg-white">
                    <h1 className="text-3xl border-b pb-4">
                        {items.length === 0 ? "Tu canasta esta vacía":"Tu canasta"}
                    </h1>

                    {items.map((item, i) => (
                        <CheckoutProduct
                            key={i}
                            id={item.id}
                            title={item.title}
                            rating={item.rating}
                            price={item.price}
                            description={item.description}
                            category={item.category}
                            image={item.image}
                            hasPrime={item.hasPrime}
                        />
                    ))}
                </div>
            </div>

            
            {/* Right */}
            <div className="flex flex-col bg-white p-10 shadow-md">
                {items.length > 0 && (
                    <>
                        <h2 className="whitespace-nowrap">
                            Subtotal ({items.length} productos):{" "}
                            <span className="font-bold">
                                <Currency quantity={total} currency="usd" />
                            </span>
                        </h2>
                        <button
                            role="link"
                            onClick={createCheckoutSession}
                            disabled={!session}
                            className={`button mt-2 ${!session && "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"}`}>
                            {!session ? "Inicie sesión para pagar":"Proceder al pago"}
                        </button>
                    </>
                )}
            </div>

        </main>
    </div>
  )
}

export default Checkout