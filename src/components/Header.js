import Image from "next/image"
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    ShoppingCartIcon
} from "@heroicons/react/24/outline"
import {signIn,signOut,useSession} from "next-auth/react"
import {useRouter} from "next/router"
import { useSelector } from "react-redux"
import { selectItems } from "../slices/basketSlice"

function Header() {
    const { data: session } = useSession()
    const router = useRouter()
    const items = useSelector(selectItems)
        
  return (
    <header>
        {/* Top nav */}
        <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
            <div className="flex items-center flex-grow sm:flex-grow-0">
                <Image
                    onClick={()=>router.push("/")}
                    src="https://drive.google.com/uc?export=view&id=1CWpT7LEN02yLTjM_SEiP_UmDSdsMUlJN"
                    width={150}
                    height={40}
                    objectFit="contain"
                    className="cursor-pointer"
                />
            </div>
            {/* Search */}
            <div className="hidden sm:flex items-center rounded-md flex-grow cursor-pointer h-10 bg-vrip-400 hover:bg-vrip-500">
                <input className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" type="text" />
                <MagnifyingGlassIcon className="h-12 p-4"/>
            </div>

            {/* Right */}
            <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
                <div onClick={!session ? signIn:signOut} className="cursor-pointer link">
                    <p className="hover:underline">
                        {session ? `Hola, ${session.user.name}`:"Sign In"}
                    </p>
                    <p className="font-extrabold md:text-sm">Cuenta y Listas</p>
                </div>

                <div className="link">
                    <p>Devoluciones</p>
                    <p className="font-extrabold md:text-sm">y Pedidos</p>
                </div>

                <div onClick={()=>router.push("/checkout")} className="relative link flex items-center">
                    <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-vrip-400 text-center rounded-full text-black font-bold">
                        {items.length}
                    </span>
                    <ShoppingCartIcon className="h-10"/>
                    <p className="font-extrabold md:text-sm hidden md:inline mt-2">Carrito</p>
                </div>
            </div>
        </div>

        {/* Bottom nav */}
        <div className="flex space-x-3 p-2 pl-6 items-center bg-amazon_blue text-white text-sm">
            <p className="link flex items-center">
                <Bars3Icon className="h-6 mr-1"/>
                Todo
            </p>
            <p className="link">Vrime Video</p>
            
            <p className="link">Visión</p>
            
            <p className="link">Ofertas del Día</p>
            <p className="link hidden lg:inline-flex">Moda</p>
        </div>
    </header>
  )
}

export default Header