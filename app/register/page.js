'use client'
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from 'next/navigation'
import { registerUser, loginUser } from "@/features/authSlice"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { toast } from 'react-toastify'

export default function Register() {
    const dispatch = useDispatch()
    const router = useRouter()
    const { loading } = useSelector((state) => state.auth)

    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address1: '',
        city: '',
        state: '',
        country: '',
        postal_code: ''
    })
    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)

    const validateForm = () => {
        const newErrors = {}
        
        if (!registerData.name) {
            newErrors.name = 'Name is required'
        }
        
        if (!registerData.email) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
            newErrors.email = 'Email is invalid'
        }
        
        if (!registerData.password) {
            newErrors.password = 'Password is required'
        } else if (registerData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        if (validateForm()) {
            const result = await dispatch(registerUser(registerData))
            if (registerUser.fulfilled.match(result)) {
                dispatch(loginUser({
                    email: registerData.email,
                    password: registerData.password
                })).then((result) => {
                    if (loginUser.fulfilled.match(result)) {
                        router.push('/cart')
                    }
                })
            }
        } else {
            toast.error('Please fill in all required fields correctly')
        }
    }

    const handleChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        })
        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: ''
            })
        }
    }

    return (
        <>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Register">
                <section className="track-area pt-80 pb-40">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 col-sm-12">
                                <div className="tptrack__product mb-40">
                                    <div className="tptrack__thumb">
                                        <img src="/assets/img/banner/sign-bg.jpg" alt="" />
                                    </div>
                                    <div className="tptrack__content grey-bg-3">
                                        <div className="tptrack__item d-flex mb-20">
                                            <div className="tptrack__item-icon">
                                                <img src="/assets/img/icon/sign-up.png" alt="" />
                                            </div>
                                            <div className="tptrack__item-content">
                                                <h4 className="tptrack__item-title">Register Now</h4>
                                                <p>Create an account to enjoy shopping with us.</p>
                                            </div>
                                        </div>
                                        <form onSubmit={handleRegister}>
                                            <div className="tptrack__input-group">
                                                <span><i className="fal fa-user" /></span>
                                                <input 
                                                    type="text" 
                                                    placeholder="Full Name *" 
                                                    name="name"
                                                    value={registerData.name}
                                                    onChange={handleChange}
                                                    className={errors.name ? 'error' : ''}
                                                />
                                                {errors.name && <div className="tptrack__error-message text-danger">{errors.name}</div>}
                                            </div>
                                            <div className="tptrack__input-group">
                                                <span><i className="fal fa-envelope" /></span>
                                                <input 
                                                    type="email" 
                                                    placeholder="Email Address *" 
                                                    name="email"
                                                    value={registerData.email}
                                                    onChange={handleChange}
                                                    className={errors.email ? 'error' : ''}
                                                />
                                                {errors.email && <div className="tptrack__error-message text-danger">{errors.email}</div>}
                                            </div>
                                            <div className="tptrack__input-group">
                                                <span><i className="fal fa-key" /></span>
                                                <input 
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Password *" 
                                                    name="password"
                                                    value={registerData.password}
                                                    onChange={handleChange}
                                                    className={errors.password ? 'error' : ''}
                                                />
                                                <button
                                                    type="button"
                                                    className="tptrack__password-toggle"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    <i className={`fal ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                                                </button>
                                                {errors.password && <div className="tptrack__error-message text-danger">{errors.password}</div>}
                                            </div>
                                            <div className="tptrack__input-group">
                                                <span><i className="fal fa-phone" /></span>
                                                <input 
                                                    type="text" 
                                                    placeholder="Phone Number" 
                                                    name="phone"
                                                    value={registerData.phone}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="tptrack__input-group">
                                                <span><i className="fal fa-map-marker-alt" /></span>
                                                <input 
                                                    type="text" 
                                                    placeholder="Address" 
                                                    name="address1"
                                                    value={registerData.address1}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="tptrack__input-group">
                                                        <span><i className="fal fa-city" /></span>
                                                        <input 
                                                            type="text" 
                                                            placeholder="City" 
                                                            name="city"
                                                            value={registerData.city}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="tptrack__input-group">
                                                        <span><i className="fal fa-map" /></span>
                                                        <input 
                                                            type="text" 
                                                            placeholder="State" 
                                                            name="state"
                                                            value={registerData.state}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="tptrack__input-group">
                                                        <span><i className="fal fa-globe" /></span>
                                                        <input 
                                                            type="text" 
                                                            placeholder="Country" 
                                                            name="country"
                                                            value={registerData.country}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="tptrack__input-group">
                                                        <span><i className="fal fa-mailbox" /></span>
                                                        <input 
                                                            type="text" 
                                                            placeholder="Postal Code" 
                                                            name="postal_code"
                                                            value={registerData.postal_code}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tptrack__btn-wrapper">
                                                <button 
                                                    type="submit" 
                                                    className="tptrack__submition"
                                                    disabled={loading}
                                                >
                                                    {loading ? 'Registering...' : 'Register Now'}
                                                    <i className="fal fa-long-arrow-right" />
                                                </button>
                                            </div>
                                            <div className="tpsign__account text-center mt-15">
                                                <p>Already have an account? <Link href="/sign-in" className="text-primary">Login Here</Link></p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}