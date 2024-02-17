import React, {useEffect, useState} from 'react';
import axios from "axios";
import {api_key} from "../config/config";
import ContentItem from "../components/ContentItem";
import MoviePagination from "../components/MoviePagination";

function Trending(props) {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState([]);

    function getAllContent() {
        axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}&page=${page}`)
            .then((res) => {
                setContent(res.data.results);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getAllContent()
    }, [page]);

    return (
        <div className="content-page">
            <div className="page-title">
                TRENDING TODAY
            </div>

            <div className="all-content">
                {
                    content && content.map((item) => (
                        <ContentItem
                            key={item.id}
                            id={item.id}
                            title={item.title || item.name}
                            poster_path={item.poster_path}
                            media_type={item.media_type}
                            date={item.first_air_date || item.release_date}
                            vote_average={item.vote_average}

                        />
                    ))
                }
            </div>

            <MoviePagination setPage={setPage}/>
        </div>
    );
}

export default Trending;