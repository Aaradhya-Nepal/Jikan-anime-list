import React from "react";
import {useGlobalContext} from "../context/Global.jsx";
import styled from "styled-components";
import {Link} from "react-router-dom";

const Popular = () => {
    const {popularAnime, isSearch} = useGlobalContext();

    const conditionalRender = () => {
        if (!isSearch) {
            return popularAnime.map((anime) => {
                return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                    <img src={anime.images.jpg.large_image_url} alt="images"/>
                </Link>
            });
        }
    }

    return (
        <PopularStyled>
            <div className="popular-anime-container">
                {conditionalRender()}
            </div>
        </PopularStyled>
    );
};

const PopularStyled = styled.div`
    display: flex;

    .popular-anime-container {
        margin-top: 2rem;
        padding: 2rem 0 2rem 5rem;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 2rem;
        background-color: #fff;
        border-top: 5px solid #e5e7eb;
        a{
            height: 500px;
            border-radius: 7px;
            border: 5px solid #e5e7eb;
        }
        a img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 5px;
        }
    }
`;

export default Popular;