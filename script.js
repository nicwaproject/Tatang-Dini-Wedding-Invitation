document.addEventListener("DOMContentLoaded", function() {
    // Function to get URL parameters
    function getQueryParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Set couple names from URL parameter or use default
    const coupleNames = getQueryParameter('couple');
    
    // Set guest name from URL parameter or use default
    const guestName = getQueryParameter('guest');
    document.getElementById('guestName').textContent = guestName || 'Guest';

    // Variables for the invitation and music
    const loadingContainer = document.getElementById('loadingContainer');
    const openButton = document.getElementById('openButton');
    const invitationCover = document.getElementById('invitationCover');
    const invitationContent = document.getElementById('invitationContent');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const playPauseButton = document.getElementById('playPauseButton');
    const audioControls = document.querySelector('.audio-controls');
// Get the modal
var modal = document.getElementById("myModal");

// Get the modal content and caption
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

// Get navigation buttons
var prevBtn = document.querySelector(".prev");
var nextBtn = document.querySelector(".next");

var images = document.querySelectorAll(".gallery img");
var currentIndex = 0;

// Function to open modal with specific image
function openModal(index) {
    modal.style.display = "block";
    modalImg.src = images[index].src;
    captionText.innerHTML = images[index].alt;
    currentIndex = index;
}

// Loop through images and add click event
images.forEach((img, index) => {
    img.onclick = function() {
        openModal(index);
    };
});

// Function to show next image
nextBtn.onclick = function() {
    currentIndex = (currentIndex + 1) % images.length; // Loop back to first image
    openModal(currentIndex);
};

// Function to show previous image
prevBtn.onclick = function() {
    currentIndex = (currentIndex - 1 + images.length) % images.length; // Loop to last image
    openModal(currentIndex);
};

// Close modal when clicking the close button
document.querySelector(".close").onclick = function() {
    modal.style.display = "none";
};

    // Load Lottie animation
const animation = lottie.loadAnimation({
    container: document.getElementById('lottieAnimation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'red_loading.json' // Replace with the path to your Lottie file
  });

  // Show cover after loading animation
window.addEventListener('load', () => {
    setTimeout(() => {
      // Hide loading animation
      loadingContainer.style.display = 'none';
  
      // Show invitation cover
      invitationCover.style.display = 'flex';
    }, 2000); // Adjust duration for the loading animation
  });

    // Event listener to open the invitation and start music
    openButton.addEventListener('click', function() {
        invitationCover.style.display = 'none';
        invitationContent.style.display = 'flex';
        audioControls.style.display = 'block'; // Show the audio controls
        togglePlayPause();
    });

    let isPlaying = false;
    
    // Function to toggle play/pause for the music
    function togglePlayPause() {
        if (isPlaying) {
            backgroundMusic.pause();
        } else {
            backgroundMusic.play();
        }
        isPlaying = !isPlaying;
        playPauseButton.src = isPlaying ? 'sound1.png' : 'sound1.png'; // Change this to the path of your play and pause button images
    }

    // Event listener for the play/pause button
    playPauseButton.addEventListener('click', togglePlayPause);


// Select the video element
const video = document.getElementById('invitationVideo');
const videoButton = document.getElementById('videoButton');

// Play/Pause functionality
videoButton.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      playPauseButton.textContent = 'Pause';
    } else {
      video.pause();
      playPauseButton.textContent = 'Play';
    }
  });
  
  // Intersection Observer to auto-play/pause when in/out of viewport
  const handleVideoPlayback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play();
        videoButton.textContent = 'Pause'; // Update button state
      } else {
        video.pause();
        video.textContent = 'Play'; // Update button state
      }
    });
  };

// Create an Intersection Observer
const observer1 = new IntersectionObserver(handleVideoPlayback, {
  threshold: 0.5 // Play video when 50% of it is visible
});

// Observe the video element
observer1.observe(video);


    // Countdown Timer
function calculateCountdown() {
    const weddingDate = new Date('2025-02-15T08:00:00'); // Set your wedding date and time here (e.g., 3:00 PM)
    const currentDate = new Date();
    let timeRemaining = weddingDate - currentDate;

    if (timeRemaining <= 0) {
        clearInterval(intervalId);
        timeRemaining = 0;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

const intervalId = setInterval(calculateCountdown, 1000);
calculateCountdown();


// Function to copy account details
function copyAccountDetails(event) {
    const button = event.target; // Get the clicked button
    const accountDetails = button.previousElementSibling.innerText; // Get the account number
    navigator.clipboard.writeText(accountDetails)
        .then(() => {
            alert('Account details copied!');
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
}

// Attach event listener to all copy buttons
const copyButtons = document.querySelectorAll('.copyButton');
copyButtons.forEach(button => {
    button.addEventListener('click', copyAccountDetails);
});


    // function to show animation 
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const elements = document.querySelectorAll('.fade-in, .fade-slide, .slide-down, .slide-up, .pop-up, .slide-left, .slide-right');
    elements.forEach(element => {
        observer.observe(element);
    });
       


// messages handler
    const messageForm = document.getElementById('messageForm');
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('formGuestName').value;
            const message = document.getElementById('guestMessage').value;

            fetch('https://tatang-dini.glitch.me/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, message })
            })
            .then(response => response.json())
            .then(data => {
                loadMessages();
                messageForm.reset();
            })
            .catch(error => console.error('Error:', error));
        });
    }

    // Function to load messages
    function loadMessages() {
        fetch('https://tatang-dini.glitch.me/messages')
            .then(response => response.json())
            .then(data => {
                const messageList = document.getElementById('messageList');
                if (messageList) {
                    messageList.innerHTML = '';
                    data.forEach(msg => {
                        const messageItem = document.createElement('div');
                        messageItem.classList.add('message'); // Add 'message' class

                        // Element for the author
                        const authorElement = document.createElement('div');
                        authorElement.classList.add('message-author');
                        authorElement.textContent = msg.name;

                        // Element for the content
                        const contentElement = document.createElement('div');
                        contentElement.classList.add('message-content');
                        contentElement.textContent = msg.message;

                        // Element to contain both the author and the content
                        const bodyElement = document.createElement('div');
                        bodyElement.classList.add('message-body');
                        bodyElement.appendChild(authorElement);
                        bodyElement.appendChild(contentElement);

                        // Append the bodyElement to the messageItem
                        messageItem.appendChild(bodyElement);

                        // Append the messageItem to the messageList
                        messageList.appendChild(messageItem);
                    });
                }
            })
            .catch(error => console.error('Error:', error));
    }

    window.onload = loadMessages;
});
