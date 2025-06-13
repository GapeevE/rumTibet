let $carouselWrapper = $('#carousel-wrapper');
let firstChildWidth = 0;
let sliderInterval;
let stepCount;
let scrollStep;
let counter;
let isPaused = false;

function initSlider() {
    if (!isPaused) {
        stepsCount = Math.floor((carouselWidth - $carouselWrapper.outerWidth()) / firstChildWidth) + 1;
        scrollStep = firstChildWidth;
        counter = 0;
    } 
    sliderInterval = setInterval(function() {
        if (counter < stepsCount) {
            $carouselWrapper.animate({ scrollLeft: scrollStep}, 'slow', function () {
                scrollStep += firstChildWidth;
                counter += 1;
            })
        } else {
            $carouselWrapper.animate({ scrollLeft: -scrollStep}, 'slow', function () {
                scrollStep = firstChildWidth;
                counter = 0;
            })
        }
    }, 5000);
}

function destroySlider() {
    if (sliderInterval) {
        clearInterval(sliderInterval);
    }
}

function getWidthCarouselWrapper() {
    if ($carouselWrapper.outerWidth() === 0) return 0;
    const $children = $carouselWrapper.children();
    const childrenCount = $children.length;
    if (childrenCount === 0) return 0;
    firstChildWidth = $children.first().outerWidth();
    let gapValue = 0;
    const display = $carouselWrapper.css('display');
    if (display.includes('flex') || display.includes('grid')) {
        const gapString = $carouselWrapper.css('gap');
        if (gapString && gapString !== 'normal') {
            const gaps = gapString.split(/\s+/);
            gapValue = parseFloat(gaps.length > 1 ? gaps[1] : gaps[0]) || 0;
        }
    }
    firstChildWidth += gapValue;
    return (childrenCount * firstChildWidth) + (gapValue * (childrenCount - 1));
}

function sliderCarouselCreate() {
    if (carouselWidth > $carouselWrapper.outerWidth()) {
        initSlider();
    } else {
        destroySlider();
    }
}

$carouselWrapper
    .on('mouseenter', () => {
        isPaused = true;
        destroySlider();
    })
    .on('mouseleave', () => {
        isPaused = false;
        sliderCarouselCreate();
    });

let carouselWidth = getWidthCarouselWrapper();
sliderCarouselCreate();
$(window).on('resize', function() {
    destroySlider();
    carouselWidth = getWidthCarouselWrapper();
    sliderCarouselCreate();
});

let $stretchWrapper = $('#stretch-wrapper');
let firstChildStretchWidth = 0;
let sliderStretchInterval;
let stepCountStretch;
let scrollStepStretch;
let counterStretch;
let isPausedStretch = false;

function initSliderStretch() {
    if (!isPausedStretch) {
        stepsCountStretch = Math.floor((stretchWidth - $stretchWrapper.outerWidth()) / firstChildStretchWidth) + 1;
        scrollStepStretch = firstChildStretchWidth;
        counterStretch = 0;
    } 
    sliderStretchInterval = setInterval(function() {
        if (counterStretch < stepsCountStretch) {
            $stretchWrapper.animate({ scrollLeft: scrollStepStretch}, 'slow', function () {
                scrollStepStretch += firstChildStretchWidth;
                counterStretch += 1;
            })
        } else {
            $stretchWrapper.animate({ scrollLeft: -scrollStepStretch}, 'slow', function () {
                scrollStepStretch = firstChildStretchWidth;
                counterStretch = 0;
            })
        }
    }, 5000);
}

function destroySliderStretch() {
    if (sliderStretchInterval) {
        clearInterval(sliderStretchInterval);
    }
}

function getWidthStretchWrapper() {
    if ($stretchWrapper.outerWidth() === 0) return 0;
    const $childrenStretch = $stretchWrapper.children();
    const childrenCountStretch = $childrenStretch.length;
    if (childrenCountStretch === 0) return 0;
    firstChildStretchWidth = $childrenStretch.first().outerWidth();
    let gapValueStretch = 0;
    const displayStretch = $stretchWrapper.css('display');
    if (displayStretch.includes('flex') || displayStretch.includes('grid')) {
        const gapStringStretch = $stretchWrapper.css('gap');
        if (gapStringStretch && gapStringStretch !== 'normal') {
            const gapsStretch = gapStringStretch.split(/\s+/);
            gapValueStretch = parseFloat(gapsStretch.length > 1 ? gapsStretch[1] : gapsStretch[0]) || 0;
        }
    }
    firstChildStretchWidth += gapValueStretch;
    return (childrenCountStretch * firstChildStretchWidth) + (gapValueStretch * (childrenCountStretch - 1));
}

function sliderStretchCreate() {
    if (stretchWidth > $stretchWrapper.outerWidth()) {
        initSliderStretch();
    } else {
        destroySliderStretch();
    }
}

$stretchWrapper
    .on('mouseenter', () => {
        isPausedStretch = true;
        destroySliderStretch();
    })
    .on('mouseleave', () => {
        isPausedStretch = false;
        sliderStretchCreate();
    });

let stretchWidth = getWidthStretchWrapper();
sliderStretchCreate();
$(window).on('resize', function() {
    destroySliderStretch();
    stretchWidth = getWidthStretchWrapper();
    sliderStretchCreate();
});