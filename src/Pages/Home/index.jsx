import React from 'react'
import { Switch, Route ,  useHistory } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// COMPONENTS
import Navbar from '../../Components/Navbar'
import Kandang from '../../Components/Kandang/Lokasi'
import UnitKandang from '../../Components/Kandang/Unit'
import BarisKandang from '../../Components/Kandang/Baris'
import LaporanHarian from '../../Components/Kandang/LaporanHarian'

// MATERIAL UI
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { useTheme } from "@material-ui/core/styles";

// MATERIAL UI ICON
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

// STYLE
import './style.css'
import useStyles from './style'

// IMAGE
// import Logo from '../../Images/Sidebar/musito.jpeg'


function Home () {

    // const jabatanState = useSelector(state => state.user.jabatan)
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory()
    const route = history.location.pathname

    const drawer = (
        <div >
            
        <div className={classes.toolbar} />
            <div className={classes.imgContainer}>
            {/* <img src={logoSgu} className={classes.logosgu} alt="img" /> */}
                <div style={{marginBottom : 30}}>
                    {/* <img src={Logo} style={{ width: 120, cursor: "pointer"}} alt="logo"/> */}
                </div>
            </div>

            <List>
                
                <ListItem 
                    button 
                    className={classes.sidebar}
                    style={
                        {
                            backgroundColor : route === "/settings" ? "#00698C" : null
                        }
                    }
                >
                    <ListItemIcon>
                        <ShoppingCartIcon style={{color : route === "/settings" ? "white" : null}} />
                    </ListItemIcon>
                    <p 
                        className={classes.sidebarText}
                        // style={{color : cekPathname() ? '#f16821' : "#888888"}}
                        style={{ color : route === "/settings" ? 'white' : null }}
                    > 
                        Toko
                    </p>
                </ListItem>

                <ListItem 
                    button 
                    className={classes.sidebar}
                    style={
                        {
                            backgroundColor : route === "/kandang" ? "#00698C" : null
                        }
                    }
                    // onClick={() => history.push('/settings') }
                    onClick={() => history.push('/kandang') }

                >
                    <ListItemIcon>
                        <ShoppingCartIcon style={{color : route === "/kandang" ? "white" : null}} />
                    </ListItemIcon>
                    <p 
                        className={classes.sidebarText}
                        // style={{color : cekPathname() ? '#f16821' : "#888888"}}
                        style={{ color : route === "/kandang" ? 'white' : null }}
                    > 
                        Kandang
                    </p>
                </ListItem>


            </List>
        </div>
    );


    return (
        <div 
            className={classes.root} 
        >
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar} style={{ boxShadow: 'none' }}>
                <Navbar />
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders" >
                <Hidden smUp implementation="css">
                    <Drawer
                        // container={container}
                        variant="temporary"
                        anchor={theme.direction === "rtl" ? "right" : "left"}
                        // open={mobileOpen}
                        // onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        ModalProps={{
                            keepMounted: true // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                        paper: classes.drawerPaper
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            {/* <Notification /> */}

            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <Switch>
                    <Route path="/kandang" component={Kandang}/>
                    <Route path="/unit-kandang/:id" component={UnitKandang}/>
                    <Route path="/:idLocation/baris/:idUnit" component={BarisKandang}/>
                    <Route path="/laporan-harian/:idLocation/:idUnit/:idBaris" component={LaporanHarian}/>
                    {/* <Route path="/settings" component={Settings}/> */}
                </Switch>
            </main>

        </div>
    )

}

export default Home