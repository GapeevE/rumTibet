let getWidth = () => {
    if ($(window).width() > 1440) {
        $('.search-form__button').prop('type', 'submit')
    } else {
        $('.search-form').css({padding: 0, width: 'auto'})
        $('.search-form__group').css({position: 'absolute', width: 0, opacity: 0})
    }    
}

getWidth()

let callBack_searchForm__group = () => {
    $('.search-form__button').prop('type', 'submit')
}

$('.search-form__button').on('click', () => {
    if ($('.search-form__button').prop('type') == 'button') {
        $('.search-form').animate({
            padding: '30px',
            width: '100%'
        }, 3000).children('.search-form__group').animate({
            opacity: 1,
            width: '+=160px',
        }, 4000, () => {
            callBack_searchForm__group()
        }).css({position: 'static'})
    }
})