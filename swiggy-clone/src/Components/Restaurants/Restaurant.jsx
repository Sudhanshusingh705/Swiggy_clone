import styled from "styled-components";
import { Header } from "../Header/Header";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCuisines, fetchDishes, fetchRestaurantById } from "../../API/fetch";
import { usePersistUser } from "../Common/Util";

const TopContainer = styled.div`
    background: #171a29;
`;

const TopInnerContainer = styled.div`
    margin: 0px auto;
    max-width: 1200px;
    display: flex;
    color: white;
    align-items: flex-start;
`;

const Img = styled.img`
    width: 250px;
    height: 165px;
    padding: 20px 0px;
`;

const InfoContainer = styled.div`
    width: 60%;
    margin-left: 3%;
    margin-top: 40px;
    height: 120px;
`;

const H2 = styled.div`
    color: white;
    font-size: 2rem;
    margin: 0.5rem 0;
`;

const Cuisines = styled.div`
    opacity: 0.7;
    font-size: 0.9rem;
`;

const DisplayFlex = styled.div`
    display: flex;
    justify-content: space-between;
    width: 50%;
`;

const InfoInnerContainer = styled.div`
    border-right: 0.5px solid #eee;
    padding: 0px 20px 0px 0px;
    margin: 20px 0px;
`;

const Info = styled.div`
    font-family: "Proxima Nova Bold";
`;

const InfoInner = styled.div`
    opacity: 0.7;
    font-size: 0.8rem;
`;

const FilterContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    font-family: "Proxima Nova Bold";
    align-items: center;
`;

const InputContainer = styled.div`
    background: white;
    padding: 5px 10px;
    color: #3d4152;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    margin-right: 20px;
    box-shadow: 0 3px 15px 0 rgb(40 44 63 / 10%);
`;

const Input = styled.input`
    border: none;
    outline: none;
    font-family: "Proxima Nova Bold";
    margin: 0px;
`;

const OfferContainer = styled.div`
    padding: 30px;
    position: relative;
    border: 0.5px solid white;
    margin-top: 20px;
    width: 20%;
    font-family: "Proxima Nova Bold";
`;

const Offer = styled.div`
    position: absolute;
    top: -10px;
    left: -4px;
    padding-right: 10px;
    padding-bottom: 5px;
    background: #171a29;
    font-size: 1.2rem;
`;

const OfferInner = styled.div`
    font-size: 0.9rem;
    margin-bottom: 20px;

    &:last-child {
        margin: 0px;
    }
`;

const MenuContainer = styled.div`
    display: flex;
    max-width: 1200px;
    margin: 0px auto;
`;

const CuisinesContainer = styled.div`
    width: 230px;
    padding: 50px 20px 20px 0px;
    border-right: 1px solid #eee;
`;

const CartContainer = styled.div`
    width: 250px;
    padding: 20px;
`;

const DishesContainer = styled.div`
    padding: 50px;
    width: 50%;
    height: 450px;
    overflow-y: scroll;
`;

const UL = styled.ul`
    list-style: none;
    text-align: right;

    li {
        margin-bottom: 15px; 
        color: #282c3f;
        font-size: 1.2rem;
    }

    li:hover {
        color: var(--primary);
    }
`;

const Dish = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    width: 100%;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
`;

const DishInner = styled.div`

`;

const DishRight = styled.div`
    position: relative;

    img {
        border-radius: 5px;
    }

    div {
        position: absolute;
        color: green;
        width: 80px;
        padding: 5px 0px;
        text-align: center;
        top: 65px;
        margin-left: 20px;
        background: white;
        z-index: 100;
        cursor: pointer;
        border: 1px solid #eee;
    }
`;

const CartItem = styled.div`
    
`;

const QTY = styled.div`
    display: flex;
    justify-content: space-between;
    border: 1px solid #eee;
    padding-top: 5px;

    div:first-child {
        width: 40%;
        padding: 0px 10px;
        cursor: pointer;
    }

    div:first-child:hover, div:last-child:hover {
        color: var(--primary);
    }

    div:last-child {
        width: 40%;
        padding: 0px 10px;
        cursor: pointer;
    }
`;

const H21 = styled.h2`
    margin: 0px 0px 10px;
    font-size: 2rem;
    color: #171a29;
`;

const CartItemsContainer = styled.div`
    margin: 20px 0px 10px;
`;

const DisplayFlexCart = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;

    div:first-child {
        width: 40%;
        color: #282c3f;
    }

    div:last-child {
        font-size: 0.8rem;
        width: 20%;
        color: #535665;
        text-align: right;
    }
`;

const Checkout = styled.div`
    padding: 10px;
    text-align: center;
    cursor: pointer;
    background: #60b246;
    color: white;
    font-family: "Proxima Nova Bold";
`;

const Text = styled.div`
    margin-top: 15px;
    opacity: 0.7;
