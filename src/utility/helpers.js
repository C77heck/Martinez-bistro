
export const redirect = (location, inSite = true) => {
    if (inSite) {
        const baseUrl = window.location.origin;
        window.location.replace(`${baseUrl}${location}`);
    } else {
        window.location.replace(location);
    }
};

export const priceFormat = (amount, currency = 'hun') => {
    if (!!amount) {
        const price = Math.round(amount);
        return Intl
            .NumberFormat('hu-HU', {
                style: 'currency', currency: (currency || '')
                    .toUpperCase()
            })
            .format(price)
            .replace(/\D00(?=\D*$)/, '')
            .replace(/hun/i, 'Ft');
    }

    return '';
};