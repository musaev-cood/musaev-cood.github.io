let WebApp = window.Telegram.WebApp;
WebApp.expand()
let cart = [];
WebApp.MainButton();
WebApp.MainButton.setText("ЗАКАЗАТЬ");
WebApp.MainButton.show()
function cartDispatcher(){
    if (cart.length > 0){
        WebApp.MainButton.show()
    }else{
        WebApp.MainButton.hide()
    }
}
function AddToCartButton(element) {
    WebApp.HapticFeedback.impactOccurred("rigid")

    const deleteButton = element.nextElementSibling;
    const quantityElement = element.nextElementSibling.nextElementSibling;

    const productName = element.parentElement.querySelector('.product-title').textContent;
    const productPrice = parseFloat(element.parentElement.querySelector('.product-price').textContent);

    deleteButton.style.display = 'inline-block';
    quantityElement.style.display = 'inline-block';

    let currentQuantity = parseInt(quantityElement.textContent, 10) || 0;

    if (currentQuantity === 0){
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });

        quantityElement.classList.add('fade-in');
        setTimeout(() => {
            quantityElement.classList.remove('fade-in');
        }, 200);

        deleteButton.style.transition = 'padding 0.2s';
        element.textContent = "+";
        element.style.fontWeight = 800;
        element.style.padding = '.3em 3em calc(.3em + 3px)';

        setTimeout(() => {
            deleteButton.style.padding = '.3em 1.25em calc(.3em + 3px)';
            deleteButton.style.opacity = 1;
            element.style.padding = '.3em 1em calc(.3em + 3px)';
        }, 100);
    }else{
        quantityElement.classList.add('bounce-in');
        setTimeout(() => {
            quantityElement.classList.remove('bounce-in');
        }, 100);
    }
    const index = cart.findIndex(item => item.name === productName);
        if (index !== -1 && currentQuantity<9) {
            quantityElement.textContent = currentQuantity+1;
            cart[index].quantity = parseInt(quantityElement.textContent);
        }

    cartDispatcher();
}
function deleteFromCartButton(element) {
    WebApp.HapticFeedback.impactOccurred("rigid")

    const quantityElement = element.nextElementSibling;
    const addButton = element.previousElementSibling;

    const productName = element.parentElement.querySelector('.product-title').textContent;

    let currentQuantity = parseInt(quantityElement.textContent, 10) || 0;
    quantityElement.textContent = Math.max(0, currentQuantity - 1).toString();

    if (currentQuantity <= 1) {
        cart = cart.filter(item => item.name !== productName);

        quantityElement.classList.add('fade-out');
        setTimeout(() => {
                quantityElement.classList.remove('fade-out');
                quantityElement.style.display = 'none';
        }, 100);

        addButton.style.transition = 'padding 0.15s';

        element.style.transition = 'padding 0.15s';
        element.style.transition = 'opacity 0.2s';

        element.style.display = 'none';
        element.style.opacity = 0;
        element.style.padding = '.3em 0.1em calc(.3em + 3px)';

        addButton.style.fontWeight = 800;
        addButton.style.padding = '.3em 3em calc(.3em + 3px)';
        setTimeout(() => {
            addButton.style.padding = '.3em 0.7em calc(.3em + 3px)';
        }, 50);
        setTimeout(() => {
            addButton.textContent = "ДОБАВИТЬ";
        }, 100);

    }else{
        const index = cart.findIndex(item => item.name === productName);
        if (index !== -1) {
            cart[index].quantity = parseInt(quantityElement.textContent)
        }
        quantityElement.classList.add('bounce-out');
        setTimeout(() => {
            quantityElement.classList.remove('bounce-out');
        }, 100);
    }
    cartDispatcher();
}
function rotateAnimation(element) {
    let clickedElement = event.target;

    if (clickedElement.tagName.toLowerCase() === 'img') {
        WebApp.HapticFeedback.impactOccurred("rigid")
        let img = element.querySelector('img');
        if (!img.classList.contains('rotate')) {
            img.classList.add('rotate');
            setTimeout(function () {
                img.classList.remove('rotate');
            }, 500);
        }
    }
}

window.onscroll = function() {
    const scrollToCategoriesButton = document.getElementById('scrollToCategoriesButton');
    const shouldShowButton = document.body.scrollTop > 600 || document.documentElement.scrollTop > 600;

    if (shouldShowButton !== scrollToCategoriesButton.classList.contains('visible')) {
        scrollToCategoriesButton.classList.toggle('visible');
    }
};

function scrollToTarget(targetId) {
    const targetElement = document.getElementById(targetId);
    WebApp.HapticFeedback.impactOccurred("rigid")
    if (targetElement) {
        const targetPosition = targetElement.offsetTop;
        const currentPosition = window.scrollY;
        const distance = targetPosition - currentPosition;

        const duration = 1000;
        let start = null;

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;

            window.scrollTo(0, easeInOutQuad(progress, currentPosition, distance, duration));

            if (progress < duration) {
                requestAnimationFrame(step);
            }
        }

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(step);
    }
}
