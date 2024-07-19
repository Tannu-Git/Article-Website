const starfishAdder = (min,max,posotions)=>{
    
    if(!document.querySelector('.item')){
       // Add starfish and shell images
       const items = ['starfish.png', 'shell.png'];
       const itemElements = [];
       const minItems = min;
       const maxItems = max;
       const numberOfItems = Math.floor(Math.random() * (maxItems - minItems + 1)) + minItems;
   
       function getRandomRotation() {
           return Math.random() * 360; // Random rotation between 0 and 360 degrees
       }
   
       function getRandomItemSize() {
           return Math.random() * 3 + 2; // Random size between 2vw and 5vw
       }
   
       function getRandomPosition() {
           return {
               x: Math.random() * 100, // Random position between 0 and 100vw
               y: Math.random() * 100  // Random position between 0 and 100vh
           };
       }
   
       for (let i = 0; i < numberOfItems; i++) {
           let x, y, size;
           let attempts = 0;
           let itemType;
   
           do {
               const position = getRandomPosition();
               x = position.x;
               y = position.y;
               size = getRandomItemSize();
               attempts++;
               if (attempts > 1000) break; // Prevent infinite loop
           } while (false); // Remove overlapping check for simplicity
   
           if (attempts <= 1000) {
               itemType = items[Math.floor(Math.random() * items.length)];
   
               const item = document.createElement('img');
               item.src = itemType;
               item.classList.add('item');
               item.style.position = posotions; // Make the item static
               item.style.zIndex = -1;
               item.style.top = `${y}vh`;
               item.style.left = `${x}vw`;
               item.style.width = `${size}vw`;
               item.style.height = 'auto';
               item.style.transform = `rotate(${getRandomRotation()}deg)`;
               itemElements.push({ x, y, size });
               document.body.appendChild(item);
           }
       }

}}

export default starfishAdder;