import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import Chart from 'react-apexcharts'

import { useSelector } from 'react-redux'

import StatusCard from '../../components/dashboard/status-card/StatusCard'

import Table from '../../components/dashboard/table/Table'

import Badge from '../../components/dashboard/badge/Badge'

import statusCards from '../../components/dashboard/status-card-data.json'

import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './assets/css/grid.css'
import './assets/css/theme.css'
import './assets/css/index.css'


import "./manage.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from '../dashboard/Dashboard'
import UserList from '../userList/UserList'
import User from '../user/User'
import NewJob from '../newJob/NewJob'
import ManageJob from '../managejob'
import UpdateJob from '../updatejob/[id]'
import UpdateJobs from '../../components/updateJob/UpdateJobs'

const chartOptions = {
    series: [{
        name: 'CV online',
        data: [40, 70, 20, 90, 36, 80, 30, 91, 60, 20]
    }, {
        name: 'CV offline',
        data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10]
    }],
    options: {
        color: ['#6ab04c', '#2980b9'],
        chart: {
            background: 'transparent'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        },
        legend: {
            position: 'top'
        },
        grid: {
            show: true
        }
    }
}

const topCustomers = {
    head: [
        'user',
        'total orders',
        'total spending'
    ],
    body: [
        {
            "username": "john doe",
            "order": "490",
            "price": "$15,870"
        },
        {
            "username": "frank iva",
            "order": "250",
            "price": "$12,251"
        },
        {
            "username": "anthony baker",
            "order": "120",
            "price": "$10,840"
        },
        {
            "username": "frank iva",
            "order": "110",
            "price": "$9,251"
        },
        {
            "username": "anthony baker",
            "order": "80",
            "price": "$8,840"
        }
    ]
}

const renderCusomerHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderCusomerBody = (item, index) => (
    <tr key={index}>
        <td>{item.username}</td>
        <td>{item.order}</td>
        <td>{item.price}</td>
    </tr>
)

const latestOrders = {
    header: [
        "order id",
        "user",
        "total price",
        "date",
        "status"
    ],
    body: [
        {
            id: "#OD1711",
            user: "john doe",
            date: "17 Jun 2021",
            price: "$900",
            status: "shipping"
        },
        {
            id: "#OD1712",
            user: "frank iva",
            date: "1 Jun 2021",
            price: "$400",
            status: "paid"
        },
        {
            id: "#OD1713",
            user: "anthony baker",
            date: "27 Jun 2021",
            price: "$200",
            status: "pending"
        },
        {
            id: "#OD1712",
            user: "frank iva",
            date: "1 Jun 2021",
            price: "$400",
            status: "paid"
        },
        {
            id: "#OD1713",
            user: "anthony baker",
            date: "27 Jun 2021",
            price: "$200",
            status: "refund"
        }
    ]
}

const orderStatus = {
    "shipping": "primary",
    "pending": "warning",
    "paid": "success",
    "refund": "danger"
}

const renderOrderHead = (item, index) => (
    <th key={index}>{item}</th>
)


const renderOrderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.user}</td>
        <td>{item.price}</td>
        <td>{item.date}</td>
        <td>
            <Badge type={orderStatus[item.status]} content={item.status} />
        </td>
    </tr>
)

const Manage = () => {



    return (
        <Router>
            <div className="manage_container" onLoad={window.scrollTo(0, 0)}>
                {/* <Sidebar /> */}
                <Switch>
                    <Route exact path="/dashboard">
                        <Dashboard />
                    </Route>
                    <Route path="/userList">
                        <UserList />
                    </Route>
                    <Route path="/user/:userId"> 
                        <User />
                    </Route>
                    <Route path="/newJob">
                        <NewJob />
                    </Route>
                    <Route path="/managejob">
                        <ManageJob />
                    </Route>
                    <Route path="/edit-job/:id">
                        
                        <UpdateJob />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default Manage
