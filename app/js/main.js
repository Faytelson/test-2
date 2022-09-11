(function() {
    const burgerSwitch = document.querySelector('.js-burger-switch-btn'),
        burgerNav = document.querySelector('.js-burger__nav');

    burgerSwitch.addEventListener('click', function(evt) {
        this.classList.toggle('active');
        burgerNav.classList.toggle('active');
        document.body.classList.toggle('locked');
    })
})();

const swiper = new Swiper('.swiper', {
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    simulateTouch: true,
});