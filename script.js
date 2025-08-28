
const emergencyServices = [
    {
        id: 1,
        name: "National Emergency Number",
        description: "National Emergency",
        number: "999",
        category: "All",
        imagePath: "assets/emergency.png",
        iconClass: "help"
    },
    {
        id: 2,
        name: "Police Helpline Number",
        description: "Police",
        number: "106 ",
        category: "Police",
        imagePath: "assets/police.png",
        iconClass: "police"
    },
    {
        id: 3,
        name: "Fire Service Number",
        description: "Fire Service",
        number: "109",
        category: "Fire",
        imagePath: "assets/fire-service.png",
        iconClass: "fire"
    },
    {
        id: 4,
        name: "Ambulance Service",
        description: "Ambulance",
        number: "1994-999999",
        category: "Health",
        imagePath: "assets/ambulance.png",
        iconClass: "health"
    },
    {
        id: 5,
        name: "Women & Child Helpline",
        description: "Women & Child Helpline",
        number: "16216",
        category: "Help",
        imagePath: "assets/emergency.png",
        iconClass: "help"
    },
    {
        id: 6,
        name: "Anti-Corruption Helpline",
        description: "Anti-Corruption",
        number: "16445",
        category: "Govt.",
        imagePath: "assets/emergency.png",
        iconClass: "govt"
    },
    {
        id: 7,
        name: "Electricity Helpline",
        description: "Electricity Outage",
        number: "163",
        category: "Electricity",
        imagePath: "assets/emergency.png",
        iconClass: "electricity"
    },
    {
        id: 8,
        name: "Brac Helpline",
        description: "Brac",
        number: "16262",
        category: "NGO",
        imagePath: "assets/brac.png",
        iconClass: "ngo"
    },
    {
        id: 9,
        name: "Bangladesh Railway Helpline",
        description: "Bangladesh Railway",
        number: "16910",
        category: "Travel",
        imagePath: "assets/Bangladesh-Railway.png",
        iconClass: "travel"
    }
];


let heartCount = 0;
let coinCount = 100;
let copyCount = 0;
let callHistory = [];


const heartCountElement = document.getElementById('heartCount');
const coinCountElement = document.getElementById('coinCount');
const copyCountElement = document.getElementById('copyCount');
const cardsGrid = document.getElementById('cardsGrid');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');


function init() {
    renderEmergencyCards();
    setupEventListeners();
    updateCounters();
}


function renderEmergencyCards() {
    cardsGrid.innerHTML = '';
    
    emergencyServices.forEach(service => {
        const card = createEmergencyCard(service);
        cardsGrid.appendChild(card);
    });
}


function createEmergencyCard(service) {
    const card = document.createElement('div');
    card.className = 'emergency-card';
    card.innerHTML = `
        <i class="fas fa-heart card-heart" data-service-id="${service.id}"></i>
        <div class="card-icon ${service.iconClass}">
            <img src="${service.imagePath}" alt="${service.name}" class="service-logo">
        </div>
        <div class="card-name">${service.name}</div>
        <div class="card-description">${service.description}</div>
        <div class="card-number">${service.number}</div>
        <div class="card-category">${service.category}</div>
        <div class="card-buttons">
            <button class="btn btn-copy" data-service-id="${service.id}">
                <i class="fas fa-copy"></i>
                Copy
            </button>
            <button class="btn btn-call" data-service-id="${service.id}">
                <i class="fas fa-phone"></i>
                Call
            </button>
        </div>
    `;
    
    return card;
}


function setupEventListeners() {

    cardsGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('card-heart')) {
            handleHeartClick(e.target);
        }
    });
    

    cardsGrid.addEventListener('click', (e) => {
        if (e.target.closest('.btn-copy')) {
            const button = e.target.closest('.btn-copy');
            const serviceId = parseInt(button.dataset.serviceId);
            handleCopyClick(serviceId);
        }
    });
    

    cardsGrid.addEventListener('click', (e) => {
        if (e.target.closest('.btn-call')) {
            const button = e.target.closest('.btn-call');
            const serviceId = parseInt(button.dataset.serviceId);
            handleCallClick(serviceId);
        }
    });
    

    clearHistoryBtn.addEventListener('click', clearCallHistory);
}


function handleHeartClick(heartIcon) {
    const serviceId = parseInt(heartIcon.dataset.serviceId);
    
    if (heartIcon.classList.contains('active')) {
        heartIcon.classList.remove('active');
        heartCount--;
    } else {
        heartIcon.classList.add('active');
        heartCount++;
    }
    
    updateCounters();
}


function handleCopyClick(serviceId) {
    const service = emergencyServices.find(s => s.id === serviceId);
    if (!service) return;
    

    navigator.clipboard.writeText(service.number).then(() => {
        
        alert(`Hotline number "${service.number}" has been copied to clipboard!`);
  
        copyCount++;
        updateCounters();
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy number. Please try again.');
    });
}


function handleCallClick(serviceId) {
    const service = emergencyServices.find(s => s.id === serviceId);
    if (!service) return;
    

    if (coinCount < 20) {
        alert('Insufficient coins! You need at least 20 coins to make a call.');
        return;
    }
    
    coinCount -= 20;
    
  
    alert(`Calling ${service.name} at ${service.number}`);
    
  
    addToCallHistory(service);
    
   
    updateCounters();
}


function addToCallHistory(service) {
    const historyItem = {
        id: Date.now(),
        serviceName: service.name,
        serviceNumber: service.number,
        callTime: getCurrentTime()
    };
    
    callHistory.unshift(historyItem);
    renderCallHistory();
}


function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}


function renderCallHistory() {
    historyList.innerHTML = '';
    
    if (callHistory.length === 0) {
        historyList.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">No call history yet</p>';
        return;
    }
    
    callHistory.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-info">
                <div class="history-service">${item.serviceName}</div>
                <div class="history-number">${item.serviceNumber}</div>
            </div>
            <div class="history-time">${item.callTime}</div>
        `;
        historyList.appendChild(historyItem);
    });
}


function clearCallHistory() {
    if (callHistory.length === 0) {
        alert('Call history is already empty!');
        return;
    }
    
    if (confirm('Are you sure you want to clear all call history?')) {
        callHistory = [];
        renderCallHistory();
        alert('Call history has been cleared!');
    }
}


function updateCounters() {
    heartCountElement.textContent = heartCount;
    coinCountElement.textContent = coinCount;
    copyCountElement.textContent = copyCount;
}


document.addEventListener('DOMContentLoaded', init);
