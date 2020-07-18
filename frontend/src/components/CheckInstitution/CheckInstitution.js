import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    addImage,
    addReview,
    deleteImage,
    deleteInstitution,
    deleteReview,
    getInstitution
} from "../../store/actions/institution";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import SendIcon from '@material-ui/icons/Send';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import {makeStyles} from "@material-ui/core/styles";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '100%',
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: '#fff',
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    absolute: {
        position: 'absolute',
        left: '12%'
    },
    relative: {
        position: 'relative'
    }
}));

const CheckInstitution = props => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const user = useSelector(state => state.user.user);

    const institution = useSelector(state => state.institution.institution);

    const [image, setImage] = useState(null);

    const initialReview = {
        comment: '',
        quality: '',
        service: '',
        interior: ''
    };
    const [review, setReview] = useState(initialReview);

    const changeReviewForm = e => setReview({...review, [e.target.name]: e.target.value});

    const addImageSuccess = e => {
        e.preventDefault();

        if (image && image.image) {
            const data = new FormData();

            data.append('image', image.image)

            dispatch(addImage(institution._id, data));

            setImage(null);
        }
    };

    const addReviewSuccess = e => {
        e.preventDefault();

        if (
            review.comment !== '' &&
            review.quality !== '' &&
            review.service !== '' &&
            review.interior !== ''
        ) {
            dispatch(addReview(institution._id, review));

            setReview(initialReview);
        }
    };

    useEffect(() => {
        dispatch(getInstitution(props.match.params.id))
    }, [dispatch, props.match.params.id]);
    return (
        <div style={{paddingBottom: '40px'}}>
            <div style={{display: 'flex'}}>
                <div style={{width: '50%'}}>
                    <Typography variant='h3'>
                        {institution.title}
                    </Typography>

                    <p>
                        {institution.description}
                    </p>
                </div>

                <img style={{margin: '0 50px 0 auto', maxWidth: '400px'}} src={institution.image}
                     alt={institution.title}/>

            </div>
            {user.role === 'admin' &&
            <Button onClick={() => {
                dispatch(deleteInstitution(institution._id))
                props.history.push('/')
            }
            } variant="contained" color="secondary">
                Delete institution
            </Button>
            }
            <hr/>

            {institution && institution.images &&
            <div className={classes.root}>
                <GridList className={classes.gridList} cols={2.5}>
                    {institution.images.map((tile) => (
                        <GridListTile key={tile._id}>
                            <img src={tile.image} alt={tile._id}
                                 style={{height: '100%', maxWidth: '100%', position: 'relative'}}/>
                            <GridListTileBar
                                title={
                                    <span>by: {tile.user.displayName}
                                        {user.role === 'admin' &&
                                        <Button onClick={() => {
                                            dispatch(deleteImage(tile._id))
                                            dispatch(getInstitution(props.match.params.id))
                                        }
                                        } style={{position: 'absolute', right: '4px', bottom: '4px'}}
                                                variant="contained" color="secondary">
                                            Delete
                                        </Button>
                                        }
                                </span>
                                }
                                classes={{
                                    root: classes.titleBar,
                                    title: classes.title,
                                }}
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
            }
            <hr/>
            <Typography variant='h5'>Ratings</Typography>
            {institution && institution.ratings &&
            <Card style={{marginBottom: '5px'}}>
                <CardContent>
                    <div className={classes.relative}>
                        <b>Overall: </b>
                        <b
                            style={{fontSize: '17px'}}
                            className={classes.absolute}
                        >
                            {((
                                Number(institution.ratings.quality) +
                                Number(institution.ratings.service) +
                                Number(institution.ratings.interior)
                            ) / 3).toString().slice(0, 3)}</b>
                    </div>
                    <div className={classes.relative}>
                        <b>Quality of food: </b> <span className={classes.absolute}>{institution.ratings.quality}</span>
                    </div>
                    <div className={classes.relative}>
                        <b>Service quality: </b> <span className={classes.absolute}>{institution.ratings.service}</span>
                    </div>
                    <div className={classes.relative}>
                        <b>Interior: </b> <span className={classes.absolute}>{institution.ratings.interior}</span>
                    </div>


                </CardContent>
            </Card>}
            <hr/>
            <Typography variant='h5'>Reviews</Typography>

            <div style={{
                maxHeight: '500px',
                overflowY: 'scroll'
            }}>
                {institution && institution.reviews && institution.reviews.map(e => (
                    <Card key={e._id} style={{marginBottom: '5px', position: 'relative'}}>
                        <CardContent>
                        <span>
                            <Typography style={{display: 'inline-block', marginRight: '5px'}} variant='h5'
                                        color="textSecondary" gutterBottom>
                                {e.user.displayName}
                            </Typography>
                             <span>
                                  at {e.date}
                             </span>
                        </span>

                            <p style={{margin: '0'}}>
                                {e.comment}
                            </p>

                            <div className={classes.relative}>
                                <b>Overall: </b> <b style={{fontSize: '17px'}}
                                                    className={classes.absolute}>{((e.quality + e.service + e.interior) / 3).toString().slice(0, 3)}</b>
                            </div>
                            <div className={classes.relative}>
                                <b>Quality of food: </b> <span className={classes.absolute}>{e.quality}</span>
                            </div>
                            <div className={classes.relative}>
                                <b>Service quality: </b> <span className={classes.absolute}>{e.service}</span>
                            </div>
                            <div className={classes.relative}>
                                <b>Interior: </b> <span className={classes.absolute}>{e.interior}</span>
                            </div>
                            {user.role === 'admin' &&
                            <Button onClick={() => {
                                dispatch(deleteReview(e._id))
                                dispatch(getInstitution(props.match.params.id))
                            }
                            } style={{position: 'absolute', right: '4px', bottom: '4px'}} variant="contained"
                                    color="secondary">
                                Delete
                            </Button>
                            }

                        </CardContent>
                    </Card>
                ))}
            </div>

            {user.username &&
            <>
                {institution && institution.reviews && institution.reviews.find(review => review.user._id.toString() === user._id.toString()) ?
                    <Button onClick={() => {
                        const review = institution.reviews.find(review => review.user._id.toString() === user._id.toString())
                        dispatch(deleteReview(review._id))
                        dispatch(getInstitution(props.match.params.id))
                    }} variant="contained"
                            color="secondary">
                        Delete you review
                    </Button>
                :
                <form onSubmit={addReviewSuccess}>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="comment"
                        label="Comment"
                        name="comment"
                        rows={4}
                        multiline
                        value={review.comment}
                        onChange={changeReviewForm}
                    />

                    <div style={{display: 'flex', marginBottom: '20px'}}>
                        <FormControl style={{width: '125px', marginRight: '20px'}}>
                            <InputLabel id="Quality-of-food">Quality of food</InputLabel>
                            <Select
                                required
                                labelId="Quality-of-food"
                                id="quality"
                                name='quality'
                                value={review.quality}
                                onChange={changeReviewForm}
                            >
                                <MenuItem id='quality-1' value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl style={{width: '125px', marginRight: '20px'}}>
                            <InputLabel id="Service-quality">Service quality</InputLabel>
                            <Select
                                required
                                labelId="Service-quality"
                                id="service"
                                name='service'
                                value={review.service}
                                onChange={changeReviewForm}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem id='service-3' value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl style={{width: '125px', marginRight: '20px'}}>
                            <InputLabel id="interior">Interior</InputLabel>
                            <Select
                                required
                                labelId="interior"
                                id="interior"
                                name='interior'
                                value={review.interior}
                                onChange={changeReviewForm}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem id='interior-5' value={5}>5</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <Button
                        style={{width: '400px'}}
                        id='addComment'
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Add comment
                    </Button>
                </form>
                }


                <hr/>

                {image && <span style={{display: 'block', padding: '10px 0'}}>
                <b>image name: </b>{image.image.name}
                </span>}
                <Grid style={{display: 'inline-block'}}>
                    <input
                        accept="image/*"
                        style={{display: 'none'}}
                        id="raised-button-file"
                        required
                        multiple
                        type="file"
                        onChange={e => setImage({...image, image: e.target.files[0]})}
                    />
                    <label htmlFor="raised-button-file">
                        <Button type='button' component="span" variant="contained" color='primary'>
                            Upload image
                        </Button>
                    </label>
                </Grid>

                <Button
                    style={{marginLeft: '10px'}}
                    variant="contained"
                    color='primary'
                    endIcon={<SendIcon/>}
                    onClick={addImageSuccess}
                >
                    Send
                </Button>
            </>
            }
        </div>
    );
};

export default CheckInstitution;