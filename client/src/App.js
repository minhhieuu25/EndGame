import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PageRender from './customRouter/PageRender'
import PrivateRouter from './customRouter/PrivateRouter'

import HomePage from './pages/homePage'
import Login from './pages/login'
import Register from './pages/register'

import admin_profile from './pages/admin_profile'
import ResetPass from './pages/ResetPassword'
import ForgotPass from './pages/ForgotPassword'
import ActivationEmail from './pages/ActivationEmail'
import Jobs from './pages/jobs'
import Companys from './pages/companys'
import CreateCV from './pages/createCV'
import NhaTuyenDung from './pages/nhatuyendung'
import becomeCompany from './pages/becomeCompany'
import admin_manage_company from './pages/admin_manage_company'
import admin_manage_post from './pages/admin_manage_post'
import Dashboard from './pages/dashboard/Dashboard'
import NewJob from './pages/newJob/NewJob'
import ManageJob from './pages/managejob/[id]'
import UserList from './pages/userList/UserList'
import AnalysisJob from './pages/analysisjob/[id]'

import { getAllJob } from './redux/actions/listJobAction'
import { getTypeJob } from './redux/actions/homeJobAction'
import { getListCompany, getTopCompany } from './redux/actions/listCompanyAction'
import { getAllResume } from './redux/actions/resumeAction'
import { getAllUsers } from './redux/actions/usersAction'

import Alert from './components/alert/Alert'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import StatusModal from './components/StatusModal'

import { useSelector, useDispatch } from 'react-redux'
import { refreshToken } from './redux/actions/authAction'
import { getPosts } from './redux/actions/postAction'
import { getSuggestions } from './redux/actions/suggestionsAction'

import io from 'socket.io-client'
import { GLOBALTYPES } from './redux/actions/globalTypes'
import SocketClient from './SocketClient'

import { getNotifies } from './redux/actions/notifyAction'
import CallModal from './components/message/CallModal'
import Peer from 'peerjs'
import UpdateJob from './pages/updatejob/[id]'

function App() {
  const { auth, status, modal, call } = useSelector(state => state)
  const dispatch = useDispatch()

  let scroll = 0;
  window.addEventListener('scroll', () => {
    if (window.location.pathname === '/jobs') {
      scroll = window.pageYOffset
      return scroll;
    }
  })

  useEffect(() => {

    dispatch(refreshToken())
    dispatch(getAllJob())
    dispatch(getTypeJob())
    dispatch(getListCompany())
    dispatch(getTopCompany())

    setTimeout(() => {
      window.scrollTo({ top: scroll, behavior: 'smooth' })
    }, 100)

    const socket = io()
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket })
    return () => socket.close()
  }, [dispatch, scroll])

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token))
      dispatch(getSuggestions(auth.token))
      dispatch(getNotifies(auth.token))
      dispatch(getAllResume(auth))
      if (auth.isAdmin)
        dispatch(getAllUsers(auth.token))
    }
  }, [dispatch, auth.token, auth])


  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    else if (Notification.permission === "granted") { }
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") { }
      });
    }
  }, [])


  useEffect(() => {
    const newPeer = new Peer(undefined, {
      path: '/', secure: true
    })

    dispatch({ type: GLOBALTYPES.PEER, payload: newPeer })
  }, [dispatch])


  return (
    <Router>
      <Alert />

      <input type="checkbox" id="theme" />
      <div className={`App ${(status || modal) && 'mode'}`}>
        <Header />
        <div className="main">

          {/* {auth.token && <Header />} */}
          {status && <StatusModal />}
          {auth.token && <SocketClient />}
          {call && <CallModal />}
          <Switch>
            {/* <Route exact path="/" component={auth.token ? HomePage : Login} /> */}
            <Route exact path="/" component={HomePage} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/jobs" component={Jobs} />
            <Route exact path="/companys" component={Companys} />
            <Route exact path="/createCV" component={auth.token ? CreateCV : Login} />
            <Route exact path="/nhatuyendung" component={NhaTuyenDung} />
            <Route exact path="/activate/:activation_token" component={ActivationEmail} />
            <Route exact path="/forgot_password" component={ForgotPass} />
            <Route exact path="/reset/:token" component={ResetPass} />
            <Route exact path="/users" component={admin_profile} />
            <Route exact path="/manage_companies" component={admin_manage_company} />
            <Route exact path="/manage_post" component={admin_manage_post} />
            <Route exact path="/becomeCompany" component={becomeCompany} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/newJob" component={NewJob} />
            <Route exact path="/managejob/:id" component={ManageJob} />
            <Route exact path="/userList" component={UserList} />
            <Route exact path="/edit-job/:id" component={UpdateJob} />
            <Route exact path="/analysis/:id" component={AnalysisJob} />


            <PrivateRouter exact path="/:page" component={PageRender} />
            <PrivateRouter exact path="/:page/:id" component={auth.user ? PageRender : Login} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
