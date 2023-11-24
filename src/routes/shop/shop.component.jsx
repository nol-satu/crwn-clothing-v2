import { Routes, Route } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import CategoriesPreview from '../categories-preview/categories-preview.component'
import Category from '../category/category.component'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'
import { setCategories } from '../../store/categories/category.action'
import { useEffect } from 'react'

const Shop = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const getCategories = async () => {
      const categoriesArray = await getCategoriesAndDocuments('categories')
      dispatch(setCategories(categoriesArray))
    }

    getCategories()
  }, [])

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  )
}

export default Shop
