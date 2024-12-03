'use client'
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Layout from "@/components/layout/Layout"
import { fetchOrderDetails } from "@/features/orderSlice"
import { useRouter } from "next/navigation"
import Loader from "@/components/elements/Loader"

export default function OrderDetails({ params }) {
    const dispatch = useDispatch()
    const router = useRouter()
    const { currentOrder, loading } = useSelector((state) => state.orders)
    const { isAuthenticated } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/sign-in')
            return
        }
        dispatch(fetchOrderDetails(params.order_number))
    }, [dispatch, params.order_number, isAuthenticated, router])

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Order Details">
            <section className="order-details-area pt-80 pb-80">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-10">
                            {loading ? (
                                <div className="text-center py-5"><Loader /></div>
                            ) : !currentOrder ? (
                                <div className="text-center py-5">Order not found</div>
                            ) : (
                                <div className="tptrack__product">
                                    <div className="tptrack__content grey-bg-3">
                                        <div className="tptrack__item d-flex mb-20">
                                            <div className="tptrack__item-icon">
                                                <i className="fal fa-file-invoice fa-2x"></i>
                                            </div>
                                            <div className="tptrack__item-content">
                                                <h4 className="tptrack__item-title">Order #{currentOrder.order_number}</h4>
                                                <p>Placed on {new Date(currentOrder.created_at).toLocaleDateString()}</p>
                                            </div>
                                            <div className="ms-auto">
                                                <span className={`badge ${currentOrder.status === 'completed' ? 'bg-success' : 'bg-warning'}`}>
                                                    {currentOrder.status}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="row mb-4">
                                            <div className="col-md-6">
                                                <h5 className="mb-3">Shipping Address</h5>
                                                <p>{currentOrder.shipping_address}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <h5 className="mb-3">Order Summary</h5>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span>Subtotal:</span>
                                                    <span>৳{currentOrder.sub_total}</span>
                                                </div>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span>Shipping:</span>
                                                    <span>৳{currentOrder.shipping_cost}</span>
                                                </div>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span>Tax:</span>
                                                    <span>৳{currentOrder.tax_amount}</span>
                                                </div>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span>Discount:</span>
                                                    <span>-৳{currentOrder.discount_amount}</span>
                                                </div>
                                                <hr />
                                                <div className="d-flex justify-content-between">
                                                    <strong>Total:</strong>
                                                    <strong>৳{currentOrder.total}</strong>
                                                </div>
                                            </div>
                                        </div>

                                        <h5 className="mb-3">Order Items</h5>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Product</th>
                                                        <th>Price</th>
                                                        <th>Quantity</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentOrder.items.map((item) => (
                                                        <tr key={item.id}>
                                                            <td>{item.product.name}</td>
                                                            <td>৳{item.price}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>৳{item.total_price}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        {currentOrder.notes && (
                                            <div className="mt-4">
                                                <h5 className="mb-3">Order Notes</h5>
                                                <p>{currentOrder.notes}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}