// Emergency data for dogs and cats with symptoms
const emergencyData = {
  dog: {
    title: '강아지 응급처치',
    image: './assets/images/dog_main.jpg',
    symptoms: [
      { name: '의식 없음', steps: ['의식 없으면 기도 확보·호흡 여부 확인', '즉시 병원 이송', '목과 척추 손상 주의'] },
      { name: '출혈', steps: ['깨끗한 천으로 압박 지혈(10분 유지)', '지혈 후 붕대 감기', '계속 출혈 시 병원 이송'] },
      { name: '기도 막힘', steps: ['입안 확인, 보이는 이물만 조심스럽게 제거', '무리하게 제거 금지', '호흡 곤란 시 즉시 병원'] },
      { name: '중독 의심', steps: ['먹은 것(포장) 사진 기록', '즉시 수의사 문의', '구토 유도 금지'] },
      { name: '체온 관리', steps: ['저체온이면 담요로 감싸기', '과열이면 시원한 곳으로 이동', '수의사 상담'] }
    ]
  },
  cat: {
    title: '고양이 응급처치',
    image: './assets/images/cat_main.jpg',
    symptoms: [
      { name: '의식 없음', steps: ['숨 쉬는지 확인', '의식 없으면 병원 이송 준비', '스트레스 최소화'] },
      { name: '출혈', steps: ['거즈로 압박 지혈', '스트레스 최소화', '계속 출혈 시 병원 이송'] },
      { name: '호흡 곤란', steps: ['호흡 곤란 시 즉시 수의사 응급조치 필요', '입을 억지로 열지 말기', '안정된 자세 유지'] },
      { name: '중독 의심', steps: ['먹은 것 사진·포장 보관', '병원 문의', '구토 유도 금지'] },
      { name: '부상', steps: ['목·다리 의심 부상은 고정 후 이동', '수의사 지시 따름', '과도한 움직임 금지'] }
    ]
  }
};

const warningText = '주의: 이 앱은 응급 요약용입니다. 정확한 진단과 처치는 반드시 수의사의 판단을 따르세요. 심한 경우 즉시 병원 방문.';

// Initialize localStorage with emergency data
function initializeStorage() {
  if (!localStorage.getItem('emergencyData')) {
    localStorage.setItem('emergencyData', JSON.stringify(emergencyData));
  }
  if (!localStorage.getItem('warningText')) {
    localStorage.setItem('warningText', warningText);
  }
}

// Render main screen
function renderMainScreen() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="screen active" id="main-screen">
      <div class="header">
        <h1 class="app-title">펫 응급 레이더</h1>
      </div>
      <div class="main-content">
        <img src="./assets/images/hero.png" alt="펫 응급 레이더 - 강아지와 고양이" class="hero-image">
        <div class="button-group">
          <button class="btn-primary" onclick="showScreen('pet-select')">
            🐕 강아지 응급처치
          </button>
          <button class="btn-primary" onclick="showScreen('pet-select-cat')">
            🐈 고양이 응급처치
          </button>
        </div>
      </div>
      <div class="warning-footer">
        ${warningText}
      </div>
    </div>
  `;
}

// Render pet selection screen with symptom search
function renderPetSelectScreen(petType) {
  const app = document.getElementById('app');
  const pet = petType === 'dog' ? emergencyData.dog : emergencyData.cat;
  const symptoms = pet.symptoms.map(s => s.name);
  
  app.innerHTML = `
    <div class="screen active" id="pet-select-screen">
      <div class="header">
        <button class="btn-back" onclick="showScreen('main')">←</button>
        <h1 class="app-title">${pet.title}</h1>
      </div>
      <div class="search-container">
        <input 
          type="text" 
          id="symptom-input" 
          class="symptom-search" 
          placeholder="증상을 입력하세요 (예: 출혈, 의식)" 
          autocomplete="off"
          oninput="filterSymptoms('${petType}')"
        >
        <div id="symptom-suggestions" class="symptom-suggestions"></div>
      </div>
      <div class="symptom-list">
        ${symptoms.map((symptom, idx) => `
          <button class="symptom-card" onclick="showResult('${petType}', ${idx})">
            <span class="symptom-name">${symptom}</span>
            <span class="arrow">→</span>
          </button>
        `).join('')}
      </div>
      <div class="warning-footer">
        ${warningText}
      </div>
    </div>
  `;
  
  // Setup autocomplete
  setupAutocomplete(symptoms);
}

// Filter symptoms based on input
function filterSymptoms(petType) {
  const input = document.getElementById('symptom-input').value.toLowerCase();
  const pet = petType === 'dog' ? emergencyData.dog : emergencyData.cat;
  const suggestions = document.getElementById('symptom-suggestions');
  
  if (!input) {
    suggestions.innerHTML = '';
    return;
  }
  
  const filtered = pet.symptoms
    .filter(s => s.name.toLowerCase().includes(input))
    .map(s => s.name);
  
  suggestions.innerHTML = filtered.map(symptom => `
    <div class="suggestion-item" onclick="selectSymptom('${symptom}', '${petType}')">${symptom}</div>
  `).join('');
}

// Select symptom from autocomplete
function selectSymptom(symptom, petType) {
  const pet = petType === 'dog' ? emergencyData.dog : emergencyData.cat;
  const idx = pet.symptoms.findIndex(s => s.name === symptom);
  if (idx !== -1) {
    showResult(petType, idx);
  }
}

// Setup autocomplete
function setupAutocomplete(symptoms) {
  const input = document.getElementById('symptom-input');
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const suggestions = document.querySelectorAll('.suggestion-item');
      if (suggestions.length > 0) {
        suggestions[0].click();
      }
    }
  });
}

// Render result screen
function showResult(petType, symptomIndex) {
  const app = document.getElementById('app');
  const pet = petType === 'dog' ? emergencyData.dog : emergencyData.cat;
  const symptom = pet.symptoms[symptomIndex];
  
  app.innerHTML = `
    <div class="screen active" id="result-screen">
      <div class="header">
        <button class="btn-back" onclick="showScreen('pet-select-${petType === 'dog' ? '' : 'cat'}')">←</button>
        <h1 class="app-title">${symptom.name}</h1>
      </div>
      <div class="result-content">
        <img src="${pet.image}" alt="${pet.title}" class="pet-image">
        <div class="steps-container">
          ${symptom.steps.map((step, idx) => `
            <div class="step-card">
              <div class="step-number">Step ${idx + 1}</div>
              <div class="step-text">${step}</div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="action-buttons">
        <button class="btn-action" onclick="openHospitalMap()">
          🏥 24시 병원 찾기
        </button>
        <button class="btn-action" onclick="openPharmacyMap()">
          💊 약국 찾기
        </button>
        <button class="btn-action" onclick="callEmergency()">
          📞 긴급 전화
        </button>
      </div>
      <div class="warning-footer">
        ${warningText}
      </div>
    </div>
  `;
}

// Open hospital map
function openHospitalMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapsUrl = `https://www.google.com/maps/search/24시+동물병원/@${latitude},${longitude},15z`;
        window.open(mapsUrl, '_blank');
      },
      () => {
        window.open('https://www.google.com/maps/search/24시+동물병원/', '_blank');
      }
    );
  } else {
    window.open('https://www.google.com/maps/search/24시+동물병원/', '_blank');
  }
}

// Open pharmacy map
function openPharmacyMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapsUrl = `https://www.google.com/maps/search/약국/@${latitude},${longitude},15z`;
        window.open(mapsUrl, '_blank');
      },
      () => {
        window.open('https://www.google.com/maps/search/약국/', '_blank');
      }
    );
  } else {
    window.open('https://www.google.com/maps/search/약국/', '_blank');
  }
}

// Call emergency
function callEmergency() {
  window.location.href = 'tel:+82-1577-0369';
}

// Show screen
function showScreen(screenName) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => screen.classList.remove('active'));
  
  if (screenName === 'main') {
    renderMainScreen();
  } else if (screenName === 'pet-select') {
    renderPetSelectScreen('dog');
  } else if (screenName === 'pet-select-cat') {
    renderPetSelectScreen('cat');
  }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  initializeStorage();
  renderMainScreen();
});
