const modal = document.querySelector('#modal');
const closeBtn = document.querySelector('.close');
const projectCards = document.querySelectorAll('.projectCard');
const licenseCards = document.querySelectorAll('.licenseCard');

const modalTitle = modal.querySelector('h3');
const modalContent = modal.querySelector('p');
const modalButton = modal.querySelector('button'); 

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.dataset.title;
        const description = card.dataset.description;
        const githubUrl = card.dataset.githubUrl;
        const youtubeUrl = card.dataset.youtubeUrl; 

        // 모달 내용 업데이트
        modalTitle.textContent = title;
        modalContent.innerHTML = description;

        if (youtubeUrl) {
            // youtube URL이 있는 경우 iframe 생성
            const youtubeEmbed = document.createElement('iframe');
            youtubeEmbed.src = youtubeUrl;
            youtubeEmbed.width = '100%';
            youtubeEmbed.height = '200';
            youtubeEmbed.frameBorder = '0';
            youtubeEmbed.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            youtubeEmbed.allowFullscreen = true;
            modalContent.appendChild(youtubeEmbed); // 모달 내용에 추가
        }

        // GitHub 버튼 보이기 및 클릭 이벤트 설정
        modalButton.style.display = 'inline-block';
        modalButton.onclick = () => {
            console.log(`GitHub URL: ${githubUrl}`); // URL 출력 (디버깅용)
            if (githubUrl) { // URL이 있는 경우에만 이동
                window.open(githubUrl, '_blank'); // 새 탭에서 URL 열기
            } else {
                alert('GitHub URL이 없습니다.'); // URL이 없을 때 에러 메시지 출력
            }
        };
        
        modal.style.display = 'block';
    });
});

// 라이센스 카드 클릭 이벤트 추가
licenseCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.dataset.title;
        const imagePath = card.dataset.image;

        // 모달 내용 업데이트
        modalTitle.textContent = title;
        modalContent.innerHTML = ''; // 기존 내용 초기화
        
        // 이미지 요소 생성 및 추가
        if (imagePath) {
            const image = document.createElement('img');
            image.src = imagePath;
            image.alt = `${title} 자격증`;
            modalContent.appendChild(image);
        }

        modalButton.style.display = 'none';
        modal.style.display = 'block';
    });
});

// 닫기 버튼 클릭 시 모달 닫기
closeBtn.onclick = function() {
  modal.style.display = 'none';
};

// 모달 외부 클릭 시 모달 닫기
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

let currentLang = 'ko';

function toggleLanguage() {
    const elements = document.querySelectorAll(".lang");
    currentLang = currentLang === 'ko' ? 'en' : 'ko';

    elements.forEach(el => {
        const newText = el.getAttribute(`data-lang-${currentLang}`);
        if (newText) el.textContent = newText;
    });
}