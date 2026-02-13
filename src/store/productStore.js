import { constants } from '@/constants'
import { productService } from '@/services/products'
import { handleNotification } from '@/utils'

import { create } from 'zustand'

const initialState = {
  products: [],
  productsTopView: [],
  productsTopSold: [],
  product: null,
  page: 1,
  pages: 0,
  totalProducts: 0,
  isLoading: false
}

const useProductStore = create((set, get) => ({
  ...initialState,

  setLoading: (isLoading) => set({ isLoading }),

  resetState: () => set(initialState),

  handleApiCall: async (apiCall, onSuccess = () => {}, errorMessage = '') => {
    get().setLoading(true)
    try {
      const res = await apiCall()
      if (onSuccess) {
        onSuccess(res)
      }
      return res
    } catch (error) {
      handleNotification(constants.NOTIFICATION_ERROR, errorMessage || error)
    } finally {
      get().setLoading(false)
    }
  },

  addProduct: (payload, onSuccess) =>
    get().handleApiCall(
      () => productService.addProduct(payload),
      (res) => {
        handleNotification(constants.NOTIFICATION_SUCCESS, res)
        if (onSuccess) onSuccess()
      }
    ),

  getListProducts: (data = {}) =>
    get().handleApiCall(
      () => productService.getListProducts(data),
      (res) => {
        const { list, pages, total } = res.data
        set({ products: list, pages, totalProducts: total })
      }
    ),

  getProductById: (id) =>
    get().handleApiCall(
      () => productService.getProductById(id),
      (res) => set({ product: res.data })
    ),

  getProductTopView: () =>
    get().handleApiCall(productService.getProductTopView, (res) => set({ productsTopView: res.data.data || [] })),

  getProductsTopSold: () =>
    get().handleApiCall(productService.getProductsTopSold, (res) => set({ productsTopSold: res.data.list })),

  updateProduct: (id, data, onSuccess) =>
    get().handleApiCall(
      () => productService.updateProduct(id, data),
      (res) => {
        handleNotification(constants.NOTIFICATION_SUCCESS, res)
        if (onSuccess) onSuccess()
      }
    ),

  changeProductStatus: (id, status) =>
    get().handleApiCall(
      () => productService.changeProductStatus(id, status),
      () => get().getListProducts()
    ),

  deleteProduct: (id) =>
    get().handleApiCall(
      () => productService.deleteProduct(id),
      (res) => {
        handleNotification(constants.NOTIFICATION_SUCCESS, res)
        get().getListProducts()
      }
    ),

  ratingProduct: (data) =>
    get().handleApiCall(
      () => productService.ratingProduct(data),
      () => get().getProductById(data.productId)
    )
}))

export default useProductStore
