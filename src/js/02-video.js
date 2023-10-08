import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);


const updateLocalStorage = throttle(function (data) {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data.seconds));
}, 1000);

player.on('timeupdate', updateLocalStorage);
getCurrentTime();


function getCurrentTime() {
  const currentTime = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  player.setCurrentTime(currentTime);
}
