// 🔊 사운드 관련 변수
let sceneSound;
let playedScenes = {}; // 소리 재생 기록


let sceneNumber;
let startFrame;
let currentScene = "ending";

let stage = 0;   //장면 3개 딜레이
let stageStartFrame=-1;
//배경 이미지 변수 선언
let bgImgs = [];
let imgWidth, imgHeight;

//우산
let momImg, umbrellaImg, backgroundImg;
let currentImg;
let characterX, characterY;
let isHandedOver = false;


//걷는 사람
let walkerImages = [];
let bgImg;
let currentFrame = 0;
let xPos = 100;
let yPos;
let frameDelay = 8;
let frameCountForAnim = 0;
let facingRight = true;
let isWalking = false;
//지하철 
// 👴 노인 관련
let seniorX = -100;
let seniorTargetX = 530;
let seniorSpeed = 2;
let seniorArrived = false;
let seniorSeated = false;
let seniorSeatX = null;
let seniorSeatTimerStarted = false; // 중복 방지

let standingImages;
//scene1 변수 선언
let seedPut=0;
let back=0; //씨앗 심기 전 후 배경을 구분하기 위해서
//scene2 변수 선언
//scene3 변수 선언
let rainBack=0;
//scene4 변수 선언
//지하철장면 사람
let sitImg, standImg;
let seniorImg, sitseniorImg;
let mode = "sit";  // "sit", "stand", "walk"

let xPos_sub = 750;     // 사용자 자리 위치
let yPos_sub = 700;

//scene5 변수 선언
let scaleFactor = 1;
let targetScale = 3;
let zoomCenter;
let zoomArea; // 확대 허용 영역
//let isZoomed=1; //줌 된 후인지 전인지 (기본은 후로 해서 사람 나오고 나서 확대할 수 있도록)
let closeButton, openButton;
let elevDoor=1;
let zoomComplete = false;

let runningStranger;
let run=1;
let strangerSize=200;

// 상태 변수 -AI
let strangerAppeared = false; // 러닝 스트레인저 등장 여부
let strangerAnimDone = false; // 애니메이션 완료 여부
let canZoom = false;          // 확대 가능 여부
let isZoomed = false;         // 확대 상태
let buttonActive = false;     // 버튼 클릭 가능 여부

//scene6 변수 선언

let elev;
let elevY;
let elevBack=1;

//scene7 변수 선언
//scene8 변수 선언
let tree = 1;
let done = 0;

function preload(){
    //배경 이미지 생성
    bgImgs[0] = loadImage('photo/scene1-1.png'); //씨앗 심는 구멍
    bgImgs[1] = loadImage('photo/scene1-2.png'); //씨앗
    bgImgs[2] = loadImage('photo/scene1-3.png'); //흙 다시
    bgImgs[3] = loadImage('photo/scene2.png'); //집
    bgImgs[4] = loadImage('photo/scene3-1.jpg'); //길
    bgImgs[5] = loadImage('photo/scene3-2.jpg'); //길 + 비
    bgImgs[6] = loadImage('photo/scene4.png'); //지하철
    bgImgs[7] = loadImage('photo/scene5-1.png'); //엘리베이터open
    bgImgs[8] = loadImage('photo/scene5-2.png'); //엘리베이터closing
    bgImgs[9] = loadImage('photo/scene5-3.png'); //엘리베이터closed
    bgImgs[50] = loadImage('photo/scene_campus.png'); //캠퍼스 길
    bgImgs[10] = loadImage('photo/scene6-1.png'); //발사1
    bgImgs[11] = loadImage('photo/scene6-3.png'); //발사2  ////2or 3
    bgImgs[12] = loadImage('photo/scene7.jpg'); //집 가는 길
    bgImgs[13] = loadImage('photo/scene8-1.png'); //집 반전
    bgImgs[14] = loadImage('photo/scene8-2.png'); //나무
    bgImgs[15] = loadImage('photo/scene8-3.png'); //나무
    bgImgs[16] = loadImage('photo/scene8-4.png'); //나무
    bgImgs[17] = loadImage('photo/scene8-5.png'); //나무
    bgImgs[18] = loadImage('photo/scene8-6.png'); //나무
    bgImgs[19] = loadImage('photo/scene8-7.png'); //큰 나무
    bgImgs[20] = loadImage('photo/scene_opening_.png'); //opening
    bgImgs[21] = loadImage('photo/scene_ending_.png'); //ending credit
    bgImgs[22] = loadImage('photo/scene_ending_1.png'); //ending credit 이름
    bgImgs[23] = loadImage('photo/scene_ending_kim.png'); //ending credit 김강현
    bgImgs[24] = loadImage('photo/scene_ending_lee.png'); //ending credit 이나영
    bgImgs[25] = loadImage('photo/scene_ending_choi.png'); //ending credit 최서정
    bgImgs[26] = loadImage('photo/scene_ending_last.png');
    
    //요소 이미지 생성 
    openButton = loadImage('photo/open_button.png');
    closeButton = loadImage('photo/close_button.png');
    elev = loadImage('photo/elev.png'); //날아가는 엘리베이터 이미지
    //걷는 사람
    for (let i = 1; i <= 3; i++) {
    walkerImages.push(loadImage(`photo/walkingperson${i}.png`));
    }
    standingImages = loadImage('photo/standingperson.png');

    sitImg = loadImage('photo/sitperson.png');
    standImg = loadImage('photo/standperson.png');
    seniorImg = loadImage('photo/senior.png');
    sitseniorImg = loadImage('photo/sitsenior.png');

    runningStranger = loadImage('photo/running_stranger.png');

    //우산
    momImg = loadImage('photo/mom.png');
    umbrellaImg = loadImage('photo/umbrella.png');
    
    // 🔊 사운드 로드
    sceneSound = loadSound('photo/sound.mp3');



    
}


