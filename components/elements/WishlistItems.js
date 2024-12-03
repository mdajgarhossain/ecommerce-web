'use client'
import { addCart } from "@/features/shopSlice"
import { addQty, deleteWishlist } from "@/features/wishlistSlice"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import Image from "next/image"

const WishlistItems = () => {
    const { wishlist } = useSelector((state) => state.wishlist) || {}
    const dispatch = useDispatch()

    const addToCart = (item) => {
        dispatch(addCart({ product: item }))
    }

    const deleteCartHandler = (id) => {
        dispatch(deleteWishlist(id))
    }

    const qtyHandler = (id, qty) => {
        dispatch(addQty({ id, qty }))
    }

    return (
        <>
            {wishlist?.map((item) => (
                <tr className="cart-item" key={item.id}>
                    <td className="product-thumbnail">
                        <Link href={`/shop/${item.id}`}>
                            <img
                                src={item.attachments && item.attachments.length > 0 
                                    ? item.attachments[0].full_url 
                                    : 'https://placehold.co/339x387/e9ecef/808080?text=No+Image+Available'} 
                                alt={item.name}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    objectFit: 'cover'
                                }}
                            />
                        </Link>
                    </td>

                    <td className="product-name">
                        <Link href={`/shop/${item.id}`}>
                            {item.name}
                        </Link>
                    </td>

                    <td className="product-price">৳{item.unit_price?.toFixed(2)}</td>

                    <td className="product-quantity">
                        <div className="item-quantity">
                            <input
                                type="number"
                                className="qty"
                                name="qty"
                                defaultValue={item?.qty || 1}
                                min={1}
                                max={item.stock_quantity}
                                onChange={(e) =>
                                    qtyHandler(item?.id, e.target.value)
                                }
                            />
                        </div>
                    </td>

                    <td className="product-subtotal">
                        <span className="amount">
                            ৳{((item?.qty || 1) * (item?.unit_price || 0)).toFixed(2)}
                        </span>
                    </td>

                    <td className="product-add-to-cart">
                        <a 
                            onClick={() => {
                                if (item.stock_quantity <= 0) {
                                    toast.error('This item is out of stock!');
                                    return;
                                }
                                addToCart(item);
                            }} 
                            className="tp-btn tp-color-btn tp-wish-cart banner-animation"
                        >
                            Add To Cart
                        </a>
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
    )
}

export default WishlistItems
