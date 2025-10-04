import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import ImageCard from './ImageCard';
import { toast } from 'react-toastify';

const Carousel = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/images/all?carousel=true&limit=5');
        setImages(res.data.images);
      } catch (err) {
        toast.error('Failed to load carousel images');
      }
    };
    fetchCarouselImages();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="carousel">
      <Slider {...settings}>
        {images.map((img) => (
          <ImageCard key={img._id} image={img} isCarousel />
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
