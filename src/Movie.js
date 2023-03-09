import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import CommonStyle from './style/Grobal';

//style 

const Wapper = styled.div`

`
const MovieListWrapper = styled.section`

`
const Inner = styled.div`
width: 1600px;
margin: 0 auto;
`
const GridLayout = styled.ul`
display: grid;
grid-template-columns: repeat(5, 1fr);
gap: 10px;
`

const GridItm = styled.li`
position: relative;
`

const Img = styled.img``

const Title = styled.strong`
position: absolute;
top: 20px;
left: 20px;
right: 20px;
color: #fff;
`
const Desc = styled.span`
position: absolute;
bottom: 0;
left: 0;
right: 0;
color: #fff;
background: rgba(0,0,0,0.5);
padding: 20px;
font-size: 14px;
min-height: 100px;
`

const Movie = () => {
    //영화 데이타를 가져오기 (데이터는 시간이 걸리는 일이므로... 비동기식으로 처리한다.)
    //영화데이타를 그리기 state(리액터가 그려줄 수 있게)

    const [movie, setMovie] = useState([]);
    const [movieList, setMovieList] = useState({});

    const getMovie = async () => {
        const r = await axios.get(`https://yts.mx/api/v2/list_movies.json`);
        setMovieList(r.data.data);
        setMovie(r.data.data.movies);
    }

    useEffect(() => {
        getMovie();
    }, []);

    console.log(movie, movieList)

    return (
        <Wapper>
            <CommonStyle />
            <MovieListWrapper>
                <Inner>
                    <GridLayout>
                        {
                            movie.map((it, idx) => {
                                return (
                                    <GridItm key={it.id}>
                                        <Img src={it.large_cover_image} alt="" />
                                        <Title>{it.title_long}</Title>
                                        <Desc>{it.description_full.substr(0, 200)} ...</Desc>
                                    </GridItm>
                                )
                            })
                        }
                    </GridLayout>
                </Inner>
            </MovieListWrapper>
        </Wapper>
    )
}

export default Movie;