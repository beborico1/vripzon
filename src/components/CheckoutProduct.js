import { StarIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Currency from "react-currency-formatter"
import { useDispatch } from "react-redux"
import { addToBasket, removeFromBasket } from "../slices/basketSlice"

function CheckoutProduct({
    id,
    title,
    price,
    rating,
    description,
    category,
    image,
    hasPrime
}) {
    const dispatch = useDispatch()
    
    const addItemToBasket = () => {
        const product = {
            id,
            title,
            price,
            description,
            category,
            image,
            rating,
            hasPrime,
        }

        dispatch(addToBasket(product))
    }

    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({id}))
    }

  return (
    <div className="grid grid-cols-5">
        {/* Left */}
        <Image src={image} height={200} width={200} objectFit="contain"/>
        {/* Middle */}
        <div className="col-span-3 mx-5">
            <p>{title}</p>
            <div className="flex">
                {Array(rating)
                    .fill()
                    .map((_,i ) => (
                        <StarIcon key={i} className="h-5 text-vrip-400"/>
                ))
                }
            </div>

            <div>
                <p className="text-xs my-2 line-clamp-3">{description}</p>
                <Currency quantity={price} currency="usd"/>
            </div>

            {hasPrime && (
                <div className="flex items-center space-x-2">
                    <img
                        loading="lazy"
                        className="w-12"
                        src="https://i.im.ge/2022/09/19/1sWatT.1.png"
                        alt=""
                    />
                    <p className="text-xs text-gray-500">Entrega GRATIS</p>
                </div>
            )}
        </div>
        {/* Right */}
        
        <div className="flex flex-col space-y-2 my-auto justify-self-end">
            <button className="button" onClick={addItemToBasket}>
                Añadir a la Canasta
            </button>
            <button className="button" onClick={removeItemFromBasket}>
                Quitar de la Canasta
            </button>
        </div>
    </div>
  )
}

export default CheckoutProduct
