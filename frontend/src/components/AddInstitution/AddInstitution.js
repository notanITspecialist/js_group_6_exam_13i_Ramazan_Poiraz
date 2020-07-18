import React, {useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {useDispatch, useSelector} from "react-redux";
import {addInstitution} from "../../store/actions/institution";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Alert from "@material-ui/lab/Alert";

const AddInstitution = () => {

    const dispatch = useDispatch();

    const error = useSelector(state => state.institution.error);

    const initialInstitution = {
        title: '',
        image: '',
        description: '',
        agreement: false
    }
    const [institution, setInstitution] = useState(initialInstitution);

    const changeInstitutionForm = e => setInstitution({...institution, [e.target.name]: e.target.value});

    const addInstitutionOnSubmit = e => {
        e.preventDefault()

        const data = new FormData();

        Object.keys(initialInstitution).forEach(e => {
            data.append(e, institution[e])
        });

        dispatch(addInstitution(data));
    };
    return (
        <div style={{width: '40%', margin: '0 auto'}}>
            <form onSubmit={addInstitutionOnSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoFocus
                    value={institution.title}
                    onChange={changeInstitutionForm}
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    rows={4}
                    multiline
                    value={institution.description}
                    onChange={changeInstitutionForm}
                />

                <Grid>
                    <input
                        accept="image/*"
                        style={{ display: 'none'}}
                        id="raised-button-file"
                        multiple
                        type="file"
                        onChange={e => setInstitution({...institution ,image: e.target.files[0]})}
                    />
                    <label htmlFor="raised-button-file">
                        <Button type='button' component="span">
                            Upload image
                        </Button>
                    </label>
                </Grid>

                <hr />

                <b>Лицензионное соглашение:</b>
                <p>

                    ЫЫыыафы бла бла бла бла, ааыаы почему ыыыы если вы согласитесь то сможете загружать фото
                    пум пум пум пум пум
                </p>

                <FormControlLabel
                    control={
                        <Checkbox
                            id='checkbox'
                            checked={institution.agreement}
                            onChange={e => setInstitution({...institution, agreement: e.target.checked})}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    }
                    label="Do you agree with the license agreement?"
                />

                <hr />

                {error.response && error.response.data && <Alert severity="error">{error.response.data}</Alert>}


                <Button
                    id='addPlace'
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Create institution
                </Button>
            </form>
        </div>
    );
};

export default AddInstitution;