let progress = document.getElementById('progress');
let song = document.getElementById('song');
let ctrlIcon = document.getElementById('ctrlIcon');
let trackTitleElement = document.getElementById('trackTitle');
let trackArtistElement = document.getElementById('trackArtist');
let trackImageElement = document.getElementById('trackImage');
let currentTimeElement = document.getElementById('currentTime');

let trackIndex = 0;

const tracks = [
  { 
    id: 'neon-lights', 
    src: 'Loreen - Neon Lights.mp3', 
    title: 'Neon Lights', 
    artist: 'Loreen', 
    image: 'neon lights.jpg'
  },
  { 
    id: 'tattoo', 
    src: 'Loreen - Tattoo.mp3', 
    title: 'Tattoo', 
    artist: 'Loreen', 
    image: 'tattoo.jpg'
  },
  { src: 'Loreen - Love Me America.mp3', title: 'Love Me America', artist: 'Loreen', image: 'love me america.jpg' },
  { src: 'Loreen - My Heart Is Refusing Me.mp3', title: 'My Heart Is Refusing Me', artist: 'Loreen', image: 'my heart is refusing me.jpg' },
  { src: 'Loreen - Euphoria.mp3', title: 'Euphoria', artist: 'Loreen', image: 'euphoria.jpg' },
  { src: 'Loreen - Crying Out Your Name.mp3', title: 'Crying Out Your Name', artist: 'Loreen', image: 'crying out your name.jpg' },
  { src: 'Loreen - Jupiter Drive.mp3', title: 'Jupiter Drive', artist: 'Loreen', image: 'jupiter drive.jpg' },
  { src: 'Loreen - Paper Light Revisited.mp3', title: 'Paper Light Revisited', artist: 'Loreen', image: 'paper light revisited.jpg' },
  { src: 'Loreen - Is It Love.mp3', title: 'Is It Love', artist: 'Loreen', image: 'is it love.jpg' },
  { src: 'Loreen - In My Head.mp3', title: 'In My Head', artist: 'Loreen', image: 'in my head.jpg' },
  { src: 'Loreen - Statements.mp3', title: 'Statements', artist: 'Loreen', image: 'statements.jpg' },
  { src: 'Loreen - Ride.mp3', title: 'Ride', artist: 'Loreen', image: 'ride.jpg' },
  
];

function loadTrack() {
  const currentTrack = tracks[trackIndex];
  song.src = currentTrack.src;
  song.load();
  song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = 0;
    document.getElementById('totalDuration').textContent = formatTime(song.duration);
  };

  trackTitleElement.textContent = currentTrack.title;
  trackArtistElement.textContent = currentTrack.artist;
  trackImageElement.src = currentTrack.image;

  updatePlayPauseIcon();


  const currentLyrics = document.getElementById(currentTrack.id);
  console.log(`Track: ${currentTrack.title}, ID: ${currentTrack.id}, Lyrics Found: ${currentLyrics !== null}`);


  document.getElementById('lyricsContent').innerHTML = currentLyrics ? currentLyrics.innerHTML : 'Lyrics not found';

  song.addEventListener('ended', function () {
    nextTrack();
  });
}



