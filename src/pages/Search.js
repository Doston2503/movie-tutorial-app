import React, {useEffect, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from "axios";
import {api_key} from "../config/config";
import ContentItem from "../components/ContentItem";
import MoviePagination from "../components/MoviePagination";

function Search(props) {
    const [searchText, setSearchText] = useState('');
    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [pageOfNum, setPageOfNum] = useState(0);

    function getSearch() {
        axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${api_key}&language=en-US&query=${searchText}&page=${page}&include_adult=false`)
            .then((res) => {
                setContent(res.data.results);
                setPageOfNum(res.data.total_pages)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function handleKey(e) {
        if (e.key === "Enter") {
            getSearch();
        }
    }

    useEffect(() => {
        getSearch()
    }, [page, type]);

    return (
        <div className="content-page">
            <div className="search-page">
                <div className="search-item">
                    <input
                        onKeyPress={(e) => handleKey(e)}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="form-control"
                        placeholder="Search ..."
                        type="search"/>
                    <button className="searchBtn" onClick={getSearch}>
                        <SearchIcon/>
                    </button>
                </div>

                <Tabs value={type} onChange={(e, newValue) => {
                    setType(newValue);
                    setPage(1)
                }} aria-label="basic tabs example" className="search-tab">
                    <Tab style={{width: "20%"}} label="SEARCH MOVIES"/>
                    <Tab style={{width: "20%"}} label="SEARCH TV SERIES"/>
                </Tabs>

                <div className="all-content">
                    {
                        content && content.map((item) => (
                            <ContentItem
                                key={item.id}
                                id={item.id}
                                title={item.title || item.name}
                                poster_path={item.poster_path}
                                media_type={type ? "tv" : "movie"}
                                date={item.first_air_date || item.release_date}
                                vote_average={item.vote_average}

                            />
                        ))
                    }

                    {
                        searchText && content.length === 0 &&
                        (
                            type ? <h2 className="text-white">TV Series not found</h2> :
                                <h2 className="text-white">Movies not found</h2>
                        )
                    }
                </div>
                {
                    pageOfNum && pageOfNum > 1 &&
                    <MoviePagination setPage={setPage} pageOfNum={pageOfNum}/>
                }
            </div>
        </div>
    );
}

export default Search;