function setup(){
    sceneNumber=0;
    createCanvas(1536, 1024);
    background(255);
    imageMode(CENTER);
    frameRate(60);

    // 캐릭터 위치를 땅 위에 맞춤
    yPos = height * 0.75;
    //엘리베이터 처음 시작 위치 
    elevY=height * 0.75;

    //엘리베이터에서 버튼 클릭할 때 확장할 영역
    zoomCenter = createVector(width / 2, height / 2);
    // 확대 가능한 영역 정의 (x, y, w, h)
    zoomArea = {
    x: 1063,
    y: 702,
    w: 300,
    h: 200
    };
    //우산
    currentImg = momImg;
    characterY = yPos - 20;
    characterX = width / 2;


}


function draw(){
    if (sceneNumber === 0) scene_opening();
    if (sceneNumber === 1) scene1(); //씨앗
    if (sceneNumber === 2) scene2(); //집-우산산
    if (sceneNumber === 3) scene3(); //비 
    if (sceneNumber === 4) scene4(); //지하철
    if (sceneNumber === 5) scene5(); //캠퍼스길 
    if (sceneNumber === 6) scene6(); //엘리베이터 내부 
    if (sceneNumber === 7) scene7(); //발사 
    if (sceneNumber === 8) scene8(); //길 
    if (sceneNumber === 9) scene9(); //나무 
    if (sceneNumber === 10) scene_ending();
}


function scene_opening(){

    if (startFrame === undefined) {
    startFrame = frameCount;  // 처음 진입한 시점 저장
    }

    bg(20); // 명령어

    // 시간 지났는지 확인
    if (frameCount - startFrame > 120) {
    sceneNumber = 1; // 명령어 
    startFrame = undefined; // 이후에 또 쓰기 위해서
    }
}


//scene1 : 씨앗 심기
function scene1(){
    frameRate(1);
    if (back===0){
        bg(0);
    } else if (back===1){
        bg(2);
        back=2;
    } else if (back===2){
        sceneNumber=2; 
        frameRate(60);
    }
    
    if(seedPut===1){
        //효과음 넣으면 좋을 것 같음!!
        bg(1);
        seedPut=0;
        back=1;
    }
}


