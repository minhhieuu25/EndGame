import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { login, loginGoogle } from '../redux/actions/authAction'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const Login = () => {
    const initialState = { email: '', password: '' }
    const [userData, setUserData] = useState(initialState)
    const { email, password } = userData

    const [typePass, setTypePass] = useState(false)

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (auth.token) history.push("/")
    }, [auth.token, history])

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(login(userData))
    }

    const responseGoogle = async (response) => {
        dispatch(loginGoogle({ tokenId: response.tokenId }))

    }
    const responseFacebook = async (response) => {
        // try {
        //     const {accessToken, userID} = response
        //     const res = await axios.post('/user/facebook_login', {accessToken, userID})

        //     setUser({...user, error:'', success: res.data.msg})
        //     localStorage.setItem('firstLogin', true)

        //     dispatch(dispatchLogin())
        //     history.push('/')
        // } catch (err) {
        //     err.response.data.msg && 
        //     setUser({...user, err: err.response.data.msg, success: ''})
        // }
    }

    return (
        <div className="split-screen">
            <div className="left">
                <section className="copy">
                    <h1>Welcome to RankWork</h1>
                    <p>Over 1000 Rusume real with you</p>
                </section>
            </div>
            <div className="right">
                <form onSubmit={handleSubmit}>
                    <section className="copy">
                        <h2>Sign In</h2>
                        <div className="login-container">
                            <p>You don't have an account? <Link to="/register"><strong>Register Now</strong></Link></p>
                        </div>
                    </section>
                    <div className="input-container email">
                        <label htmlFor="InputEmail">Email</label>
                        <input type="email" id="InputEmail" name="email"
                            aria-describedby="emailHelp"
                            onChange={handleChangeInput}
                            value={email}
                            placeholder="Email@rankwork.com" />
                    </div>
                    <div className="input-container password">
                        <label htmlFor="InputPassword">Password</label>
                        <input type={typePass ? "text" : "password"}
                            id="InputPassword"
                            onChange={handleChangeInput}
                            value={password}
                            name="password"
                            placeholder="••••••••••••" />
                        <small className="show-pass" onClick={() => setTypePass(!typePass)}>
                            {typePass ? 'Hide' : 'Show'}
                        </small>
                    </div>
                    <div className="forgot">
                        <Link to="/forgot_password">Forgot your password?</Link>
                    </div>
                    <button type="submit" className="signup-btn"
                        disabled={email && password ? false : true}>
                        Login
                    </button>
                    {/* <hr /> */}
                    {/* <div className="login-with-gg">
                        <p>Login with other:</p>
                        <div className="row">
                            <div className="col-6">
                                <GoogleLogin
                                    clientId="453257152635-pceti5emhtj8tu96q9r6nipd9ohk86dm.apps.googleusercontent.com"
                                    buttonText="Login with google"
                                    onSuccess={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </div>
                            <div className="col-6">
                                <FacebookLogin
                                    appId="411549117088599"
                                    autoLoad={false}
                                    fields="name,email,picture"
                                    callback={responseFacebook}
                                />
                            </div>
                        </div>
                    </div> */}
                </form>
            </div>
        </div>
    )
}

export default Login
