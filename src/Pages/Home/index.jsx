import React from 'react'
import { Switch, Route ,  useHistory } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// COMPONENTS
import Navbar from '../../Components/Navbar'

// KANDANG
import Kandang from '../../Components/Kandang/Lokasi'
import UnitKandang from '../../Components/Kandang/Unit'
import BarisKandang from '../../Components/Kandang/Baris'
import LaporanHarian from '../../Components/Kandang/LaporanHarian'
import OwnerKandang from '../../Components/Kandang/Owner'

// TOKO
import HomeToko from '../../Components/Toko/Home'
import StockBarang from '../../Components/Toko/Barang'
import Supplier from '../../Components/Toko/Supplier'
import Sales from '../../Components/Toko/Sales'
import Customer from '../../Components/Toko/Customer'

// GUDANG
import GudangOwner from '../../Components/Gudang/Owner'
import GudangLokasi from '../../Components/Gudang/Lokasi'
import HomeGudang from '../../Components/Gudang/Home'
import StockBarangGudang from '../../Components/Gudang/Barang'
import GudangItem from '../../Components/Gudang/Item'
import SupplierGudang from '../../Components/Gudang/Supplier'
import SalesGudang from '../../Components/Gudang/Sales'
import CustomerGudang from '../../Components/Gudang/Customer'
import GudangCampuran from '../../Components/Gudang/Campuran'

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

            <h1 style={{ textAlign: "center" }}>Farm App</h1>

            <List>
                
                <ListItem 
                    button 
                    className={classes.sidebar}
                    style={
                        {
                            backgroundColor : route === "/toko" ? "#00698C" : null
                        }
                    }
                    onClick={() => history.push('/toko') }
                >
                    <ListItemIcon>
                        <ShoppingCartIcon style={{color : route === "/toko" ? "white" : null}} />
                    </ListItemIcon>
                    <p 
                        className={classes.sidebarText}
                        // style={{color : cekPathname() ? '#f16821' : "#888888"}}
                        style={{ color : route === "/toko" ? 'white' : null }}
                    > 
                        Toko
                    </p>
                </ListItem>

                <ListItem 
                    button 
                    className={classes.sidebar}
                    style={
                        {
                            backgroundColor : route === "/owner" ? "#00698C" : null
                        }
                    }
                    // onClick={() => history.push('/settings') }
                    // onClick={() => history.push('/kandang') }
                    onClick={() => history.push('/owner') }

                >
                    <ListItemIcon>
                        <ShoppingCartIcon style={{color : route === "/owner" ? "white" : null}} />
                    </ListItemIcon>
                    <p 
                        className={classes.sidebarText}
                        // style={{color : cekPathname() ? '#f16821' : "#888888"}}
                        style={{ color : route === "/owner" ? 'white' : null }}
                    > 
                        Kandang
                    </p>
                </ListItem>

                <ListItem 
                    button 
                    className={classes.sidebar}
                    style={
                        {
                            backgroundColor : route === "/gudang/owner" ? "#00698C" : null
                        }
                    }
                    onClick={() => history.push('/gudang/owner') }
                >
                    <ListItemIcon>
                        <ShoppingCartIcon style={{color : route === "/gudang/owner" ? "white" : null}} />
                    </ListItemIcon>
                    <p 
                        className={classes.sidebarText}
                        // style={{color : cekPathname() ? '#f16821' : "#888888"}}
                        style={{ color : route === "/gudang/owner" ? 'white' : null }}
                    > 
                        Gudang
                    </p>
                </ListItem>

                <ListItem 
                    button 
                    className={classes.sidebar}
                    style={
                        {
                            backgroundColor : route === "/doc" ? "#00698C" : null
                        }
                    }

                >
                    <ListItemIcon>
                        <ShoppingCartIcon style={{color : route === "/doc" ? "white" : null}} />
                    </ListItemIcon>
                    <p 
                        className={classes.sidebarText}
                        // style={{color : cekPathname() ? '#f16821' : "#888888"}}
                        style={{ color : route === "/doc" ? 'white' : null }}
                    > 
                        DOC
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
                    <Route path="/toko" component={HomeToko} />
                    <Route path="/stock-barang" component={StockBarang} />
                    <Route path="/supplier" component={Supplier}/>
                    <Route path="/sales" component={Sales}/>
                    <Route path="/customer" component={Customer}/>
                    
                    <Route path="/gudang/owner" component={GudangOwner}/>
                    <Route path="/gudang/lokasi" component={GudangLokasi}/>
                    <Route path="/gudang/toko/:id" component={HomeGudang} />
                    <Route path="/gudang/stock-barang" component={StockBarangGudang} />
                    <Route path="/gudang/supplier" component={SupplierGudang}/>
                    <Route path="/gudang/sales" component={SalesGudang}/>
                    <Route path="/gudang/customer" component={CustomerGudang}/>
                    <Route path="/gudang/item/:id" component={GudangItem} />
                    <Route path="/gudang/campuran/:id" component={GudangCampuran} />

                    <Route path="/owner" component={OwnerKandang}/>
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