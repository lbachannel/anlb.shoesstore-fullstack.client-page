// Carousel
document.addEventListener("DOMContentLoaded", function () {
    const slideshowInner = document.querySelector('.slideshow__inner');
    const indicators = document.querySelectorAll('.indicator');
    const slides = document.querySelectorAll('.slideshow__item');
    let currentIndex = 0;
    const totalSlides = slides.length;

    // Add the first slide to the end of the list to create a looping effect
    const firstSlideClone = slides[0].cloneNode(true);
    slideshowInner.appendChild(firstSlideClone);

    // Function to move to the next slide
    function goToSlide(index, immediate = false) {
        if (immediate) {
            slideshowInner.style.transition = 'none';
        } else {
            slideshowInner.style.transition = 'transform 0.5s ease-in-out';
        }
        slideshowInner.style.transform = `translateX(-${index * 100}%)`;

        // Update the indicator index (excluding the clone slide case)
        if (index < totalSlides) {
            indicators.forEach(indicator => indicator.classList.remove('active'));
            indicators[index].classList.add('active');
        }
    }

    // Function for automatically switching slides
    function autoSlide() {
        currentIndex++;
        goToSlide(currentIndex);

        // When reaching the cloned slide (the last one), immediately return to the first slide
        if (currentIndex === totalSlides) {
            setTimeout(() => {
                slideshowInner.style.transition = 'none';
                currentIndex = 0; // come to first slide
                goToSlide(currentIndex, true);
            }, 500); // Wait for the sliding animation to complete
        }
    }

    // Run auto slide
    setInterval(autoSlide, 9000); // Update each 3s

    // Handle click on indicator
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function () {
            const index = parseInt(this.getAttribute('data-index'));
            currentIndex = index;
            goToSlide(currentIndex);
        });
    });

    // Set the active state for the first indicator on load
    goToSlide(currentIndex);
});