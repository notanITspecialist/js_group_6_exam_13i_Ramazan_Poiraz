import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {registerUser} from "../../store/actions/user";

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Registration = () => {
    const classes = useStyles();

    const initLoginForm = {
        username: '',
        password: '',
        displayName: '',
        avatar: ''
    };
    const [loginForm, setLoginForm] = useState(initLoginForm);
    const dispatch = useDispatch();

    const registerUserOnSubmit = async e => {
        e.preventDefault();

        const data = new FormData();

        Object.keys(initLoginForm).forEach(e => {
            data.append(e, loginForm[e])
        });

        dispatch(registerUser(data));
    };

    const changeLoginForm = e => setLoginForm({...loginForm, [e.target.name]: e.target.value});
    return (
        <Container component="main" maxWidth="xs">
            <Typography variant='h5'>Registration</Typography>
            <div className={classes.paper}>

                <form className={classes.form} noValidate onSubmit={registerUserOnSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={loginForm.username}
                        onChange={changeLoginForm}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={loginForm.password}
                        onChange={changeLoginForm}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="displayName"
                        label="Display name"
                        type="text"
                        id="displayName"
                        value={loginForm.displayName}
                        onChange={changeLoginForm}
                    />
                    <Grid>
                        <input
                            accept="image/*"
                            className={classes.input}
                            style={{ display: 'none'}}
                            id="raised-button-file"
                            multiple
                            type="file"
                            onChange={e => setLoginForm({...loginForm ,avatar: e.target.files[0]})}
                        />
                        <label htmlFor="raised-button-file">
                            <Button type='button' component="span" className={classes.button}>
                                Upload avatar
                            </Button>
                        </label>
                    </Grid>
                    <Button
                        id='register'
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </form>

            </div>
        </Container>
    );
};

export default Registration;