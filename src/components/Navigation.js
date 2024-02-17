import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import {useState} from "react";
import {useEffect} from "react";
import {useHistory, useLocation} from "react-router-dom";

const style = {
    position: "fixed",
    bottom: 0,
    width: "100%",
    backgroundColor: "#2D313A",
    height: "60px"
};

export default function Navigation() {
    const location = useLocation();
    const [value, setValue] = useState(location.pathname === '/' ? 0 :
        location.pathname === '/movies' ? 1 : location.pathname === '/series' ? 2 : 3);
    const history = useHistory();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {

        if (value === 0) {
            history.push('/')
        } else if (value === 1) {
            history.push('/movies')
        } else if (value === 2) {
            history.push('/series')
        } else if (value === 3) {
            history.push('/search')
        }

    }, [value]);


    return (
        <BottomNavigation
            value={value}
            onChange={handleChange}
            showLabels
            style={style}>
            <BottomNavigationAction
                style={{color: "white"}}
                label="Trending"
                icon={<WhatshotIcon/>}
            />
            <BottomNavigationAction
                style={{color: "white"}}
                label="Movies"
                icon={<MovieCreationIcon/>}
            />
            <BottomNavigationAction
                style={{color: "white"}}
                label="TV Series"
                icon={<TvIcon/>}
            />
            <BottomNavigationAction
                style={{color: "white"}}
                label="Search"
                icon={<SearchIcon/>}/>
        </BottomNavigation>
    );
}