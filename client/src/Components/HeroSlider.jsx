import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function HeroSlider() {
  const images = []; // your image urls
  return (
    <Swiper loop>
      {images.map((src, i) => (
        <SwiperSlide key={i}>
          <div className="aspect-[16/9] w-full overflow-hidden rounded-card">
            <img src={src} className="w-full h-full object-cover" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
