import CustomCarousel from '@/components/Common/Carousel/Carousel'

import { SwiperSlide } from 'swiper/react'

export function CustomBanner() {
  const items = [
    { text: 'Khuyến mãi đặc biệt', backgroundColor: 'bg-blue-100' },
    { text: 'Mua sắm thoải mái', backgroundColor: 'bg-green-100' },
    { text: 'Giao hàng tận nơi', backgroundColor: 'bg-yellow-100' }
  ]

  return (
    <div className="overflow-hidden">
      <CustomCarousel slidesPerView={1} pagination={true}>
        {items.map((item, index) => (
          <SwiperSlide key={index} className="!h-auto">
            <div
              className={`flex items-center justify-center h-64 text-2xl font-bold lg:text-4xl ${item.backgroundColor}`}>
              {item.text}
            </div>
          </SwiperSlide>
        ))}
      </CustomCarousel>
    </div>
  )
}
