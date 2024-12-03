'use client'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories, selectCategories } from '@/features/categorySlice'
import BackToTop from '../elements/BackToTop'
import DataBg from "../elements/DataBg"
import Breadcrumb from './Breadcrumb'
import HeaderCart from "./HeaderCart"
import Sidebar from "./Sidebar"
import Footer1 from './footer/Footer1'
import Footer2 from './footer/Footer2'
import Header1 from "./header/Header1"
import Header2 from './header/Header2'
import Header3 from "./header/Header3"
import Header4 from "./header/Header4"
import Header5 from "./header/Header5"
import { checkAuthState } from "@/features/authSlice";

export default function Layout({ headerStyle, footerStyle, headTitle, breadcrumbTitle, children }) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuthState());
    }, [dispatch]);

    // const dispatch = useDispatch()
    const { isInitialized } = useSelector(selectCategories)
    const [scroll, setScroll] = useState(0)
    // Mobile Menu
    const [isMobileMenu, setMobileMenu] = useState(false)
    const handleMobileMenu = () => setMobileMenu(!isMobileMenu)

    // CartSidebar
    const [isCartSidebar, setCartSidebar] = useState(false)
    const handleCartSidebar = () => setCartSidebar(!isCartSidebar)

    useEffect(() => {
        // Only fetch if not already initialized
        if (!isInitialized) {
            dispatch(fetchCategories())
        }
        
        // WOW js initialization
        const WOW = require('wowjs')
        window.wow = new WOW.WOW({
            live: false
        })
        window.wow.init()

        // Scroll event listener
        document.addEventListener("scroll", () => {
            const scrollCheck = window.scrollY > 100
            if (scrollCheck !== scroll) {
                setScroll(scrollCheck)
            }
        })
    }, [dispatch, isInitialized])
    return (
        <>
            {/* <PageHead headTitle={headTitle} /> */}
            <DataBg />
            {!headerStyle && <Header1 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} isCartSidebar={isCartSidebar} handleCartSidebar={handleCartSidebar} />}
            {headerStyle == 1 ? <Header1 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} isCartSidebar={isCartSidebar} handleCartSidebar={handleCartSidebar} /> : null}
            {headerStyle == 2 ? <Header2 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} isCartSidebar={isCartSidebar} handleCartSidebar={handleCartSidebar} /> : null}
            {headerStyle == 3 ? <Header3 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} isCartSidebar={isCartSidebar} handleCartSidebar={handleCartSidebar} /> : null}
            {headerStyle == 4 ? <Header4 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} isCartSidebar={isCartSidebar} handleCartSidebar={handleCartSidebar} /> : null}
            {headerStyle == 5 ? <Header5 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} isCartSidebar={isCartSidebar} handleCartSidebar={handleCartSidebar} /> : null}
            <Sidebar isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />
            <HeaderCart isCartSidebar={isCartSidebar} handleCartSidebar={handleCartSidebar} />
            <main>
                {breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} />}

                {children}
            </main>

            {!footerStyle && < Footer1 />}
            {footerStyle == 1 ? < Footer1 /> : null}
            {footerStyle == 2 ? < Footer2 /> : null}

            <BackToTop />
        </>
    )
}
