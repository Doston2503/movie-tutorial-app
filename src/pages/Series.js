import React, {useEffect, useState} from 'react';
import ContentItem from "../components/ContentItem";
import MoviePagination from "../components/MoviePagination";
import axios from "axios";
import {api_key, useGenres} from "../config/config";
import Genres from "../components/Genres";

function Series(props) {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [pageOfNum, setPageOfNum] = useState();
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const genreForUrl = useGenres(selectedGenres);

    function getAllSeries() {
        axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForUrl}`)
            .then((res) => {
                setContent(res.data.results);
                setPageOfNum(res.data.total_pages);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getAllSeries()
    }, [page,genreForUrl]);

    return (
        <div className="content-page">
            <div className="page-title">
                DISCOVER TV SERIES
            </div>

            <Genres
                type="tv"
                genres={genres}
                setGenres={setGenres}
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                setPage={setPage}
            />

            <div className="all-content">
                {
                    content && content.map((item) => (
                        <ContentItem
                            key={item.id}
                            id={item.id}
                            title={item.title || item.name}
                            poster_path={item.poster_path}
                            media_type={"tv"}
                            date={item.first_air_date || item.release_date}
                            vote_average={item.vote_average}

                        />
                    ))
                }
            </div>

            <MoviePagination setPage={setPage} pageOfNum={pageOfNum}/>
        </div>
    );
}

export default Series;