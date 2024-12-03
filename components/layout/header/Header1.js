'use client'
import CartShow from "@/components/elements/CartShow"
import WishListShow from "@/components/elements/WishListShow"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import HeaderMobSticky from "../HeaderMobSticky"
import HeaderSticky from "../HeaderSticky"
import HeaderTabSticky from "../HeaderTabSticky"
import { apiService } from '@/util/apiService'
import { useSelector, useDispatch } from 'react-redux'
import { selectCategories } from '@/features/categorySlice'
import { logout } from '@/features/authSlice'
import { useRouter } from 'next/navigation'

export default function Header1({ scroll, isMobileMenu, handleMobileMenu, isCartSidebar, handleCartSidebar }) {
    const router = useRouter()
    const [isToggled, setToggled] = useState(true)
    const { items: categories, loading } = useSelector(selectCategories)
    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector((state) => state.auth)
    const [showUserDropdown, setShowUserDropdown] = useState(false)
    const dropdownRef = useRef(null)
    const [searchTerm, setSearchTerm] = useState('')
    
    const handleToggle = () => setToggled(!isToggled)

    const handleLogout = () => {
        dispatch(logout())
        setShowUserDropdown(false)
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowUserDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchTerm.trim()) {
            router.push(`/shop?search=${encodeURIComponent(searchTerm.trim())}`)
            setSearchTerm('')
        }
    }

    return (
        <>
            <header>
                {/* TODO: Add welcome text */}
                {/* <div className="header-top space-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="header-welcome-text text-start ">
                                    <span>Welcome to our international shop! Enjoy free shipping on orders $100  up.</span>
                                    <Link href="/shop">Shop Now <i className="fal fa-long-arrow-right" /> </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="logo-area mt-30 d-none d-xl-block">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-xl-2 col-lg-3">
                                <div className="logo">
                                    <Link href="/">
                                        <img 
                                            src="/assets/img/logo/ShopllyKart-135-Red-Black.svg" 
                                            alt="logo" 
                                            width={200}
                                            height={45}
                                        />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-xl-10 col-lg-9">
                                <div className="header-meta-info d-flex align-items-center justify-content-between">
                                    <div className="header-search-bar">
                                        <form onSubmit={handleSearch}>
                                            <div className="search-info p-relative">
                                                <button type="submit" className="header-search-icon">
                                                    <i className="fal fa-search" />
                                                </button>
                                                <input 
                                                    type="text" 
                                                    placeholder="Search products..." 
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="header-meta header-brand d-flex align-items-center">
                                        {/* <div className="header-meta__lang">
                                            <ul>
                                                <li>
                                                    <Link href="#">
                                                        <img src="/assets/img/icon/lang-flag.png" alt="flag" />English
                                                        <span><i className="fal fa-angle-down" /></span>
                                                    </Link>
                                                    <ul className="header-meta__lang-submenu">
                                                        <li>
                                                            <Link href="#">Arabic</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="#">Spanish</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="#">Mandarin</Link>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="header-meta__value mr-15">
                                            <select>
                                                <option>USD</option>
                                                <option>YEAN</option>
                                                <option>EURO</option>
                                            </select>
                                        </div> */}
                                        <div className="header-meta__social d-flex align-items-center ml-25">
                                            <button className="header-cart p-relative tp-cart-toggle" onClick={handleCartSidebar}>
                                                <i className="fal fa-shopping-cart" />
                                                <CartShow />
                                            </button>
                                            <div className="header-user-menu position-relative">
                                                {isAuthenticated ? (
                                                    <>
                                                        <button 
                                                            className="header-user-btn"
                                                            onClick={() => setShowUserDropdown(!showUserDropdown)}
                                                        >
                                                            <i className="fal fa-user" />
                                                        </button>
                                                        {showUserDropdown && (
                                                            <div className="header-user-dropdown">
                                                                <ul>
                                                                    <li>
                                                                        <Link href="/profile" onClick={() => setShowUserDropdown(false)}>
                                                                            <i className="fal fa-user-circle" /> Profile
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link href="/orders" onClick={() => setShowUserDropdown(false)}>
                                                                            <i className="fal fa-shopping-bag" /> My Orders
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <button onClick={handleLogout}>
                                                                            <i className="fal fa-sign-out" /> Logout
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </>
                                                ) : (
                                                    <Link href="/sign-in">
                                                        <i className="fal fa-user" />
                                                    </Link>
                                                )}
                                            </div>
                                            <Link href="/wishlist" className="header-cart p-relative tp-cart-toggle">
                                                <i className="fal fa-heart" />
                                                <WishListShow />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-menu-area mt-20 d-none d-xl-block">
                    <div className="for-megamenu p-relative">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-xl-2 col-lg-3">
                                    <div className="cat-menu__category p-relative">
                                        <a className="tp-cat-toggle" onClick={handleToggle} role="button"><i className="fal fa-bars" />Categories</a>
                                        <div className="category-menu category-menu-off" style={{ display: `${isToggled ? "block" : "none"}` }}>
                                            <ul className="cat-menu__list">
                                                {loading ? (
                                                    <li className="text-danger">Loading categories...</li>
                                                ) : categories.length === 0 ? (
                                                    <li className="text-warning">No categories available</li>
                                                ) : (
                                                    categories.map((category) => (
                                                        <li key={category.id} 
                                                            className={category.sub_categories?.length > 0 ? "menu-item-has-children" : ""}>
                                                            <Link href={`/shop?category=${category.name}`} 
                                                                  className="category-link">
                                                                <i className="fal fa-list-alt" /> {category.name}
                                                            </Link>
                                                            
                                                            {category.sub_categories?.length > 0 && (
                                                                <ul className="submenu enhanced-submenu">
                                                                    {category.sub_categories.map((subCat) => (
                                                                        <li key={subCat.id} 
                                                                            className={subCat.sub_sub_categories?.length > 0 ? "menu-item-has-children" : ""}>
                                                                            <Link href={`/shop?category=${category.name}&subcategory=${subCat.name}`}
                                                                                  className="subcategory-link">
                                                                                {subCat.name}
                                                                            </Link>
                                                                            
                                                                            {subCat.sub_sub_categories?.length > 0 && (
                                                                                <ul className="submenu submenu-child">
                                                                                    {subCat.sub_sub_categories.map((subSubCat) => (
                                                                                        <li key={subSubCat.id}>
                                                                                            <Link href={`/shop?category=${category.name}&subcategory=${subCat.name}&subsubcategory=${subSubCat.name}`}>
                                                                                                {subSubCat.name}
                                                                                            </Link>
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            )}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </li>
                                                    ))
                                                )}
                                            </ul>
                                            <div className="daily-offer">
                                                <ul>
                                                    <li><Link href="/shop">Value of the Day</Link></li>
                                                    <li><Link href="/shop">Top 100 Offers</Link></li>
                                                    <li><Link href="/shop">New Arrivals</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-7 col-lg-6">
                                    <div className="main-menu">
                                        <nav id="mobile-menu">
                                            <ul>
                                                <li className="has-dropdown">
                                                    <Link href="/">Home</Link>
                                                </li>
                                                <li className="has-dropdown">
                                                    <Link href="/shop">Shop</Link>
                                                    
                                                </li>
                                                <li className="has-dropdown">
                                                    <Link href="/about">About Us</Link>
                                                    
                                                </li>
                                                <li><Link href="/contact">Contact</Link></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                                {/* <div className="col-xl-3 col-lg-3">
                                    <div className="menu-contact">
                                        <ul>
                                            <li>
                                                <div className="menu-contact__item">
                                                    <div className="menu-contact__icon">
                                                        <i className="fal fa-phone" />
                                                    </div>
                                                    <div className="menu-contact__info">
                                                        <Link href="/tel:0123456">908. 408. 501. 89</Link>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="menu-contact__item">
                                                    <div className="menu-contact__icon">
                                                        <i className="fal fa-map-marker-alt" />
                                                    </div>
                                                    <div className="menu-contact__info">
                                                        <Link href="/shop-location">Find Store</Link>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <HeaderSticky scroll={scroll} isCartSidebar={isCartSidebar} handleCartSidebar={handleCartSidebar} />
            <HeaderTabSticky scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} isCartSidebar={isCartSidebar} handleCartSidebar={handleCartSidebar} />
            <HeaderMobSticky scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} isCartSidebar={isCartSidebar} handleCartSidebar={handleCartSidebar} />
        </>
    )
}