//scene2 : 우산
function scene2(){
    frameRate(60);
    bg(3);
    

    // ✅ 거리 계산해서 우산 건네기
    let distance = dist(xPos, yPos, characterX, characterY);
    if (!isHandedOver && distance < 150) {
        isHandedOver = true;
        currentImg = umbrellaImg;
    }

    // ✅ 엄마 or 우산 이미지 출력
    let displayWidth, displayHeight, offsetX = 0;
    if (currentImg === umbrellaImg) {
        displayWidth = umbrellaImg.width * 1.8 / 7.5;
        displayHeight = umbrellaImg.height * 1.8 / 7.4;
        offsetX = -10;
    } else {
        displayWidth = momImg.width * 1.8 / 7;
        displayHeight = momImg.height * 1.8 / 7;
    }
    image(currentImg, characterX + offsetX, characterY, displayWidth, displayHeight);

    // ✅ 걷는 캐릭터 이동 처리
    isWalking = false;
    walk();
    



    //화면 끝 도달 시 다음 장면
    if(xPos>=width){
        done=1;
    }
    if(done===1){
        xPos=0;
        done = 0;
        sceneNumber = 3;
    }
}


//scene3 : 지나가다가 비
function scene3(){
    if(xPos>=width/2){
        rainBack=1;
    }

    if(rainBack===0){
        bg(4);
    }
    else if(rainBack===1){
        bg(5);
    }
    
    walk();

    //화면 끝 도달 시 다음장면
    if(xPos>=width){
        done=1;
    }
    if(done===1){
        xPos=0;
        done = 0;
        sceneNumber = 4;
    }
}


//scene4 : 지하철
function scene4(){
    bg(6);

    // 👴 노인 이동
    if (!seniorSeated) {
        if (!seniorArrived) {
            seniorX += seniorSpeed;
            if (seniorX >= seniorTargetX) {
                seniorX = seniorTargetX;
                seniorArrived = true;
            }
        }
        image(seniorImg, seniorX, yPos_sub + 30, 440, 640);
    } else {
        image(sitseniorImg, seniorSeatX - 5, yPos_sub -80, 360, 580);
    }

    // ✅ 사용자 상태 전환 및 노인 착석 예약
    if (
        mode === "stand" &&
        seniorArrived &&
        !seniorSeated &&
        !seniorSeatTimerStarted &&
        (keyIsDown(RIGHT_ARROW) || keyIsDown(LEFT_ARROW))
    ) {
        mode = "walk";
        seniorSeatX = xPos_sub; // 사용자가 일어난 자리 저장
        seniorSeatTimerStarted = true;

        setTimeout(() => {
        seniorSeated = true;
        }, 1000); // 1초 후 착석
    }

    if (
        mode === "stand" &&
        seniorSeated &&
        (keyIsDown(RIGHT_ARROW) || keyIsDown(LEFT_ARROW))
    ) {
        mode = "walk"; // 이미 앉았을 경우에도 걷기 전환 허용
    }


    // 👤 사용자 상태 렌더링
    if (mode === "sit") {
        let scale = 0.3966;
        image(sitImg, xPos_sub - 5, yPos_sub - 90, sitImg.width * scale, sitImg.height * scale);

    } else if (mode === "stand") {
        let scale = 0.33;
        image(standImg, xPos_sub, yPos_sub, standImg.width * scale * 1.2, standImg.height * scale * 1.2);

    } else if (mode === "walk") {
        isWalking = false;

        if (keyIsDown(RIGHT_ARROW)) {
            xPos_sub += 4;
            facingRight = true;
            isWalking = true;
        } else if (keyIsDown(LEFT_ARROW)) {
            xPos_sub -= 4;
            facingRight = false;
            isWalking = true;
        }

        if (isWalking) {
            frameCountForAnim++;
            if (frameCountForAnim >= frameDelay) {
                currentFrame = (currentFrame + 1) % walkerImages.length;
                frameCountForAnim = 0;
            }
        } else {
            currentFrame = 0;
        }

        push();
        translate(xPos_sub, yPos_sub);
        if (!facingRight) scale(-1, 1);
        image(walkerImages[currentFrame], 0, 20, 550, 570);
        pop();
    }

    if(xPos_sub>=width){
        done=1;
    }
    if(done===1){
        xPos_sub=0;
        done = 0;
        sceneNumber = 5;
    }
}

function scene5() {
    bg(50);
    walk();
    //화면 끝 도달 시 다음 장면
    if(xPos>=width/2){
        done=1;
    }
    if(done===1){
        xPos=0;
        done = 0;
        sceneNumber = 6;
    }

}



