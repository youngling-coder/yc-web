// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.padding = "15px 0";
        header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)";
    } else {
        header.style.padding = "20px 0";
        header.style.boxShadow = "none";
    }
});

// Flip card functionality
const flipCard = document.getElementById('flipCard');
const flipCardInner = flipCard.querySelector('.flip-card-inner');

// Flip on click
flipCard.addEventListener('click', function() {
    this.classList.toggle('flipped');
});

// 3D tilt effect on hover, opposite to cursor position

flipCard.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Calculate rotation: move opposite to cursor
    const rotateY = ((centerX - x) / centerX) * 30;
    const rotateX = ((centerY - y) / centerY) * 10;
    if (this.classList.contains('flipped')) {
        // When flipped, rotateY is reversed to match the back side
        flipCardInner.style.transform = `rotateY(${180 + rotateY}deg) rotateX(${rotateX}deg)`;
    } else {
        flipCardInner.style.transform = `rotateY(${rotateY}deg) rotateX(${-rotateX}deg)`;
    }
});


// flipCard.addEventListener('mouseleave', function() {
//     if (this.classList.contains('flipped')) {
//         flipCardInner.style.transform = 'rotateY(180deg)';
//     } else {
//         flipCardInner.style.transform = '';
//     }
// });

// Reset transform when flipped

// flipCard.addEventListener('transitionend', function() {
//     if (this.classList.contains('flipped')) {
//         flipCardInner.style.transform = 'rotateY(180deg)';
//     } else {
//         flipCardInner.style.transform = '';
//     }
// });