'use client'
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { toast } from 'react-toastify'
import { useRouter } from "next/navigation"

export default function Profile() {
  const router = useRouter()
    const { isAuthenticated, user } = useSelector((state) => state.auth)
    const [isEditing, setIsEditing] = useState(false)
    const [userData, setUserData] = useState(user || {})

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/sign-in')
        }
    }, [isAuthenticated, router])

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // TODO: Implement update profile functionality
        toast.info('Profile update functionality coming soon!')
    }

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="My Profile">
            <section className="profile-area pt-80 pb-80">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 col-lg-10">
                            <div className="tptrack__product">
                                <div className="tptrack__content grey-bg-3">
                                    <div className="tptrack__item d-flex mb-20">
                                        {/* <div className="tptrack__item-icon">
                                            <img src="/assets/img/icon/user-profile.png" alt="profile" />
                                        </div> */}
                                        <div className="tptrack__item-content">
                                            <h4 className="tptrack__item-title">My Profile</h4>
                                            <p>Manage your profile information</p>
                                        </div>
                                        <div className="ms-auto">
                                            <button 
                                                className="tp-btn-2 tp-btn-border-2"
                                                onClick={() => setIsEditing(!isEditing)}
                                            >
                                                {isEditing ? (
                                                    <>Cancel <i className="fal fa-times" /></>
                                                ) : (
                                                    <>Edit Profile <i className="fal fa-edit" /></>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="tptrack__input-group">
                                                    <label>Full Name</label>
                                                    <input 
                                                        type="text"
                                                        name="name"
                                                        value={userData.name || ''}
                                                        onChange={handleChange}
                                                        disabled={!isEditing}
                                                        className={!isEditing ? 'disabled' : ''}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="tptrack__input-group">
                                                    <label>Email Address</label>
                                                    <input 
                                                        type="email"
                                                        name="email"
                                                        value={userData.email || ''}
                                                        disabled
                                                        className="disabled"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="tptrack__input-group">
                                                    <label>Phone Number</label>
                                                    <input 
                                                        type="tel"
                                                        name="phone"
                                                        value={userData.phone || ''}
                                                        onChange={handleChange}
                                                        disabled={!isEditing}
                                                        className={!isEditing ? 'disabled' : ''}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="tptrack__input-group">
                                                    <label>Address Line 1</label>
                                                    <input 
                                                        type="text"
                                                        name="address1"
                                                        value={userData.address1 || ''}
                                                        onChange={handleChange}
                                                        disabled={!isEditing}
                                                        className={!isEditing ? 'disabled' : ''}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="tptrack__input-group">
                                                    <label>City</label>
                                                    <input 
                                                        type="text"
                                                        name="city"
                                                        value={userData.city || ''}
                                                        onChange={handleChange}
                                                        disabled={!isEditing}
                                                        className={!isEditing ? 'disabled' : ''}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="tptrack__input-group">
                                                    <label>State</label>
                                                    <input 
                                                        type="text"
                                                        name="state"
                                                        value={userData.state || ''}
                                                        onChange={handleChange}
                                                        disabled={!isEditing}
                                                        className={!isEditing ? 'disabled' : ''}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="tptrack__input-group">
                                                    <label>Country</label>
                                                    <input 
                                                        type="text"
                                                        name="country"
                                                        value={userData.country || ''}
                                                        onChange={handleChange}
                                                        disabled={!isEditing}
                                                        className={!isEditing ? 'disabled' : ''}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="tptrack__input-group">
                                                    <label>Postal Code</label>
                                                    <input 
                                                        type="text"
                                                        name="postal_code"
                                                        value={userData.postal_code || ''}
                                                        onChange={handleChange}
                                                        disabled={!isEditing}
                                                        className={!isEditing ? 'disabled' : ''}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {isEditing && (
                                            <div className="tptrack__btn-wrapper text-end mt-20">
                                                <button 
                                                    type="submit" 
                                                    className="tp-btn-2"
                                                >
                                                    Save Changes <i className="fal fa-long-arrow-right" />
                                                </button>
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}