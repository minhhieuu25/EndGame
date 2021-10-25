import { GLOBALTYPES } from './globalTypes'
import { getDataAPI, postDataAPI } from '../../utils/fetchData'
import { imageUpload } from '../../utils/imageUpload'
import valid from '../../utils/valid'
import validation_reset from '../../utils/validation_reset'

export const login = (data) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        const res = await postDataAPI('login', data)
        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                token: res.data.access_token,
                user: res.data.user,
                isCompany: res.data.user.role === 'company' ? true : false,
                isAdmin: res.data.user.role === 'admin' ? true : false
            }
        })

        localStorage.setItem("firstLogin", true)
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.msg
            }
        })

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const loginGoogle = (data) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        const res = await postDataAPI('google_login', data)
        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                token: res.data.access_token,
                user: res.data.user,
                isCompany: res.data.user.role === 'company' ? true : false,
                isAdmin: res.data.user.role === 'admin' ? true : false
            }
        })

        localStorage.setItem("firstLogin", true)
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.msg
            }
        })

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const refreshToken = () => async (dispatch) => {
    const firstLogin = localStorage.getItem("firstLogin")
    if (firstLogin) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

        try {
            const res = await postDataAPI('refresh_token')
            dispatch({
                type: GLOBALTYPES.AUTH,
                payload: {
                    token: res.data.access_token,
                    user: res.data.user,
                    isCompany: res.data.user.role === 'company' ? true : false,
                    isAdmin: res.data.user.role === 'admin' ? true : false

                }
            })
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } })
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    error: err.response.data.msg
                }
            })
        }
    }
}

export const forgot = (email) => async (dispatch) => {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

    try {
        const res = await postDataAPI('forgot', { email }, null)
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.msg
            }
        })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const reset = (token, password, cf_password) => async (dispatch) => {

    const check = validation_reset(password, cf_password)
    console.log(check)
    if (check.errLength > 0)
        return dispatch({ type: GLOBALTYPES.ALERT, payload: check.errMsg })

    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        const res = await postDataAPI('reset', { password }, token)
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.msg
            }
        })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const validation = (data) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        const res = await postDataAPI('activation', { activation_token: data }, null)
        console.log(res.data.msg)

        dispatch({
            type: GLOBALTYPES.ALERT2,
            payload: {
                test: res.data.msg
            }
        })
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}


export const register = (data) => async (dispatch) => {
    const check = valid(data)
    if (check.errLength > 0)
        return dispatch({ type: GLOBALTYPES.ALERT, payload: check.errMsg })
    console.log(0)
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        console.log(1)
        const res = await postDataAPI('register', data, null)
        console.log(2)
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.msg
            }
        })

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}


export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('firstLogin')
        await postDataAPI('logout')
        window.location.href = "/"
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const upgradeAccount = (company, logo, companySize, auth) => async (dispatch) => {

    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        let media;
        if (logo) media = await imageUpload([logo])
        const res = await postDataAPI('upgrade', {
            ...company,
            logo: logo ? media[0].url : undefined,
            companySize
        }, auth.token)

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.msg
            }
        })

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}





