
/* Swipers */

document.addEventListener("DOMContentLoaded", function () {
    
    // steps
    const stepsSwiper = document.querySelectorAll(".steps__swiper");
    stepsSwiper?.forEach(swiper => {
        const newSwiper = new Swiper(swiper, {
            slidesPerView: 1.1,
            spaceBetween: 10,
            pagination: {
                el: ".steps__swiper-pagination",
            },
            breakpoints: {
                570: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
            },
        });
        const handleSwiper = () => {
            if (window.innerWidth < 768) {
                newSwiper.enable()
            } else {
                newSwiper.disable()
            }
        }
        handleSwiper();
        window.addEventListener('resize', handleSwiper);
    })

    // doctors
    const doctorsSwiper = document.querySelectorAll(".doctors__swiper");
    doctorsSwiper?.forEach(swiper => {
        const newSwiper = new Swiper(swiper, {
            slidesPerView: 1.1,
            spaceBetween: 10,
            navigation: {
                nextEl: ".doctors__swiper-button-next",
                prevEl: ".doctors__swiper-button-prev",
            },
            breakpoints: {
                570: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
            },
        });
        const handleSwiper = () => {
            if (window.innerWidth < 768) {
                newSwiper.enable()
            } else {
                newSwiper.disable()
            }
        }
        handleSwiper();
        window.addEventListener('resize', handleSwiper);
    })

    // licenses
    const licensesSwiper = document.querySelectorAll(".licenses__swiper");
    licensesSwiper?.forEach(swiper => {
        const newSwiper = new Swiper(swiper, {
            slidesPerView: 1.1,
            spaceBetween: 10,
            navigation: {
                nextEl: ".licenses__swiper-button-next",
                prevEl: ".licenses__swiper-button-prev",
            },
            pagination: {
                el: ".licenses__swiper-pagination",
            },
            breakpoints: {
                1300: {
                    slidesPerView: 6,
                    spaceBetween: 20,
                },
                1160: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                },
                740: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                570: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
            },
        });
    })

    // gallery
    const gallerySwiper = document.querySelectorAll(".gallery__swiper");
    gallerySwiper?.forEach(swiper => {
        const newSwiper = new Swiper(swiper, {
            slidesPerView: 1.1,
            spaceBetween: 10,
            navigation: {
                nextEl: ".gallery__swiper-button-next",
                prevEl: ".gallery__swiper-button-prev",
            },
            pagination: {
                el: ".gallery__swiper-pagination",
            },
            breakpoints: {
                1100: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                600: {
                    slidesPerView: 2.1,
                    spaceBetween: 10,
                },
            },
        });
    })

    // galleryAbout
    const galleryAboutSwiper = document.querySelectorAll(".gallery-about__swiper");
    galleryAboutSwiper?.forEach(swiper => {
        const newSwiper = new Swiper(swiper, {
            slidesPerView: 1.1,
            spaceBetween: 10,
            navigation: {
                nextEl: ".gallery-about__swiper-button-next",
                prevEl: ".gallery-about__swiper-button-prev",
            },
            pagination: {
                el: ".gallery-about__swiper-pagination",
            },
            breakpoints: {
                570: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
            },
        });
        const handleSwiper = () => {
            if (window.innerWidth < 1024) {
                newSwiper.enable()
            } else {
                newSwiper.disable()
            }
        }
        handleSwiper();
        window.addEventListener('resize', handleSwiper);
    })

    // reviews
    const reviewsSwiper = document.querySelectorAll(".reviews__swiper");
    reviewsSwiper?.forEach(swiper => {
        if (window.innerWidth < 768) {
            fl = false;
        } else {
            fl = true;
        }
        const newSwiper = new Swiper(swiper, {
            slidesPerView: 1,
            spaceBetween: 10,
            navigation: {
                nextEl: ".reviews__swiper-button-next",
                prevEl: ".reviews__swiper-button-prev",
            },
            pagination: {
                el: ".reviews__swiper-pagination",
            },
            effect: "fade",
            
            autoHeight: fl,
        });
    })

    // articles
    const articlesSwiper = document.querySelectorAll(".articles__swiper");
    articlesSwiper?.forEach(swiper => {
        const newSwiper = new Swiper(swiper, {
            slidesPerView: 1.1,
            spaceBetween: 10,
            navigation: {
                nextEl: ".articles__swiper-button-next",
                prevEl: ".articles__swiper-button-prev",
            },
            pagination: {
                el: ".articles__swiper-pagination",
            },
            breakpoints: {
                1400: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                1000: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                600: {
                    slidesPerView: 2.1,
                    spaceBetween: 10,
                },
            },
        });
    })

})


/* End swipers */