import React ,{ useState } from 'react'

// STYLE 
import './style.css'

function Login () {

    const [ nrp, setNrp ] = useState('')
    const [ password, setPassword ] = useState('') 
    const [ nrpEmpty, setNrpEmpty ] = useState(null)
    const [ passEmpty, setPassEmpty ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    const [ loginMessage, setLoginMessage ] = useState(null)

    const loginPersonilBtn = () => {
        // if(!nrp) {
        //     setLoginMessage(null)
        //     setNrpEmpty('(Masukkan NRP!)')
        // } else if(!password) {
        //     setLoginMessage(null)
        //     setPassEmpty('(Masukkan Password!)')
        // } else {
        //     setLoading(true)
        //     Axios.post(api + 'user/login-personil', {
        //         nrp, password
        //     })
        //     .then((res) => {
        //         if(!res.data.token) {
        //             setNrp('')
        //             setPassword('')
        //             setLoading(false)
        //             setLoginMessage(res.data.message)
        //         } else {
        //             localStorage.setItem('token', res.data.token)
        //             var data = res.data.data
        //             setLoginMessage('')
        //             setLoading(false)
        //             dispatch(loginPersonil(data))
        //             history.push('/')
        //         }
        //     })
        //     .catch((err) => {
        //         setLoading(false)
        //     })
        // }
    }

    const onChangeNrp = (e) => {
        setNrp(e.target.value)
        setNrpEmpty(null)
        setLoginMessage(null)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
        setPassEmpty(null)
        setLoginMessage(null)
    }


    return (
    <div className="login-container-01">

        {/* LOGIN BOX */}
        <div className='login-row-container'>

            {/* LEFT BOX */}
            <div className='login-form-container-left'>
                {/* <img src={Logo} alt="logo-musito"/> */}
                <span>Musito Police Report System</span>
                <span>
                    Sistem Pelaporan Kasus Kriminal Untuk Kepolisian Resort
                </span>
            </div>

            {/* RIGHT BOX */}
            <div className='login-form-container-right'>
                <div className='login-form-box'>
                <h3>Login Form</h3>
                    <div className='login-form-input'>
                        {/* {
                            nrp
                            ?
                            <> <label>NRP</label> <br /> </>
                            :
                            <> <label>NRP <span style={{ color: 'red', fontWeight: '350', fontSize: '12px' }}>{nrpEmpty}</span></label> <br /> </>
                        } */}
                        <input 
                            type="text" 
                            onChange={onChangeNrp}
                            value={nrp}
                        />
                    </div>

                    <div className='login-form-input' style={{marginTop: "15px"}}>
                        {
                            password
                            ?
                            <> <label>Password</label> <br /> </>
                            :
                            <> <label>Password <span style={{ color: 'red', fontWeight: '350', fontSize: '12px' }}>{passEmpty}</span> </label> <br /> </>
                        }
                        <input 
                            type="password" 
                            // onChange={onChangePassword}
                            // value={password}
                            />
                    </div>
                    
                    {/* {
                        loading
                        ?
                        <div style={{ marginTop: '30px' }}>
                        <Loader />
                        </div>
                        :
                        <>
                        <span style={{ color: 'red', marginTop: '30px', fontSize: '12px' }}>{loginMessage}</span>
                        <button onClick={loginPersonilBtn}>Login</button>
                        </>
                    } */}

                    <>
                        <span style={{ color: 'red', marginTop: '30px', fontSize: '12px' }}>{loginMessage}</span>
                        <button onClick={loginPersonilBtn}>Login</button>
                    </>

                </div>
            </div>

        </div>
    </div>
    )

}

export default Login