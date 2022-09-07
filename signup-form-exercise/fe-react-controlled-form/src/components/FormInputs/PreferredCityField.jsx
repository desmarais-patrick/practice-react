import React from "react";
import { getAvatarImages } from "../../utilities/AvatarUtility";

const PreferredCityField = (props) => {
    const images = getAvatarImages();
    return (
        <div onChange={event => props.onValueChange(event.target.value)}>
            <label htmlFor={props.name}>{props.label}</label>
            <div className="form-field-image-selector-list">
                {images.map(
                    ([cityId, imgSrc]) => (
                        <PreferredCityFieldItem
                            key={cityId}
                            name={props.name}
                            imgSrc={imgSrc}
                            imgDesc={cityId}
                            value={cityId}
                        />
                    )
                )}
            </div>
            <div className="form-field-image-selector-item-other">
                <label>
                    <input
                        name={props.name}
                        type="radio"
                        value="All" />
                    I like all those cities
                </label>
            </div>
        </div>
    )
};

const PreferredCityFieldItem = (props) => {
    return (
        <div className="form-field-image-selector-item">
            <label>
                <img src={props.imgSrc}
                    title={props.imgDesc} />
                {props.imgDesc}
                <div>
                    <input
                        name={props.name}
                        type="radio"
                        value={props.value} />
                </div>
            </label>
        </div>
    )
};

export default PreferredCityField;