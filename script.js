function redirectToLink(url) {
    window.location.href = url;
}







// 최대 입력값 개수
const MAX_INPUTS = 12;

// 입력값을 저장할 배열
let inputs = [];

// 입력값을 처리하는 함수
function addText() {
    var inputText = document.getElementById('inputText').value;

    if (inputText.trim() !== '') {
        if (inputText.length > 10) {
            alert("최대 10글자까지 입력할 수 있습니다.");
            return;
        }
        
        // 배열에 새로운 입력값 추가
        inputs.push(inputText);

        // 최대 입력값 개수를 초과하는 경우, 가장 오래된 입력값 제거
        if (inputs.length > MAX_INPUTS) {
            inputs.shift(); // 배열의 첫 번째 요소 제거
        }

        // 화면에 입력값 표시
        displayInputs();
        
        // 입력값 저장
        saveText(inputText);
        
        // 입력창 초기화
        document.getElementById('inputText').value = '';
    }
}

// 화면에 입력값 표시하는 함수
function displayInputs() {
    var textContainer = document.getElementById('text-container');
    
    // 화면 초기화
    textContainer.innerHTML = '';

    // 배열의 각 요소를 화면에 표시
    inputs.forEach(function(input) {
        var newText = document.createElement('div');
        newText.textContent = input;
        newText.classList.add('text-item');
        textContainer.appendChild(newText);
    });
}

// 저장된 입력값 로드
function loadTexts() {
    var savedTexts = JSON.parse(localStorage.getItem('savedTexts')) || [];
    inputs = savedTexts.slice(-MAX_INPUTS); // 최대 입력값 개수만큼만 로드
    displayInputs(); // 화면에 입력값 표시
}

// 입력값 저장
function saveText(text) {
    var savedTexts = JSON.parse(localStorage.getItem('savedTexts')) || [];
    savedTexts.push(text);
    localStorage.setItem('savedTexts', JSON.stringify(savedTexts));
}

document.addEventListener('DOMContentLoaded', function () {
    loadTexts();

    // 엔터 키 눌렀을 때 입력값 추가
    document.getElementById('inputText').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // 기본 엔터 동작 방지
            addText(); // 텍스트 추가 함수 호출
        }
    });
});


