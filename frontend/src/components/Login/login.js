import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {loginUser} from "../../store/actions/user";

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = props => {

    const classes = useStyles();

    const initLoginForm = {
        username: '',
        password: ''
    };
    const [loginForm, setLoginForm] = useState(initLoginForm);
    const dispatch = useDispatch();

    const registerUserOnSubmit = async e => {
        e.preventDefault();
        await dispatch(loginUser(loginForm));
    };

    const changeLoginForm = e => setLoginForm({...loginForm, [e.target.name]: e.target.value});
    return (
        <Container component="main" maxWidth="xs">
            <Typography variant='h5'>Login</Typography>
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
                    <Button
                        id='login'
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

export default Login;