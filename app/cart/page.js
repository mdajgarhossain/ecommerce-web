'use client'
import CartItems from "@/components/elements/CartItems"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useSelector } from "react-redux"
import { useRouter } from 'next/navigation'

export default function Cart() {
    const router = useRouter()
    const { cart } = useSelector((state) => state.shop) || {}
    const { isAuthenticated } = useSelector((state) => state.auth)
    
    
    // Calculate total with proper null checks
    let total = 0
    cart?.forEach((item) => {
        // Use 0 if unit_price is null/undefined
        const price = (item.qty || 0) * (item.unit_price || 0)
        total = total + price
    })

    const handleCheckout = (e) => {
        e.preventDefault()
        if (!isAuthenticated) {
            router.push('/sign-in')
            return
        }
        router.push('/checkout')
    }

    return (
        <>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Cart">
                <section className="cart-area pt-80 pb-80 wow fadeInUp" data-wow-duration=".8s" data-wow-delay=".2s">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                {cart && cart.length > 0 ? (
                                    <form action="#">
                                        <div className="table-content table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th className="product-thumbnail">Images</th>
                                                        <th className="cart-product-name">Product</th>
                                                        <th className="product-price">Unit Price</th>
                                                        <th className="product-quantity">Quantity</th>
                                                        <th className="product-subtotal">Total</th>
                                                        <th className="product-remove">Remove</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <CartItems />
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="row justify-content-end">
                                            <div className="col-md-5">
                                                <div className="cart-page-total">
                                                    <h2>Cart totals</h2>
                                                    <ul className="mb-20">
                                                        <li>Subtotal <span>৳{total.toFixed(2)}</span></li>
                                                        <li>Total <span>৳{total.toFixed(2)}</span></li>
                                                    </ul>
                                                    <button 
                                                        onClick={handleCheckout} 
                                                        className="tp-btn tp-color-btn banner-animation"
                                                        style={{ border: 'none', width: '100%' }}
                                                        type="button"
                                                    >
                                                        Proceed to Checkout
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="text-center py-5">
                                        <i className="fal fa-shopping-cart fa-5x mb-4 text-muted"></i>
                                        <h3 className="mb-3">Your Cart is Empty</h3>
                                        <p className="text-muted mb-4">
                                            Looks like you haven't added anything to your cart yet.
                                        </p>
                                        <Link href="/shop" className="tp-btn tp-color-btn banner-animation">
                                            Continue Shopping
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}