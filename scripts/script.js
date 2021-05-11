/**
 * @author Alejandro Martin @networkzz <https://github.com/Networkzz/>
 */
//Nav
/** @function navSlide
 * Responsive navbar forma de burger
 */

const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('nav-links li');
    
/** @function burger
 * Toggle del navbar
 */
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

/** @function navLinks
 * Animacion para el navbar
 */
            navLinks.forEach((link, index) => {
                if(link.style.animation){
                    link.style.animation = '';
                }else{
                    link.style.animation = `navLinkFade 0.5 ease forwards ${index / 7 + 1.5}s`;
                }
        });
        burger.classList.toggle('toggle');
    });
    
}
navSlide();