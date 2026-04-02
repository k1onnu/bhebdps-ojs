document.querySelectorAll('.rotator').forEach(rotator => {
    const items = Array.from(rotator.querySelectorAll('.rotator__case'));
    let activeIndex = items.findIndex(item => item.classList.contains('rotator__case_active'));
    
    function next() {
        items[activeIndex].classList.remove('rotator__case_active');
        activeIndex = (activeIndex + 1) % items.length;
        const nextItem = items[activeIndex];
        nextItem.classList.add('rotator__case_active');
        
        if (nextItem.dataset.color) rotator.style.color = nextItem.dataset.color;
        
        setTimeout(next, nextItem.dataset.speed ? parseInt(nextItem.dataset.speed) : 1000);
    }
    
    setTimeout(next, items[activeIndex].dataset.speed ? parseInt(items[activeIndex].dataset.speed) : 1000);
});