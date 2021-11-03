import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Info from '../../components/profileCompany/Info'
import { getProfileUsers } from '../../redux/actions/profileAction'




const Profile = () => {
    const { profile, auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        if (profile.ids.every(item => item !== id)) {
            dispatch(getProfileUsers({ id, auth }))
        }
    }, [id, auth, dispatch, profile.ids])

    return (
        <div className="profile">

            <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />

            {/* {
                auth.user._id === id &&
                <div className="profile_tab">
                    <button className={saveTab ? '' : 'active'} onClick={() => setSaveTab(false)}>Posts</button>
                    <button className={saveTab ? 'active' : ''} onClick={() => setSaveTab(true)}>Saved</button>
                </div>
            } */}

            {
                // profile.loading
                //     ? <img className="d-block mx-auto" src={LoadIcon} alt="loading" />
                //     : <>
                //         {/* {
                //             saveTab
                //                 ? <Saved auth={auth} dispatch={dispatch} />
                //                 : <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
                //         } */}
                //     </>
            }

        </div>
    )
}

export default Profile
