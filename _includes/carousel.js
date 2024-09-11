// carousel.js
const tabs = document.querySelectorAll('.tab');
const carousel = document.querySelector('.carousel');
const toggleSwitch = document.getElementById('toggleWidth');
const chartContainer = document.getElementById('chartContainer');
const screenerContainer = document.getElementById('screenerContainer');
const heatmapContainer = document.getElementById('heatmapContainer');
const techContainer = document.getElementById('techContainer');

// Function to update the carousel position
function updateCarousel(index) {
    const offset = -index * 100;
    carousel.style.transform = `translateX(${offset}%)`;
    tabs.forEach(tab => tab.classList.remove('active'));
    tabs[index].classList.add('active');
}

// Event listener for tabs
tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => updateCarousel(index));
});

// Function to toggle container width
function toggleContainerWidth() {
    if (toggleSwitch.checked) {
        chartContainer.style.width = '70%';
        screenerContainer.style.width = '70%';
        heatmapContainer.style.width = '70%';
        techContainer.style.display = 'block';
    } else {
        chartContainer.style.width = '100%';
        screenerContainer.style.width = '100%';
        heatmapContainer.style.width = '100%';
        techContainer.style.display = 'none';
    }
}

// Initialize with default widths and active tab
updateCarousel(0);
toggleContainerWidth();

