'use client'
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from 'next/navigation'
import { loginUser } from "@/features/authSlice"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { toast } from 'react-toastify'

export default function SignIn() {
    const dispatch = useDispatch()
    const router = useRouter()
    const { loading } = useSelector((state) => state.auth)

    const [loginData, setLoginData] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)

    const validateForm = () => {
        const newErrors = {}
        
        if (!loginData.email) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
            newErrors.email = 'Email is invalid'
        }
        
        if (!loginData.password) {
            newErrors.password = 'Password is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        if (validateForm()) {
            const result = await dispatch(loginUser(loginData))
            if (loginUser.fulfilled.match(result)) {
                router.push('/cart')
            }
        } else {
            toast.error('Please fill in all required fields correctly')
        }
    }

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
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
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Sign In">
                <section className="track-area pt-80 pb-40">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 col-sm-12">
                                <div className="tptrack__product mb-40">
                                    <div className="tptrack__thumb">
                                        <img src="/assets/img/banner/login-bg.jpg" alt="" />
                                    </div>
                                    <div className="tptrack__content grey-bg-3">
                                        <div className="tptrack__item d-flex mb-20">
                                            <div className="tptrack__item-icon">
                                                <img src="/assets/img/icon/lock.png" alt="" />
                                            </div>
                                            <div className="tptrack__item-content">
                                                <h4 className="tptrack__item-title">Login Here</h4>
                                                <p>Your personal data will be used to support your experience throughout this website, to manage access to your account.</p>
                                            </div>
                                        </div>
                                        <form onSubmit={handleLogin}>
                                            <div className="tptrack__input-group">
                                                <span><i className="fal fa-user" /></span>
                                                <input 
                                                    type="email" 
                                                    placeholder="Email address *" 
                                                    name="email"
                                                    value={loginData.email}
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
                                                    value={loginData.password}
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
                                            <div className="tpsign__remember d-flex align-items-center justify-content-between mb-15">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="rememberMe" />
                                                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                                                </div>
                                                <div className="tpsign__pass">
                                                    <Link href="/forgot-password">Forgot Password?</Link>
                                                </div>
                                            </div>
                                            <div className="tptrack__btn-wrapper">
                                                <button 
                                                    type="submit" 
                                                    className="tptrack__submition"
                                                    disabled={loading}
                                                >
                                                    {loading ? 'Logging in...' : 'Login Now'}
                                                    <i className="fal fa-long-arrow-right" />
                                                </button>
                                            </div>
                                            <div className="tpsign__account text-center mt-15">
                                                <p>Don't have an account? <Link href="/register" className="text-primary">Register Now</Link></p>
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