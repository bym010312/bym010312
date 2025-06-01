# 자기소개 웹사이트

한남대학교 컴퓨터공학과 2학년 학기말 과제로 만든 자기소개 및 이력 소개 웹사이트입니다.  
사이트 보기: https://bym010312.github.io/bym010312/

## 사용 기술
- HTML, CSS, JavaScript  
- Git, Figma  

## 프로젝트 소개 영상
- 프로젝트별 소개 영상은 YouTube에 업로드된 URL을 `data-youtube-url` 속성에 넣으면 모달 내에 자동 삽입됩니다.  
  - 예시: TechScope 프로젝트 소개 영상 URL을 `index.html`의 `data-youtube-url`에 입력  
  - 결과: 모달에서 클릭 시 유튜브 플레이어로 재생

## 기능 목록

### 1: 프로젝트 정보 모달 
1. **기능 제목**: 프로젝트 정보 모달  
2. **설명**:  
   - 프로젝트 카드(프로젝트명, 대표 이미지 등)를 클릭하면 모달 팝업이 뜹니다.  
   - 모달에는 프로젝트 제목, 간략 설명, GitHub 링크, YouTube 영상(있을 경우)이 표시됩니다.  
3. **코드 위치**:  
   - `index.html` → 각 프로젝트 카드에 `data-*` 속성 설정 (`data-title`, `data-desc`, `data-github`, `data-youtube-url`)  
   - `script.js` → 3번째 줄부터 모달 로직  
4. **코드 설명**:  
   - `document.querySelectorAll('.project-card')`로 모든 카드 요소를 선택  
   - 각 카드에 `addEventListener('click', showModal)`를 등록하여 클릭 시 모달 열기  
   - `showModal` 함수 내부에서 `data-*` 속성값을 읽어 제목(`modalTitle.textContent`), 설명(`modalDesc.textContent`), GitHub 링크(`modalLink.href`), YouTube iframe(`modalVideo.innerHTML`)을 동적으로 삽입  
   - 닫기 버튼(`.modal-close`)과 모달 바깥 클릭 시(`window.addEventListener('click', ...)`) 모달 숨기기 처리

### 2: YouTube 영상 자동 삽입  
1. **기능 제목**: YouTube 영상 자동 삽입  
2. **설명**:  
   - 특정 프로젝트에 YouTube 소개 영상이 있을 경우, `data-youtube-url` 속성값을 읽어 모달 내에 iframe을 생성합니다.  
   - 영상이 없으면 iframe 영역을 숨기거나 빈 상태로 두어 레이아웃이 깨지지 않게 처리합니다.  
3. **코드 위치**:  
   - `index.html` → 프로젝트 카드 태그에 `data-youtube-url="유튜브링크"` 속성  
   - `script.js` → 모달 띄우는 함수 내 iframe 삽입 로직  
4. **코드 설명**:  
   - `const youtubeURL = clickedCard.getAttribute('data-youtube-url');` 로 URL 값 읽기  
   - `if (youtubeURL) { modalVideo.innerHTML = `<iframe src="${youtubeURL}" ...></iframe>`; } else { modalVideo.innerHTML = ''; }`  
   - 사용자가 모달을 닫으면 `modalVideo.innerHTML = ''` 로 iframe 내용 초기화

### 3: 자격증 정보 표시
1. **기능 제목**: 자격증 정보 표시
2. **설명**:  
   - 자격증 카드를 클릭하면 모달 팝업이 뜨며, 자격증 이미지가 표시됩니다.   
3. **코드 위치**:  
   - `index.html` → 자격증 카드에 `data-title`, `data-image` 속성 설정  
   - `script.js` → 45번째 줄부터 자격증 카드 클릭 이벤트 처리  
4. **코드 설명**:  
   - `document.querySelectorAll('.licenseCard')`로 모든 자격증 카드 요소를 선택  
   - 각 카드에 `addEventListener('click', showLicenseModal)`를 등록하여 클릭 시 모달 열기  
   - `data-title`, `data-image` 속성값을 읽어 모달 제목과 이미지를 동적으로 삽입  
   - `modalContent.innerHTML = ''`로 기존 내용 초기화 후 이미지 요소 생성 및 추가  
   - `modalButton.style.display = 'none'`으로 GitHub 버튼 숨김 처리

### 4: 다국어 전환  
1. **기능 제목**: 다국어 전환  
2. **설명**:  
   - 페이지 상단에 있는 언어 전환 버튼을 클릭하면, `.lang` 클래스가 붙은 모든 요소의 텍스트를 한국어 ↔ 영어로 바꿉니다.  
   - 각 요소에는 `data-lang-ko="한국어 텍스트"`, `data-lang-en="English Text"` 속성이 들어 있습니다.  
3. **코드 위치**:  
   - `index.html` → 번역이 필요한 요소(버튼, 제목, 설명 등)에 `.lang` 클래스 및 `data-lang-ko`, `data-lang-en` 속성 추가  
   - `script.js` → `toggleLanguage()` 함수 작성 (약 85번째 줄부터)  
4. **코드 설명**:  
   - `const elements = document.querySelectorAll('.lang');` 로 번역 대상 요소들 선택  
   - 현재 언어 상태를 저장한 전역 변수(`let currentLang = 'ko'` 또는 `'en'`) 기준으로 `element.textContent = element.getAttribute('data-lang-en')` 또는 `data-lang-ko` 로 텍스트 변경  
   - 버튼 클릭 이벤트(`onclick="toggleLanguage()"`)를 통해 `currentLang` 값을 토글하고, 변경된 값에 맞춰 모든 `.lang` 요소를 업데이트