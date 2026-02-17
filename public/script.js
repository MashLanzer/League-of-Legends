/* script.js - Wild Rift Premium Interactions */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Fade-in Effects
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once visible
                // fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial observation
    document.querySelectorAll('.fade-in').forEach(el => fadeInObserver.observe(el));

    // Observe body for new .fade-in elements (important for dynamic content)
    const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) { // Element node
                    if (node.classList.contains('fade-in')) {
                        fadeInObserver.observe(node);
                    }
                    node.querySelectorAll('.fade-in').forEach(el => fadeInObserver.observe(el));
                }
            });
        });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // 2. Parallax Effect for Background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.body.style.backgroundPositionY = (scrolled * 0.3) + 'px';
    });

    // 3. Meta Status Counter Animation
    const animateValue = (el, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = (progress * (end - start) + start).toFixed(1);
            el.innerHTML = value + '%';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    const metaValues = document.querySelectorAll('.meta-value');
    const metaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseFloat(target.innerText);
                animateValue(target, 0, finalValue, 2000);
                metaObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    metaValues.forEach(val => metaObserver.observe(val));

    // 4. Smooth Anchor Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Card Hover Sound Logic (Visual Only Placeholder)
    const cards = document.querySelectorAll('.hextech-card, .glass-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Logic for a high-end interface sound could go here
        });
    });
});