`;

export const Restaurant = () => {

    const [restaurant, setRestaurant] = useState({});
    const [cuisines, setCuisines] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const { id } = useParams();
    let total = 0;
    const navigate = useNavigate();

    const fetchApi = async () => {
        let res = await fetchRestaurantById(id);
        setLoading(false);
        setRestaurant(res);
        let res1 = await fetchCuisines(id);
        setCuisines(res1);
        let res2 = await fetchDishes(id);
        setDishes(res2.sort((a, b) => a.id - b.id));
    };

    useEffect(() => {
        fetchApi();
        setCartItems(JSON.parse(localStorage.getItem("cart_items")) || []);
        window.scrollTo(0, 0);
    }, []);

    usePersistUser();

    const handleSearch = (e) => {
        if(e.target.value == "") {
            fetchApi();
            return;
        }
        setDishes((prev) => prev.filter((el) => el.name.toLowerCase().includes(e.target.value))
        );
    };

    const addCart = (dish) => {
        const d = {...dish, qty: 1};
        let local = cartItems;
        if(cartItems.length == 0) {
            local = [...local, d];
        } else {
            let flag = false;
            for(let x of local) {
                if(x.id == d.id) {
                    x.qty++;
                    flag = true;
                    break;
                }
            }
            if(!flag) {
                local = [...local, d];
            }
        }
        localStorage.setItem("cart_items", JSON.stringify(local));
        setCartItems([...local]);
    };

    const handleCart = (dish, type) => {
        let local = cartItems;
        for(let x of local) {
            if(x.id == dish.id) {
                if(type > 0)
                    x.qty++;
                else {
                    if(x.qty == 1) {
                        local = local.filter((el) => el.id != x.id);
                    } else x.qty--;
                }
                localStorage.setItem("cart_items", JSON.stringify(local));
                setCartItems([...local]);
                break;
            }
        }
    };

    if(loading)
        return <Header />
    else
    return (
        <>
        <Header />
        <TopContainer>
            <TopInnerContainer>
                <Img src={`/${restaurant.cover}`} />
                <InfoContainer>
                    <H2>{restaurant.name}</H2>
                    <Cuisines>{restaurant.cuisines}</Cuisines>
                    <DisplayFlex>
                        <InfoInnerContainer>
                            <Info>★ {restaurant.rating}</Info>
                            <InfoInner>100 Ratings</InfoInner>
                        </InfoInnerContainer>
                        <InfoInnerContainer>
                            <Info>{restaurant.delivery_time} mins</Info>
                            <InfoInner>Delivery Time</InfoInner>
                        </InfoInnerContainer>
                        <InfoInnerContainer>
                            <Info>₹ {restaurant.cost_for_two}</Info>
                            <InfoInner>Cost for two</InfoInner>
                        </InfoInnerContainer>
                    </DisplayFlex>
                    <FilterContainer>
                        <InputContainer>
                            <Input onChange={handleSearch} placeholder="Search for dishes..." />
                        </InputContainer>
                        <InputContainer>
                            <Input type="radio" placeholder="Search for dishes..." />
                            &nbsp;Veg Only
                        </InputContainer>
                        <InputContainer>
                            &hearts;	Favourite
                        </InputContainer>
                    </FilterContainer>
                </InfoContainer>
                <OfferContainer>
                    <Offer>OFFER</Offer>
                    <OfferInner>% 50% off up to ₹100 + Flat ₹30 cashback with Paytm | Use code WELCOME50</OfferInner>
                    <OfferInner>% 20% off up to ₹125 | Use ICICIAMZ125 Above ₹500</OfferInner>
                </OfferContainer>
            </TopInnerContainer>
        </TopContainer>

        <MenuContainer>
            <CuisinesContainer>
                <UL>
                    {cuisines.map((el) => <li>{el.name}</li>)}
                </UL>
            </CuisinesContainer>
            <DishesContainer>
                <div>{dishes.length} ITEMS</div>
                {dishes.map((el) => {
                    return (
                        <Dish key={el.id}>
                            <DishInner>
                                <img src="/veg.png" width="15px" />
                                <h3>{el.name}</h3>
                                <div>₹ {el.price}</div>
                            </DishInner>
                            <DishRight>
                                <img src={`/${el.image}`} width="120px" height="100px" />
                                <div onClick={() => addCart(el)}>ADD</div>
                            </DishRight>
                        </Dish>
                    );
                })}
            </DishesContainer>
            <CartContainer>
                <H21>{cartItems.length == 0 ? "Cart Empty" : "Cart"}</H21>
                {cartItems.length > 0 && <div>{cartItems.length} ITEM(s)</div>}
                <CartItemsContainer>
                {cartItems.map((el) => {
                    total += el.price * el.qty;
                    return (
                        <CartItem>
                            <DisplayFlexCart val={100}>
                                <div>{el.name}</div>
                                <QTY>
                                    <div onClick={() => handleCart(el, -1)}>-</div>
                                    <div>{el.qty}</div>
                                    <div onClick={() => handleCart(el, +1)}>+</div>
                                </QTY>
                                <div>₹ {el.price * el.qty}</div>
                            </DisplayFlexCart>
                        </CartItem>
                    );
                })}
                {cartItems.length > 0 && <DisplayFlexCart>
                    <div>
                        <h3>Subtotal</h3>
                    </div>
                    <h3>₹ {total}</h3>
                </DisplayFlexCart>}
                {cartItems.length == 0 && <div><img src="/empty_cart.webp" width="100%" /><Text>Good food is always cooking! Go ahead, order some yummy items from the menu.</Text></div>}
                </CartItemsContainer>
                {cartItems.length > 0 && <Checkout onClick={() => navigate("/checkout")}>CHECKOUT →</Checkout>}
            </CartContainer>
        </MenuContainer>
        </>

    );
};
