const codeContent = `
#!/usr/bin/env python3

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def hello():
    return {"message": "Hello World!"}`;

function animateCode() {
    const codeElement = document.getElementById('animated-code');

    let i = 0;
    const speed = 90; // Скорость печати (мс на символ)
    
    function typeWriter() {
        if (i < codeContent.length) {
            codeElement.innerHTML += codeContent.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    // Старт анимации с небольшой задерзкой
    setTimeout(() => {
        codeElement.style.opacity = '1';
        typeWriter();
    }, 500);
}

async function fetchRandomImage() {
    const imageContainer = document.getElementById('dynamic-image');
    const loader = document.getElementById('image-loader');

    try {
        const accessKey = import.meta.env.PUBLIC_UNSPLASH_API_TOKEN;
        const query = 'blue abstract';
        const url = `https://api.unsplash.com/photos/random?client_id=${accessKey}&query=${query}`;

        const response = await fetch(url);
        const data = await response.json();
        
        imageContainer.style.backgroundImage = `url(${data.urls.regular})`;
        console.log(imageContainer.style.backgroundImage);
        
    } catch (error) {
        // do nothing
    } finally {
        imageContainer.style.opacity = '1';
        loader.style.display = 'none';
    }
}

function handleMouseMove(e) {
    const container = document.querySelector('.parallax-container');
    const { left, top, width, height } = container.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const rotateX = (e.clientY - centerY) * 0.02;
    const rotateY = (e.clientX - centerX) * -0.02;

    // Объединяем все трансформации в одно свойство
    container.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.05)
    `;
}

function handleMouseLeave() {
    const container = document.querySelector('.parallax-container');
    container.style.transform = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.parallax-container');

    // Загружаем первое изображение при загрузке страницы
    fetchRandomImage();
    animateCode(); // Перезапускаем анимацию кода

    // Обработчик движения мыши
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Обработчик клика для смены изображения
    container.addEventListener('click', fetchRandomImage);
});