// 페이지가 로드될 때 리스트 아이템들의 순서를 섞는 함수
function shuffleListItems() {
    var parent = document.getElementById('content');
    var items = parent.children;
    var frag = document.createDocumentFragment();
    while (items.length) {
        frag.appendChild(items[Math.floor(Math.random() * items.length)]);
    }
    parent.appendChild(frag);
}

// 페이지가 로드될 때마다 순서를 섞음
window.addEventListener('load', function() {
    shuffleListItems();
});