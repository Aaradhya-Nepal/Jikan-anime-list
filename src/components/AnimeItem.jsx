import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {baseURL} from "../context/Global.jsx";
import styled from "styled-components";

const AnimeItem = () => {
    //getting the url id
    const {id} = useParams();

    //use states
    const [anime, setAnime] = useState({});
    const [characters, setCharacters] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [episode, setEpisode] = useState();

    //destructuring anime
    const {
        title,
        synopsis,
        trailer,
        duration,
        aired,
        season,
        images,
        rank,
        score,
        scored_by,
        popularity,
        status,
        rating,
        source
    } = anime;

    //getting anime by id
    const getAnimeById = async (animeId) => {
        const response = await fetch(`${baseURL}/anime/${animeId}`);
        const data = await response.json();
        setAnime(data.data);
    }

    //getting characters by id
    const getAnimeCharactersById = async (animeId) => {
        const response = await fetch(`${baseURL}/anime/${animeId}/characters`);
        const data = await response.json();
        setCharacters(data.data);
    }

    // we cannot get the anime episode because mal has anime only for premium users
    // const getAnimeEpisodesById = async (animeId, episodeId) => {
    //     const response = await fetch(`${baseURL}/anime/${animeId}/episodes/${episodeId}`);
    //     const data = await response.json();
    //     console.log(data.data)
    //     setEpisode(data.data);
    //
    // }

    useEffect(() => {
        getAnimeById(id);
        getAnimeCharactersById(id);
        // getAnimeEpisodesById(id, 1);
    }, [])

    return (
        <AnimeItemStyled>
            <div className="title">
                <h2>{title}</h2>
            </div>
            <div className="details-container">
                <div className="details">
                    <div className="image"><img src={images?.jpg.large_image_url} alt=""/></div>
                    <div className="anime-details">
                        <p><span>Aired:</span><span>{aired?.string}</span></p>
                        <p><span>Rating:</span><span>{rating}</span></p>
                        <p><span>Rank:</span><span>{rank}</span></p>
                        <p><span>Score:</span><span>{score}</span></p>
                        <p><span>Scored By:</span><span>{scored_by}</span></p>
                        <p><span>Popularity:</span><span>{popularity}</span></p>
                        <p><span>Status:</span><span>{status}</span></p>
                        <p><span>Source:</span><span>{source}</span></p>
                        <p><span>Season:</span><span>{season}</span></p>
                        <p><span>Duration:</span><span>{duration}</span></p>
                    </div>
                </div>
                <div className="description">
                    {showMore ? synopsis : synopsis?.substring(0, 450) + '...'}
                    <button onClick={() => {
                        setShowMore(!showMore);
                    }}>{showMore ? 'Show Less' : 'Read More'}</button>
                </div>
            </div>
            <h3 className="title">Trailer</h3>
            <div className="trailer-container">
                {trailer?.embed_url &&
                    <iframe
                        src={trailer?.embed_url}
                        title={title}
                        width="800"
                        height="450"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                        allowFullScreen>
                    </iframe>
                }
            </div>
            <h3 className="title">Characters</h3>
            <div className="characters">
                {characters.map((character, index) => {
                    const {role} = character;
                    const {images, name, mal_id} = character.character;
                    return <Link to={`/character/${mal_id}`} key={index}>
                        <div className="character">
                            <img src={images?.jpg.image_url} alt=""/>
                            <h4>{name}</h4>
                            <p>{role}</p>
                        </div>
                    </Link>
                })}
            </div>
        </AnimeItemStyled>
    );
};

const AnimeItemStyled = styled.div`
    padding: 3rem 18rem;
    background-color: #EDEDED;

    h1 {
        display: inline-block;
        font-size: 3rem;
        margin-bottom: 1.5rem;
        cursor: pointer;
        background: linear-gradient(to right, #A855F7, #27AE60);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        transition: all .4s ease-in-out;

        &:hover {
            transform: skew(-3deg);
        }
    }

    .title {
        display: inline-block;
        margin: 3rem 0;
        font-size: 2rem;
        cursor: pointer;
        background: linear-gradient(to right, #A855F7 23%, #27AE60);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .description {
        margin-top: 2rem;
        color: #6c7983;
        line-height: 1.7rem;

        button {
            background-color: transparent;
            border: none;
            outline: none;
            cursor: pointer;
            font-size: 1.2rem;
            color: #27AE60;
            font-weight: 600;
        }
    }

    .trailer-container {
        display: flex;
        justify-content: center;
        align-items: center;

        iframe {
            outline: none;
            border: 5px solid #e5e7eb;
            padding: 1.5rem;
            border-radius: 10px;
            background-color: #FFFFFF;
        }
    }

    .details-container {
        background-color: #fff;
        border-radius: 20px;
        padding: 2rem;
        border: 5px solid #e5e7eb;

        .details {
            display: grid;
            grid-template-columns: repeat(2, 1fr);

            img {
                border-radius: 7px;
            }
        }

        .anime-details {
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            p {
                display: flex;
                gap: 1rem;
            }

            p span:first-child {
                font-weight: 600;
                color: #454e56;
            }
        }
    }

    .characters {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: 2rem;
        background-color: #fff;
        padding: 2rem;
        border-radius: 20px;
        border: 5px solid #e5e7eb;

        .character {
            padding: .4rem .6rem;
            border-radius: 7px;
            background-color: #EDEDED;
            transition: all .4s ease-in-out;

            img {
                width: 100%;
            }

            h4 {
                padding: .5rem 0;
                color: #454e56;
            }

            p {
                color: #27AE60;
            }

            &:hover {
                transform: translateY(-5px);
            }
        }
    }
`;

export default AnimeItem;