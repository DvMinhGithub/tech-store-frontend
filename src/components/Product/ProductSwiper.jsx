import CustomCarousel from '@/components/Common/Carousel/Carousel'
import ProductCard from '@/components/Product/ProductCard'

import { SwiperSlide } from 'swiper/react'

function ProductSwiper({ title, products, className }) {
  return products.length === 0 ? null : (
    <div className={`${className}`}>
      <div className="border-t border-lime-600">
        <h2 className="w-fit p-2 bg-lime-600 text-2xl text-white-500 font-semibold mb-4">{title}</h2>
      </div>
      <CustomCarousel
        pagination={false}
        navigation={products.length > 4 ? true : false}
        autoplay={false}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20
          }
        }}
        spaceBetween={20}>
        {products.map((item, index) => (
          <SwiperSlide key={index} className="!h-auto">
            <ProductCard product={item} />
          </SwiperSlide>
        ))}
      </CustomCarousel>
    </div>
  )
}

export default ProductSwiper
