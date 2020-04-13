## [아그레아블] 프론트엔드 개발 테스트 - 박기성

### 1. 테스트 목적 충족 (모두만족)

- Infinite Scroll과 Pagination 중 Infinite Scroll로 구현
- 이미지 슬라이드는 Slick 라이브러리 이용
- 반응형(Main, Cart) 적용

### 2. 요구사항 정의 충족

#### A. Wing Eat 메인페이지 간소화 버전 (모두 만족)

- Header, Feature, List 부분을 컴포넌트화
- URL은 src 아래 config.js 안에 공통변수화
- 이미지 슬라이드 AutoPlay 및 반응형에 따른 이미지파일 변경
- List 부분 page 6까지 제한
- 렌더 상품 클릭시 localStroage에 저장하는 방식을 사용(클릭시 수량 +1, 중복시 수량 +1)
- 장바구니 수량에 따른 갯수 변화 리덕스를 사용하여 구현
- 반응형 구현 완료

#### B. 장바구니 페이지 만들기(모두 만족)

- checkbox checked 상태에 따른 결제 예정금액 포함 및 제외 구현
- localStorage에 데이테가 없을 시 "장바구니에 담긴 상품이 없음" 메세지 표현
- 개수 1미만으로 갈 수 없도록 예외 처리
- 수량에 따른 합계 및 총 결제 금액 반영
- X 버튼 누를 시 컴포넌트 삭제 및 금액 반영
- 반응형 재량으로 구현

### 후기

장바구니 기능을 구현해 보고 싶은 마음이 있었는데 좋은 기회를 주셔서 구현하게 됐다.

다양한 기능을 구현했지만 개인적으로 checked를 구분하여 가격 계산하는 것이 제일 어려워 맨 마지막에 구현할 수 있었다.  
또, localStorage를 이용한 장바구니 기능은 처음 구현 해 처음에 다소 어려웠지만 재밌었으며 여러가지 시행착오가 있었지만 끝내 구현했다는 점에서 기분이 굉장히 좋았다.  
특히, input checked 하는 부분이 이해가 안 됐는데 고정된 checkbox는 처음에 변수를 선언 하여 checked를 쉽게 구분 가능했지만 장바구니 개수에 따른 상품별 목록은 유동적이라 까다로웠으나 계속 생각을 하다보니 for문을 이용하여 구현할 수 있었다.
이 코드에서는 localStorage로 아이템 이름, 개수, 이미지, 가격을 관리 했는데 잘못 된 판단인걸 뒤늦게 알았다.
localStorage에 집중하다 보니 실수를 한 것 같다. 개인적인 생각이지만 redux를 이용해서 배열로 관리한다음에 적용해도 문제가 될 것이 없어보인다.

이외에도 여러가지 기능을 구현하는데 있어서 너무 재밌었다.
그리고 wecode에서 1차 프로젝트로 스타일쉐어라는 커머스 사이트를 클론코딩하는 프로젝트를 경험한 것이 도움이 된 것 같고 이 기회를 통해 커머스 사이트 개발을 좀 더 공부하고 파악하고 싶은 욕구가 생겼다
