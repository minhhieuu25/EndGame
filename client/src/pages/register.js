import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { register } from '../redux/actions/authAction'
import { loginGoogle } from '../redux/actions/authAction'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const Register = () => {
    const { auth, alert } = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()

    const initialState = {
        firstname: '', lastname: '', email: '', password: '', cf_password: '', role: 'candidate'
    }
    const [userData, setUserData] = useState(initialState)
    const { firstname, lastname, email, password, cf_password } = userData

    const [typePass, setTypePass] = useState(false)
    const [typeCfPass, setTypeCfPass] = useState(false)

    useEffect(() => {
        if (auth.token) history.push("/")
    }, [auth.token, history])


    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(register(userData))

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
                        <h2>Sign Up</h2>
                        <div className="login-container">
                            <p>Already have an account? <Link to="/login"><strong>Login Now</strong></Link></p>
                        </div>
                    </section>

                    <div className="input-container fullname">
                        <div className="col-6">
                            <label htmlFor="firstname">First Name</label>
                            <input type="text" id="firstname"
                                name="firstname"
                                onChange={handleChangeInput}
                                value={firstname}
                                placeholder="Monkey"
                                style={{ background: `${alert.fullname ? '#fd2d6a14' : ''}` }} />
                            <small className="form-text text-danger">
                                {alert.firstname ? alert.firstname : ''}
                            </small>
                        </div>
                        <div className="col-6">
                            <label htmlFor="lastname">Last Name</label>
                            <input type="text" id="lastname"
                                name="lastname"
                                onChange={handleChangeInput}
                                value={lastname}
                                placeholder="D. Luffy"
                                style={{ background: `${alert.fullname ? '#fd2d6a14' : ''}` }} />
                            <small className="form-text text-danger">
                                {alert.lastname ? alert.lastname : ''}
                            </small>
                        </div>
                    </div>
                    <div className="input-container email">
                        <label htmlFor="InputEmail">Email</label>
                        <input type="email" id="InputEmail"
                            name="email"
                            onChange={handleChangeInput}
                            value={email}
                            placeholder="Email@rankwork.com"
                            style={{ background: `${alert.email ? '#fd2d6a14' : ''}` }}
                        />
                        <small className="form-text text-danger">
                            {alert.email ? alert.email : ''}
                        </small>
                    </div>

                    <div className="input-container password">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type={typePass ? "text" : "password"}
                            id="exampleInputPassword1"
                            onChange={handleChangeInput}
                            value={password}
                            name="password"
                            placeholder="••••••••••••"
                            style={{ background: `${alert.password ? '#fd2d6a14' : ''}` }} />

                        <small className="show-pass" onClick={() => setTypePass(!typePass)}>
                            {typePass ? 'Hide' : 'Show'}
                        </small>
                        <small className="form-text text-danger">
                            {alert.password ? alert.password : ''}
                        </small>
                    </div>
                    <div className="input-container password">
                        <label htmlFor="cf_password">Confirm Password</label>
                        <input type={typeCfPass ? "text" : "password"}
                            id="cf_password"
                            onChange={handleChangeInput}
                            value={cf_password}
                            name="cf_password"
                            placeholder="••••••••••••"
                            style={{ background: `${alert.cf_password ? '#fd2d6a14' : ''}` }}
                        />
                        <small className="show-pass" onClick={() => setTypeCfPass(!typeCfPass)}>
                            {typeCfPass ? 'Hide' : 'Show'}
                        </small>
                        <small className="form-text text-danger">
                            {alert.cf_password ? alert.cf_password : ''}
                        </small>
                    </div>
                    <button type="submit" className="signup-btn">
                        Register
                    </button>
                    <hr />
                    <div className="login-with-gg">
                        <p>Sign up with other:</p>
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
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
