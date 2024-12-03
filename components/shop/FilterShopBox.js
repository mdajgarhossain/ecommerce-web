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
import ShopCardList from "./ShopCardList"
import Loader from "../elements/Loader"
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

const FilterShopBox = () => {
    const { shopList, shopSort } = useSelector((state) => state.filter)
    const { 
        items: products, 
        loading, 
        error, 
        currentPage, 
        totalPages,
        total 
    } = useSelector(selectProducts);

    const {
        price,
        color,
        brand,
    } = shopList || {}

    const { sort, perPage } = shopSort

    const dispatch = useDispatch()

    const searchParams = useSearchParams();
    
    // Get all params from URL
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const subsubcategory = searchParams.get('subsubcategory');
    const search = searchParams.get('search');

    useEffect(() => {
        dispatch(fetchProducts({ 
            page: 1, 
            perPage: 10,
            category,
            subcategory,
            subsubcategory,
            search
        }));
    }, [dispatch, category, subcategory, subsubcategory, search]);

    const addToCart = (id) => {
        const item = products?.find((item) => item.id === id)
        dispatch(addCart({ product: item }))
    }
    const addToWishlist = (id) => {
        const item = products?.find((item) => item.id === id)
        dispatch(addWishlist({ product: item }))
    }

    const [activeIndex, setActiveIndex] = useState(2)
    const handleOnClick = (index) => {
        setActiveIndex(index)
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
                <ShopCard item={item} addToCart={addToCart} addToWishlist={addToWishlist} activeIndex={activeIndex} handleOnClick={handleOnClick} />
            </Fragment>
        ))

    // sort handler
    const sortHandler = (e) => {
        dispatch(addSort(e.target.value))
    }

    const [currentPerPage, setCurrentPerPage] = useState(0);

    const perPageHandler = (e) => {
        const value = JSON.parse(e.target.value);
        setCurrentPerPage(value.end);
        if (value.end === 0) {
            // Show all products with pagination
            dispatch(setPerPage(10)); // Default to 10 per page
        } else {
            dispatch(setPerPage(value.end));
        }
        dispatch(fetchProducts({ page: 1, perPage: value.end || 10 }));
    };

    const handlePageClick = (event) => {
        const itemsPerPage = perPage.end || 10;
        
        dispatch(fetchProducts({ 
            page: event.selected + 1,
            perPage: itemsPerPage,
            category,
            subcategory,
            subsubcategory,
            search
        }));
    };

    // clear all filters
    const clearAll = () => {
        setCurrentPerPage(0);
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
    );

    return (
        <>
            {products && products.length > 0 ? (
                <div className="product-filter-content mb-40">
                    <div className="row align-items-center">
                        <div className="col-sm-6">
                            <div className="product-item-count">
                                <span><b>{products.length}</b> Item{products.length !== 1 ? 's' : ''} On List</span>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="product-navtabs d-flex justify-content-end align-items-center">
                                <div className="tp-shop-selector">
                                    <select
                                        onChange={perPageHandler}
                                        className="chosen-single form-select ms-3"
                                        value={JSON.stringify({
                                            start: 0,
                                            end: currentPerPage
                                        })}
                                    >
                                        <option
                                            value={JSON.stringify({
                                                start: 0,
                                                end: 0,
                                            })}
                                        >
                                            All
                                        </option>
                                        <option
                                            value={JSON.stringify({
                                                start: 0,
                                                end: 10,
                                            })}
                                        >
                                            10 per page
                                        </option>
                                        <option
                                            value={JSON.stringify({
                                                start: 0,
                                                end: 20,
                                            })}
                                        >
                                            20 per page
                                        </option>
                                        <option
                                            value={JSON.stringify({
                                                start: 0,
                                                end: 30,
                                            })}
                                        >
                                            30 per page
                                        </option>
                                    </select>
                                </div>
                                <div className="tpproductnav tpnavbar product-filter-nav">
                                    <nav>
                                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                            <button 
                                                className={activeIndex == 1 ? "nav-link active" : "nav-link"} 
                                                onClick={() => handleOnClick(1)}
                                            >
                                                <i className="fal fa-list-ul" />
                                            </button>
                                            <button 
                                                className={activeIndex == 2 ? "nav-link active" : "nav-link"} 
                                                onClick={() => handleOnClick(2)}
                                            >
                                                <i className="fal fa-th" />
                                            </button>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}

            {/* Products for shop */}
            <div className="row mb-50">
                <div className="col-lg-12">
                    <div className="tab-content" id="nav-tabContent">
                        {/* List view for shop */}
                        <div className={activeIndex == 1 ? "tab-pane fade show active" : "tab-pane fade"}>
                            {
                                products
                                    ?.filter(priceFilter)
                                    ?.filter(colorFilter)
                                    ?.filter(brandFilter)
                                    ?.sort(sortFilter)
                                    .slice(perPage.start, perPage.end !== 0 ? perPage.end : undefined)
                                    ?.map((item, i) => (
                                        <Fragment key={i}>
                                            <ShopCardList item={item} addToCart={addToCart} addToWishlist={addToWishlist} />
                                        </Fragment>
                                    ))
                            }
                        </div>
                        {/* Grid view for shop */}
                        <div className={activeIndex == 2 ? "tab-pane fade show active" : "tab-pane fade"}>
                            <div className="row row-cols-xxl-4 row-cols-xl-4 row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-1 tpproduct">
                                {
                                    products
                                        ?.filter(priceFilter)
                                        ?.filter(colorFilter)
                                        ?.filter(brandFilter)
                                        ?.sort(sortFilter)
                                        .slice(perPage.start, perPage.end !== 0 ? perPage.end : undefined)
                                        ?.map((item, i) => (
                                            <Fragment key={i}>
                                                <ShopCard item={item} addToCart={addToCart} addToWishlist={addToWishlist} />
                                            </Fragment>
                                        ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add pagination controls */}
            {totalPages > 1 && (
                <div className="row">
                    <div className="col-12">
                        <div className="basic-pagination text-center mt-35">
                            <ReactPaginate
                                previousLabel={'«'}
                                nextLabel={'»'}
                                breakLabel={'...'}
                                pageCount={totalPages}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                containerClassName={'pagination justify-content-center'}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                previousClassName={'page-item'}
                                previousLinkClassName={'page-link'}
                                nextClassName={'page-item'}
                                nextLinkClassName={'page-link'}
                                breakClassName={'page-item'}
                                breakLinkClassName={'page-link'}
                                activeClassName={'active'}
                                forcePage={currentPage - 1}
                            />
                            <div className="text-center mt-3">
                                <p>Showing {products.length} of {total} products</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {loading && <Loader />}
            {/* {error && <p>Error: {error}</p>} */}
            {/* {!loading && !error && content} */}
            {!loading && products.length === 0 && <NoProductsFound />}
        </>
    )
}

export default FilterShopBox
