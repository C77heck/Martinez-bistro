export const ItemCard = props => {
    const { name, description, price } = props;
    return <div className='display-flex food_cart'>
        <div className='food_cart__image max-height-122 fix-width-150'>
            <img src='/img/food2-mobile.jpg' alt='étel kép' />
        </div>
        <div className='food_details'>
            <h3 className='fs-17 fw-800'>{name}</h3>
            <p className='fs-15'>{description}</p>
            <div className='hr--light mt-2'>
                <h3 className='fs-17 fw-800 text-align-right'>{price}</h3>
            </div>
        </div>
    </div>
}