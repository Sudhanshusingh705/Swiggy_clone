import { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "../Header/Header";
import { useSelector } from "react-redux";
import { Authentication } from "../Authentication/Authentication";
import { useNavigate } from "react-router-dom";
import { usePersistUser } from "../Common/Util";

const H3 = styled.h3`
   margin: 5px 0px;
`;

const Section = styled.section`
    background: #e9ecee;
`;

const Inner = styled.div`
    max-width: 1200px;
    margin: 0px auto;
    padding: 50px 0px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;    
`;

const CartContainer = styled.div`
    width: 30%;
    padding: 20px;
    background: white;
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
    margin: 10px 0px;
`;

const DisplayFlexCart = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: ${props => props.mar == 0 ? "0px" : "10px"};

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

const Text = styled.div`
    margin-top: 15px;
    opacity: 0.7;
`;

const Border = styled.div`
    border: 1px solid black;
    margin: 15px 0px;
`;

const OuterContainer = styled.div`
    width: 65%;
`;

const Container = styled.div`
    background: white;
    padding: 40px 60px;
    margin-bottom: 20px;
`;

const Dead = styled.h2`
    opacity: 0.7;
    margin: 0px;
    font-size: 2rem;
`;

const Input = styled.input`
    border: 1px solid #d4d5d9;
    outline: 0;
    padding: 20px;
    margin-top: 10px;
    font-size: 1.4rem;
    font-family: "Proxima Nova";
    width: calc(100% - 40px);
`;

const Submit = styled.div`
    background: var(--primary);
    color: white;
    padding: 20px 0px;
    margin-top: 20px;
    border-radius: 2px;
    text-align: center;
    cursor: pointer;
`;

const DisplayFlex = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
`;

const LeftFlex = styled.div`
    width: 30%;
    background: #edf1f7;
    padding: 20px;
`;

const UL = styled.ul`
    list-style: none;
    padding-inline-start: 0px;

    li {
        display: block;
        padding: 10px;
        font-size: 1.1rem;
        font-family: "Proxima Nova Bold";
        opacity: 0.7;
    }

    li:nth-child(4) {
        background: white;
    }
`;

const RightFlex = styled.div`
    padding: 0px 20px;
    width: 60%;
`;

const InnerUPI = styled.div`
    margin: 20px 0px;
    border-top: 1px solid black;
`;

const Orange = styled.span`
    color: var(--primary);
    cursor: pointer;
`;

export const Checkout = () => {

    const [isLogin, setIsLogin] = useState("none");
    const [isAddress, setIsAddress] = useState(false);
    const [address, setAddress] = useState("");
    const [payment, setPayment] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const user_id = useSelector(state => state.user_id);
    const navigate = useNavigate();
    
    let total = 0;

    useEffect(() => {
        setCartItems(JSON.parse(localStorage.getItem("cart_items")) || []);
        if(user_id) setIsAddress(true);
    }, []);

    usePersistUser();

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

    const DeliveryAddress = () => {
        setPayment(true);
        return (
            <OuterContainer>
                <H21>Delivery address</H21>
                <h3>Home</h3>
                <div>{address}</div>
                <h3>29 MIN</h3>
            </OuterContainer>
        )
    };

    const PaymentMethod = () => {

        return (
            <>
            <H21>Choose payment method</H21>
            <DisplayFlex>
                <LeftFlex>
                    <UL>
                        <li>Preferred Payment</li>    
                        <li>Wallets</li>
                        <li>Credit/Debit Cards</li>
                        <li>UPI</li>
                        <li>Netbanking</li>
                        <li>Food Cards</li>
                    </UL>        
                </LeftFlex>
                <RightFlex>
                    <img src="/upi.png" width="100%" />
                    <InnerUPI>
                        <h3>Pay via New VPA</h3>
                        <div>You must have a Virtual Payment Address</div>
                        <Input placeholder="Enter VPA" />
                        <Submit onClick={placeOrder}>PAY ₹ {(0.05*total + total + 40).toFixed(2)}</Submit>
                    </InnerUPI>
                </RightFlex>
            </DisplayFlex>
            </>
        )
    };

    const placeOrder = () => {
        localStorage.removeItem("cart_items");
        navigate("/order-status");
    };

    if(cartItems.length == 0)
        return (<><Header /><Section><Inner><OuterContainer><Container>You have no items in cart.</Container></OuterContainer></Inner></Section></>);

    return (
        <>
        <Header />
        <Section>
            <Inner>
                <OuterContainer>
                    {!user_id && <Container className={{cursor: "pointer"}} onClick={() => {setIsLogin("login"); setIsAddress(true)}}>
                        <Orange>Login</Orange> to your account to place order!
                        </Container>}
                    <Container>
                        {isAddress ? <>
                        <H21>Select your address</H21>
                        <Input placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
                        <Submit onClick={(e) => setIsAddress(false)}>Add Address</Submit>
                        </> : address != "" ? <DeliveryAddress /> : <Dead>Delivery Address</Dead>}
                    </Container>
                    <Container>
                        {payment ? <PaymentMethod /> : <Dead>Payment Method</Dead>}
                    </Container>
                </OuterContainer>
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
                <DisplayFlexCart>
                    <H3>Bill Details</H3>
                </DisplayFlexCart>
                {cartItems.length > 0 && <DisplayFlexCart mar="0">
                    <div>Item Total</div>
                    <div>₹ {total}</div>
                </DisplayFlexCart>}
                <DisplayFlexCart>
                    <div>Delivery fee</div>
                    <div>₹ {40}</div>
                </DisplayFlexCart>
                <DisplayFlexCart>
                    <div>Taxes & Charges</div>
                    <div>₹ {(0.05*total).toFixed(2)}</div>
                </DisplayFlexCart>
                <Border></Border>
                <DisplayFlexCart mar="0">
                    <div>TO PAY</div>
                    <H3>₹ {(0.05*total + total + 40).toFixed(2)}</H3>
                </DisplayFlexCart>
                {cartItems.length == 0 && <div><img src="/empty_cart.webp" width="100%" /><Text>Good food is always cooking! Go ahead, order some yummy items from the menu.</Text></div>}
                </CartItemsContainer>
            </CartContainer>
            </Inner>
        </Section>
        {isLogin != "none" && <Authentication hideLogin={(val) => setIsLogin(val)} isLogin={isLogin} />}
        </>
    )

};