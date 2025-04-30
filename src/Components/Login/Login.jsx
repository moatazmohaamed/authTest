import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Bounce, toast } from 'react-toastify'

const Login = () => {
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate()

    let mySchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().required("Password is required"),
    })

    let formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: mySchema,
        onSubmit: (values) => {
            login(values)
        }
    },)

    async function login(values) {
        setLoading(true)
        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values).then((res) => {
            setMessage(res.data.message)
            setLoading(false)
            toast(res.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            })
            navigate("/home")
        }).catch((err) => {
            setError(err.response.data.message)
            setLoading(false)
            toast(err.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            })
        })
    }

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Login</h2>

                    <form className="space-y-4" onSubmit={formik.handleSubmit}>



                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                placeholder="your@email.com"
                            />
                        </div>
                        {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-400" role="alert">
                            {formik.errors.email}
                        </div> : ""}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                onBlur={formik.handleBlur}

                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                        {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-400" role="alert">
                            {formik.errors.password}
                        </div> : ""}





                        <div className="flex items-center justify-between">

                            <NavLink to='/forget-password' className="text-sm text-indigo-600 hover:text-indigo-500">Forgot password?</NavLink>
                        </div>

                        <button disabled={loading} type='submit' className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">

                            {loading ? <FontAwesomeIcon icon={faSpinner} spin size="2x" color="white" /> : "Sign In"}

                        </button>



                        {message ? <div className="p-</button>4 mb-4 text-sm text-green-800 rounded-lg bg-green-50  dark:text-green-400" role="alert">
                            {message}
                        </div> : ""}
                        {error ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-400" role="alert">
                            {error}
                        </div> : ""}
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?
                        <NavLink to='/register' className="text-indigo-600 hover:text-indigo-500 font-medium">Sign Up</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
