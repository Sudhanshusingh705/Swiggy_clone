import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchRestaurantsByCity } from "../../API/fetch";
import { usePersistUser } from "../Common/Util";
import { Header } from "../Header/Header"
import { RestaurantItem } from "./RestaurantItem";

const Section = styled.section`
    max-width: 1200px;
    margin: 50px auto;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 60px;
    row-gap: 80px;
    margin: 40px 0px 60px;
`;

const DisplayFlex = styled.div`
    display: flex;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.div`
    color: var(--dark);
    font-size: 2rem;
    font-family: "Proxima Nova Bold";
`;

const DisplayFlexInner = styled.div`
    display: flex;
`;

const Filter = styled.div`
    margin: 0px 20px;
    color: ${props => props.val == props.filter ? "black" : "var(--light)"};
    cursor: pointer;
`;

const Carousel = styled.div`
    background: #171a29; 
`;

const CarouselInner = styled.div`
    max-width: 1200px;
    margin: 0px auto;
    padding: 50px 0px;
    display: flex;
    justify-content: space-between;
    position: relative;
`;

const Img = styled.img`
    width: 23%;
    transition: transform .5s cubic-bezier(.215,.61,.355,1);

    &:hover {
        transform: scale(1.05);
    }
`;

const CarouselIconRight = styled.div`
    position: absolute;
    top: 45%;
    right: -30px;
    background: white;
    width: 50px;
    height: 40px;
    padding-top: 10px;
    text-align: center;
    border-radius: 25px;
    font-size: 2rem;
    cursor: pointer;
`;

const CarouselIconLeft = styled.div`
    position: absolute;
    top: 45%;
    left: -30px;
    background: white;
    width: 50px;
    height: 40px;
    padding-top: 10px;
    text-align: center;
    border-radius: 25px;
    font-size: 2rem;
    cursor: pointer;
    z-index: 99;
`;

export const Restaurants = () => {

    const [filter, setFilter] = useState("none");
    const [restaurants, setRestaurants] = useState([]);
    const {name : city} = useParams();
    const arrCarousel = ["/offer1.webp", "/offer2.webp", "/offer3.jpeg", "/offer4.webp", "/offer5.webp", "/offer6.webp", "/offer7.webp"];
    const [carouselData, setCarouselData] = useState([0, 4]);
    const navigate = useNavigate();

    const handleCarousel = (type) => {
        if(type > 0) {
            if(carouselData[1] < 7) {
                setCarouselData([carouselData[0]+1, carouselData[1]+1]);
            }
        } else {
            if(carouselData[0] > 0) {
                setCarouselData([carouselData[0]-1, carouselData[1]-1]);
            }
        }
    };

    useEffect(() => {
        const fetchApi = async () => {
            let res = await fetchRestaurantsByCity(city);
            setRestaurants(res);
        }

        fetchApi();

        window.scrollTo(0, 0);
        
    }, []);

    usePersistUser();

    const handleClick = (e) => {
        if(e.target.dataset.id != undefined)
            navigate(`/restaurants/${e.target.dataset.id}`);
        else if(e.target.parentElement.dataset.id != undefined)
            navigate(`/restaurants/${e.target.parentElement.dataset.id}`);
        else navigate(`/restaurants/${e.target.parentElement.parentElement.dataset.id}`);
    };

    return (
        <>
        <Header />
        <Carousel>
            <CarouselInner>
                {carouselData[0] > 0 && <CarouselIconLeft onClick={() => handleCarousel(-1)}>&#8592;</CarouselIconLeft>}
                {arrCarousel.filter((el, index) => (index < carouselData[1] && index >= carouselData[0])).map((el) => <Img src={el} />)}
                {carouselData[1] < 7 && <CarouselIconRight onClick={() => handleCarousel(1)}>&#8594;</CarouselIconRight>}
            </CarouselInner>
        </Carousel>
        <Section>
            <DisplayFlex>
                <Title>{restaurants.length} Restaurants in {city}</Title>
                <DisplayFlexInner>
                    <Filter val={"del"} filter={filter} onClick={() => setFilter("del")}>Delivery Time</Filter>
                    <Filter val={"rat"} filter={filter} onClick={() => setFilter("rat")}>Rating</Filter>
                    <Filter val={"l2h"} filter={filter} onClick={() => setFilter("l2h")}>Cost: Low to High</Filter>
                    <Filter val={"h2l"} filter={filter} onClick={() => setFilter("h2l")}>Cost: High to Low</Filter>
                </DisplayFlexInner>
            </DisplayFlex>
            <Grid onClick={handleClick}>
                {restaurants.sort((a, b) => {
                    if(filter == "none") {
                        return a.id - b.id;
                    } else if(filter == "rat") {
                        return b.rating - a.rating;
                    } else if(filter == "del") {
                        return a.delivery_time - b.delivery_time;
                    } else if(filter == "l2h") {
                        return a.cost_for_two - b.cost_for_two;
                    } else if(filter == "h2l") {
                        return b.cost_for_two - a.cost_for_two;
                    }
                }).map((el) =>
                    <RestaurantItem key={el.id} item={el} />
                )}
            </Grid>
        </Section>
        </>
    );
};