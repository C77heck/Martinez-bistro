import { useCallback, useState } from "react";


export const useExpiry = () => {
    const [menuExpiry, setMenuExpiry] = useState(false);
    const [openingExpiry, setOpeningExpiry] = useState(false);
    const [testimonialExpiry, setTestimonialExpiry] = useState(false);
    const [storyExpiry, setStoryExpiry] = useState(false);

    const updateExpiry = useCallback(
        (newExpiry, old) => {

            const { menu, opening, testimonial, story } = old;

            setMenuExpiry(newExpiry.menu > menu ? true : false)
            setOpeningExpiry(newExpiry.opening > opening ? true : false)
            setTestimonialExpiry(newExpiry.testimonial > testimonial ? true : false)
            setStoryExpiry(newExpiry.story > story ? true : false)
            localStorage.setItem('expiry', JSON.stringify(newExpiry))
        }, []);

    return {
        storyExpiry,
        testimonialExpiry,
        openingExpiry,
        menuExpiry,
        updateExpiry
    };
};