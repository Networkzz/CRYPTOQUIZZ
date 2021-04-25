//Nav
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('nav-links li');
    

    burger.addEventListener('click', () => {
        //Toogle nav
        nav.classList.toggle('nav-active');

        //Animate links
            navLinks.forEach((link, index) => {
                if(link.style.animation){
                    link.style.animation = '';
                }else{
                    link.style.animation = `navLinkFade 0.5 ease forwards ${index / 7 + 1.5}s`;
                }
        });
        //Buger animation
        burger.classList.toggle('toggle');
    });
    
}

navSlide();