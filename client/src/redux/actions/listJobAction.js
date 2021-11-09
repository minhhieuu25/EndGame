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
                searchJob: address === 'All locations' ? resSearchJob.data : resSearchJob.data.filter((key) => key.address === address)

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

export const createJob = (jobData, level, jobType, skill, companySize, logo, image, auth, socket) => async (dispatch) => {
    try {
        let mediaLogo, mediaImage;
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

        let now = new Date()
        let endDate = new Date(jobData.endDate)
        if (jobData.minSalary > jobData.maxSalary) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: 'Salary wrong' } })
        }
        else
            if (now.getTime() > endDate.getTime()) {
                dispatch({ type: GLOBALTYPES.ALERT, payload: { error: 'End date wrong' } })
            }
            else {
                // if (logo) mediaLogo = await imageUpload([logo])
                // if (image) mediaImage = await imageUpload([image])


                const res = await postDataAPI("create_job", {
                    ...jobData, level, jobType, companySize, skill,
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
            }


    } catch (err) {
        console.log(err)
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const updateJob = (id, jobData, level, jobType, companySize, skill, logo, image, auth, socket) => async (dispatch) => {
    try {
        console.log(jobData)
        let mediaLogo, mediaImage;
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

        if (logo) mediaLogo = await imageUpload([logo])
        if (image) mediaImage = await imageUpload([image])

        console.log(jobData)
        const res = await postDataAPI("update_job", {
            ...jobData, level, jobType, companySize, skill, id,
            logo: logo ? mediaLogo[0].url : jobData.logo, image: image ? mediaImage[0].url : jobData.image
        }, auth.token)

        console.log(res.data)
        dispatch(getAllJob())
        // Notify
        const msg = {
            id: res.data.newJob._id,
            text: 'updated a post.',
            recipients: res.data.newJob.user.followersCompany,
            url: `/jobdetail/${res.data.newJob._id}`,
            image: logo ? mediaLogo[0].url : ''
        }
        dispatch(createNotify({ msg, auth, socket }))

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
        // dispatch({

        //     type: GLOBALTYPES.ALLJOB,
        //     payload: {
        //         jobs: resAllJob.data
        //     }
        // })
        // dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } })

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}