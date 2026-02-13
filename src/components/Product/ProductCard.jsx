import { useId } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { constants } from '@/constants'
import useCartStore from '@/store/cartStore'
import { formatMoneyVND, handleNotification, tokenOperations, userRoles } from '@/utils'

function ProductCard({ product }) {
  const { addItemToCart } = useCartStore()
  const navigate = useNavigate()
  const id = useId()

  const handleAddToCart = () => {
    if (userRoles.isManage()) {
      tokenOperations.remove()
      navigate('/login')
      return
    }

    if (!tokenOperations.get()) {
      handleNotification(constants.NOTIFICATION_WARNING, { message: 'Bạn cần đăng nhập để mua hàng' })
      return
    }

    addItemToCart({ quantity: 1, idProduct: product.id })
  }

  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden" key={id}>
      <Link to={`/product/detail/${product.id}`} className="relative overflow-hidden border-b">
        <img
          alt={product.name}
          className="w-full aspect-square hover:scale-105 transition duration-500 ease-in-out"
          src={`${product.productImage ? product.productImage : 'https://via.placeholder.com/144'} `}
        />
      </Link>
      <div className="flex flex-col justify-between flex-1 p-2 font-medium md:p-4">
        <Link to={`/product/detail/${product.id}`}>
          <h6 className="text-xs md:text-sm mb-1">{product.name}</h6>
        </Link>
        <div className="flex flex-col">
          <span
            className={` ${product.priceAfterDiscount < product.price ? 'text-sm line-through' : 'text-lg font-semibold'}`}>
            {formatMoneyVND(product.price)}
          </span>
          {product.priceAfterDiscount < product.price && (
            <span className="text-lg font-semibold text-red">{formatMoneyVND(product.priceAfterDiscount)}</span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 p-2 mt-auto border-t md:flex-row md:justify-between md:px-5 md:py-3">
        <a href={`/product/detail/${product.id}`} className="text-sm">
          <i className="fas fa-eye text-red mr-1"></i>Chi tiết
        </a>
        <button className="text-sm text-left" onClick={handleAddToCart}>
          <i className="fas fa-shopping-cart text-red mr-1"></i>Mua hàng
        </button>
      </div>
    </div>
  )
}

export default ProductCard
