import React from 'react';
import {imgUrl} from "../config/config";
import ContentModal from "./ContentModal";

function ContentItem({id, title, poster_path, media_type, date, vote_average}) {
    return (
        <ContentModal id={id} media_type={media_type}>
            <div className="card content-item border-0">
                <div className="card-header">
                    <img className="img-fluid"
                         src={poster_path ? imgUrl + poster_path : '/assets/images/unavailable.webp'} alt=""/>
                    <div
                        className={vote_average > 8 ? "overlay" : vote_average > 6 ? "overlay overlay-warning" : "overlay overlay-danger"}>
                        {vote_average && vote_average.toFixed(1)}
                    </div>
                </div>
                <div className="card-body">
                    <div className="card-title">
                        {title}
                    </div>

                    <div className="d-flex justify-content-between">
                        <p>{media_type === 'tv' ? "TV Series" : "Movies"}</p>
                        <p>{date}</p>
                    </div>
                </div>
            </div>
        </ContentModal>
    );
}

export default ContentItem;