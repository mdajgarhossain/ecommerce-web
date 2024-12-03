import Link from "next/link"
import { toast } from "react-toastify";

const ShopCard = ({ item, addToCart, addToWishlist }) => {
    const isOutOfStock = item.stock_quantity <= 0;
    

    return (
        <>
            <div className="col">
                <div className="tpproduct tpproductitem mb-15 p-relative">
                    <div className="tpproduct__thumb">
                        <div className="tpproduct__thumbitem p-relative">
                            {/* TODO: Add item details later */}
                            {/* <Link href={`/shop/${item.id}`}> */}
                                <img 
                                    src={item.attachments && item.attachments.length > 0 
                                        ? item.attachments[0].full_url 
                                        : 'https://placehold.co/339x387/e9ecef/808080?text=No+Image+Available'} 
                                    alt={item.name}
                                    style={{
                                        width: '339px',
                                        height: '387px',
                                        objectFit: 'cover'
                                    }}
                                />
                            {/* </Link> */}
                            <div className="tpproduct__thumb-bg">
                                <div className="tpproductactionbg">
                                    <a onClick={() => {
                                        if (isOutOfStock) {
                                            toast.error('This item is out of stock!');
                                            return;
                                        }
                                        addToCart(item.id);
                                    }} className="add-to-cart">
                                        <i className="fal fa-shopping-basket" />
                                    </a>
                                    {/* TODO: Add exchange and view details later */}
                                    {/* <Link href="#"><i className="fal fa-exchange" /></Link>
                                    <Link href="#"><i className="fal fa-eye" /></Link> */}
                                    <a onClick={() => addToWishlist(item.id)} className="wishlist" ><i className="fal fa-heart" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tpproduct__content-area">
                        <h3 className="tpproduct__title mb-5"><Link href={`/shop/${item.id}`}>{item.name}</Link></h3>
                        <div className="tpproduct__priceinfo p-relative mt-10">
                            <div className="tpproduct__ammount">
                                {item.unit_price !== null && item.unit_price !== undefined ? (
                                    <span className="">৳{item.unit_price.toFixed(2)}</span>
                                ) : (
                                    <span className="text-secondary">Price not available</span>
                                )}
                                <div className="mt-2">
                                    {item.stock_quantity > 0 ? (
                                        <span className="text-danger border border-danger px-2 py-1">In Stock</span>
                                    ) : (
                                        <span className="text-danger border border-danger px-2 py-1">Out of Stock</span>
                                    )}
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopCard