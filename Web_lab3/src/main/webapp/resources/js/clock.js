function updateClock() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };
    document.getElementById('clock').innerText = now.toLocaleString('ru-RU', options);
}

// Update every 12 seconds as per requirements
setInterval(updateClock, 12000);
updateClock(); // Initial call

