// Reason cards
const reasons = [
    {
        text: "çok zarif, çok tatlı bi enerjin var. seninle tanıştığım için şanslıyım",
        emoji: "🌟",
        gif: "gif1.gif"
    },
    {
        text: "umarım yüzünden mutluluk hiçbir zaman eksik olmaz.",
        emoji: "❤️",
        gif: "gif2.gif"
    },
    {
        text: "yeni yaşında kalbinden ne geçiyorsa umarım hepsi gerçek olur.",
        emoji: "✨",
        gif: "gif1.gif"
    },
    {
        text: "hep böyle ışık saçan biri olarak kal. tekrardan iyi ki doğdun.",
        emoji: "🌸",
        gif: "gif2.gif"
    }
];

let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';

    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;

    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Tatlı an">`;

    card.appendChild(text);
    card.appendChild(gifOverlay);

    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: 'back.out'
    });

    return card;
}

function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);

        reasonCounter.textContent = `${currentReasonIndex + 1} / ${reasons.length}`;
        currentReasonIndex++;

        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: 'elastic.out',
                onComplete: () => {
                    shuffleButton.textContent = 'son olarak';
                    shuffleButton.classList.add('story-mode');
                    shuffleButton.addEventListener('click', () => {
                        gsap.to('body', {
                            opacity: 0,
                            duration: 1,
                            onComplete: () => {
                                window.location.href = `last.html?v=${Date.now()}`;
                            }
                        });
                    });
                }
            });
        }

        createFloatingElement();

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
}

shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});

function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🫶', '⭐'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 10 + 10,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.2
    });
});

setInterval(createFloatingElement, 2000);
