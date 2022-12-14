import {Carousel} from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

function Banner() {
  return (
    <div className="relative">
        <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20"/>
        <Carousel
            autoPlay
            infiniteLoop
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            interval={5000}
        >
            <div>
                <img loading="lazy" src="https://i.im.ge/2022/09/19/1sWEUh.Mision-Vision-Ambicion-.png" alt=""/>
            </div>
            
            <div>
                <img loading="lazy" src="https://i.im.ge/2022/09/19/1sW34Y.vrime-video-3.png" alt=""/>
            </div>

            <div>
                <img loading="lazy" src="https://i.im.ge/2022/09/19/1sWCT8.3-meses-gratis-2.png" alt=""/>
            </div>
            
        </Carousel>
    </div>
  )
}

export default Banner