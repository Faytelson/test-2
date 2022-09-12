//menu
(function() {
    const burgerSwitch = document.querySelector('.js-burger-switch-btn'),
        burgerNav = document.querySelector('.js-burger__nav');

    burgerSwitch.addEventListener('click', function() {
        this.classList.toggle('active');
        burgerNav.classList.toggle('active');
        document.body.classList.toggle('locked');
    })
})();

//cards
(function() {
    const parent = document.querySelector('.cards__body');

    class Card {
        constructor(imgSrc, parent) {
            this.parent = parent;
            this.imgSrc = imgSrc;
        }

        render() {
            const elem = document.createElement('div');
            elem.classList.add('card-item', 'cards__card-item');
            elem.innerHTML = `
                <a href="#" class="card-item__link">
                    <img src="${this.imgSrc}" alt="Услуги" title="Услуги" class="card-item__img">
                    <div class="card-item__title">Кадастровые работы <br> в отношении земельных участков</div>
                </a>
            `
            parent.append(elem);
        }
    }

    for(let i = 0; i < 6; i++) {
        new Card(`images/dest/pic_${i + 1}.jpg`, parent).render();
    }


//ajax

    const btnLoad = document.querySelector('.js-cards__m-btn');
    btnLoad.addEventListener('click', function loadCards(evt) {
        evt.preventDefault();
        fetch('./json/cards.json').then(
            response => {
                return response.json();
            }).then(
                ({cards}) => {
                for(let card of cards) {
                    new Card(card.imgSrc, parent).render();
                };
            })
            .catch(error => console.log(error));
            // this.removeEventListener('click', loadCards);
            this.disabled = true;
    })
})();