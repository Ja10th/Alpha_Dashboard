import { useState, useEffect } from "react";

const images = [
  {
    src: "bb.png",
    name: "Latest News & Updates",
    text: "Turpis interdum nunc varius ornare dignissim pretium. Massa ornare quis aliquet sed vitae. Sed velit nisi, fermentum erat.",
  },
  {
    src: "slide.png",
    name: "Latest News & Updates",
    text: "Turpis interdum nunc varius ornare dignissim pretium. Massa ornare quis aliquet sed vitae.",
  },
  {
    src: "as.png",
    name: "Latest News & Updates",
    text: "Turpis interdum nunc varius ornare dignissim pretium.",
  },
];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(slideInterval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(slideInterval); // Cleanup interval on unmount
  }, [currentIndex]);

  return (
    <div>
      <div className="relative w-[335px] md:w-[510px] rounded-xl ml-5 mt-2">
        <img
          src={images[currentIndex].src}
          alt={`Slide ${currentIndex + 1}`}
          className="w-[510px] h-[320px] rounded-xl object-cover"
        />
        <div className="absolute inset-0 bg-black rounded-xl opacity-20" />
        <div className="absolute flex-col inset-1 top-40 px-10 text-left flex justify-center">
          <h2 className="text-[12px] text-white flex-start font-[600]">
            {images[currentIndex].name}
          </h2>
          <p className="text-white text-[12px]">{images[currentIndex].text}</p>
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-black w-10 h-10 rounded-full p-2 shadow-md"
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 h-10 w-10 top-1/2 transform -translate-y-1/2 text-black bg-white rounded-full p-2 shadow-md"
        >
          &gt;
        </button>
        <div className="flex absolute bottom-1 left-1/2 justify-center ">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-1 w-3 mx-1 rounded-full ${
                currentIndex === index ? "bg-white" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
