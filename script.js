/* ==========================================
   NORA VALENTINE'S DAY WEBSITE - SCRIPT
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // SECTION 1: HERO - Floating Hearts + Confetti
    // ==========================================

    // Create floating hearts in background
    const heartsBg = document.getElementById('heartsBg');
    const heartChars = ['♥', '♡', '❤', '💕', '💗'];

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

        // Remove after animation
        setTimeout(() => heart.remove(), 14000);
    }

    // Start hearts
    for (let i = 0; i < 15; i++) {
        setTimeout(createFloatingHeart, i * 400);
    }
    setInterval(createFloatingHeart, 800);

    // Confetti burst
    function launchConfetti() {
        const container = document.getElementById('confetti');
        const colors = ['#ff6b8a', '#ffb3c6', '#c9b1ff', '#ffd700', '#ff8a80', '#e8d5f5', '#ffdab9'];
        const shapes = ['circle', 'square', 'heart'];

        for (let i = 0; i < 100; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            const color = colors[Math.floor(Math.random() * colors.length)];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];

            piece.style.left = Math.random() * 100 + '%';
            piece.style.background = color;
            piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
            piece.style.animationDelay = (Math.random() * 0.5) + 's';
            piece.style.width = (Math.random() * 8 + 6) + 'px';
            piece.style.height = (Math.random() * 8 + 6) + 'px';

            if (shape === 'circle') {
                piece.style.borderRadius = '50%';
            } else if (shape === 'heart') {
                piece.style.background = 'none';
                piece.style.fontSize = (Math.random() * 12 + 10) + 'px';
                piece.textContent = '♥';
                piece.style.color = color;
                piece.style.width = 'auto';
                piece.style.height = 'auto';
            }

            container.appendChild(piece);
            setTimeout(() => piece.remove(), 4000);
        }
    }

    // Enter button click
    const enterBtn = document.getElementById('enterBtn');
    enterBtn.addEventListener('click', () => {
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
                counter.textContent = `${revealedCount} of 5 revealed`;

                if (revealedCount === 5) {
                    counter.textContent = '✨ All revealed! It was meant to be ✨';
                    counter.style.color = '#e84574';
                    counter.style.fontSize = '1.5rem';
                    // Little confetti for completing all
                    setTimeout(launchConfetti, 300);
                }
            }
        });
    });


    // ==========================================
    // SECTION 3: PHOTO LIGHTBOX
    // ==========================================

    const polaroids = document.querySelectorAll('.polaroid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    polaroids.forEach(polaroid => {
        polaroid.addEventListener('click', () => {
            const img = polaroid.querySelector('img');
            const caption = polaroid.querySelector('.polaroid-caption');
            lightboxImg.src = img.src;
            lightboxCaption.textContent = caption.textContent;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
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
        if (e.target === lightbox) {
            closeLightbox();
        }
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
    // SECTION 5: BASKETBALL MINI-GAME
    // ==========================================

    const canvas = document.getElementById('basketballCanvas');
    const ctx = canvas.getContext('2d');
    const scoreEl = document.getElementById('gameScore');
    const loveNoteEl = document.getElementById('loveNote');
    const loveNoteText = document.getElementById('loveNoteText');
    const gameInstructions = document.getElementById('gameInstructions');

    // Handle responsive canvas
    function resizeCanvas() {
        const maxWidth = Math.min(380, window.innerWidth - 48);
        const ratio = maxWidth / 380;
        canvas.style.width = maxWidth + 'px';
        canvas.style.height = (500 * ratio) + 'px';
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const loveNotes = [
        "You're my favorite person on the planet 💕",
        "I can't stop smiling when I'm with you 😊",
        "Our matching ski suits was destiny ⛷️",
        "1520 SAT power couple! 🧠",
        "You make every day feel like an adventure ✨",
        "Still can't believe our dads are both Mike 😂",
        "May 14 + May 15 = meant to be 🎂",
        "You're the best hooper I know 🏀",
        "Your smile stops my world every time 💫",
        "I'm the president of the Nora Fan Club 🏆",
        "From co-workers to soulmates 💼❤️",
        "You inspire me to be better every day 🌟",
        "Every moment with you is my favorite 📸",
        "BCG's best couple, no question 😎",
        "I love exploring SF with you 🌉",
    ];
    let noteIndex = 0;
    let score = 0;

    // Game state
    let ball = { x: 190, y: 420, radius: 18, color: '#ff6b00' };
    let hoop = { x: 190, y: 85, width: 80, rimRadius: 6 };
    let dragging = false;
    let dragStart = { x: 0, y: 0 };
    let dragEnd = { x: 0, y: 0 };
    let shooting = false;
    let ballVelocity = { x: 0, y: 0 };
    let gravity = 0.4;
    let ballTrail = [];
    let made = false;
    let animationId = null;

    function drawBackboard() {
        // Backboard
        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(hoop.x - 50, hoop.y - 45, 100, 55);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.strokeRect(hoop.x - 50, hoop.y - 45, 100, 55);

        // Inner square on backboard
        ctx.strokeStyle = '#e84574';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(hoop.x - 22, hoop.y - 30, 44, 30);

        // Rim (hoop)
        ctx.beginPath();
        ctx.moveTo(hoop.x - hoop.width / 2, hoop.y + 8);
        ctx.lineTo(hoop.x + hoop.width / 2, hoop.y + 8);
        ctx.strokeStyle = '#ff4444';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Rim ends (circles)
        ctx.beginPath();
        ctx.arc(hoop.x - hoop.width / 2, hoop.y + 8, hoop.rimRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#ff4444';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(hoop.x + hoop.width / 2, hoop.y + 8, hoop.rimRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#ff4444';
        ctx.fill();

        // Net (simplified)
        ctx.strokeStyle = 'rgba(255,255,255,0.6)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 6; i++) {
            const leftX = hoop.x - hoop.width / 2 + (i * hoop.width / 5);
            const rightX = leftX;
            ctx.beginPath();
            ctx.moveTo(rightX, hoop.y + 8);
            const bottomX = hoop.x + (rightX - hoop.x) * 0.5;
            ctx.lineTo(bottomX, hoop.y + 45);
            ctx.stroke();
        }
        // Net horizontal lines
        for (let j = 1; j <= 3; j++) {
            const y = hoop.y + 8 + j * 10;
            const shrink = j * 4;
            ctx.beginPath();
            ctx.moveTo(hoop.x - hoop.width / 2 + shrink, y);
            ctx.lineTo(hoop.x + hoop.width / 2 - shrink, y);
            ctx.stroke();
        }
    }

    function drawBall(x, y, r) {
        // Shadow
        ctx.beginPath();
        ctx.arc(x + 3, y + 3, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fill();

        // Ball
        const gradient = ctx.createRadialGradient(x - 5, y - 5, 2, x, y, r);
        gradient.addColorStop(0, '#ff9040');
        gradient.addColorStop(0.7, '#ff6b00');
        gradient.addColorStop(1, '#cc5500');
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Ball lines
        ctx.strokeStyle = 'rgba(0,0,0,0.2)';
        ctx.lineWidth = 1.5;
        // Horizontal line
        ctx.beginPath();
        ctx.moveTo(x - r, y);
        ctx.lineTo(x + r, y);
        ctx.stroke();
        // Vertical curve
        ctx.beginPath();
        ctx.arc(x, y, r * 0.7, -Math.PI / 2, Math.PI / 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, r * 0.7, Math.PI / 2, -Math.PI / 2);
        ctx.stroke();
    }

    function drawAimLine() {
        if (dragging && !shooting) {
            const dx = dragStart.x - dragEnd.x;
            const dy = dragStart.y - dragEnd.y;
            ctx.beginPath();
            ctx.setLineDash([6, 4]);
            ctx.moveTo(ball.x, ball.y);
            ctx.lineTo(ball.x + dx * 0.6, ball.y + dy * 0.6);
            ctx.strokeStyle = 'rgba(255, 107, 138, 0.5)';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.setLineDash([]);

            // Arrow head
            const angle = Math.atan2(dy, dx);
            const arrowX = ball.x + dx * 0.6;
            const arrowY = ball.y + dy * 0.6;
            ctx.beginPath();
            ctx.moveTo(arrowX, arrowY);
            ctx.lineTo(arrowX - 10 * Math.cos(angle - 0.4), arrowY - 10 * Math.sin(angle - 0.4));
            ctx.lineTo(arrowX - 10 * Math.cos(angle + 0.4), arrowY - 10 * Math.sin(angle + 0.4));
            ctx.closePath();
            ctx.fillStyle = 'rgba(255, 107, 138, 0.5)';
            ctx.fill();
        }
    }

    function drawTrail() {
        ballTrail.forEach((pos, i) => {
            const alpha = (i / ballTrail.length) * 0.3;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, ball.radius * 0.6, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 107, 0, ${alpha})`;
            ctx.fill();
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Background
        const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        skyGradient.addColorStop(0, '#87CEEB');
        skyGradient.addColorStop(0.55, '#a8d8ea');
        skyGradient.addColorStop(0.55, '#c8a26e');
        skyGradient.addColorStop(1, '#b8925e');
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Pole
        ctx.fillStyle = '#666';
        ctx.fillRect(hoop.x + 48, hoop.y - 45, 6, canvas.height * 0.55 - hoop.y + 45);

        drawBackboard();
        drawTrail();
        drawAimLine();
        drawBall(ball.x, ball.y, ball.radius);

        // "Made it!" text
        if (made) {
            ctx.font = 'bold 32px Caveat';
            ctx.fillStyle = '#e84574';
            ctx.textAlign = 'center';
            ctx.fillText('Swish! 🏀', canvas.width / 2, canvas.height / 2);
        }
    }

    function resetBall() {
        ball.x = 190;
        ball.y = 420;
        ballVelocity = { x: 0, y: 0 };
        shooting = false;
        made = false;
        ballTrail = [];
        draw();
    }

    function checkScore() {
        // Check if ball passes through hoop
        const hoopLeft = hoop.x - hoop.width / 2 + ball.radius;
        const hoopRight = hoop.x + hoop.width / 2 - ball.radius;
        const hoopY = hoop.y + 8;

        if (ball.x > hoopLeft && ball.x < hoopRight &&
            ball.y > hoopY - 8 && ball.y < hoopY + 12 &&
            ballVelocity.y > 0) {
            return true;
        }
        return false;
    }

    function animate() {
        if (!shooting) return;

        ballVelocity.y += gravity;
        ball.x += ballVelocity.x;
        ball.y += ballVelocity.y;

        // Trail
        ballTrail.push({ x: ball.x, y: ball.y });
        if (ballTrail.length > 12) ballTrail.shift();

        // Rim collision (simple)
        const rimLeftX = hoop.x - hoop.width / 2;
        const rimRightX = hoop.x + hoop.width / 2;
        const rimY = hoop.y + 8;

        // Left rim bounce
        const distLeft = Math.sqrt((ball.x - rimLeftX) ** 2 + (ball.y - rimY) ** 2);
        if (distLeft < ball.radius + hoop.rimRadius && ballVelocity.y > 0) {
            ballVelocity.x = -Math.abs(ballVelocity.x) - 0.5;
            ballVelocity.y *= -0.5;
            ball.y = rimY - ball.radius - hoop.rimRadius;
        }

        // Right rim bounce
        const distRight = Math.sqrt((ball.x - rimRightX) ** 2 + (ball.y - rimY) ** 2);
        if (distRight < ball.radius + hoop.rimRadius && ballVelocity.y > 0) {
            ballVelocity.x = Math.abs(ballVelocity.x) + 0.5;
            ballVelocity.y *= -0.5;
            ball.y = rimY - ball.radius - hoop.rimRadius;
        }

        // Check score
        if (!made && checkScore()) {
            made = true;
            score++;
            scoreEl.textContent = score;

            // Show love note
            loveNoteText.textContent = loveNotes[noteIndex % loveNotes.length];
            loveNoteEl.classList.add('show');
            noteIndex++;

            gameInstructions.textContent = 'Nice shot! Click & drag to shoot again!';

            setTimeout(() => {
                loveNoteEl.classList.remove('show');
            }, 3000);
        }

        draw();

        // Check if ball is out of bounds
        if (ball.y > canvas.height + 50 || ball.x < -50 || ball.x > canvas.width + 50) {
            if (!made) {
                gameInstructions.textContent = 'So close! Try again — drag the ball and release!';
            }
            setTimeout(resetBall, made ? 1200 : 600);
            return;
        }

        animationId = requestAnimationFrame(animate);
    }

    // Input handlers
    function getCanvasPos(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        };
    }

    function onStart(e) {
        e.preventDefault();
        if (shooting) return;
        const pos = getCanvasPos(e);
        const dist = Math.sqrt((pos.x - ball.x) ** 2 + (pos.y - ball.y) ** 2);
        if (dist < ball.radius + 25) {
            dragging = true;
            dragStart = pos;
            dragEnd = pos;
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

        if (power > 15) {
            shooting = true;
            const maxPower = 18;
            const scale = Math.min(power / 80, 1) * maxPower;
            const angle = Math.atan2(dy, dx);
            ballVelocity.x = Math.cos(angle) * scale * 0.65;
            ballVelocity.y = Math.sin(angle) * scale * 0.65;
            loveNoteEl.classList.remove('show');
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

    // Initial draw
    draw();


    // ==========================================
    // SECTION 6: FINAL HEARTS
    // ==========================================

    const finalHearts = document.getElementById('finalHearts');
    for (let i = 0; i < 7; i++) {
        const heart = document.createElement('span');
        heart.textContent = '♥';
        heart.style.cssText = `
            font-size: ${20 + Math.random() * 20}px;
            color: rgba(255, 107, 138, ${0.3 + Math.random() * 0.5});
            margin: 0 8px;
            display: inline-block;
            animation: heartPulse ${1 + Math.random()}s ease-in-out infinite ${Math.random() * 0.5}s;
        `;
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

    // Stagger polaroid animations
    const polaroidObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const polaroid = entry.target;
                const index = Array.from(polaroids).indexOf(polaroid);
                polaroid.style.animationDelay = (index * 0.08) + 's';
                polaroidObserver.unobserve(polaroid);
            }
        });
    }, { threshold: 0.1 });

    polaroids.forEach(p => polaroidObserver.observe(p));

});

