// Emergency data for dogs and cats
const emergencyData = {
  dog: {
    title: '강아지 응급처치',
    image: './assets/images/dog_main.jpg',
    steps: [
      {
        number: '1',
        title: '의식·호흡 확인',
        description: '의식 없으면 기도 확보·호흡 여부 확인'
      },
      {
        number: '2',
        title: '출혈 처리',
        description: '깨끗한 천으로 압박 지혈(10분 유지)'
      },
      {
        number: '3',
        title: '기도 막힘',
        description: '입안 확인, 보이는 이물만 조심스럽게 제거'
      },
      {
        number: '4',
        title: '중독 의심',
        description: '먹은 것(포장) 사진 기록, 즉시 수의사 문의'
      },
      {
        number: '5',
        title: '체온 관리',
        description: '저체온이면 담요로 감싸기, 과열이면 시원한 곳으로 이동'
      }
    ]
  },
  cat: {
    title: '고양이 응급처치',
    image: './assets/images/cat_main.jpg',
    steps: [
      {
        number: '1',
        title: '의식·호흡 확인',
        description: '숨 쉬는지 확인. 의식 없으면 병원 이송 준비'
      },
      {
        number: '2',
        title: '출혈 처리',
        description: '거즈로 압박 지혈, 스트레스 최소화'
      },
      {
        number: '3',
        title: '기도/호흡 문제',
        description: '호흡 곤란 시 즉시 수의사 응급조치 필요'
      },
      {
        number: '4',
        title: '중독 의심',
        description: '먹은 것 사진·포장 보관 후 병원 문의'
      },
      {
        number: '5',
        title: '부상 시 이동',
        description: '목·다리 의심 부상은 고정 후 이동(수의사 지시 따름)'
      }
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
          <button class="btn-primary" onclick="showScreen('dog')">
            🐕 강아지 응급처치 보기
          </button>
          <button class="btn-primary" onclick="showScreen('cat')">
            🐈 고양이 응급처치 보기
          </button>
        </div>
      </div>
      <div class="warning-footer">
        ${warningText}
      </div>
    </div>
  `;
}

// Render detail screen for dog or cat
function renderDetailScreen(type) {
  const data = emergencyData[type];
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <div class="screen active" id="${type}-screen">
      <button class="back-button" onclick="showScreen('main')" title="메인으로 돌아가기">
        ← 
      </button>
      <div class="detail-header">
        <h2 class="app-title">${data.title}</h2>
      </div>
      <img src="${data.image}" alt="${data.title}" class="detail-image">
      <div class="detail-content">
        <div class="emergency-steps">
          ${data.steps.map(step => `
            <div class="step-card">
              <div class="step-number">Step ${step.number}</div>
              <div class="step-title">${step.title}</div>
              <div class="step-description">${step.description}</div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="action-buttons">
        <button class="btn-action btn-emergency" onclick="callEmergency()" title="긴급 전화">
          📞 긴급 전화
        </button>
        <button class="btn-action" onclick="findNearbyVet()" title="근처 동물병원 찾기">
          🗺️ 병원 찾기
        </button>
        <button class="btn-action btn-home" onclick="showScreen('main')" title="메인으로 돌아가기">
          🏠 메인으로
        </button>
      </div>
      <div class="warning-footer">
        ${warningText}
      </div>
    </div>
  `;
}

// Show specific screen
function showScreen(screenType) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => screen.classList.remove('active'));
  
  if (screenType === 'main') {
    renderMainScreen();
  } else if (screenType === 'dog') {
    renderDetailScreen('dog');
  } else if (screenType === 'cat') {
    renderDetailScreen('cat');
  }
}

// Emergency call function
function callEmergency() {
  const phoneNumber = 'tel:+82XXXXXXXX';
  window.location.href = phoneNumber;
}

// Find nearby veterinary clinic
function findNearbyVet() {
  // Try to use geolocation first
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapsUrl = `https://www.google.com/maps/search/veterinary+clinic+near+me/@${latitude},${longitude},15z`;
        window.open(mapsUrl, '_blank');
      },
      (error) => {
        console.log('위치 권한 거부 또는 오류:', error);
        // Fallback to generic search
        window.open('https://www.google.com/maps/search/veterinary+clinic+near+me', '_blank');
      }
    );
  } else {
    // Fallback if geolocation not available
    window.open('https://www.google.com/maps/search/veterinary+clinic+near+me', '_blank');
  }
}

// Initialize app
window.addEventListener('DOMContentLoaded', () => {
  initializeStorage();
  renderMainScreen();
  
  // Set up keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      showScreen('main');
    }
  });
});

// Fallback for when DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initializeStorage();
    renderMainScreen();
  });
} else {
  initializeStorage();
  renderMainScreen();
}
