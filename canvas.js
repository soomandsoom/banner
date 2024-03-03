window.addEventListener('DOMContentLoaded', () => {
    const canvasContainers = document.querySelectorAll('.canvas-container');
    let rectStartX, rectStartY;
    let mouseStartX, mouseStartY;
    let currentRect;

    let usedTexts = []; // 이미 사용된 텍스트를 저장하는 배열

    let isDragging = false; // 드래그 중인지 여부를 나타내는 변수

    canvasContainers.forEach(canvas => {
        canvas.addEventListener('mousedown', (event) => {
            if (event.target.classList.contains('textbox')) {
                startDragging(event.target, event);
                isDragging = true;
                return;
            }

            // 드래그 중이 아닐 때만 새로운 사각형을 생성
            if (!isDragging) {
                mouseStartX = event.clientX;
                mouseStartY = event.clientY;
                rectStartX = event.offsetX;
                rectStartY = event.offsetY;

                currentRect = document.createElement('div');
                currentRect.classList.add('textbox');
                canvas.appendChild(currentRect);

                currentRect.style.left = rectStartX + 'px';
                currentRect.style.top = rectStartY + 'px';

                startDragging(currentRect, event);

                generateRandomText(currentRect);
            }
        });

        canvas.addEventListener('mousemove', (event) => {
            if (!isDragging) return;

            const mouseX = event.clientX;
            const mouseY = event.clientY;

            const minX = Math.min(rectStartX, mouseX - mouseStartX + rectStartX);
            const minY = Math.min(rectStartY, mouseY - mouseStartY + rectStartY);
            const maxX = Math.max(rectStartX, mouseX - mouseStartX + rectStartX);
            const maxY = Math.max(rectStartY, mouseY - mouseStartY + rectStartY);

            const width = maxX - minX;
            const height = maxY - minY;

            currentRect.style.width = width + 'px';
            currentRect.style.height = height + 'px';

            currentRect.style.left = minX + 'px';
            currentRect.style.top = minY + 'px';
        });

        canvas.addEventListener('mouseup', () => {
            if (currentRect) {
                currentRect = null;
            }
            isDragging = false; // 드래그 종료 시 상태를 초기화
        });
    });

    function startDragging(element, event) {
        const offsetX = event.clientX - parseFloat(element.style.left);
        const offsetY = event.clientY - parseFloat(element.style.top);

        function drag(event) {
            element.style.left = event.clientX - offsetX + 'px';
            element.style.top = event.clientY - offsetY + 'px';
        }

        function stopDragging() {
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', stopDragging);
        }

        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDragging);
    }

    function generateRandomText(textbox) {
        const texts = ['그릭요거트 위에 꿀을 올리면 맛있어진다.', '플레이브 노래 좋습니다..',
        '한 번 사는 인생 하고 싶은 거 다 하고 죽어야하지 않겠습니까. 본인 원하는대로 사십쇼. 제발.', '사과에 땅콩버터를 발라 먹으면 맛있어요',
        '그릭요거트 제발 한번 먹어봐주새야…. 첫 도전은 그릭데이 스칼렛…..🤍🥺','삼순이','제가 톡식한 전남자친구와 헤어졋어요',
        '@__qkrtnwls 비공개 계정이지만 받아줌','이번에 실험햇는데 percent yield 87.8 percent 나옴 ㅋㅋ','요즘 다이어리를 시작했다는 점. 캬캬!!',
        '알람없이 아침에 일어날 수 있다는 점!!','내가 최근에 산 불리 - 목욕하는 여인 향수!!! 젼나 이쁨 향도 좋고',
        '내가 아무거나 고른 연필이 너무 좋아서 주변에서 다 탐냈다!','롬앤 피오니 발레 샀는데 색깔 댕이쁨',
        '경대병원 근처에 머스트잇 베이커리 라는 곳 휘낭시에 개.개.개 맛도리.입니닷','팟타이 마시써여.. 팟타이 홍보해주세요','선릉역 알로이타이, 망원동 라오 팟타이 믿먹!',
        '불닭볶음면에 참기름을 한숟갈 넣어먹으면 맛있어요','귀여운 제 인스타 아이디를 자랑합니다. @eenymeenyminymoes','황금물결 올해 흥해라~','밤에 제일 크게 빛나는 별이 있다면 보통 목성입니다.',
        '고양이 인사법: 천천히 눈을 깜박인다.','코알라','당고는 너무 귀여운 웰시코기입니다. 통통하고 늠름해요.','저의 소중한 맛집 리스트입니다. 이대 원즈오운 토마토스프 / 연남 리틀빅토리 마들렌 / 홍대 스아게 채소스프카레 / 망원 라오 그린커리 / 성수 세스크멘슬 으깬감자와 소시지 / 모두 정말정말 맛있어요...',
        '대한민국 해군 디자인병 705기 모집합니다 3월 28일부터 4월 4일까지','한글꼴 많이 사랑해주세요','New Order의 〈The Perfect Kiss〉들어봐주세요',
        '저 살 2키로 빠졌어용 ^,^','공복에 아아+초콜릿+삶은 계란 먹으면 배탈이 날 수 있으니 주의하세요.','우리집 강아지 이름은 초롱이이고 하얗고 예쁘고 귀엽습니다.',
        '3월 9일에 프로야구 개막해요오!!!','짱 멋진 프로토!!','왕자님구단삼성라이온즈같이좋아할사람?물론나보다좋아하진말고','라젤 << 이라는 유투버 너무 웃김','그거 아세요? 아보카도 넣고 계란 반숙에 스팸 넣으면.. 그리고 김치 올려먹으면 혼란스러운 퓨전 맛도리 음식 탄생',
        '삼성 라이온즈 투수 이호성 55 마킹 적힌 유니폼을 구매했어요','아침에 일어나서 혈당스파이크 조심하세요. 꼭 야채 먹고 단거 드세요','짬뽕탕먹고싶은뎅. ㅎㅎ','오늘의 상식~ 불순물을 넣으면 끓는점이 낮아진답니다 그렇다고 라면 스프를 넣으면 라면이 또 빨리 익는건 아니라는 사실? 라면은 100도에서 3분 익혔을때 기준 가장 맛있기 때문에 낮아진 끓는 점에서는 조금 더 오래 끓여햐는데 사실.. 뭐 그냥 대충 드세요 미슐랭도 아니고 라면인데.','jay prince 노래 들어보세요','오드윤 환승연애 리뷰 재밌음','마라샹궈에는 스팸이 꼭! 들어가야한다는 사실, 알고 계셨나요?','yapper = 많이 떠드는 사람을 놀리는 비속어','25살까지 pre-frontal cortex가 다 자라지 않는답니다? pfc는 생각을 규제하고 실수를 막아주는 역할을 하기 때문에 25살까지 실수 왕창하고 에큐큐~ 하고 넘어가시길','바나나와 인간은 50 퍼센트 정도 닮았답니다','인간과 쥐는 유전적으로 90 퍼센트 닮았답니다','인간과 침팬지는 유전적으로 98퍼센트 정도 닮았답니다','단백질은 머리에도 영향을 미친답니다? trichohyalin 이라는 단백질이 알려진 이유 중 하나에요','zbabělec 는 체코어로 겁쟁이라는 뜻입니다','회피형 남자와 연애하는 방법? 헤어지고 다른 남자를 만난다.','다혈질 여자친구 고치는 방법? 헤어지고 다른 여자를 만난다.','본인의 애인이 다른 사람에게도 최고로 멋지고 귀여워보이지 않는다는 사실을 늘 인지하며 행동으로 옮기기','투다리 김치우동이 그렇게 맛있다던데... - 고래사어묵 김치우동도 맛있습니다.','Electron Withdrawing Group의 예시는 주로 이중결합입니다. Polarity를 보시고 주로 Oxygen으로 전자가 흘러간다, 그러면 EWG 입니다','Halide on the vinyl position is not reactive.','Grignard는 그릭나드가 아니라 그리니어드, 라고 읽습니다','상처받지 않기 위해서 남을 상처주지 말것, 도망치지 말것','Nothing hurts me more than seeing you repeat on what youve apologized for','I am tired of playing everything is nonchalant when it clearly isnt','Jay prince - In the morning','제 생일은 3월 21일이구요, 4명이서 생일파티 하는데 컨셉이 블랙핑크에요','Transfection is needed to see if the DNA is transferred to the nucleus or not, and it is commonly used in the cell culture room.','At the end of the day, it is all about being ok.','Watch me woo!'
        ];
        
        // 사용되지 않은 텍스트를 필터링하여 선택
        const unusedTexts = texts.filter(text => !usedTexts.includes(text));
        
        if (unusedTexts.length > 0) {
            const randomIndex = Math.floor(Math.random() * unusedTexts.length);
            const selectedText = unusedTexts[randomIndex];
            textbox.textContent = selectedText;
            
            // 사용된 텍스트 목록에 추가
            usedTexts.push(selectedText);
        }
    }
});
