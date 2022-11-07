function carousel({container, slide, prevArrow, nextArrow, totalCounter, currentCounter, wrapper, field}) {
    // Carousel

    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          currentNumber = document.querySelector(currentCounter),
          totalNumber = document.querySelector(totalCounter),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1;
    let offset = 0; 
        
    if (slides.length < 10) {
        totalNumber.textContent = `0${slides.length}`;
        currentNumber.textContent = `0${slideIndex}`;
    } else {
        totalNumber.textContent = slides.length;
        currentNumber.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.7s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = valueToNumber(width) * (slides.length - 1);
        } else {
            offset -= valueToNumber(width);
        }

        changeOffsetSlidesField();

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        addZeroToIndex();

        changeDotsOpacity()        
    });

    next.addEventListener('click', () => {
        if (offset == valueToNumber(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += valueToNumber(width);
        }

        changeOffsetSlidesField();        

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        addZeroToIndex();

        changeDotsOpacity()
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            
            slideIndex = slideTo;
            offset = valueToNumber(width) * (slideTo - 1);

            changeOffsetSlidesField();

            addZeroToIndex();

            changeDotsOpacity();
        });
    });


    function addZeroToIndex() {
        if (slides.length < 10) {
            currentNumber.textContent = `0${slideIndex}`;
        } else {
            currentNumber.textContent = slideIndex;
        }
    }
    function changeOffsetSlidesField() {
        slidesField.style.transform = `translateX(-${offset}px)`;
    }
    function changeDotsOpacity() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }
    function valueToNumber(str) {
        return +str.replace(/\D/g, '');
    }
}

export default carousel;