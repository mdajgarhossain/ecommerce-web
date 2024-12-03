'use client'
import { useEffect } from "react"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"

export default function OrderFailed() {
    const router = useRouter()
    const { isAuthenticated } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/sign-in')
        }
    }, [isAuthenticated, router])

    if (!isAuthenticated) return null

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Order Failed">
            <section className="order-failed-area pt-80 pb-80">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="order-failed-wrapper text-center">
                                <div className="order-failed-icon mb-4">
                                    <i className="fas fa-times-circle fa-5x text-danger"></i>
                                </div>
                                <h2 className="mb-4">Oops! Order Failed</h2>
                                <p className="text-muted mb-4">
                                    Something went wrong while processing your order. Please try again or contact support if the problem persists.
                                </p>
                                <div className="order-failed-btn">
                                    <Link href="/checkout" className="tp-btn tp-color-btn me-3">
                                        Try Again
                                    </Link>
                                    <Link href="/shop" className="tp-btn tp-btn-border-2">
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