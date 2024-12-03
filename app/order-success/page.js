'use client'
import { useEffect } from "react"
import { useSearchParams } from 'next/navigation'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"

export default function OrderSuccess() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const orderNumber = searchParams.get('order_number')
    const { isAuthenticated } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/sign-in')
        }
    }, [isAuthenticated, router])

    if (!isAuthenticated) return null

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Order Successful">
            <section className="order-success-area pt-80 pb-80">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="order-success-wrapper text-center">
                                <div className="order-success-icon mb-4">
                                    <i className="fas fa-check-circle fa-5x text-success"></i>
                                </div>
                                <h2 className="mb-4">Thank You For Your Order!</h2>
                                <p className="mb-4">Your order number is: <strong>{orderNumber}</strong></p>
                                {/* TODO: Add email confirmation */}
                                {/* <p className="text-muted mb-4">
                                    We'll send you an email confirmation with order details and tracking information.
                                </p> */}
                                <div className="order-success-btn">
                                    <Link href="/orders" className="tp-btn tp-color-btn me-3">
                                        View Orders
                                    </Link>
                                    <Link href="/shop" className="tp-btn tp-btn-border-2 border border-danger">
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}