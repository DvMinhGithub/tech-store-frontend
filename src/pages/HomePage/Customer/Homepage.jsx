import { useEffect } from 'react'

import ProductSwiper from '@/components/Product/ProductSwiper'
import { CustomBanner } from '@/pages/HomePage/Customer/Banner'
import ShopByCategory from '@/pages/HomePage/Customer/ShopByCategory'
import useProductStore from '@/store/productStore'

const HomePage = () => {
  const { productsTopView, getProductTopView } = useProductStore()

  useEffect(() => {
    getProductTopView()
  }, [])

  return (
    <div className="container mx-auto py-8">
      <CustomBanner />
      <ProductSwiper
        title={'Sản phẩm nổi bật'}
        products={productsTopView}
        className="py-8 overflow-hidden swiper-feature-product"
      />
      <ShopByCategory />
    </div>
  )
}

export default HomePage
