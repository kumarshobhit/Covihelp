import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';

const Dashboard = () => {

    return (
        <Grid container spacing={3}>
            <h2>My Profile</h2>
            <strong>First name: </strong>{userData.firstname} <br></br>
            <strong>Last name: </strong>{userData.lastname} <br></br>
            <strong>Email: </strong>{userData.email} <br></br>
            <strong>Customer ID: </strong>{userData.id} <br></br>
            <Button href='/mybookings'>View My Bookings</Button>
        </Grid>
    )
}