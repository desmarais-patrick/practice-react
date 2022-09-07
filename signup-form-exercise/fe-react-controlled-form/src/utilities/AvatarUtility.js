const defaultCity = "Vancouver";
const cities = {
    [defaultCity]: "/images/matt-wang-dBp9dbQCh4Q-unsplash.jpg",
    "Toronto": "/images/maarten-van-den-heuvel-JlATOM0Jp94-unsplash.jpg",
    "Montreal": "/images/jackie-hutchinson-JJYzJXbwB20-unsplash.jpg",
};

function getAvatarImgSrc(preferredCity) {
    const avatarImgSrc = cities[preferredCity];
    if (!avatarImgSrc) {
        return null;
    }
    return avatarImgSrc;
}

function getDefaultAvatarImgSrc() {
    return cities[defaultCity];
}

function getAvatarImages() {
    return Object.entries(cities);
}

export {
    getAvatarImgSrc,
    getDefaultAvatarImgSrc,
    getAvatarImages,
};