const grainMaker = ()=>{
    const grainsContainer = document.querySelector('.grains');
    const numberOfGrains = 2000;
    const grains = [];
    const minDistance = 2;
    const colors = ['#ebddbb', '#ead29a', '#f2d58f'];

    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function getRandomSize() {
        return Math.random() * 4 + 2; // Random size between 1px and 3px
    }

    function getRandomOpacity() {
        return Math.random() * 1.5 + 0.5; // Random opacity between 0.5 and 1
    }

    function isOverlapping(x, y, size) {
        for (const grain of grains) {
            const dx = grain.x - x;
            const dy = grain.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < size + minDistance) {
                return true;
            }
        }
        return false;   
    }

    for (let i = 0; i < numberOfGrains; i++) {
        let x, y, size;
        let attempts = 0;
        do {
            x = Math.random() * 100;
            y = Math.random() * 100;
            size = getRandomSize();
            attempts++;
            if (attempts > 1000) break; // Prevent infinite loop
        } while (isOverlapping(x, y, size));

        if (attempts <= 1000) {
            const grain = document.createElement('div');
            grain.classList.add('grain');
            grain.style.top = `${y}vh`;
            grain.style.left = `${x}vw`;
            grain.style.width = `${size}px`;
            grain.style.height = `${size}px`;
            grain.style.backgroundColor = getRandomColor();
            grain.style.opacity = getRandomOpacity();
                            grains.push({ x, y, size });
                            grainsContainer.appendChild(grain);
                        }
                    }
}

const cursorMaker = ()=>{

document.body.style.cursor = 'none';
const style = document.createElement('style');
style.innerHTML = '*:hover { cursor: none !important; }';
document.head.appendChild(style);

const cursorVideo = document.getElementById('cursorVideo');
const videoBackground = document.querySelector('.video-background');
const card = document.querySelectorAll('.card-anchor');
let lastX = 0;
let lastY = 0;
let isMoving = false;
let moveTimeout;
if (cursorVideo) {

document.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    cursorVideo.style.left = `${clientX + scrollX - cursorVideo.offsetWidth / 2}px`;
    cursorVideo.style.top = `${clientY + scrollY - cursorVideo.offsetHeight / 2 + 15}px`; // Adjust the value to move the cursor up

    if (clientX > lastX) {
        cursorVideo.style.transform = 'scaleX(1)'; // Normal orientation
    } else if (clientX < lastX) {
        cursorVideo.style.transform = 'scaleX(-1)'; // Flipped orientation
    }

    if (!isMoving) {
        cursorVideo.play();
        isMoving = true;
    }

    clearTimeout(moveTimeout);
    moveTimeout = setTimeout(() => {
        cursorVideo.pause();
        isMoving = false;
    }, 100); // Adjust the timeout duration as needed

    lastX = clientX;
    lastY = clientY;
});

document.addEventListener('scroll', () => {
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    cursorVideo.style.left = `${lastX + scrollX - cursorVideo.offsetWidth / 2}px`;
    cursorVideo.style.top = `${lastY + scrollY - cursorVideo.offsetHeight / 2 + 15}px`; // Adjust the value to move the cursor up
});

document.addEventListener('mouseleave', () => {
    cursorVideo.pause();
});

document.addEventListener('mouseenter', () => {
    cursorVideo.play();
});

cursorVideo.style.transition = 'width 0.4s ease, height 0.4s ease';

videoBackground.addEventListener('mouseenter', () => {
    cursorVideo.style.width = '400px'; // Change the size of the cursor video
    cursorVideo.style.height = '400px'; // Ensure height is also adjusted
});

videoBackground.addEventListener('mouseleave', () => {
    cursorVideo.style.width = '150px'; // Revert the size of the cursor video
    cursorVideo.style.height = '150px'; // Ensure height is also reverted
});
card.forEach(item=>{
    item.addEventListener('mouseenter', () => {
        cursorVideo.style.width = '200px'; // Change the size of the cursor video
        cursorVideo.style.height = '200px'; // Ensure height is also adjusted
    });
    
    item.addEventListener('mouseleave', () => {
        cursorVideo.style.width = '150px'; // Revert the size of the cursor video
        cursorVideo.style.height = '150px'; // Ensure height is also reverted
    });
})
}else{
    console.log('not loaded');
}
}

export  default grainMaker
export  {cursorMaker}