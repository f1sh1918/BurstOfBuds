import React from "react";
import { Carousel } from "react-bootstrap";
import { IoIosArrowForward, IoIosArrowBack} from 'react-icons/io'

interface ISCarouselProps {
    images: any[];
}

export const SCarousel: React.FunctionComponent<ISCarouselProps> = (props) => {
    const { images } = props;
    return (
        <Carousel
            interval={null}
            className={"SCarousel"}
            nextIcon={<IoIosArrowForward className={"SCarousel__Controls"}/>}
            prevIcon={<IoIosArrowBack className={"SCarousel__Controls"}/>}
            indicators={false}
        >
            {images.map((element: any) => {
                return <Carousel.Item key={element.src}>
                    <img
                        className="d-block w-100"
                        src={element.src}
                        alt={element.alt}
                    />
                </Carousel.Item>;
            })}
        </Carousel>
    );
};

