        const track = document.querySelector('.carousel_track')
        const slides = Array.from(track.children)
        const leftArrow = document.querySelector('.carousel_slider-left')
        const rightArrow = document.querySelector('.carousel_slider-right')
        const indicators = document.querySelector('.carousel_nav')
        const dots = Array.from(indicators.children)     

        const slideWidth = slides[0].clientWidth

        // arrange the slides next to one another

        // This way
        
        // slides[0].style.left = 0
        // slides[1].style.left = slideWidth + 'px'
        // slides[2].style.left = slideWidth * 2 + 'px'
        // slides[3].style.left = slideWidth * 3 + 'px'
        // slides[4].style.left = slideWidth * 4 + 'px'
        // slides[5].style.left = slideWidth * 5 + 'px'
        // slides[6].style.left = slideWidth * 6 + 'px'
        // slides[7].style.left = slideWidth * 7 + 'px'

            // Or this way

        slides.forEach((slide, index) => {
            slide.style.left = slideWidth * index + 'px'
        })

        const moveToSlide = (track, currentSlide, targetSlide) => {
            track.style.transform = 'translateX(-' + targetSlide.style.left + ')'
            currentSlide.classList.remove('current_slide')
            targetSlide.classList.add('current_slide')
        }

        const nextDot = (currentDot, targetDot) => {
            currentDot.classList.remove('current_slide')
            targetDot.classList.add('current_slide')
        }

        const hideArrow = (targetIndex, slides) => {
            if(targetIndex === 0) {
                leftArrow.classList.add('is-hidden')
                rightArrow.classList.remove('is-hidden')
            } else if(targetIndex === slides.length - 1) {
                leftArrow.classList.remove('is-hidden')
                rightArrow.classList.add('is-hidden')
            } else {
                leftArrow.classList.remove('is-hidden')
                rightArrow.classList.remove('is-hidden')
            }
        }

        rightArrow.addEventListener('click', () => {
            const currentSlide = track.querySelector('.current_slide')
            const nextSlide = currentSlide.nextElementSibling
            const currentDot = indicators.querySelector('.current_slide')
            const targetDot = currentDot.nextElementSibling
            const targetIndex = dots.findIndex(dot => dot === targetDot)

            moveToSlide(track, currentSlide, nextSlide)
            nextDot(currentDot, targetDot)
            hideArrow(targetIndex, slides)
        })

        leftArrow.addEventListener('click', () => {
            const currentSlide = document.querySelector('.current_slide')
            const prevSlide = currentSlide.previousElementSibling
            const currentDot = indicators.querySelector('.current_slide')
            const targetDot = currentDot.previousElementSibling
            const targetIndex = dots.findIndex(dot => dot === targetDot)

            moveToSlide(track, currentSlide, prevSlide)
            nextDot(currentDot, targetDot)
            hideArrow(targetIndex, slides)
        })

        indicators.addEventListener('click', e => {
            const targetDot = e.target.closest('button')

            if(!targetDot) return

            const currentSlide = track.querySelector('.current_slide')
            const currentDot = indicators.querySelector('.current_slide')
            const targetIndex = dots.findIndex(dot => dot === targetDot)
            const targetSlide = slides[targetIndex]

            moveToSlide(track, currentSlide, targetSlide)
            nextDot(currentDot, targetDot)
            hideArrow(targetIndex, slides)
        })

