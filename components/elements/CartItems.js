'use client'
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addQty, deleteCart } from "@/features/shopSlice";
import { toast } from "react-toastify";

const CartItems = () => {
    const { cart } = useSelector((state) => state.shop) || {};
    const dispatch = useDispatch();

    const deleteCartHandler = (id) => {
        dispatch(deleteCart(id));
    };

    const qtyHandler = (id, qty, stock_quantity) => {
        const newQty = parseInt(qty);
        
        // Validate quantity
        if (isNaN(newQty) || newQty < 1) {
            toast.error("Please enter a valid quantity");
            return;
        }

        // Check stock quantity
        if (stock_quantity !== null && newQty > stock_quantity) {
            toast.error(`Only ${stock_quantity} items available in stock`);
            return;
        }

        dispatch(addQty({ id, qty: newQty }));
    };

    return (
        <>
            {cart?.map((item) => (
                <tr className="cart-item" key={item.id}>
                    <td className="product-thumbnail">
                        {/* TODO: product details page */}
                        {/* <Link href={`/shop/${item.id}`}> */}
                        <Link href={`/cart`}>
                            <img 
                                src={item.attachments && item.attachments.length > 0 
                                    ? item.attachments[0].full_url 
                                    : 'https://placehold.co/339x387/e9ecef/808080?text=No+Image+Available'} 
                                alt={item.name} 
                            />
                        </Link>
                    </td>

                    <td className="product-name">
                        {/* TODO: product details page */}
                        {/* <Link href={`/shop/${item.id}`}> */}
                        <Link href={`/cart`}>
                            {item.name}
                        </Link>
                    </td>

                    <td className="product-price">
                        {item.unit_price ? `৳${item.unit_price.toFixed(2)}` : 'N/A'}
                    </td>

                    <td className="product-quantity">
                        <div className="item-quantity">
                            <input
                                type="number"
                                className="qty"
                                name="qty"
                                value={item?.qty}
                                min={1}
                                max={item.stock_quantity || undefined}
                                onChange={(e) => qtyHandler(
                                    item?.id, 
                                    e.target.value,
                                    item.stock_quantity
                                )}
                            />
                        </div>
                    </td>

                    <td className="product-subtotal"> 
                        <span className="amount">
                            ৳{((item?.qty || 0) * (item?.unit_price || 0)).toFixed(2)}
                        </span>
                    </td>

                    <td className="product-remove">
                        <button
                            onClick={() => deleteCartHandler(item?.id)}
                            className="remove"
                        >
                            <span className="flaticon-dustbin">Remove</span>
                        </button>
                    </td>
                </tr>
            ))}
        </>
    );
};

export default CartItems;
