import React from 'react'
import { useHistory } from 'react-router-dom'

// STYLE
import '../style.css'

import AccessTimeIcon from '@material-ui/icons/AccessTime';

export default function Home() {
    const history = useHistory()

    return (
        <div className="owner-container">

        <h1>Welcome,  !</h1>
        <div style={{ display: "flex" }}>
            <h2>Your Store Overview</h2> 
            <button 
                style={{ 
                    height: "30px",
                    width: "70px",
                    marginTop: "18px",
                    marginLeft: "5px"
                }}
                className="detail-button">
                    Manage
            </button>
        </div>

        <div className="dashboard-content-02">

            <div 
            className="dashboard-box-content-02"
            style={{backgroundColor : "#20A8D8"}}
        >

            <div className="dbc-02-f">

                <div className="dbc-02-f-1">
                    2323
                </div>

                <div className="dbc-02-f-2">
                    Total Income
                </div>

            </div>

            <div className="dbc-02-s">

                <div className="dbc-02-s-1-c">
                    <AccessTimeIcon style={{ color : "white" , width : 17 , height : 17 }}/>
                    <div className="dbc-02-s-1">
                        update : 11 Aug 2020
                    </div>
                </div>

                <div className="dbc-02-s-2">
                    04:44:59
                </div>

            </div>

        </div>

            <div 
            className="dashboard-box-content-02"
            style={{backgroundColor : "#63C2DE"}}
            >

            <div className="dbc-02-f">

                <div className="dbc-02-f-1">
                    3223
                </div>

                <div className="dbc-02-f-2">
                    Barang
                <button className="btn-show-dashboard-01" onClick={() => history.push('/stock-barang')}>Show</button>
                </div>
            </div>

            <div className="dbc-02-s">

                <div className="dbc-02-s-1-c">
                    <AccessTimeIcon style={{ color : "white" , width : 17 , height : 17 }}/>
                    <div className="dbc-02-s-1">
                        update : 11 Aug 2020
                    </div>
                </div>

                <div className="dbc-02-s-2">
                    04:44:59
                </div>

            </div>

            </div>

            <div 
            className="dashboard-box-content-02"
            style={{backgroundColor : "#FEC106"}}
            >

            <div className="dbc-02-f">

                <div className="dbc-02-f-1">
                    2432
                </div>

                <div className="dbc-02-f-2">
                    Supplier
                    <button className="btn-show-dashboard-01" onClick={() => history.push('/supplier')}>Show</button>
                </div>

            </div>

            <div className="dbc-02-s">

                <div className="dbc-02-s-1-c">
                    <AccessTimeIcon style={{ color : "white" , width : 17 , height : 17 }}/>
                    <div className="dbc-02-s-1">
                        update : 11 Aug 2020
                    </div>
                </div>

                <div className="dbc-02-s-2">
                    04:44:59
                </div>

            </div>

            </div>

            <div 
            className="dashboard-box-content-02"
            style={{backgroundColor : "#F86C6B"}}
            >

            <div className="dbc-02-f">

                <div className="dbc-02-f-1">
                  32232
                </div>

                <div className="dbc-02-f-2">
                    Presentase
                </div>

            </div>

            <div className="dbc-02-s">

                <div className="dbc-02-s-1-c">
                    <AccessTimeIcon style={{ color : "white" , width : 17 , height : 17 }}/>
                    <div className="dbc-02-s-1">
                        update : 11 Aug 2020
                    </div>
                </div>

                <div className="dbc-02-s-2">
                    04:44:59
                </div>

            </div>

            </div>    

        </div>

      

        
    </div>
    )
}