function updateTime() {
  currentTimeElement.textContent = formatTime(song.currentTime);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function updatePlayPauseIcon() {
  if (song.paused) {
    ctrlIcon.classList.remove('fa-pause');
    ctrlIcon.classList.add('fa-play');
  } else {
    ctrlIcon.classList.remove('fa-play');
    ctrlIcon.classList.add('fa-pause');
  }
}

function playPause() {
  if (song.paused) {
    song.play();
  } else {
    song.pause();
  }
  updatePlayPauseIcon();
}

setInterval(() => {
  if (!song.paused) {
    progress.value = song.currentTime;
    updateTime();
    document.getElementById('totalDuration').textContent = formatTime(song.duration);
  }
}, 500);

progress.oninput = function () {
  song.currentTime = progress.value;
  updateTime();
};

function nextTrack() {
  if (!song.paused) {
    song.pause();
  }
  trackIndex = (trackIndex + 1) % tracks.length;
  loadTrack();
  song.play();
  updatePlayPauseButton();
}

function prevTrack() {
  if (!song.paused) {
    song.pause();
  }

  trackIndex = (trackIndex - 1 + tracks.length) % tracks.length;
  song.currentTime = 0;
  loadTrack();
  song.play();
  updatePlayPauseButton();
}

function updatePlayPauseButton() {
  if (song.paused) {
    ctrlIcon.classList.remove('fa-pause');
    ctrlIcon.classList.add('fa-play');
  } else {
    ctrlIcon.classList.remove('fa-play');
    ctrlIcon.classList.add('fa-pause');
  }
}


function openOverlay() {
  document.getElementById('overlay').style.display = 'flex';
}

function closeOverlay() {
  document.getElementById('overlay').style.display = 'none';
}

function openToMainPageOverlay() {
  document.getElementById('toMainPageOverlay').style.display = 'flex';
}

function closeToMainPageOverlay() {
  document.getElementById('toMainPageOverlay').style.display = 'none';
}

function goToPlaylist() {
  document.getElementById('toMainPageOverlay').style.display = 'none';
}

document.getElementById('openMenu').addEventListener('click', openOverlay);

document.getElementById('toMainPage').addEventListener('click', openToMainPageOverlay);

document.getElementById('playlistButton').addEventListener('click', goToPlaylist);

document.addEventListener('click', function (event) {
  const overlay = document.getElementById('overlay');
  const openMenuButton = document.getElementById('openMenu');
  if (!overlay.contains(event.target) && event.target !== openMenuButton) {
    closeOverlay();
  }

  const toMainPageOverlay = document.getElementById('toMainPageOverlay');
  const toMainPageButton = document.getElementById('toMainPage');
  if (!toMainPageOverlay.contains(event.target) && event.target !== toMainPageButton) {
    closeToMainPageOverlay();
  }
});

document.getElementById('ctrlIcon').addEventListener('click', playPause);

document.addEventListener('keydown', function (event) {
  if (event.code === 'Space') {
    playPause();
  } else if (event.code === 'ArrowRight') {
    nextTrack();
  } else if (event.code === 'ArrowLeft') {
    prevTrack();
  }
});

loadTrack(); 

document.querySelectorAll('.btn-track').forEach((btn, index) => {
  btn.addEventListener('click', function () {
    trackIndex = index;
    loadTrack();
    song.play();
    updatePlayPauseButton();
  });
});

function setTourImagePaths() {
  const tourGallery = document.querySelector('.tour-gallery');

  for (let i = 1; i <= 18; i++) {
    const img = document.createElement('img');
    img.className = 'tour-img';
    img.src = `/images/tour_${i}.jpg`;
    img.alt = '';
    img.width = 130;
    img.height = 130;
    tourGallery.appendChild(img);
  }
}

setTourImagePaths();



// repeat btn
function repeatTrack() {
  const audioPlayer = document.getElementById('song');
  const repeatIcon = document.querySelector('.fa-repeat');
  
  if (audioPlayer && repeatIcon) {
    audioPlayer.loop = !audioPlayer.loop;
    
    if (audioPlayer.loop) {
      repeatIcon.style.padding = '5px'; 
      repeatIcon.style.borderRadius = '50%';
      repeatIcon.style.boxShadow = '0 0 5px 5px #FB2576, 0 0 5px 5px #FB2576'; 
    } else {
      repeatIcon.style.padding = ''; 
      repeatIcon.style.borderRadius = ' ';
      repeatIcon.style.boxShadow = ''; 
    }
  }
}

// 

function openLyricsOverlay() {
  document.getElementById('lyricsOverlay').style.display = 'flex';
}
function closeLyricsOverlay() {
  document.getElementById('lyricsOverlay').style.display = 'none';
  }

document.getElementById('openLyrics').addEventListener('click', openLyricsOverlay);
document.getElementById('closeLyrics').addEventListener('click', closeLyricsOverlay);

document.getElementById('openLyrics').addEventListener('click', function () {
  const lyricsOverlay = document.getElementById('lyricsOverlay');
  lyricsOverlay.classList.toggle('hidden');
});


//
function toggleLyricsOverlay() {
  const lyricsOverlay = document.getElementById('lyricsOverlay');
  const musicPlayer = document.querySelector('.music-player');
  const openLyricsButton = document.getElementById('openLyrics');

  const isOverlayVisible = lyricsOverlay.style.visibility === 'visible';

  if (!isOverlayVisible) {
    // Open the overlay
    lyricsOverlay.style.visibility = 'visible';
    musicPlayer.style.height = `calc(680px + ${lyricsOverlay.clientHeight}px)`;
    openLyricsButton.innerHTML = 'lyrics<i class="fa-solid fa-chevron-up"></i>';
  } else {
    // Close the overlay
    lyricsOverlay.style.visibility = 'hidden';
    musicPlayer.style.height = '680px';
    openLyricsButton.innerHTML = 'lyrics<i class="fa-solid fa-chevron-down"></i>';
  }
}



