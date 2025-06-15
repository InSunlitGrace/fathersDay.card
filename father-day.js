// Loading animation
document.querySelector('.loading-screen').style.display = 'flex';

// Particle system configuration
const PARTICLE_CONFIG = {
    MAX_COUNT: 40,          // Reduced from 80 to 40
    SIZE_RANGE: [12, 24],   // Font size range (px)
    OPACITY_RANGE: [0.4, 0.8],
    FALL_DURATION: [10, 18], // Animation duration range (seconds)
    SPAWN_DELAY: 3000,      // Start delay after load (ms)
    RESPAWN_RATE: 100       // New particle creation delay (ms)
};

window.addEventListener('load', function() {
    setTimeout(function() {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loading-screen').style.display = 'none';
            setTimeout(initParticleSystem, PARTICLE_CONFIG.SPAWN_DELAY);
        }, 500);
    }, 1500);
});

function initParticleSystem() {
    const sunEmojis = ['☀️', '🌞', '🌟', '✨', '😎'];
    let activeParticles = 0;
    
    function createParticle() {
        if (activeParticles >= PARTICLE_CONFIG.MAX_COUNT) return;
        
        const particle = document.createElement('div');
        particle.className = 'sunshine-particle';
        particle.textContent = sunEmojis[Math.floor(Math.random() * sunEmojis.length)];
        
        // Position randomly across top 20% of screen
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 20 - 20}vh`;
        
        // Visual properties
        const sizeRange = PARTICLE_CONFIG.SIZE_RANGE;
        const opacityRange = PARTICLE_CONFIG.OPACITY_RANGE;
        particle.style.fontSize = `${sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0])}px`;
        particle.style.opacity = opacityRange[0] + Math.random() * (opacityRange[1] - opacityRange[0]);
        
        // Animation properties
        const durationRange = PARTICLE_CONFIG.FALL_DURATION;
        const duration = durationRange[0] + Math.random() * (durationRange[1] - durationRange[0]);
        const animationType = Math.random() > 0.5 ? 'particle-fall' : 'particle-drift';
        particle.style.animation = `${animationType} ${duration}s linear forwards`;
        
        document.body.appendChild(particle);
        activeParticles++;
        
        particle.addEventListener('animationend', function() {
            particle.remove();
            activeParticles--;
            // Schedule new particle creation
            setTimeout(createParticle, PARTICLE_CONFIG.RESPAWN_RATE);
        });
    }
    
    // Initial batch of particles
    for (let i = 0; i < PARTICLE_CONFIG.MAX_COUNT / 2; i++) {
        setTimeout(createParticle, i * 200);
    }
}