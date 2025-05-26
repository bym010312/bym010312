// DOM 요소 선택
const modal = document.querySelector('#modal');
const closeBtn = document.querySelector('.close');
const projectCards = document.querySelectorAll('.projectCard');

// 모달 내부 요소
const modalTitle = modal.querySelector('h3');
const modalContent = modal.querySelector('p');
const modalButton = modal.querySelector('button'); // 버튼 요소 선택

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.dataset.title;
        const description = card.dataset.description;
        const githubUrl = card.dataset.githubUrl; // GitHub URL 가져오기
        const youtubeUrl = card.dataset.youtubeUrl; // YouTube URL 가져오기

        // 모달 내용 업데이트
        modalTitle.textContent = title;
        modalContent.textContent = description;

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
        } else {
            // youtube URL이 없는 경우 iframe 제거
            const existingIframe = modalContent.querySelector('iframe');
            if (existingIframe) {
                modalContent.removeChild(existingIframe);
            }
        }

        // 버튼 클릭 이벤트 설정
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