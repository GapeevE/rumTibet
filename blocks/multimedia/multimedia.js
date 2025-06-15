let $multimediaWrapper = $('#multimedia-wrapper');
let $btnLeft = $('#multimedia-arrow-left');
let $btnRight = $('#multimedia-arrow-right');
let counterMultimedia = 0;
let stepsCountMultimedia;
let scrollStepMultimedia = 0;

function initSliderMultimedia() {
    stepsCountMultimedia = Math.floor((multimediaWidth - $multimediaWrapper.outerWidth()) / firstChildWidthMultimedia) + 1;
}

function getWidthMultimediaWrapper() {
    if ($multimediaWrapper.outerWidth() === 0) return 0;
    const $childrenMultimedia = $multimediaWrapper.children('.multimedia_type_card-container');
    const childrenCountMultimedia = $childrenMultimedia.length;
    if (childrenCountMultimedia === 0) return 0;
    firstChildWidthMultimedia = $childrenMultimedia.first().outerWidth();
    let gapValueMultimedia = 0;
    const displayMultimedia = $multimediaWrapper.css('display');
    if (displayMultimedia.includes('flex') || displayMultimedia.includes('grid')) {
        const gapStringMultimedia = $multimediaWrapper.css('gap');
        if (gapStringMultimedia && gapStringMultimedia !== 'normal') {
            const gapsMultimedia = gapStringMultimedia.split(/\s+/);
            gapValueMultimedia = parseFloat(gapsMultimedia.length > 1 ? gapsMultimedia[1] : gapsMultimedia[0]) || 0;
        }
    }
    firstChildWidthMultimedia += gapValueMultimedia;
    return (childrenCountMultimedia * firstChildWidthMultimedia) + (gapValueMultimedia * (childrenCountMultimedia - 1));
}

function sliderMultimediaCreate() {
    if (multimediaWidth > $multimediaWrapper.outerWidth()) {
        initSliderMultimedia();
    } 
}

let multimediaWidth = getWidthMultimediaWrapper();
sliderMultimediaCreate();
$btnRight.on('click', () => {
    if (stepsCountMultimedia !== counterMultimedia) {
        scrollStepMultimedia += firstChildWidthMultimedia;
    }
    $multimediaWrapper.animate({ scrollLeft: scrollStepMultimedia}, 500, function () {
        if (stepsCountMultimedia !== counterMultimedia) {
            counterMultimedia += 1;
        } 
    })
});

$btnLeft.on('click', () => {
    if (counterMultimedia !== 0) {
        scrollStepMultimedia -= firstChildWidthMultimedia;
    }
    $multimediaWrapper.animate({ scrollLeft: scrollStepMultimedia}, 500, function () {
        if (counterMultimedia !== 0) {
            counterMultimedia -= 1;
        } 
    })
});

let $modalLeft = $('#multimedia-arrow-left-modal');
let $modalRight = $('#multimedia-arrow-right-modal');
let currentValue = '';
let valuesArrow = $multimediaWrapper.find('.multimedia_type_card-container-dark').map(function() {
    return $(this).attr('value');
}).get();
let lenghtValues = valuesArrow.length;

function findValueIndex(value) {
    return valuesArrow.indexOf(value);
};

$(window).on('resize', function() {
    multimediaWidth = getWidthMultimediaWrapper();
    sliderMultimediaCreate();
});

$('#bg-dark').on('click', function() {
    $('#bg-dark').hide();
    $('#img-modal').children().remove();
    $('#multimedia-modal').hide();
});

$('.multimedia_type_card-container-dark').on('click', function() {
    $('#bg-dark').show();
    $('#multimedia-modal').show();
    $('#img-modal').append(`<img src="./blocks/multimedia/photos/${$(this).attr('value')}.jpg" alt="img-modal">`);
    currentValue = $(this).attr('value');
});

$modalLeft.on('click', function() {
    indexCurentValue = findValueIndex(currentValue);
    if (indexCurentValue === 0) {
        currentValue = valuesArrow[lenghtValues - 1];
    } else {
        currentValue = valuesArrow[indexCurentValue - 1];
    }
    $('#img-modal').children().remove();
    $('#img-modal').append(`<img src="./blocks/multimedia/photos/${currentValue}.jpg" alt="img-modal">`);
});

$modalRight.on('click', function() {
    indexCurentValue = findValueIndex(currentValue);
    if (indexCurentValue === (lenghtValues - 1)) {
        currentValue = valuesArrow[0];
    } else {
        currentValue = valuesArrow[indexCurentValue + 1];
    }
    $('#img-modal').children().remove();
    $('#img-modal').append(`<img src="./blocks/multimedia/photos/${currentValue}.jpg" alt="img-modal">`);
});
