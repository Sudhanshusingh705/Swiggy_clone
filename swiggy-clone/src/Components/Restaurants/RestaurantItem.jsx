import styled from "styled-components";

const Outer = styled.div`
    padding: 20px;
    margin: -20px;
    cursor: pointer;

    &:hover {
        border: 1px solid #eee;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
`;

const Cover = styled.img`
    width: 100%;
    margin-bottom: 10px;
`;

const Title = styled.div`
    font-size: 1.2rem;
    font-family: "Proxima Nova Bold";
    color: var(--light);
`;

const Cuisines = styled.div`
    font-size: 0.9rem;
    margin-top: 5px;
    color: var(--light);
    line-height: 1.1rem;
`;

const Details = styled.div`
    margin-top: 15px;
    padding-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    line-height: 1.1rem;
    border-bottom: 1px solid #e9e9eb;
`;

const Rating = styled.div`
    background: ${props => props.val >= 4 ? "#48c479" : props.val >= 3 ? "#db7c38" : "#e1b055"};
    color: white;
    padding: 2px 5px;
`;

const Info = styled.div`
    color: var(--light);
`;

const Discount = styled.div`
    color: #8a584b;
    margin-top: 15px;
`;

export const RestaurantItem = ({item}) => {
    const {id, cover, name, cuisines, cost_for_two, delivery_time, rating, offer} = item;
    return (
        <Outer data-id={id}>
            <Cover src={`/${cover}`} />
            <Title>{name}</Title>
            <Cuisines>{cuisines}</Cuisines>
            <Details>
                <Rating val={rating}>★ {rating.toFixed(1)}</Rating>
                <div>•</div>
                <Info>{delivery_time} MINS</Info>
                <div>•</div>
                <Info>₹{cost_for_two} FOR TWO</Info>
            </Details>
            <Discount>{offer}</Discount>
        </Outer>
    );
};