import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function FretboardSlider({ fretboards, frettings }) {
    const empty = frettings.every(f => f.length === 0);

    const settings = {
        dots: !empty,
        arrows: false,
        infinite: false,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
    }

    return (
          <Slider {...settings} className="w-fit mx-auto">
            {fretboards.map((fretboard, i) => (
              <div key={i} className="flex justify-center w-fit">
                {fretboard}
              </div>
            ))}
          </Slider>
      );
}