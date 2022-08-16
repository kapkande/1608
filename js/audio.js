let isPlay = false;
const ButtonPlay = document.querySelector('.play')

function toggleBtn() {

    if (isPlay == true) {
        ButtonPlay.classList.remove('pause')
        isPlay = false
    } else if (isPlay == false) {
        ButtonPlay.classList.add('pause')
        isPlay = true;
    }



}
ButtonPlay.addEventListener('click', toggleBtn);

import playList from './playList.js';
const audio = new Audio();


let position = 0
const onMenuClick = (even) => {
    let playNum = 1

    const target = even.target;
    const isBTMPlat = ['play player-icon'].includes(target.className);
    const isBTMPause = ['play player-icon pause'].includes(target.className);
    audio.addEventListener('ended', (event) => {
        playNum1('1')
    })


    let isPlayPrev = ['play-prev player-icon'].includes(target.className);
    let isPlayNext = ['play-next player-icon'].includes(target.className);
    const isItemActiv = document.querySelectorAll('.play-item')
    if (isPlayPrev || isPlayNext || isItemActiv) {
        playNum1()


    }

    if (isBTMPlat || isBTMPause) {
        playAudio()
        playNum1()

    }




    function playNum1(next) {

        if (next) {
            isPlayNext = next
        }




        if (isPlayPrev && playNum < 1) {
            isItemActiv[position].classList.remove('item-active')
            position = 3
            playAudio()
        } else if (isPlayNext && position > 2) {
            isItemActiv[position].classList.remove('item-active')
            position = 0
            playAudio()
        } else if (isPlayPrev) {
            isItemActiv[position].classList.remove('item-active')
            position--
            playAudio()
        } else if (isPlayNext) {
            isItemActiv[position].classList.remove('item-active')
            position++
            playAudio()
        }


        isItemActiv[position].classList.add('item-active')

    }



    function playAudio() {
        if (position == -1) {
            position = 3
        }
        audio.src = playList[position].src;
        audio.currentTime = 0;

        if (!isBTMPlat && isPlay == true) {
            audio.play();

        } else if (!isBTMPause && isPlay == false) {
            audio.pause();
        }

    }


}

for (let i = 0; i < playList.length; i++) {
    const playListContainer = document.querySelector('.play-list')
    const li = document.createElement('li')
    li.classList.add('play-item')
    li.textContent = playList[i].title
    li.classList.add('play-item')
    playListContainer.append(li)
}

const onButtonPlay = document.querySelector('.play').addEventListener('click', onMenuClick);
const onPlayPrev = document.querySelector('.play-prev').addEventListener('click', onMenuClick);
const onPlayNext = document.querySelector('.play-next').addEventListener('click', onMenuClick);