// Emergency Symptom Database with severity levels
const symptomDatabase = {
  dog: {
    title: '강아지 응급처치',
    image: './assets/images/dog_main.jpg',
    symptoms: [
      { name: '의식 없음', severity: 'critical', steps: ['의식 없으면 기도 확보·호흡 여부 확인', '즉시 병원 이송', '목과 척추 손상 주의'] },
      { name: '심한 출혈', severity: 'critical', steps: ['깨끗한 천으로 압박 지혈(10분 유지)', '지혈 후 붕대 감기', '계속 출혈 시 병원 이송'] },
      { name: '호흡 곤란', severity: 'critical', steps: ['기도 확인, 보이는 이물만 제거', '무리하게 제거 금지', '호흡 곤란 시 즉시 병원'] },
      { name: '중독 의심', severity: 'critical', steps: ['먹은 것(포장) 사진 기록', '즉시 수의사 문의', '구토 유도 금지'] },
      { name: '경련/발작', severity: 'critical', steps: ['안전한 곳으로 이동', '입에 물건 넣지 않기', '발작 멈춘 후 즉시 병원'] },
      { name: '가벼운 출혈', severity: 'warning', steps: ['깨끗한 물로 씻기', '압박 지혈 5분', '지속되면 병원 방문'] },
      { name: '구토/설사', severity: 'warning', steps: ['2시간 금식', '물은 조금씩 제공', '12시간 이상 지속 시 병원'] },
      { name: '절뚝거림', severity: 'warning', steps: ['움직임 제한', '부기 확인', '24시간 후 호전 없으면 병원'] },
      { name: '식욕 부진', severity: 'caution', steps: ['스트레스 확인', '음식 변경 시도', '3일 이상 지속 시 병원'] },
      { name: '과도한 유연', severity: 'caution', steps: ['신선한 물 제공', '습도 조절', '지속되면 병원 상담'] }
    ]
  },
  cat: {
    title: '고양이 응급처치',
    image: './assets/images/cat_main.jpg',
    symptoms: [
      { name: '의식 없음', severity: 'critical', steps: ['숨 쉬는지 확인', '의식 없으면 병원 이송 준비', '스트레스 최소화'] },
      { name: '심한 출혈', severity: 'critical', steps: ['거즈로 압박 지혈', '스트레스 최소화', '계속 출혈 시 병원 이송'] },
      { name: '호흡 곤란', severity: 'critical', steps: ['호흡 곤란 시 즉시 수의사 응급조치 필요', '입을 억지로 열지 말기', '안정된 자세 유지'] },
      { name: '중독 의심', severity: 'critical', steps: ['먹은 것 사진·포장 보관', '병원 문의', '구토 유도 금지'] },
      { name: '부상', severity: 'critical', steps: ['목·다리 의심 부상은 고정 후 이동', '수의사 지시 따름', '과도한 움직임 금지'] },
      { name: '가벼운 출혈', severity: 'warning', steps: ['깨끗한 물로 씻기', '압박 지혈 5분', '지속되면 병원 방문'] },
      { name: '구토', severity: 'warning', steps: ['2시간 금식', '물은 조금씩 제공', '반복되면 병원 방문'] },
      { name: '배뇨 곤란', severity: 'warning', steps: ['스트레스 확인', '물 섭취 증가', '24시간 이상 지속 시 병원'] },
      { name: '식욕 부진', severity: 'caution', steps: ['스트레스 확인', '음식 변경 시도', '3일 이상 지속 시 병원'] },
      { name: '과도한 울음', severity: 'caution', steps: ['스트레스 확인', '환경 변화 확인', '지속되면 병원 상담'] }
    ]
  }
};

// Demo hospital data (will be replaced with real API)
const demoHospitals = [
  { name: '24시 동물응급센터', address: '서울시 강남구', phone: '02-1234-5678', distance: '0.8km', type: 'hospital' },
  { name: '야간 동물병원', address: '서울시 강남구', phone: '02-2345-6789', distance: '1.2km', type: 'hospital' },
  { name: '응급 수의클리닉', address: '서울시 서초구', phone: '02-3456-7890', distance: '1.5km', type: 'hospital' }
];

const warningText = '주의: 이 앱은 응급 요약용입니다. 정확한 진단과 처치는 반드시 수의사의 판단을 따르세요. 심한 경우 즉시 병원 방문하시기 바랍니다.';

// Initialize localStorage
function initializeStorage() {
  if (!localStorage.getItem('emergencyData')) {
    localStorage.setItem('emergencyData', JSON.stringify(symptomDatabase));
  }
}

// Get severity color and label
function getSeverityInfo(severity) {
  const severityMap = {
    critical: { label: '🚨 긴급', color: '#DC3545', bg: '#FFE5E5' },
    warning: { label: '⚠️ 주의', color: '#FF9800', bg: '#FFF3E0' },
    caution: { label: 'ℹ️ 일반', color: '#2196F3', bg: '#E3F2FD' }
  };
  return severityMap[severity] || severityMap.caution;
}

// Render main screen with pet selection and search
function renderMainScreen() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="screen active" id="main-screen">
      <div class="header">
        <h1 class="app-title">🐾 펫 응급 레이더</h1>
        <p class="subtitle">반려동물 응급 상황, 빠르게 대처하세요</p>
      </div>
      
      <div class="main-content">
        <!-- Pet Selection Tabs -->
        <div class="pet-tabs">
          <button class="pet-tab active" onclick="switchPet('dog')">
            🐕 강아지
          </button>
          <button class="pet-tab" onclick="switchPet('cat')">
            🐈 고양이
          </button>
        </div>

        <!-- Search Bar -->
        <div class="search-container">
          <input 
            type="text" 
            id="symptom-input" 
            class="symptom-search" 
            placeholder="증상을 입력하세요 (예: 출혈, 의식, 구토)" 
            autocomplete="off"
            oninput="filterSymptoms()"
          >
          <div id="symptom-suggestions" class="symptom-suggestions"></div>
        </div>

        <!-- Quick Symptoms -->
        <div class="quick-symptoms" id="quick-symptoms"></div>

        <!-- Result Card (shown after search) -->
        <div id="result-container" class="result-container" style="display: none;"></div>
      </div>

      <div class="warning-footer">
        ${warningText}
      </div>
    </div>
  `;
  
  // Initialize with dog symptoms
  currentPet = 'dog';
  renderQuickSymptoms('dog');
}

let currentPet = 'dog';

// Switch between dog and cat
function switchPet(pet) {
  currentPet = pet;
  document.querySelectorAll('.pet-tab').forEach(tab => tab.classList.remove('active'));
  event.target.classList.add('active');
  
  // Clear search
  document.getElementById('symptom-input').value = '';
  document.getElementById('symptom-suggestions').innerHTML = '';
  document.getElementById('result-container').style.display = 'none';
  
  renderQuickSymptoms(pet);
}

// Render quick symptom buttons
function renderQuickSymptoms(pet) {
  const container = document.getElementById('quick-symptoms');
  const symptoms = symptomDatabase[pet].symptoms.slice(0, 6);
  
  container.innerHTML = `
    <div class="symptoms-grid">
      ${symptoms.map((symptom, idx) => `
        <button class="symptom-btn" onclick="selectSymptom('${symptom.name}', '${pet}')">
          ${symptom.name}
        </button>
      `).join('')}
    </div>
  `;
}

// Filter symptoms based on search input
function filterSymptoms() {
  const input = document.getElementById('symptom-input').value.toLowerCase();
  const suggestions = document.getElementById('symptom-suggestions');
  
  if (!input) {
    suggestions.innerHTML = '';
    return;
  }
  
  const filtered = symptomDatabase[currentPet].symptoms
    .filter(s => s.name.toLowerCase().includes(input))
    .slice(0, 5);
  
  suggestions.innerHTML = filtered.map(symptom => `
    <div class="suggestion-item" onclick="selectSymptom('${symptom.name}', '${currentPet}')">
      ${symptom.name}
    </div>
  `).join('');
}

// Select symptom and show result
function selectSymptom(symptomName, pet) {
  const symptom = symptomDatabase[pet].symptoms.find(s => s.name === symptomName);
  if (!symptom) return;
  
  const severity = getSeverityInfo(symptom.severity);
  const resultContainer = document.getElementById('result-container');
  
  resultContainer.innerHTML = `
    <div class="result-card">
      <div class="severity-badge" style="background: ${severity.bg}; color: ${severity.color};">
        ${severity.label}
      </div>
      
      <h2 class="result-title">${symptomName}</h2>
      
      <div class="steps-list">
        ${symptom.steps.map((step, idx) => `
          <div class="step-item">
            <span class="step-number">${idx + 1}</span>
            <span class="step-text">${step}</span>
          </div>
        `).join('')}
      </div>

      <div class="hospital-section">
        <h3>🏥 내 주변 병원</h3>
        <div class="hospital-list">
          ${demoHospitals.map(hospital => `
            <div class="hospital-card">
              <div class="hospital-info">
                <div class="hospital-name">${hospital.name}</div>
                <div class="hospital-address">${hospital.address}</div>
                <div class="hospital-distance">${hospital.distance}</div>
              </div>
              <div class="hospital-actions">
                <button class="btn-call" onclick="callHospital('${hospital.phone}')">📞</button>
                <button class="btn-map" onclick="openMap('${hospital.name}')">🗺️</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="action-buttons">
        <button class="btn-action primary" onclick="openHospitalMap()">
          🏥 24시 병원 전체 보기
        </button>
        <button class="btn-action secondary" onclick="openPharmacyMap()">
          💊 근처 약국 찾기
        </button>
      </div>
    </div>
  `;
  
  resultContainer.style.display = 'block';
  resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  
  // Clear search
  document.getElementById('symptom-input').value = '';
  document.getElementById('symptom-suggestions').innerHTML = '';
}

// Call hospital
function callHospital(phone) {
  window.location.href = `tel:${phone}`;
}

// Open map for hospital
function openMap(hospitalName) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(hospitalName)}/@${latitude},${longitude},15z`;
        window.open(mapsUrl, '_blank');
      },
      () => {
        window.open(`https://www.google.com/maps/search/${encodeURIComponent(hospitalName)}`, '_blank');
      }
    );
  }
}

// Open hospital map with geolocation
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

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  initializeStorage();
  renderMainScreen();
});
