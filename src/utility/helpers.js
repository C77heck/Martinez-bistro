
export const redirect = (location, inSite = true) => {
    if (inSite) {
        const baseUrl = window.location.origin;
        window.location.replace(`${baseUrl}${location}`);
    } else {
        window.location.replace(location);
    }
};