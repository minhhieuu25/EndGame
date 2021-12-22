import { getDataAPI, getDataJob, postDataAPI } from '../../utils/fetchData'
import { imageUpload } from '../../utils/imageUpload'
import { GLOBALTYPES } from './globalTypes'
import { createNotify } from './notifyAction'


export const getAllJob = () => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        const resAllJob = await getDataJob('get_all_job', null)
        dispatch({

            type: GLOBALTYPES.ALLJOB,
            payload: {
                jobs: resAllJob.data
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

export const searchJob = (search, address) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        const resSearchJob = await getDataAPI(`/search_job?position=${search}`, null)
        console.log(resSearchJob)


        dispatch({
            type: GLOBALTYPES.ALLJOB,
            payload: {
                searchJob: address === 'All locations' ? resSearchJob.data : resSearchJob.data.filter((key) => (key.address.indexOf(address) !== -1))

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

export const createJob = (jobData, level, jobType, experience, arrSkill, companySize, logo, image, auth, socket) => async (dispatch) => {
    try {
        let mediaLogo;
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        console.log(arrSkill)
        let now = new Date()
        let endDate = new Date(jobData.endDate)
        if (parseInt(jobData.minSalary) > parseInt(jobData.maxSalary)) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: 'Salary wrong' } })
        }
        else
            if (now.getTime() > endDate.getTime()) {
                dispatch({ type: GLOBALTYPES.ALERT, payload: { error: 'End date wrong' } })
            }
            else {
                const res = await postDataAPI("create_job", {
                    ...jobData, level, jobType, companySize, skill: arrSkill, experience: experience,
                    // logo: logo ? mediaLogo[0].url : '', image: image ? mediaImage[0].url : ''
                    logo: auth.user.avatar,
                }, auth.token)
                dispatch(getAllJob())
                dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } })
                if (res.data.newJob) {
                    socket.emit('createJob', auth.user)
                    // Notify
                    const msg = {
                        id: res.data.newJob._id,
                        text: 'added a new post.',
                        recipients: res.data.newJob.user.followersCompany,
                        url: `/jobdetail/${res.data.newJob._id}`,
                        image: logo ? mediaLogo[0].url : ''
                    }

                    dispatch(createNotify({ msg, auth, socket }))
                }
                return res.data.msg
            }
    } catch (err) {
        console.log(err)
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const updateJob = (id, jobData, level, jobType, companySize, arrSkill, logo, image, auth, socket) => async (dispatch) => {
    try {
        let mediaLogo, mediaImage;
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

        if (logo) mediaLogo = await imageUpload([logo])
        if (image) mediaImage = await imageUpload([image])

        console.log(arrSkill)
        const res = await postDataAPI("update_job", {
            ...jobData, level, jobType, companySize, skill: arrSkill, id,
            logo: logo ? mediaLogo[0].url : jobData.logo, image: image ? mediaImage[0].url : jobData.image
        }, auth.token)

        dispatch(getAllJob())
        // Notify
        // const msg = {
        //     id: res.data.newJob._id,
        //     text: 'updated a post.',
        //     recipients: res.data.newJob.user.followersCompany,
        //     url: `/jobdetail/${res.data.newJob._id}`,
        //     image: logo ? mediaLogo[0].url : ''
        // }
        // dispatch(createNotify({ msg, auth, socket }))

        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } })
    } catch (err) {
        console.log(err)
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const deleteJob = ({ id, auth }) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        const resAllJob = await postDataAPI('delete_job', { id }, auth.token)
        await postDataAPI('delete_submit', { id: id }, auth.token)
        dispatch(getAllJob())
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: resAllJob.data.msg
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

