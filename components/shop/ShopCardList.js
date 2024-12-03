import Link from "next/link"
import { toast } from "react-toastify";

const ShopCardList = ({ item, addToCart, addToWishlist }) => {
    const isOutOfStock = item.stock_quantity <= 0;
    
    
    return (
        <>
            <div className="row mb-40">
                <div className="col-lg-4 col-md-12">
                    <div className="tpproduct__thumb">
                        <div className="tpproduct__thumbitem p-relative">
                            {/* TODO: Add item details later */}
                            {/* <Link href={`/shop/${item.id}`}> */}
                                <img 
                                    src={item.attachments[0]?.full_url || 'https://placehold.co/339x387/e9ecef/808080?text=No+Image+Available'} 
                                    alt={item.name}
                                    style={{
                                        width: '462px',
                                        height: '528px',
                                        objectFit: 'cover'
                                    }} 
                                />
                                <img 
                                    className="thumbitem-secondary" 
                                    src={item.attachments[1]?.full_url || item.attachments[0]?.full_url || 'https://placehold.co/339x387/e9ecef/808080?text=No+Image+Available'} 
                                    alt={item.name}
                                    style={{
                                        width: '462px',
                                        height: '528px',
                                        objectFit: 'cover'
                                    }} 
                                />
                            {/* </Link> */}
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 col-md-12">
                    <div className="filter-product ml-20 pt-30">
                        <h3 className="filter-product-title">
                            <Link href={`/shop/${item.id}`}>{item.name}</Link>
                        </h3>
                        <div className="tpproduct__ammount">
                            {item.unit_price && (
                                <span className="">৳{item.unit_price.toFixed(2)}</span>
                            )}
                            <div className="mt-2">
                                {item.stock_quantity > 0 ? (
                                    <span className="text-danger border border-danger px-2 py-1">In Stock</span>
                                ) : (
                                    <span className="text-danger border border-danger px-2 py-1">Out of Stock</span>
                                )}
                            </div>
                            
                        </div>
                        {item.description && <p className="mt-2">{item.description}</p>}
                        
                        <div className="tpproduct__action mt-20">
                            {/* TODO: Add exchange and view details later */}
                            {/* <Link className="comphare" href="#"><i className="fal fa-exchange" /></Link> */}
                            {/* <Link className="quckview" href="#"><i className="fal fa-eye" /></Link> */}
                            <a onClick={() => addToWishlist(item.id)} className="wishlist">
                                <i className="fal fa-heart" />
                            </a>
                            <a 
                                onClick={() => {
                                    if (isOutOfStock) {
                                        toast.error('This item is out of stock!');
                                        return;
                                    }
                                    addToCart(item.id);
                                }} 
                                className="add-to-cart"
                            >
                                <i className="fal fa-shopping-basket" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopCardList