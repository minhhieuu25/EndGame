import { GLOBALTYPES } from './globalTypes'
import { getDataJob } from '../../utils/fetchData'

export const getTypeJob = () => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        const resInternship = await getDataJob('get_job_by_type', { jobType: 'Internship' })
        const resFullTime = await getDataJob('get_job_by_type', { jobType: 'Full-time' })
        const resAllJob = await getDataJob('get_all_job', null)
        dispatch({

            type: GLOBALTYPES.HOMEJOB,
            payload: {
                jobInternship: resInternship.data,
                jobFullTime: resFullTime.data
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

