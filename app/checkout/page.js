'use client'
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import Layout from "@/components/layout/Layout"
import { placeOrder } from "@/features/orderSlice"
import { clearCart } from "@/features/shopSlice"
import { toast } from 'react-toastify'

export default function Checkout() {
    const router = useRouter()
    const dispatch = useDispatch()
    const { cart } = useSelector((state) => state.shop)
    const { isAuthenticated } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const [formData, setFormData] = useState({
        shipping_address: "",
        billing_address: "",
        notes: "",
        shipping_method: "inside_dhaka",
    })

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/sign-in')
            return
        }
        // TODO: Redirect to cart if cart is empty
        // if (!cart || cart.length === 0) {
        //     router.push('/cart')
        // }
    }, [isAuthenticated, router, cart])

    // Form validation function
    const validateForm = () => {
        const newErrors = {}
        
        // Only shipping address validation
        if (!formData.shipping_address.trim()) {
            newErrors.shipping_address = 'Shipping address is required'
        } else if (formData.shipping_address.trim().length < 10) {
            newErrors.shipping_address = 'Shipping address must be at least 10 characters'
        }

        // If there are any errors, show a toast
        if (Object.keys(newErrors).length > 0) {
            toast.error('Please fill in all required fields correctly')
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            })
        }
    }

    // TODO: Redirect to cart if cart is empty
    // Early return if not authenticated or cart is empty
    // if (!isAuthenticated || !cart || cart.length === 0) return null

    // Calculate subtotal
    const subtotal = cart?.reduce((acc, item) => {
        return acc + (item.qty * item.unit_price)
    }, 0) || 0

    // Get shipping cost based on method
    const getShippingCost = () => {
        switch(formData.shipping_method) {
            case 'inside_dhaka': return 80
            case 'outside_dhaka': return 120
            default: return 0
        }
    }

    const total = subtotal + getShippingCost()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Validate form before submission
        if (!validateForm()) {
            return
        }

        const orderData = {
            items: cart.map(item => ({
                product_id: item.id,
                quantity: item.qty,
                price: item.unit_price,
                name: item.name
            })),
            sub_total: subtotal,
            shipping_cost: getShippingCost(),
            total: total,
            shipping_address: formData.shipping_address,
            billing_address: formData.billing_address,
            payment_method: "cod",
            notes: formData.notes
        }

        setLoading(true)
        try {
            const result = await dispatch(placeOrder(orderData)).unwrap()
            dispatch(clearCart())
            router.push(`/order-success?order_number=${result.order.order_number}`)
        } catch (error) {
            router.push('/order-failed')
        }
        setLoading(false)
    }

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Checkout">
            <section className="checkout-area pt-80 pb-80">
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="checkbox-form">
                                    <h3>Billing & Shipping Details</h3>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="checkout-form-list">
                                                <label>Shipping Address <span className="required">*</span></label>
                                                <textarea 
                                                    name="shipping_address"
                                                    value={formData.shipping_address}
                                                    onChange={handleChange}
                                                    rows="4"
                                                    className={errors.shipping_address ? 'error' : ''}
                                                    placeholder="Enter your shipping address"
                                                />
                                                {errors.shipping_address && (
                                                    <div className="tptrack__error-message text-danger">
                                                        {errors.shipping_address}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="checkout-form-list">
                                                <label>Billing Address</label>
                                                <textarea 
                                                    name="billing_address"
                                                    value={formData.billing_address}
                                                    onChange={handleChange}
                                                    rows="4"
                                                    placeholder="Enter your billing address"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="checkout-form-list">
                                                <label>Order Notes</label>
                                                <textarea 
                                                    name="notes"
                                                    value={formData.notes}
                                                    onChange={handleChange}
                                                    placeholder="Notes about your order, e.g. special notes for delivery"
                                                    rows="3"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="your-order mb-30">
                                    <h3>Your Order</h3>
                                    <div className="your-order-table table-responsive">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className="product-name">Product</th>
                                                    <th className="product-total">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart?.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>{item.name} <strong> × {item.qty}</strong></td>
                                                        <td>৳{(item.qty * item.unit_price).toFixed(2)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th>Subtotal</th>
                                                    <td>৳{subtotal.toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                    <th>Shipping</th>
                                                    <td>
                                                        <div className="shipping-method">
                                                            {/* TODO: Free shipping will be added later */}
                                                            {/* <div className="form-check">
                                                                <input 
                                                                    type="radio" 
                                                                    id="free" 
                                                                    name="shipping_method"
                                                                    value="free"
                                                                    checked={formData.shipping_method === 'free'}
                                                                    onChange={(e) => setFormData({...formData, shipping_method: e.target.value})}
                                                                />
                                                                <label htmlFor="free">Free Shipping</label>
                                                            </div> */}
                                                            <div className="form-check">
                                                                <input 
                                                                    type="radio" 
                                                                    id="inside_dhaka" 
                                                                    name="shipping_method"
                                                                    value="inside_dhaka"
                                                                    checked={formData.shipping_method === 'inside_dhaka'}
                                                                    onChange={(e) => setFormData({...formData, shipping_method: e.target.value})}
                                                                />
                                                                <label htmlFor="inside_dhaka">Inside Dhaka: ৳80</label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input 
                                                                    type="radio" 
                                                                    id="outside_dhaka" 
                                                                    name="shipping_method"
                                                                    value="outside_dhaka"
                                                                    checked={formData.shipping_method === 'outside_dhaka'}
                                                                    onChange={(e) => setFormData({...formData, shipping_method: e.target.value})}
                                                                />
                                                                <label htmlFor="outside_dhaka">Outside Dhaka: ৳120</label>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Total</th>
                                                    <td><strong>৳{total.toFixed(2)}</strong></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div className="payment-method">
                                        <div className="form-check">
                                            <input 
                                                type="radio" 
                                                id="cod" 
                                                name="payment_method" 
                                                checked={true}
                                                readOnly
                                                className="me-2"
                                            />
                                            <label htmlFor="cod">Cash on Delivery</label>
                                        </div>
                                    </div>
                                    <div className="order-button-payment mt-20">
                                        <button 
                                            type="submit" 
                                            className="tp-btn tp-color-btn w-100"
                                            disabled={loading}
                                        >
                                            {loading ? 'Processing...' : 'Place Order'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </Layout>
    )
}