//scene6 :  엘리베이터 -> 지금 여기 코드 개판..
function scene6() {
    // 1. 엘리베이터 문 열림
    if (elevDoor === 1) {
        bg(7);
        // stranger 등장 애니메이션 시작
        if (!strangerAppeared) {
            strangerSize = 200;
            strangerAppeared = true;
        }
        // stranger 애니메이션 진행
        if (!strangerAnimDone) {
            image(runningStranger, width/2-120, height/2, strangerSize, strangerSize*1.5);
            strangerSize += 8;
            if (strangerSize >= 400) {
                strangerAnimDone = true;
                canZoom = true; // 확대 가능해짐
            }
        }
    }

    // 2. 확대 가능 상태
    if (canZoom && !isZoomed) {
        image(runningStranger, width/2-120, height/2, strangerSize, strangerSize*1.5);
        // 확대 가능 영역 표시 (디버깅용) -> 나중에 삭제!!!
        noFill();
        stroke(255, 0, 0);
        rect(zoomArea.x, zoomArea.y, zoomArea.w, zoomArea.h);
    }

    // 3. 확대된 상태
    if (isZoomed) {
    scaleFactor = lerp(scaleFactor, targetScale, 0.2); // 0.05 → 0.1로 변경해 더 빠른 확대
    if (abs(scaleFactor - targetScale) < 0.01) {
        zoomComplete = true;
    } 
    else {
        zoomComplete = false;
    }
    push();
    
    // 변환 순서 중요 - 바꾸면 안됨됨
    translate(width/2, height/2);  // 1. 화면 중심 이동
    scale(scaleFactor);            // 2. 확대 적용
    translate(-zoomCenter.x/scaleFactor, -zoomCenter.y/scaleFactor); // 3. 스케일 반영한 중심 조정
    
    // 배경 이미지 크기 지정
    image(bgImgs[8], 0, 0, width, height); 
    
    pop();
    
    
    if (zoomComplete) {
        buttonActive = true;
        
        image(closeButton, 627, 515, 120, 60);
        image(openButton, 945, 515, 120, 60);

        elevDoor = 2;
        
    }
}


    // 4. 문 닫힘 상태
    if (elevDoor === 3) {
        if (startFrame === undefined) {
            startFrame = frameCount;  // 처음 진입한 시점 저장
        }

        bg(9); // 명령어

        // 시간 지났는지 확인
        if (frameCount - startFrame > 120) {
            sceneNumber = 7; // 명령어 
            startFrame = undefined; // 이후에 또 쓰기 위해서
        }
    }
}


//scene7 :  엘리베이터 발사 
function scene7(){
    frameRate(60);
    if(elevBack===1){
        bg(10);
        image(elev,width/2,elevY,500,800);
        
        if(elevY>0){
            elevY-=8;
        }

        if(elevY<=0){
            elevBack=2;
            elevY = height;
        }
    } 
    else if(elevBack===2){
        bg(11);
        image(elev,width/2,elevY,500,800);

        if(elevY>0){
            elevY-=8;
        }

        if(elevY<=0){
            sceneNumber = 8;
        }
    }
}


//scene8 : 집 가는 길
function scene8(){
    bg(12);
    walk();
    //화면 끝 도달 시 다음 장면
    if(xPos>=width){
        done=1;
    }
    if(done===1){
        xPos=0;
        done = 0;
        sceneNumber = 9;
    }

    

}



//scene9 : 나무 자라는 장면 !!전에 집으로 걸어가는 장면이 있으면 좋겠다다
function scene9() {
 
    if (tree === 1) {
        bg(13);
        walk();
    
        //집  도달 시 다음 장면
        if(xPos>=width*2/3){
            done=1;
        }
        if(done===1){
            xPos=0;
            done = 0;
            tree=2;
    }
    } else if (tree === 2) {
        frameRate(2);
        bg(14);
        tree=3;
    } else if (tree === 3) {
        bg(15);
        tree=4;
    } else if (tree === 4) {
        bg(16);
        tree=5;
    } else if (tree === 5) {
        bg(17);
        tree=6;
    } else if (tree === 6) {
        bg(18);
        tree=7;
    } else if (tree === 7) {
        if (startFrame === undefined) {
            startFrame = frameCount;
        }

        bg(19);

        if (frameCount - startFrame > 1) { // 2초(프레임)만 보기 쉽게 줄여봄
            done = 1;
            tree = 0;
            startFrame = undefined;
        }
    }

    
    if (done === 1){
        sceneNumber = 10;
        done = 0;
    }
}

