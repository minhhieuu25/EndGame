import { getDataAPI } from '../../utils/fetchData'
import { GLOBALTYPES } from './globalTypes'


export const getListSubmited = (auth) => async (dispatch) => {
    try {
        const res = await getDataAPI('get_submited', auth.token)
        dispatch({
            type: GLOBALTYPES.SUBMITEDRESUME,
            payload: {
                submited: res.data
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
