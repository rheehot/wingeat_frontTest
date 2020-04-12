import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';

import { PHONE } from 'Style/break';
import { beforeUrl, featureUrl } from 'config';

import './Feature.scss';

// slick 설정
const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 300,
  autoplaySpeed: 3000,
};

const Feature = () => {
  const [image, setImage] = useState([]);
  const [windowInner, setWindowInner] = useState(window.innerWidth);

  useEffect(() => {
    axios.get(featureUrl).then((res) => setImage(res.data));
  }, []);

  // 반응형 사이즈에 따른 이미지파일 변화
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowInner(window.innerWidth);
    });
    return () => {
      window.removeEventListener('resize', () => { setWindowInner(window.innerWidth);
      });
    };
  }, [windowInner]);

  return (
    <div className="slider_wrapper">
      <Slider {...settings}>
        {image.map((ele, idx) => (
          <div key={idx}>
            <img
              src={`${beforeUrl}${windowInner >= PHONE ? ele.image : ele.mobileImage}`}
              alt="feature_img"
            />
            <div>
              {windowInner <= PHONE && (
              <span className="count_circle">{`${idx + 1}/${image.length}`}</span>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default Feature;
