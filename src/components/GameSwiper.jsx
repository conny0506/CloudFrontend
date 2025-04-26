import React, { useState } from 'react'
import './gameSwiper.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules'
import GameSlide from './GameSlide'
import { AppContext } from '../App'
import { useContext } from 'react'

function GameSwiper({ games }) {
  const { currentUser } = useContext(AppContext)
  const [active, setActive] = useState(false)

  const handleToggleVideo = () => {
    setActive(!active)
  }

  return (
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      navigation={true}
      loop={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 35,
        stretch: 200,
        depth: 250,
        modifier: 1,
        slideShadows: true,
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[EffectCoverflow, Navigation, Autoplay]}
      className="gameSwiper"
    >
      {games.map((game) => (
        <SwiperSlide key={game._id}>
          <GameSlide
            key={game._id}
            game={game}
            active={active}
            toggleVideo={handleToggleVideo}
            onAddToLibrary={() => {
              if (!currentUser) {
                alert("Please log in to add to your Library!");
                return;
              }
            }}
            onAddToBag={() => {
              if (!currentUser) {
                alert("Please log in to add to your Bag!");
                return;
              }
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default GameSwiper
