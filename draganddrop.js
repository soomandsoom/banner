const draggableItems = document.querySelectorAll('.draggable');
const webcamContainer = document.getElementById('draggableWebcam');
const inputContainer = document.getElementById('inputContainer');

let offsetX, offsetY;
let isDragging = false;
let activeItem = null;
let highestZIndex = 1;

draggableItems.forEach(item => {
    item.addEventListener('mousedown', startDragging);
});
webcamContainer.addEventListener('mousedown', startDragging);
inputContainer.addEventListener('mousedown', startDragging);

document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stopDragging);

function startDragging(event) {
    isDragging = true;
    offsetX = event.offsetX;
    offsetY = event.offsetY;
    activeItem = this;
    if (activeItem === webcamContainer) {
        activeItem = webcamContainer;
    }

activeItem.style.zIndex = ++highestZIndex;
}

function drag(event) {
    if (isDragging && activeItem) {
        const x = event.clientX - offsetX;
        const y = event.clientY - offsetY;
        activeItem.style.left = x + 'px';
        activeItem.style.top = y + 'px';
    }
}

function stopDragging() {
    isDragging = false;
    activeItem = null;
}

draggableItems.forEach(item => {
    item.ondragstart = function() {
        return false;
    };
});


navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        webcam.srcObject = stream;
    })
    .catch(error => {
        console.error('Error accessing webcam:', error);
    });

    function flipWebcam() {
        webcam.style.transform = 'scaleX(-1)';
    }
    
    flipWebcam();

    let currentIndex = 0;
const images = document.querySelectorAll('.image');

function showImage(index) {
    images.forEach(image => {
        image.style.display = 'none';
    });
    images[index].style.display = 'block';
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

// 초기 이미지 표시
showImage(currentIndex);

images.forEach(item => {
    item.ondragstart = function() {
        return false;
    };
});


//뿅
document.getElementById('containerbutton').addEventListener('click', function() {
    var containers = document.querySelectorAll('.container .draggable');
    containers.forEach(function(container) {
        container.style.display = container.style.display === 'block' ? 'none' : 'block';
    });
}); 


