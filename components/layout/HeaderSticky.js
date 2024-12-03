import Link from "next/link"
import CartShow from "../elements/CartShow"
import WishListShow from "../elements/WishListShow"
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect, useRef } from "react"
import { logout } from '@/features/authSlice'

export default function HeaderSticky({ scroll, isCartSidebar, handleCartSidebar }) {
    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector((state) => state.auth)
    const [showUserDropdown, setShowUserDropdown] = useState(false)
    const dropdownRef = useRef(null)

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

    return (
        <div id="header-sticky" className={`logo-area tp-sticky-one mainmenu-5 ${scroll ? "header-sticky" : ""}`}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-xl-2 col-lg-3">
                        <div className="logo">
                            {/* TODO: add logo */}
                            {/* <Link href="/"><img src="/assets/img/logo/logo.png" alt="logo" /></Link> */}
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
                    <div className="col-xl-6 col-lg-6">
                        <div className="main-menu">
                            <nav>
                                <ul>
                                    <li className="has-dropdown">
                                        <Link href="/">Home</Link>
                                    </li>
                                    <li className="has-dropdown">
                                        <Link href="/shop">Shop</Link>
                                    </li>
                                    <li className="has-dropdown has-megamenu">
                                        <Link href="/about">About Us</Link>
                                    </li>
                                    <li><Link href="/contact">Contact</Link></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-9">
                        <div className="header-meta-info d-flex align-items-center justify-content-end">
                            <div className="header-meta__social d-flex align-items-center">
                                <button className="header-cart p-relative tp-cart-toggle" onClick={handleCartSidebar}>
                                    <i className="fal fa-shopping-cart" />
                                    <CartShow />
                                </button>
                                <div className="header-user-menu position-relative" ref={dropdownRef}>
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
    )
}
