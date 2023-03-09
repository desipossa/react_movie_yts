import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import CommonStyle from './style/Grobal';

//style 

const Wapper = styled.div`
background: #474544;
`
const MovieListWrapper = styled.section`
padding: 100px 0;
`
const Inner = styled.div`
width: 1600px;
margin: 0 auto;
`
const GridLayout = styled.ul`
display: grid;
grid-template-columns: repeat(6, 1fr);
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
min-height: 130px;
`

const Header = styled.header`
padding: 50px 0;
text-align: center;
`
const H1 = styled.h1`
margin: 0 0 10px 0;
font-size: 100px;
font-weight: 900;
color: #FFA556;
`

const MainTitle = styled.p`
margin: 0 0 30px 0;
color: #fff;
font-size: 12px;
text-transform: uppercase;
`

const Input = styled.input`
border: none;
outline: none;
border: 3px solid #ddd;
font-size: 14px;
padding: 5px;
width: 400px;
`
const Button = styled.button`
border: none;
background: #FFA556;
color: #fff;
padding: 7px 20px;
margin: 0 0 0 10px;
`
// 1. 영화 만히 가져오기... list 버튼 만들기...
// 2. 영화 클릭하면 자세한 정보 보여주기...
// 3. 영화 슬라이드 만들기
// 4. 영화 검색기능 만들기
// 5. 장르 별로 보여주기....


const Movie = () => {
    //영화 데이타를 가져오기 (데이터는 시간이 걸리는 일이므로... 비동기식으로 처리한다.)
    //영화데이타를 그리기 state(리액터가 그려줄 수 있게)

    const [movie, setMovie] = useState([]);
    const [movieList, setMovieList] = useState({});
    const [pageNum, setPageNum] = useState(0);

    const getMovie = async () => {
        const r = await axios.get(`https://yts.mx/api/v2/list_movies.json?limit=48&page=${pageNum}`);
        setMovieList(r.data.data);
        setMovie(r.data.data.movies);
    }

    useEffect(() => {
        getMovie();
    }, [pageNum]);

    const listNum = Array.from({ length: 1000 });

    console.log(movie, movieList)

    return (
        <Wapper>
            <CommonStyle />
            <Header>
                <H1>Lee's Movie</H1>
                <MainTitle>It is a site that collects my favorite movies. Enjoy it.</MainTitle>
                <form>
                    <Input type="text" /><Button>SEARCH</Button>
                </form>
            </Header>
            {
                listNum.map((_, idx) => {
                    return <button onClick={() => setPageNum(idx + 1)}>{idx + 1}</button>
                })
            }
            <MovieListWrapper>
                <Inner>
                    <GridLayout>
                        {
                            movie.map((it, idx) => {
                                return (
                                    <GridItm key={it.id}>
                                        <Img src={it.large_cover_image}
                                            alt={it.title}
                                            onError={e => e.target.src = `${process.env.PUBLIC_URL}/cover.jpg`}
                                        />
                                        <Title>{it.title_long}</Title>
                                        {
                                            it.description_full.length > 10 &&
                                            <Desc>
                                                {it.description_full.substr(0, 200)}
                                                {it.description_full.length > 200 ? '...' : ''}
                                            </Desc>
                                        }

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