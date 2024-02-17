import React, {useEffect} from 'react';
import axios from "axios";
import {api_key} from "../config/config";
import Chip from '@mui/material/Chip';

function Genres({setPage, type, genres, setGenres, selectedGenres, setSelectedGenres}) {

    function getGenres() {
        axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${api_key}&language=en-US`)
            .then((res) => {
                setGenres(res.data.genres);
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getGenres();
    }, []);

    function addGenres(item) {
        setSelectedGenres([...selectedGenres, item]);
        setGenres(genres.filter((g) => g.id !== item.id));
        setPage(1)
    }

    function removeGenres(item) {
        setGenres([...genres, item]);
        setSelectedGenres(selectedGenres.filter((g) => g.id !== item.id));
        setPage(1)
    }

    return (
        <div className="my-3">
            {selectedGenres && selectedGenres.map(item => (
                <Chip
                    color="primary"
                    className="m-1"
                    key={item.id}
                    label={item.name}
                    clickable
                    onDelete={()=>removeGenres(item)}
                />
            ))}

            {genres && genres.map(item => (
                <Chip
                    style={{backgroundColor: "white"}}
                    className="m-1"
                    key={item.id}
                    label={item.name}
                    clickable
                    onClick={() => addGenres(item)}
                />
            ))}
        </div>
    );
}

export default Genres;