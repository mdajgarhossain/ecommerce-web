'use client'
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { fetchMyOrders } from "@/features/orderSlice"
import { useRouter } from "next/navigation"
import Loader from "@/components/elements/Loader"

export default function Orders() {
    const dispatch = useDispatch()
    const router = useRouter()
    const { orders, loading } = useSelector((state) => state.orders)
    const { isAuthenticated } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/sign-in')
            return
        }
        dispatch(fetchMyOrders())
    }, [dispatch, isAuthenticated, router])

    if (!isAuthenticated) return null

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'pending': return 'bg-warning'
            case 'processing': return 'bg-info'
            case 'completed': return 'bg-success'
            case 'cancelled': return 'bg-danger'
            default: return 'bg-secondary'
        }
    }

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="My Orders">
            <section className="order-area pt-80 pb-80">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-10">
                            <div className="tptrack__product">
                                <div className="tptrack__content grey-bg-3">
                                    <div className="tptrack__item d-flex mb-20">
                                        <div className="tptrack__item-icon">
                                            <i className="fal fa-shopping-bag fa-2x"></i>
                                        </div>
                                        <div className="tptrack__item-content">
                                            <h4 className="tptrack__item-title">My Orders</h4>
                                            <p>View and track your orders</p>
                                        </div>
                                    </div>

                                    {loading ? (
                                        <div className="text-center py-4"><Loader /></div>
                                    ) : orders?.length === 0 ? (
                                        <div className="text-center py-4">No orders found</div>
                                    ) : (
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Order #</th>
                                                        <th>Date</th>
                                                        <th>Total</th>
                                                        <th>Status</th>
                                                        <th>Payment</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orders?.map((order) => (
                                                        <tr key={order.id}>
                                                            <td>{order.order_number}</td>
                                                            <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                                            <td>৳{order.total}</td>
                                                            <td>
                                                                <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                                                                    {order.status}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className={`badge ${order.payment_status === 'paid' ? 'bg-success' : 'bg-danger'}`}>
                                                                    {order.payment_status}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <Link 
                                                                    href={`/orders/${order.order_number}`}
                                                                    className="tp-btn-2 tp-btn-border-2 order-view-btn"
                                                                >
                                                                    View Details
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}