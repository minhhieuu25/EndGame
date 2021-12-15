import dateFormat from 'dateformat'
import { getDataAPI, patchDataAPI, postDataAPI } from '../../utils/fetchData'
import { imageUpload } from '../../utils/imageUpload'
import { GLOBALTYPES } from './globalTypes'
import { createNotify } from './notifyAction'
import { getListSubmited } from './sumitedAction'

export const getResume = (dataResume, arrEdu, arrExp, arrSkill, language, avatar) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        let media
        if (avatar) media = await imageUpload([avatar])
        dispatch({
            type: GLOBALTYPES.DATARESUME,
            payload: {
                resumes: { ...dataResume, educations: [...arrEdu], experiences: [...arrExp], skill: [...arrSkill], language: [...language] },
                avatar: avatar ? media[0].url : '',
                // skill: skill,
                // language: language
            }
        })
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: 'Preview success'
            }
        })

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: 'Preview failure'
            }
        })
    }
}

export const saveResume = (cvData, arrEdu, arrExp, arrSkill, language, avatar, auth) => async (dispatch) => {
    try {
        let media;
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

        if (avatar) media = await imageUpload([avatar])

        const res = await postDataAPI("create_cv", {
            ...cvData, educations: [...arrEdu], experiences: [...arrExp],
            skill: arrSkill,
            language,
            avatar: avatar ? media[0].url : ''
        }, auth.token)



        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } })

    } catch (err) {
        console.log(err)
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const getAllResume = (auth) => async (dispatch) => {
    try {

        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

        const res = await getDataAPI('get_all_cv', auth.token)


        dispatch({
            type: GLOBALTYPES.ALLRESUME,
            payload: {
                resumes: res.data
            }
        })




        // dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } })
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } })

    } catch (err) {
        console.log(err.response.data.msg)
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const updateResume = (id, cvData, skill, language, avatar, auth) => async (dispatch) => {
    try {
        let media;

        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

        // if (avatar) media = await imageUpload([avatar])

        if (!avatar.name)
            console.log('done')
        else
            if (avatar && avatar.name)
                media = await imageUpload([avatar])

        const res = await patchDataAPI("update_cv", {
            id,
            ...cvData,
            skill,
            language,
            avatar: avatar.name ? media[0].url : avatar
        }, auth.token)

        console.log(res)

        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } })
    } catch (err) {
        console.log(err)
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const deleteResume = (id, auth) => async (dispatch) => {
    try {

        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })


        const res = await patchDataAPI("delete_cv", {
            id
        }, auth.token)

        dispatch(getAllResume(auth))

        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } })

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const deleteData = () => async (dispatch) => {
    try {

        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })


        dispatch({
            type: GLOBALTYPES.ALLRESUME,
            payload: {}
        })

        dispatch({ type: GLOBALTYPES.ALERT, payload: {} })
    } catch (err) {
        console.log(err)
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const submitCV = (idJob, endDate, idCompany, cv, auth, socket) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        const date = new Date()

        const res = await postDataAPI('submit-cv', { idJob, idCompany, endDate, idCV: cv._id, dataCV: cv, dateSubmit: dateFormat(date, 'yyyy/mm/dd') }, auth.token)
        if (res.data.newSubmit) {
            const msg = {
                id: res.data.newSubmit.idCV,
                text: 'submited resume.',
                recipients: res.data.newSubmit.idCompany,
                url: `/reviewResume/${res.data.newSubmit._id}`,
                // image: logo ? mediaLogo[0].url : ''
            }
            dispatch(createNotify({ msg, auth, socket }))

        }
        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

