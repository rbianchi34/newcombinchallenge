import React, { useEffect } from "react";
import makeStyles from "@mui/styles/makeStyles";
import PeopleManager from './containers/PeopleManager';
import { Box, AppBar, Toolbar, Container, Button, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
import {
    Routes,
    Route,
} from "react-router-dom";
import axios from "axios";



const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        width: "100%"
    },
}));

function Main() {
    const classes = useStyles();
    const navigate = useNavigate();

    useEffect(() => {
        axios.post("http://localhost:8081/auth", { username: "sarah", password: "connor" })
            .then((response) => {
                localStorage.setItem("token", response.data.token)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])
    return (
        <>
            <CssBaseline />
            <AppBar position="static" >
                <Container maxWidth="xl" sx={{ marginLeft: 1, marginRight: 1 }}>
                    <Toolbar disableGutters >
                        <Box sx={{
                            flexGrow: 1, display: { md: 'flex' }
                        }}>
                            < Button
                                onClick={() => { navigate("/") }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <Typography variant={"h5"}>Home</Typography>
                            </Button>
                            <Button
                                onClick={() => { navigate("/other") }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <Typography variant={"h6"}>Other Page</Typography>
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar >
            <main
                className={classes.content}
            >
                <Box sx={{ paddingLeft: 2, paddingRight: 2, paddingTop: 1 }}>
                    <Routes >
                        <Route
                            exact
                            path="/"
                            element={<PeopleManager />}
                        />
                        <Route
                            exact
                            path="/other"
                            element={<Typography variant="h4">There's nothing here yet...</Typography>}
                        />
                        <Route path='*' element={<Typography variant="h4">Not Found</Typography>} />
                    </Routes >
                </Box>
            </main>
            <AppBar position="fixed" color="secondary" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Typography>Copyright</Typography>
                    <Typography>All rights reserved</Typography>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Main;