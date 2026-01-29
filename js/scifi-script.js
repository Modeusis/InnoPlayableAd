document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Redirection Logic
  const overlay = document.getElementById("gameOverlay");
  const phoneFrame = document.querySelector(".device-frame");

  if (overlay) {
    overlay.addEventListener("click", function (e) {
      // Check if mobile (screen width < 768px)
      if (window.innerWidth < 768) {
        console.log("Mobile detected. Redirecting to tactical full screen...");
        // Redirect to the fullscreen page
        window.location.href = "./scifi-fullscreen.html";
        return;
      }

      // Desktop Logic
      e.stopPropagation();

      // Add 'active' class to fade out overlay
      this.classList.add("is-active");

      // Play a digital sound effect (simulated via log)
      console.log(">> SIMULATION ENGAGED");
    });
  }

  // 2. Click Outside Logic (Desktop only)
  document.addEventListener("click", function (e) {
    if (overlay && overlay.classList.contains("is-active")) {
      // If user clicks outside the phone frame, pause/show overlay again
      if (phoneFrame && !phoneFrame.contains(e.target)) {
        overlay.classList.remove("is-active");
        console.log(">> SIMULATION PAUSED");
      }
    }
  });

  // 3. Glitch Text Effect Randomizer
  const glitchTexts = document.querySelectorAll(".glitch-text");

  // Occasionally trigger a random stronger glitch or change text briefly
  setInterval(() => {
    glitchTexts.forEach((el) => {
      if (Math.random() > 0.9) {
        el.style.textShadow = "4px 0 var(--neon-pink), -4px 0 var(--neon-blue)";
        setTimeout(() => {
          el.style.textShadow =
            "2px 2px var(--neon-pink), -2px -2px var(--neon-blue)";
        }, 100);
      }
    });
  }, 2000);

  // 4. Button Hover Sound Effect (Simulated)
  const buttons = document.querySelectorAll(".cyber-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      // In a real project: playSound('hover.mp3');
      // Visual feedback handled by CSS
    });
  });

  // 5. Desktop 3D Tilt Effect
  // Only applied if we are on desktop
  if (window.innerWidth > 900 && phoneFrame) {
    document.addEventListener("mousemove", (e) => {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

      // Subtle rotation based on mouse position
      // We combine the base rotation (-5deg) with dynamic movement
      phoneFrame.style.transform = `rotateY(${-5 + xAxis}deg) rotateX(${yAxis}deg)`;
    });
  }
});
