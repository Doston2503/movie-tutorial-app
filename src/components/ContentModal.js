import React, {useEffect} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import axios from "axios";
import {api_key, imgUrl} from "../config/config";
import Carousel from "./Carousel";
import YouTubeIcon from '@mui/icons-material/YouTube';

const style = {
    position: 'absolute',
    top: '5%',
    left: '5%',
    width: "90%",
    height: "90%",
    bgcolor: '#39445A',
    p: 4,
    outline: "none"
};

function ContentModal({children, id, media_type}) {
    const [open, setOpen] = React.useState(false);
    const [link, setLink] = React.useState('');
    const [content, setContent] = React.useState({});
    const [carousel, setCarousel] = React.useState({});
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function getMoreInfo() {
        axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${api_key}&language=en-US`)
            .then((res) => {
                setContent(res.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function getCarouseInfo() {
        axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${api_key}&language=en-US`)
            .then((res) => {
                setCarousel(res.data.cast);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function getYoutubeLink() {
        axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${api_key}&language=en-US`)
            .then((res) => {
                setLink(res.data.results[0].key);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getMoreInfo();
        getCarouseInfo();
        getYoutubeLink()
    }, []);

    return (
        <>
            <div onClick={handleOpen} className="contend-modal">
                {children}
            </div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <div className="d-flex justify-content-between w-100 h-100 align-items-center">
                            <div className="w-25">
                                <img className="img-fluid" src={imgUrl + content?.poster_path} alt=""/>
                            </div>
                            <div className="w-75 p-5">
                                <div className="modal-title d-flex justify-content-center">
                                    {content?.title || content?.name}
                                    ({content?.last_air_date?.slice(0, 4) || content.release_date?.slice(0, 4)})
                                </div>
                                <i className="d-block mx-auto text-white text-center">
                                    {content?.tagline}
                                </i>
                                <div className="modal-overview">
                                    {content?.overview}
                                </div>
                                <Carousel carousel={carousel}/>

                                <a
                                    target="_blank"
                                    href={`https://www.youtube.com/watch?v=${link}`}
                                    className="modal-youtube-link"
                                >
                                    <YouTubeIcon className="me-2"/>
                                    WATCH THE TRAILER
                                </a>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>

        </>
    );
}

export default ContentModal;