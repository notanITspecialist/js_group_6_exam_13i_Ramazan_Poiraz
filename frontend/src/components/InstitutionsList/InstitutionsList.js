import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getInstitutions} from "../../store/actions/institution";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {NavLink} from "react-router-dom";

const InstitutionsList = () => {
    const dispatch = useDispatch();

    const institutions = useSelector(state => state.institution.institutions);

    useEffect(() => {
        dispatch(getInstitutions());
    }, [dispatch])
    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap'
        }}>
            <b>Institutions</b>
            <Grid container>
                {institutions && institutions.map(e => (
                    <Grid item key={e._id} lg={3} md={4} sm={12} style={{padding: '2px'}}>
                        <Card style={{maxWidth: '500px', margin: '0 auto'}}>
                            {e.image ? <CardMedia
                                style={{height: '200px', width: '100%'}}
                                image={e.image}
                                title={e.title}
                            /> : <div style={{height: '200px', width: '100%'}}> </div>}
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {e.title}
                                </Typography>

                                <Typography gutterBottom variant="h5" component="h2">
                                    ({!isNaN(e.rating) ? e.rating : 0} rating, {e.reviews} reviews)
                                </Typography>

                                <Typography gutterBottom variant="h5" component="h2">
                                    {e.images} images
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    id="learnMore"
                                    size="small"
                                    color="primary"
                                    component={NavLink}
                                    to={'/institution/' + e._id}
                                >
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default InstitutionsList;