function scene_ending(){
    frameRate(60);

    if (currentScene === "ending"){
        bg(21);
    }
    else if (currentScene === "intro") {
       bg(22);
    }
    else if (currentScene === "kim") {
        bg(23);
    } 
    else if (currentScene === "lee") {
        bg(24);
    } 
    else if (currentScene === "choi") {
        bg(25);
    }
    else if (currentScene === "last") {
        bg(26);
    }
    
    
}



function keyPressed() {
    if(sceneNumber===4){
        if(keyCode === UP_ARROW){
            if (mode === "sit" && !seniorSeated) {
            mode = "stand"; // 스페이스바로 일어남
            }
        }
        
    }
}


function mousePressed(){
    if(sceneNumber===1){
        if(back===0){
            seedPut=1;
        }
    }

    if (sceneNumber === 6) {
    // 확대 가능 상태에서 클릭
        if (canZoom && !isZoomed) {
            if (mouseX >= zoomArea.x && mouseX <= zoomArea.x + zoomArea.w &&
                mouseY >= zoomArea.y && mouseY <= zoomArea.y + zoomArea.h) {
                zoomCenter.set(1300, 900);
                isZoomed = true;
            }
        }
        // 버튼 클릭 처리
        if (buttonActive && elevDoor === 2) {
            let distance = dist(627, 515, mouseX, mouseY);
            if (distance <= 88 && zoomComplete) {
                fill(255,0,0);
                ellipse(mouseX,mouseY,100,100);
                elevDoor = 3;
                buttonActive = false;
                isZoomed = false;
            }
        }
    }
    if(sceneNumber === 10){

        if (currentScene === "ending"){
            //if("")
            currentScene = "intro";
        }
        else if (currentScene === "intro"){
            if (mouseX >= 135 && mouseX <= 485 && mouseY >= 445 && mouseY <= 565) {
              currentScene = "kim";
            }
        
            else if (mouseX >= 590 && mouseX <= 940 && mouseY >= 445 && mouseY <= 565) {
              currentScene = "lee";
            }
        
            else if (mouseX >= 1045 && mouseX <= 1395 && mouseY >= 445 && mouseY <= 565) {
              currentScene = "choi";
            }

            else if (mouseX >= 1330 && mouseX <= 1465 && mouseY >= 820 && mouseY <= 955) {
              currentScene = "last";
            }

        } else if (currentScene === "kim" || currentScene === "lee" || currentScene === "choi"){
            currentScene = "intro";
        }
        
    }
}




//배경 이미지 표시 함수
function bg(n) {

    let img = bgImgs[n];
    if (!img) return;

    push();
    translate(width / 2, height / 2); // 중앙 정렬
    image(img, 0, 0);                 // 스케일 후 이미지 그리기
    pop();

    handleSceneSound(n);

}

function handleSceneSound(n) {
    let soundScenes = [5, 10, 11, 12];

    if (soundScenes.includes(n)) {
        if (!playedScenes[n]) {
            if (sceneSound.isPlaying()) {
                sceneSound.stop(); // 혹시 모르니 중복 방지
            }
            sceneSound.play();
            playedScenes[n] = true;
        }
    } else {
        // 해당 장면이 아니라면 소리 꺼주기
        if (sceneSound.isPlaying()) {
            sceneSound.stop();
        }
    }
}



function walk() {
  isWalking = false;

  // 방향키로 좌우 이동
  if (keyIsDown(RIGHT_ARROW)) {
    xPos += 5;
    facingRight = true;
    isWalking = true;
  } else if (keyIsDown(LEFT_ARROW)) {
    xPos -= 5;
    facingRight = false;
    isWalking = true;
  }

  // 걷기 애니메이션 처리
  if (isWalking) {
    frameCountForAnim++;
    if (frameCountForAnim >= frameDelay) {
      currentFrame = (currentFrame + 1) % walkerImages.length;
      frameCountForAnim = 0;
    }
  } else {
    currentFrame = 0;
  }

  // 캐릭터 그리기
  push();
  translate(xPos, yPos);
  if (!facingRight) {
    scale(-1, 1);
    image(walkerImages[currentFrame], 0, 0, 300, 300); // 크기 줄임
  } else {
    image(walkerImages[currentFrame], 0, 0, 300, 300);
  }
  pop();
}
