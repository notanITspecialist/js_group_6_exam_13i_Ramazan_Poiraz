import React from 'react';
import UserBar from "./UserBar";
import AnonimusBar from "./AnonimusBar";
import {useSelector} from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {NavLink} from "react-router-dom";
import {Button} from "@material-ui/core";

const NavBar = () => {
    const user = useSelector(state => state.user.user);

    const useStyles = makeStyles(() => ({
        root: {
            flexGrow: 1,
            marginBottom: '10px'
        }
    }));

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Container>
                    <Toolbar >
                        <Button
                            color='primary'
                            component={NavLink}
                            to='/'
                            exact
                            style={{
                                color: 'white',
                                fontWeight: 'bold',
                                padding: '10px 0 10px 10px'
                            }}
                            activeClassName='Mui-disabled'
                            id='institutionslist'
                        >
                            Institutions list
                        </Button>
                        {user.token ? (
                            <UserBar/>
                        ) : (
                            <AnonimusBar/>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
};

export default NavBar;