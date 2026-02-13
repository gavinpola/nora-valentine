/* ==========================================
   NORA VALENTINE'S DAY WEBSITE - SCRIPT
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // SECTION 1: HERO - Rotating Names + Hearts + Confetti
    // ==========================================

    // Rotating nickname with heartbeat pulse
    const names = ['Nori', 'Nora', 'Princess', 'Seaweed', 'Associate', 'Egg', 'Pobrecita', 'My Girlfriend'];
    let nameIndex = 0;
    const nameEl = document.getElementById('rotatingName');

    function rotateName() {
        nameIndex = (nameIndex + 1) % names.length;
        nameEl.classList.remove('beating');
        // Force reflow to restart animation
        void nameEl.offsetWidth;
        nameEl.textContent = names[nameIndex];
        nameEl.classList.add('beating');
    }

    // Start rotating names every 2 seconds
    setInterval(rotateName, 2000);
    // Initial pulse
    setTimeout(() => nameEl.classList.add('beating'), 500);

    // Create floating hearts in background
    const heartsBg = document.getElementById('heartsBg');
    const heartChars = ['\u2665', '\u2661', '\u2764', '\uD83D\uDC95', '\uD83D\uDC97'];

    function createFloatingHeart() {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 24 + 14) + 'px';
        heart.style.animationDuration = (Math.random() * 6 + 6) + 's';
        heart.style.animationDelay = (Math.random() * 4) + 's';
        heart.style.opacity = Math.random() * 0.4 + 0.1;
        heartsBg.appendChild(heart);
        setTimeout(() => heart.remove(), 14000);
    }

    for (let i = 0; i < 15; i++) {
        setTimeout(createFloatingHeart, i * 400);
    }
    setInterval(createFloatingHeart, 800);

    // Confetti burst
    function launchConfetti() {
        const container = document.getElementById('confetti');
        const colors = ['#ff6b8a', '#ffb3c6', '#c9b1ff', '#ffd700', '#ff8a80', '#e8d5f5', '#ffdab9'];

        for (let i = 0; i < 100; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            const color = colors[Math.floor(Math.random() * colors.length)];
            const isHeart = Math.random() < 0.3;

            piece.style.left = Math.random() * 100 + '%';
            piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
            piece.style.animationDelay = (Math.random() * 0.5) + 's';

            if (isHeart) {
                piece.style.background = 'none';
                piece.style.fontSize = (Math.random() * 12 + 10) + 'px';
                piece.textContent = '\u2665';
                piece.style.color = color;
                piece.style.width = 'auto';
                piece.style.height = 'auto';
            } else {
                piece.style.background = color;
                piece.style.width = (Math.random() * 8 + 6) + 'px';
                piece.style.height = (Math.random() * 8 + 6) + 'px';
                if (Math.random() < 0.5) piece.style.borderRadius = '50%';
            }

            container.appendChild(piece);
            setTimeout(() => piece.remove(), 4000);
        }
    }

    // Enter button click
    document.getElementById('enterBtn').addEventListener('click', () => {
        launchConfetti();
        setTimeout(() => {
            document.getElementById('stars').scrollIntoView({ behavior: 'smooth' });
        }, 600);
    });


    // ==========================================
    // SECTION 2: FLIP CARDS
    // ==========================================

    const flipCards = document.querySelectorAll('.flip-card');
    let revealedCount = 0;
    const counter = document.getElementById('cardsCounter');

    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            if (!card.classList.contains('flipped')) {
                card.classList.add('flipped');
                revealedCount++;
                counter.textContent = revealedCount + ' of 5 revealed';

                if (revealedCount === 5) {
                    counter.textContent = '\u2728 All revealed! It was meant to be \u2728';
                    counter.style.color = '#e84574';
                    counter.style.fontSize = '1.5rem';
                    setTimeout(launchConfetti, 300);
                }
            }
        });
    });


    // ==========================================
    // SECTION 3: BASKETBALL GAME + PHOTO UNLOCK
    // ==========================================

    const canvas = document.getElementById('basketballCanvas');
    const ctx = canvas.getContext('2d');
    const scoreEl = document.getElementById('gameScore');
    const photosUnlockedEl = document.getElementById('photosUnlocked');
    const unlockToast = document.getElementById('unlockToast');
    const unlockToastText = document.getElementById('unlockToastText');
    const gameInstructions = document.getElementById('gameInstructions');
    const photoGridTitle = document.getElementById('photoGridTitle');
    const gridPhotos = document.querySelectorAll('.grid-photo');

    // Responsive canvas sizing
    function resizeCanvas() {
        const maxWidth = Math.min(380, window.innerWidth - 48);
        const ratio = maxWidth / 380;
        canvas.style.width = maxWidth + 'px';
        canvas.style.height = (500 * ratio) + 'px';
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Unlock messages
    const unlockMessages = [
        "2 photos unlocked! Keep shooting! \uD83D\uDCF8",
        "Nice shot! 2 more memories revealed! \u2728",
        "Swish! Check out those photos below! \uD83C\uDFC0",
        "You're on fire! 2 more unlocked! \uD83D\uDD25",
        "Nothing but net! Scroll down to see! \uD83D\uDE0D",
        "Buckets! 2 new photos just for you! \uD83C\uDF1F",
        "What a shot! Almost there! \uD83D\uDCAA",
        "Splash! The memories keep coming! \uD83D\uDC95",
        "All photos unlocked!! You're a legend! \uD83C\uDFC6",
    ];

    let score = 0;
    let totalPhotosUnlocked = 0;

    // Build shuffled photo unlock order
    let photoUnlockOrder = [];
    for (let i = 0; i < gridPhotos.length; i++) photoUnlockOrder.push(i);
    // Shuffle
    for (let i = photoUnlockOrder.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [photoUnlockOrder[i], photoUnlockOrder[j]] = [photoUnlockOrder[j], photoUnlockOrder[i]];
    }

    function unlockPhotos() {
        // Unlock 2 photos
        let unlocked = 0;
        while (unlocked < 2 && photoUnlockOrder.length > 0) {
            const idx = photoUnlockOrder.shift();
            const photo = gridPhotos[idx];
            if (photo && photo.classList.contains('locked')) {
                photo.classList.remove('locked');
                photo.classList.add('just-unlocked');
                setTimeout(() => photo.classList.remove('just-unlocked'), 900);
                unlocked++;
                totalPhotosUnlocked++;
            }
        }
        photosUnlockedEl.textContent = totalPhotosUnlocked;

        // Show toast
        unlockToastText.textContent = unlockMessages[Math.min(score - 1, unlockMessages.length - 1)];
        unlockToast.classList.add('show');
        setTimeout(() => unlockToast.classList.remove('show'), 2500);

        // Check if all unlocked
        if (totalPhotosUnlocked >= gridPhotos.length) {
            photoGridTitle.textContent = '\uD83C\uDF89 All memories unlocked! Tap any photo to view! \uD83C\uDF89';
            photoGridTitle.classList.add('all-unlocked');
            setTimeout(launchConfetti, 500);
        }
    }

    // Game physics
    const BALL_START_X = 190;
    const BALL_START_Y = 410;
    const BALL_RADIUS = 18;
    const HOOP_X = 190;
    const HOOP_Y = 90;
    const HOOP_WIDTH = 80;
    const RIM_RADIUS = 6;
    const GRAVITY = 0.32;

    let ball = { x: BALL_START_X, y: BALL_START_Y, radius: BALL_RADIUS };
    let dragging = false;
    let dragStart = { x: 0, y: 0 };
    let dragEnd = { x: 0, y: 0 };
    let shooting = false;
    let ballVelocity = { x: 0, y: 0 };
    let ballTrail = [];
    let made = false;
    let scored = false; // prevents double-scoring

    function drawBackboard() {
        // Pole
        ctx.fillStyle = '#888';
        ctx.fillRect(HOOP_X + 48, HOOP_Y - 45, 5, canvas.height * 0.55 - HOOP_Y + 45);

        // Backboard
        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(HOOP_X - 50, HOOP_Y - 45, 100, 55);
        ctx.strokeStyle = '#555';
        ctx.lineWidth = 2;
        ctx.strokeRect(HOOP_X - 50, HOOP_Y - 45, 100, 55);

        // Inner square
        ctx.strokeStyle = '#e84574';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(HOOP_X - 22, HOOP_Y - 30, 44, 30);

        // Rim
        ctx.beginPath();
        ctx.moveTo(HOOP_X - HOOP_WIDTH / 2, HOOP_Y + 8);
        ctx.lineTo(HOOP_X + HOOP_WIDTH / 2, HOOP_Y + 8);
        ctx.strokeStyle = '#ff4444';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Rim ends
        [HOOP_X - HOOP_WIDTH / 2, HOOP_X + HOOP_WIDTH / 2].forEach(rx => {
            ctx.beginPath();
            ctx.arc(rx, HOOP_Y + 8, RIM_RADIUS, 0, Math.PI * 2);
            ctx.fillStyle = '#ff4444';
            ctx.fill();
        });

        // Net
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 6; i++) {
            const x = HOOP_X - HOOP_WIDTH / 2 + (i * HOOP_WIDTH / 5);
            ctx.beginPath();
            ctx.moveTo(x, HOOP_Y + 8);
            ctx.lineTo(HOOP_X + (x - HOOP_X) * 0.4, HOOP_Y + 50);
            ctx.stroke();
        }
        for (let j = 1; j <= 3; j++) {
            const y = HOOP_Y + 8 + j * 11;
            const s = j * 5;
            ctx.beginPath();
            ctx.moveTo(HOOP_X - HOOP_WIDTH / 2 + s, y);
            ctx.lineTo(HOOP_X + HOOP_WIDTH / 2 - s, y);
            ctx.stroke();
        }
    }

    function drawBall(x, y, r) {
        // Shadow
        ctx.beginPath();
        ctx.arc(x + 3, y + 3, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,0.12)';
        ctx.fill();

        // Ball gradient
        const g = ctx.createRadialGradient(x - 4, y - 4, 2, x, y, r);
        g.addColorStop(0, '#ff9040');
        g.addColorStop(0.7, '#ff6b00');
        g.addColorStop(1, '#cc5500');
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        // Ball seams
        ctx.strokeStyle = 'rgba(0,0,0,0.2)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x - r, y);
        ctx.lineTo(x + r, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, r * 0.7, -Math.PI / 2, Math.PI / 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, r * 0.7, Math.PI / 2, -Math.PI / 2);
        ctx.stroke();
    }

    function drawAimLine() {
        if (!dragging || shooting) return;

        const dx = dragStart.x - dragEnd.x;
        const dy = dragStart.y - dragEnd.y;
        const power = Math.sqrt(dx * dx + dy * dy);

        if (power < 5) return;

        // Draw thick, visible aim line
        ctx.beginPath();
        ctx.setLineDash([8, 5]);
        ctx.moveTo(ball.x, ball.y);
        ctx.lineTo(ball.x + dx * 1.2, ball.y + dy * 1.2);
        ctx.strokeStyle = 'rgba(232, 69, 116, 0.7)';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.setLineDash([]);

        // Arrow head (bigger)
        const angle = Math.atan2(dy, dx);
        const ax = ball.x + dx * 1.2;
        const ay = ball.y + dy * 1.2;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(ax - 14 * Math.cos(angle - 0.4), ay - 14 * Math.sin(angle - 0.4));
        ctx.lineTo(ax - 14 * Math.cos(angle + 0.4), ay - 14 * Math.sin(angle + 0.4));
        ctx.closePath();
        ctx.fillStyle = 'rgba(232, 69, 116, 0.7)';
        ctx.fill();

        // Power indicator
        const powerPct = Math.min(power / 100, 1) * 100;
        ctx.font = 'bold 16px Poppins';
        ctx.fillStyle = 'rgba(232, 69, 116, 0.8)';
        ctx.textAlign = 'center';
        ctx.fillText(Math.round(powerPct) + '%', ball.x, ball.y + ball.radius + 24);
    }

    function drawTrail() {
        ballTrail.forEach((pos, i) => {
            const alpha = (i / ballTrail.length) * 0.25;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, ball.radius * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 107, 0, ' + alpha + ')';
            ctx.fill();
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Sky + ground
        const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
        sky.addColorStop(0, '#87CEEB');
        sky.addColorStop(0.55, '#a8d8ea');
        sky.addColorStop(0.55, '#c8a26e');
        sky.addColorStop(1, '#b8925e');
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawBackboard();
        drawTrail();
        drawAimLine();
        drawBall(ball.x, ball.y, ball.radius);

        if (made) {
            ctx.font = 'bold 36px Caveat';
            ctx.fillStyle = '#e84574';
            ctx.textAlign = 'center';
            ctx.fillText('Swish! \uD83C\uDFC0', canvas.width / 2, canvas.height / 2 + 20);
        }
    }

    function resetBall() {
        ball.x = BALL_START_X;
        ball.y = BALL_START_Y;
        ballVelocity = { x: 0, y: 0 };
        shooting = false;
        made = false;
        scored = false;
        ballTrail = [];
        draw();
    }

    function checkScore() {
        const hoopLeft = HOOP_X - HOOP_WIDTH / 2 + ball.radius * 0.5;
        const hoopRight = HOOP_X + HOOP_WIDTH / 2 - ball.radius * 0.5;
        const hoopY = HOOP_Y + 8;

        // Ball center is within the hoop opening, moving downward, near the rim height
        if (ball.x > hoopLeft && ball.x < hoopRight &&
            ball.y > hoopY - 5 && ball.y < hoopY + 18 &&
            ballVelocity.y > 0) {
            return true;
        }
        return false;
    }

    function animate() {
        if (!shooting) return;

        ballVelocity.y += GRAVITY;
        ball.x += ballVelocity.x;
        ball.y += ballVelocity.y;

        ballTrail.push({ x: ball.x, y: ball.y });
        if (ballTrail.length > 14) ballTrail.shift();

        // Rim collision
        const rimLeftX = HOOP_X - HOOP_WIDTH / 2;
        const rimRightX = HOOP_X + HOOP_WIDTH / 2;
        const rimY = HOOP_Y + 8;

        const distLeft = Math.sqrt((ball.x - rimLeftX) ** 2 + (ball.y - rimY) ** 2);
        if (distLeft < ball.radius + RIM_RADIUS && ballVelocity.y > 0) {
            ballVelocity.x = -Math.abs(ballVelocity.x) - 1;
            ballVelocity.y *= -0.4;
            ball.y = rimY - ball.radius - RIM_RADIUS;
        }

        const distRight = Math.sqrt((ball.x - rimRightX) ** 2 + (ball.y - rimY) ** 2);
        if (distRight < ball.radius + RIM_RADIUS && ballVelocity.y > 0) {
            ballVelocity.x = Math.abs(ballVelocity.x) + 1;
            ballVelocity.y *= -0.4;
            ball.y = rimY - ball.radius - RIM_RADIUS;
        }

        // Backboard collision
        if (ball.x > HOOP_X + 46 && ball.y < HOOP_Y + 10 && ball.y > HOOP_Y - 50) {
            ball.x = HOOP_X + 46 - ball.radius;
            ballVelocity.x *= -0.5;
        }

        // Score check
        if (!scored && checkScore()) {
            scored = true;
            made = true;
            score++;
            scoreEl.textContent = score;

            if (totalPhotosUnlocked < gridPhotos.length) {
                unlockPhotos();
            }

            if (score >= 9 && totalPhotosUnlocked >= gridPhotos.length) {
                gameInstructions.textContent = 'All photos unlocked! You can keep shooting for fun \uD83C\uDFC0';
            } else {
                gameInstructions.textContent = 'Nice shot! Drag the ball to shoot again!';
            }
        }

        draw();

        // Out of bounds
        if (ball.y > canvas.height + 50 || ball.x < -60 || ball.x > canvas.width + 60) {
            if (!made) {
                gameInstructions.textContent = 'Almost! Pull down on the ball and release to shoot!';
            }
            setTimeout(resetBall, made ? 1000 : 500);
            return;
        }

        requestAnimationFrame(animate);
    }

    // Input: get canvas-space coordinates
    function getCanvasPos(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        let clientX, clientY;
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else if (e.changedTouches && e.changedTouches.length > 0) {
            clientX = e.changedTouches[0].clientX;
            clientY = e.changedTouches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        };
    }

    function onStart(e) {
        e.preventDefault();
        if (shooting) return;
        const pos = getCanvasPos(e);
        // Generous hit area: anywhere near the ball or in the lower third
        const dist = Math.sqrt((pos.x - ball.x) ** 2 + (pos.y - ball.y) ** 2);
        if (dist < ball.radius + 50 || pos.y > canvas.height * 0.65) {
            dragging = true;
            dragStart = { x: pos.x, y: pos.y };
            dragEnd = { x: pos.x, y: pos.y };
        }
    }

    function onMove(e) {
        e.preventDefault();
        if (!dragging) return;
        dragEnd = getCanvasPos(e);
        draw();
    }

    function onEnd(e) {
        e.preventDefault();
        if (!dragging) return;
        dragging = false;

        const dx = dragStart.x - dragEnd.x;
        const dy = dragStart.y - dragEnd.y;
        const power = Math.sqrt(dx * dx + dy * dy);

        if (power > 10) {
            shooting = true;

            // Scale power: a moderate drag should be enough to reach the hoop
            // The ball needs vy ~= 16 to reach from y=410 to y=90 with gravity 0.32
            const maxVelocity = 17;
            const normalizedPower = Math.min(power / 100, 1);
            const speed = normalizedPower * maxVelocity;

            const angle = Math.atan2(dy, dx);
            ballVelocity.x = Math.cos(angle) * speed;
            ballVelocity.y = Math.sin(angle) * speed;

            unlockToast.classList.remove('show');
            animate();
        }
    }

    // Mouse events
    canvas.addEventListener('mousedown', onStart);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseup', onEnd);
    canvas.addEventListener('mouseleave', onEnd);

    // Touch events
    canvas.addEventListener('touchstart', onStart, { passive: false });
    canvas.addEventListener('touchmove', onMove, { passive: false });
    canvas.addEventListener('touchend', onEnd, { passive: false });

    draw();


    // ==========================================
    // PHOTO LIGHTBOX (for unlocked photos)
    // ==========================================

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    document.getElementById('photoGrid').addEventListener('click', (e) => {
        const photo = e.target.closest('.grid-photo');
        if (!photo || photo.classList.contains('locked')) return;

        const img = photo.querySelector('img');
        const caption = photo.querySelector('.grid-caption');
        lightboxImg.src = img.src;
        lightboxCaption.textContent = caption.textContent;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });


    // ==========================================
    // SECTION 4: SCROLL REVEAL FOR REASON CARDS
    // ==========================================

    const reasonCards = document.querySelectorAll('.reason-card');

    const reasonObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                reasonObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    reasonCards.forEach(card => reasonObserver.observe(card));


    // ==========================================
    // SECTION 5: FAKE-OUT CARD REVEAL
    // ==========================================

    const noCard = document.getElementById('noCard');
    const realCard = document.getElementById('realCard');
    const noCardBtn = document.getElementById('noCardBtn');

    noCardBtn.addEventListener('click', () => {
        noCard.classList.add('hidden');
        realCard.classList.remove('hidden');
        realCard.classList.add('revealing');
        launchConfetti();
    });


    // ==========================================
    // FINAL HEARTS
    // ==========================================

    const finalHearts = document.getElementById('finalHearts');
    for (let i = 0; i < 7; i++) {
        const heart = document.createElement('span');
        heart.textContent = '\u2665';
        heart.style.cssText =
            'font-size: ' + (20 + Math.random() * 20) + 'px;' +
            'color: rgba(255, 107, 138, ' + (0.3 + Math.random() * 0.5) + ');' +
            'margin: 0 8px;' +
            'display: inline-block;' +
            'animation: heartPulse ' + (1 + Math.random()) + 's ease-in-out infinite ' + (Math.random() * 0.5) + 's;';
        finalHearts.appendChild(heart);
    }


    // ==========================================
    // GENERAL: Scroll reveal for section titles
    // ==========================================

    const revealElements = document.querySelectorAll('.section-title, .section-subtitle');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        revealObserver.observe(el);
    });

});
