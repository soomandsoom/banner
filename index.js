
// div1에 할당될 링크들
var div1Links = [
    "./first.html",
    "./second.html",
    "./third.html"
    ];
    
  // div1과 div2를 랜덤하게 생성하여 row에 추가하는 함수
    function generateItems() {
    var container = document.querySelector('.content-box');
    var rowCount = 20; // 생성할 줄의 수
    for (var j = 0; j < rowCount; j++) {
        var row = document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);
      var rowItemCount = Math.floor(Math.random() * 30) + 0; // 랜덤하게 생성할 아이템 수
        for (var i = 0; i < rowItemCount; i++) {
        var randomItem = Math.random() < 0.2 ? 'block' : 'blank'; // div1과 div2를 랜덤하게 선택
        var item = document.createElement('div');
        item.classList.add('item', randomItem);
        if (randomItem === 'block') {
          var randomLinkIndex = Math.floor(Math.random() * div1Links.length);
          item.dataset.link = div1Links[randomLinkIndex]; // div1에 랜덤한 링크 할당
            item.addEventListener('click', function() {
            window.location.href = this.dataset.link; // div1을 클릭하면 해당 링크로 이동
            });
        }
        row.appendChild(item);
        }
    }
    }
    
  // 페이지 로드 시 아이템 생성
    generateItems();
    




//popup
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('popup').style.display = 'block';
});

document.querySelector('.close').addEventListener('click', function() {
  document.getElementById('popup').style.display = 'none';
});