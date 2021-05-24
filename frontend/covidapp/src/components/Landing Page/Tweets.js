import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TimeAgo from 'timeago-react';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    StatusText: {
        color: "rgb(0,51,102)"
    },
}));


export default function Tweets() {
    const classes = useStyles()
    const [city, setCity] = useState('')
    const [tweets, setTweets] = useState([{}])

    const handleChange = (e) => {
        setCity(e.target.value);
    }

    const TWEETS_SEARCH_API = `https://covidconnect.vercel.app/api/1.1/data?city=${city}&max_results=25`

    useEffect(() => {
        const getTweets = async () => {
            const res = await axios.get(TWEETS_SEARCH_API);
            const data = res.data.response.api_response.statuses;
            return new Promise((resolve, _) => resolve(data));
            // setTweets(data);
        }
        if (city != '') {
            getTweets().then(res => setTweets(res))
            console.log(tweets)
        }
    }, [city])

    return (
        <Grid container justify='center' alignItems='center'>
            <Box p={10}>
                <Typography variant='h5' gutterBottom className={classes.StatusText}>
                    Type a city name below to get related Tweets
                </Typography>
                <TextField
                    variant='outlined'
                    name='city'
                    fullWidth
                    value={city}
                    onChange={handleChange}
                />
            </Box>

            {/* {
                tweets.map((tweet) => 
                    (
                        <Grid item xs={12}>
                            {tweet.full_text}
                        </Grid>
                ))
            } */}

            {tweets.map((result, id) => (
                <div key={id} className="flex justify-start text-gray-700  bg-gray-200 dark:bg-gray-1100 whitespace-pre-wrap  rounded-md px-2 py-2 my-2">

                    <div className="px-2 w-full">
                        <div className="flex flex-row justify-between text-sm my-1 dark:text-primary-400 font-normal text-black-500 tracking-wide">
                            <TimeAgo
                                datetime={result.created_at}
                            />
                            <span className="pb-1 text-sm font-semibold text-gray-700 mb-2">
                                <FontAwesomeIcon icon={faTwitter} />
                                <a
                                    href={`https://twitter.com/i/web/status/${result.id_str}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    key={result.id_str}
                                    className="ml-2">
                                    Open in Twitter
                                </a>
                            </span>
                        </div>

                        <div className="flex-grow text-black dark:text-white font-semibold">
                            {result.full_text}
                        </div>
                    </div>
                </div>)
            )}

        </Grid>
    )
}