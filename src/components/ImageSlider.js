import React from 'react';

const ImageSlider = (props) => {
    return(
        <div>
            <img //ImageSlider에 images로 정보 전달
                style={{ width: "220px", height:"480px" }}
                src={`${props.images}`}
              />
        </div>
    );
}

export default ImageSlider;