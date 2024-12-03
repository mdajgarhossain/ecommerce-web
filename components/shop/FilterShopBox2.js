'use client'
import { addCart } from "@/features/shopSlice"
import { addWishlist } from "@/features/wishlistSlice"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    addPerPage,
    addSort,
    addprice,
    clearBrand,
    clearCategory,
    clearColor,
} from "../../features/filterSlice"
import {
    clearBrandToggle,
    clearCategoryToggle,
    clearColorToggle,
} from "../../features/productSlice"
import { fetchProducts, selectProducts, setPerPage } from "../../features/productSlice"
import ShopCard from "./ShopCard"
import { useSearchParams } from 'next/navigation'
import Loader from "../elements/Loader"

const FilterShopBox2 = ({ itemStart, itemEnd }) => {
    const { shopList, shopSort } = useSelector((state) => state.filter)
    const { 
        items: products, 
        loading, 
        error, 
        currentPage, 
        totalPages,
        total 
    } = useSelector(selectProducts)

    const {
        price,
        color,
        brand,
    } = shopList || {}

    const { sort, perPage } = shopSort
    const dispatch = useDispatch()
    const searchParams = useSearchParams()
    
    // Get category params from URL
    const category = searchParams.get('category')
    const subcategory = searchParams.get('subcategory')
    const subsubcategory = searchParams.get('subsubcategory')

    useEffect(() => {
        dispatch(fetchProducts({ 
            page: 1, 
            perPage: 10,
            category,
            subcategory,
            subsubcategory
        }))
    }, [dispatch, category, subcategory, subsubcategory])

    const [activeIndex, setActiveIndex] = useState(2)
    const handleOnClick = (index) => {
        setActiveIndex(index)
    }

    const addToCart = (id) => {
        const item = products?.find((item) => item.id === id)
        dispatch(addCart({ product: item }))
    }

    const addToWishlist = (id) => {
        const item = products?.find((item) => item.id === id)
        dispatch(addWishlist({ product: item }))
    }

    // price filter
    const priceFilter = (item) =>
        item?.unit_price >= price?.min && item?.unit_price <= price?.max

    // category filter
    const categoryFilter = (item) =>
        category?.length !== 0 ? category?.includes(item?.category?.name.toLowerCase()) : true

    // color filter (assuming color is not available in the API response)
    const colorFilter = () => true

    // brand filter (assuming brand is not available in the API response)
    const brandFilter = () => true

    // sort filter
    const sortFilter = (a, b) =>
        sort === "des" ? b.id - a.id : a.id - b.id

    let content = products
        ?.filter(priceFilter)
        ?.filter(colorFilter)
        ?.filter(brandFilter)
        ?.sort(sortFilter)
        .slice(perPage.start, perPage.end !== 0 ? perPage.end : undefined)
        ?.map((item, i) => (
            <Fragment key={i}>
                <ShopCard 
                    item={item} 
                    addToCart={addToCart} 
                    addToWishlist={addToWishlist} 
                    activeIndex={activeIndex}
                    handleOnClick={handleOnClick}
                />
            </Fragment>
        ))

    // sort handler
    const sortHandler = (e) => {
        dispatch(addSort(e.target.value))
    }

    // per page handler
    const perPageHandler = (e) => {
        const pageData = JSON.parse(e.target.value)
        dispatch(addPerPage(pageData))
    }

    // clear all filters
    const clearAll = () => {
        dispatch(addprice({ min: 0, max: 100 }))




        dispatch(clearCategory())
        dispatch(clearCategoryToggle())

        dispatch(clearColor())
        dispatch(clearColorToggle())

        dispatch(clearBrand())
        dispatch(clearBrandToggle())

        dispatch(addSort(""))
        dispatch(addPerPage({ start: 0, end: 0 }))
    }

    const NoProductsFound = () => (
        <div className="no-products-found text-center py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <i className="fal fa-shopping-bag fa-5x mb-4 text-muted"></i>
                        <h3 className="mb-3">No Products Found</h3>
                        {searchParams.get('category') ? (
                            <p className="text-muted">
                                We couldn't find any products in this category. 
                                Please check back later or try another category.
                            </p>
                        ) : (
                            <p className="text-muted">
                                No products are available at the moment. 
                                Please check back later.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <>
            {loading && <Loader />}
            {/* {error && <p>Error: {error}</p>} */}
            {!loading && products.length === 0 && <NoProductsFound />}
            {!loading && products.length > 0 && (
                <div className="row row-cols-xxl-4 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-1 g-4">
                    {content}
                </div>
            )}
        </>
    )
}

export default FilterShopBox2
