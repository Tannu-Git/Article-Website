const textOnSand = ()=>{
    if(!document.querySelector('.aoos')){

    
        // console.log('workefd');
        const textContainer = document.querySelector('.text-container');
        const commentSection = document.querySelector('.comment-section');
        const tcRect = textContainer.getBoundingClientRect();
        const csRect = commentSection.getBoundingClientRect();
        const tcLeft = tcRect.left;
        const tcRight = tcRect.right;
        const pageWidth = document.documentElement.clientWidth;
        const placedElements = [];
        const maxElementHeight = 100;
        const maxAllowedYPos = csRect.top - maxElementHeight;
    
        // Predefined list of texts
        const texts = ["Love", "Peace", "Heart", "Joy", "Forever","Relax"];
        // Add an image URL to the mix
        const images = ["images.png"];
        const numberOfElements = Math.min(Math.floor(Math.random() * 4) + 3, texts.length + images.length);
        let yPos = window.innerHeight + 100;
        let imagePlaced = false; // Flag to track if an image has been placed
    
        for (let i = 0; i < numberOfElements; i++) {
            let retries = 10;
            let elementPlaced = false;
    
            while (!elementPlaced && retries > 0) {
                let element;
                let elementWidth;
                // Decide randomly whether to place text or image
                       if (Math.random() < 0.5 && !imagePlaced) {
                // Image element
                element = document.createElement('img');
        element.src = images[0];
        element.alt = 'Dynamic Image';
        elementWidth = 200; // Set a fixed width or calculate based on image dimensions
        element.style.width = `${elementWidth}px`;
        element.style.filter = "invert(51%) sepia(7%) saturate(3330%) hue-rotate(345deg) brightness(86%) contrast(87%)";
        element.style.opacity = "0.58";
        imagePlaced = true; // Set the flag to true after placing an image
            } else {
                // Text element
                element = document.createElement('div');
        element.textContent = texts[i % texts.length];
        const fontSize = Math.floor(Math.random() * 21) + 20;
        elementWidth = fontSize * 6; // Approximate width based on font size
        element.style.fontSize = `${fontSize}px`;
        element.style.fontFamily = 'Tahiti Sand';
        element.style.color = 'transparent';
        element.style.textShadow = '0 0 0 #a16c418a';
    }
    element.classList.add('aoos'); // Add class 'iiteens' to the element
                const placeOnLeft = Math.random() < 0.5;
                let xPos;
                if (placeOnLeft) {
                    xPos = Math.random() * Math.max(0, (tcLeft - elementWidth - 200));
                } else {
                    xPos = tcRight + Math.random() * (pageWidth - tcRight - elementWidth - 200);
                }
                yPos += Math.floor(Math.random() * 100) + 50 + (element.tagName === 'DIV' ? parseInt(element.style.fontSize) : 0);
                if (yPos > maxAllowedYPos) {
                    yPos = maxAllowedYPos;
                }
                const rotation = Math.floor(Math.random() * 91) - 30;
    
                let tooClose = placedElements.some(pos => {
                    const dx = pos.x - xPos;
                    const dy = pos.y - yPos;
                    return Math.sqrt(dx * dx + dy * dy) < 400;
    });
    
                if (!tooClose) {
                    element.style.position = 'absolute';
                    element.style.left = `${xPos}px`;
                    element.style.top = `${yPos}px`;
                    if (element.tagName === 'DIV') {
                        element.style.transform = `rotate(${rotation}deg)`;
                    }
                    element.style.zIndex = "-2";
                    document.body.appendChild(element);
                    placedElements.push({x: xPos, y: yPos});
                    elementPlaced = true;
                } else {
                    yPos -= 10;
                    retries--;
                }
            }
        }
    
}}
const cursorMaker = () => {
    const cursor = document.getElementById('custom-cursor');
    let lastX = 0;
    let lastY = 0;
    let moveTimeout;
    const threshold = 5; // Adjust the threshold value as needed

    if (cursor) {
        document.body.style.cursor = 'none';
        const textContainer = document.querySelector('.text-container')
        const commentEditor = document.querySelector('.comment-editor-container')
        const commentText = document.querySelectorAll('.comment-text')
        document.addEventListener('mousemove', (e) => {
            clearTimeout(moveTimeout);

            const deltaX = e.clientX - lastX;
            const deltaY = e.clientY - lastY;

            if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
                if (Math.abs(deltaX) > Math.abs(deltaY)) {
                    if (deltaX > 0) {
                        cursor.src = 'right.png';
                    } else {
                        cursor.src = 'left.png'; // Ensure this path is correct
                    }
                } else {
                    if (deltaY > 0) {
                        cursor.src = 'down.png';
                    } else {
                        cursor.src = 'up.png';
                    }
                }

                lastX = e.clientX;
                lastY = e.clientY;
            }

            // Center the cursor image over the mouse pointer and move it a bit down
            cursor.style.left = `${e.clientX - cursor.offsetWidth / 2 + 2}px`;
            cursor.style.top = `${e.clientY - cursor.offsetHeight / 2 + 10 + window.scrollY}px`; // Adjust the value as needed

            moveTimeout = setTimeout(() => {
                cursor.src = 'normal.png'; // Reset to normal when not moving
            }, 100);
        });

        document.addEventListener('scroll', () => {
            // Adjust the cursor position based on the scroll position
            cursor.style.top = `${lastY - cursor.offsetHeight / 2 + 10 + window.scrollY}px`;
        });

        textContainer.addEventListener('mouseenter', () => {
            document.body.style.cursor = '';
        });
        
        textContainer.addEventListener('mouseleave', () => {
            document.body.style.cursor = 'none';
        });

        commentEditor.addEventListener('mouseenter', () => {
            document.body.style.cursor = '';
        });
        
        commentEditor.addEventListener('mouseleave', () => {
            document.body.style.cursor = 'none';
        });

        commentText.forEach(item=>{
            item.addEventListener('mouseenter', () => {
                document.body.style.cursor = '';
            });
            
            item.addEventListener('mouseleave', () => {
                document.body.style.cursor = 'none';
            });
        })

    }
};
// const ckeditorr = (listOfComments)=>{
// //   Initialize CKEditor
// if(document.querySelector('#comment-editor')){
//     // CKEDITOR.replace('comment-editor');
// }
   
// }
const videoBg = ()=>{
    const video = document.getElementById('myVideo');
    
    video.addEventListener('timeupdate', function() {
if (video.currentTime >= 40) {
    video.style.maskImage = 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0))';
    return;
}
else if (video.currentTime >= 35) {
    video.style.maskImage = 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 45%, rgba(0, 0, 0, 0))';
    return;
}
else if (video.currentTime >= 30) {
    video.style.maskImage = 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0))';
    return;
}
else if (video.currentTime >= 13) {
    video.style.maskImage = 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0))';
    return;
}
else if (video.currentTime >= 5) {
    video.style.maskImage = 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0))';
    return;
}
else if (video.currentTime >= 0) {
    video.style.maskImage = 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0))';
    return;
}
});
}

export { videoBg, cursorMaker, textOnSand };