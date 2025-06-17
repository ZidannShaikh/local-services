  // Animate footer entrance
  gsap.from("#animatedFooter .footer-container", {
    scrollTrigger: {
      trigger: "#animatedFooter",
      start: "top 90%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 100,
    duration: 1.4,
    ease: "power4.out"
  });

  // Floating particles (Canvas)
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.querySelector('footer').offsetHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = Math.random() * 2 + 1;
      this.speedY = Math.random() * 0.5 + 0.3;
      this.alpha = Math.random() * 0.5 + 0.2;
    }
    update() {
      this.y += this.speedY;
      if (this.y > canvas.height) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 247, 255, ${this.alpha})`;
      ctx.fill();
    }
  }

  function createParticles(count = 100) {
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  createParticles();
  animateParticles();

      // Register GSAP plugins
      gsap.registerPlugin(ScrollTrigger);

      // Initialize animations after DOM is loaded
      document.addEventListener('DOMContentLoaded', function() {
          
          // 3D Parallax scroll animation
          const tl = gsap.timeline({
              scrollTrigger: {
                  trigger: ".hero-container",
                  start: "top top",
                  end: "bottom top",
                  scrub: 1
              }
          });
            // Register GSAP plugins
      gsap.registerPlugin(ScrollTrigger);

// Initialize variables
let lastScrollY = 0;
let isScrollingDown = false;

// DOM elements
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const themeToggle = document.getElementById('themeToggle');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

// Create particles
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particlesContainer.appendChild(particle);

      // Animate particles
      gsap.to(particle, {
          y: -100,
          x: Math.random() * 200 - 100,
          duration: Math.random() * 10 + 10,
          repeat: -1,
          ease: "none",
          delay: Math.random() * 5
      });
  }
}

// Initialize animations
function initAnimations() {
  // Navbar entrance animation
  gsap.to(navbar, {
      duration: 1.2,
      y: 0,
      ease: "elastic.out(1, 0.3)",
      delay: 0.2
  });

  // Logo animation
  const logo = document.querySelector('.logo');
  gsap.fromTo(logo, 
      { rotationY: -180, scale: 0 },
      { 
          rotationY: 0, 
          scale: 1, 
          duration: 1.5, 
          ease: "back.out(1.7)",
          delay: 0.5
      }
  );

  // Nav links stagger animation
  gsap.fromTo('.nav-item', 
      { y: -50, opacity: 0, rotationX: -90 },
      { 
          y: 0, 
          opacity: 1, 
          rotationX: 0,
          duration: 0.8, 
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.8
      }
  );

  // Theme toggle animation
  gsap.fromTo(themeToggle,
      { scale: 0, rotation: 180 },
      { 
          scale: 1, 
          rotation: 0,
          duration: 1,
          ease: "elastic.out(1, 0.3)",
          delay: 1.2
      }
  );

  // Hero section animation
  gsap.fromTo('.hero-title',
      { y: 100, opacity: 0, rotationX: 90 },
      { 
          y: 0, 
          opacity: 1, 
          rotationX: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 1.5
      }
  );

  gsap.fromTo('.hero-subtitle',
      { y: 50, opacity: 0 },
      { 
          y: 0, 
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          delay: 1.8
      }
  );

  // Demo cards animation
  gsap.fromTo('.demo-card',
      { y: 100, opacity: 0, rotationX: 45, scale: 0.8 },
      { 
          y: 0, 
          opacity: 1, 
          rotationX: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          delay: 2,
          scrollTrigger: {
              trigger: '.demo-sections',
              start: 'top 80%'
          }
      }
  );
}

// Scroll animations
function setupScrollAnimations() {
  let tl = gsap.timeline({
      scrollTrigger: {
          trigger: "body",
          start: "100px top",
          end: "bottom bottom",
          onUpdate: self => {
              const currentScrollY = self.scroll();
              
              if (currentScrollY > lastScrollY && currentScrollY > 100) {
                  // Scrolling down
                  if (!isScrollingDown) {
                      gsap.to(navbar, {
                          y: -100,
                          duration: 0.3,
                          ease: "power2.out"
                      });
                      isScrollingDown = true;
                  }
              } else {
                  // Scrolling up
                  if (isScrollingDown) {
                      gsap.to(navbar, {
                          y: 0,
                          duration: 0.3,
                          ease: "power2.out"
                      });
                      isScrollingDown = false;
                  }
              }
              
              lastScrollY = currentScrollY;
              
              // Add scrolled class for background change
              if (currentScrollY > 50) {
                  navbar.classList.add('scrolled');
              } else {
                  navbar.classList.remove('scrolled');
              }
          }
      }
  });
}

// Mobile menu functionality
function setupMobileMenu() {
  mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      
      if (mobileMenuBtn.classList.contains('active')) {
          // Animate mobile menu items
          gsap.fromTo('.mobile-nav-link',
              { x: -50, opacity: 0, rotationY: -30 },
              { 
                  x: 0, 
                  opacity: 1, 
                  rotationY: 0,
                  duration: 0.5,
                  stagger: 0.1,
                  ease: "back.out(1.7)"
              }
          );
      }
  });

  // Close mobile menu when clicking on links
  mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
          mobileMenuBtn.classList.remove('active');
          mobileMenu.classList.remove('active');
      });
  });
}

// Theme toggle functionality
function setupThemeToggle() {
  themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      
      // Animate theme toggle
      gsap.to(themeToggle, {
          rotationY: 360,
          duration: 0.6,
          ease: "power2.out"
      });
  });
}

// Navigation active state
function setupNavigation() {
  const allLinks = [...navLinks, ...mobileNavLinks];
  
  allLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          
          // Remove active class from all links
          allLinks.forEach(l => l.classList.remove('active'));
          
          // Add active class to clicked link
          link.classList.add('active');
          
          // Find corresponding link in other menu
          const href = link.getAttribute('href');
          const correspondingLink = allLinks.find(l => 
              l.getAttribute('href') === href && l !== link
          );
          if (correspondingLink) {
              correspondingLink.classList.add('active');
          }
          
          // Animate click
          gsap.to(link, {
              scale: 0.95,
              duration: 0.1,
              yoyo: true,
              repeat: 1,
              ease: "power2.out"
          });
      });
  });
}

// Hover effects for nav links
function setupHoverEffects() {
  navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
          gsap.to(link, {
              rotationX: 5,
              z: 10,
              duration: 0.3,
              ease: "power2.out"
          });
      });
      
      link.addEventListener('mouseleave', () => {
          gsap.to(link, {
              rotationX: 0,
              z: 0,
              duration: 0.3,
              ease: "power2.out"
          });
      });
  });
}

// Initialize everything
function init() {
  createParticles();
  initAnimations();
  setupScrollAnimations();
  setupMobileMenu();
  setupThemeToggle();
  setupNavigation();
  setupHoverEffects();
}

// Start when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

          // Animate city layers with different speeds for parallax effect
          tl.to(".layer-1", {
              y: -100,
              rotationX: 5,
              scale: 0.9,
              duration: 1
          })
          .to(".layer-2", {
              y: -150,
              rotationX: 3,
              scale: 0.95,
              duration: 1
          }, 0)
          .to(".layer-3", {
              y: -200,
              rotationX: 2,
              duration: 1
          }, 0)
          .to(".hero-content", {
              y: -300,
              opacity: 0.3,
              scale: 0.8,
              duration: 1
          }, 0);

          // 3D letter flip animation on load
          const letters = document.querySelectorAll('.title-letter');
          gsap.set(letters, { rotationY: 90, opacity: 0 });
          
          gsap.to(letters, {
              rotationY: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.05,
              ease: "back.out(1.7)",
              delay: 0.5
          });

          // Service icons floating animation
          const serviceIcons = document.querySelectorAll('.service-icon');
          
          serviceIcons.forEach((icon, index) => {
              // Initial floating animation
              gsap.to(icon, {
                  y: "random(-20, 20)",
                  x: "random(-10, 10)",
                  rotation: "random(-5, 5)",
                  duration: "random(3, 5)",
                  repeat: -1,
                  yoyo: true,
                  ease: "power2.inOut",
                  delay: index * 0.2
              });

              // Hover bounce effect
              icon.addEventListener('mouseenter', () => {
                  gsap.to(icon, {
                      scale: 1.2,
                      rotationY: 15,
                      z: 50,
                      duration: 0.3,
                      ease: "back.out(1.7)"
                  });
              });

              icon.addEventListener('mouseleave', () => {
                  gsap.to(icon, {
                      scale: 1,
                      rotationY: 0,
                      z: 0,
                      duration: 0.3,
                      ease: "power2.out"
                  });
              });

              // Click pulse effect
              icon.addEventListener('click', () => {
                  gsap.to(icon, {
                      scale: 0.9,
                      duration: 0.1,
                      yoyo: true,
                      repeat: 1,
                      ease: "power2.inOut"
                  });
              });
          });

          // Search bar interactions
          const searchBar = document.querySelector('.search-bar');
          const searchBtn = document.querySelector('.search-btn');

          searchBar.addEventListener('focus', () => {
              gsap.to(searchBar, {
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(102, 126, 234, 0.2)",
                  duration: 0.3
              });
          });

          searchBar.addEventListener('blur', () => {
              gsap.to(searchBar, {
                  scale: 1,
                  boxShadow: "none",
                  duration: 0.3
              });
          });

          // Hero content entrance animation
          gsap.fromTo('.hero-subtitle', 
              { opacity: 0, y: 30 },
              { opacity: 0.9, y: 0, duration: 1, delay: 1.5 }
          );

          gsap.fromTo('.search-container', 
              { opacity: 0, y: 50, scale: 0.9 },
              { opacity: 1, y: 0, scale: 1, duration: 1, delay: 2, ease: "back.out(1.7)" }
          );

          // Scroll-triggered icon movements
          serviceIcons.forEach((icon, index) => {
              ScrollTrigger.create({
                  trigger: ".hero-container",
                  start: "top center",
                  end: "bottom top",
                  scrub: 1,
                  onUpdate: (self) => {
                      const progress = self.progress;
                      gsap.to(icon, {
                          y: -progress * (100 + index * 20),
                          rotation: progress * (index % 2 ? 360 : -360),
                          opacity: 1 - progress * 0.5,
                          duration: 0.1
                      });
                  }
              });
          });

          // Background gradient animation
          gsap.to('.hero-container', {
              backgroundPosition: '100% 100%',
              duration: 20,
              repeat: -1,
              yoyo: true,
              ease: "none"
          });

      });
       // Properly register GSAP plugins
       gsap.registerPlugin(ScrollTrigger);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // GSAP scroll-triggered animation
  gsap.fromTo(".service-card", 
      {
          opacity: 0,
          y: 60,
          scale: 0.9
      },
      {
          scrollTrigger: {
              trigger: ".services-grid",
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
          },
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "back.out(1.7)"
      }
  );

  // Enhanced filter logic with smooth animations
  const filters = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".service-card");

  filters.forEach(btn => {
      btn.addEventListener("click", () => {
          // Remove active class from current active button
          document.querySelector(".filter.active").classList.remove("active");
          // Add active class to clicked button
          btn.classList.add("active");
          
          const filterValue = btn.getAttribute("data-filter");
          
          // Animate cards out first
          gsap.to(cards, {
              opacity: 0,
              scale: 0.8,
              duration: 0.3,
              stagger: 0.05,
              ease: "power2.inOut",
              onComplete: () => {
                  // Filter cards
                  cards.forEach(card => {
                      if (filterValue === "all" || card.classList.contains(filterValue)) {
                          card.style.display = "block";
                      } else {
                          card.style.display = "none";
                      }
                  });
                  
                  // Animate visible cards back in
                  const visibleCards = Array.from(cards).filter(card => 
                      card.style.display !== "none"
                  );
                  
                  gsap.fromTo(visibleCards,
                      {
                          opacity: 0,
                          scale: 0.8,
                          y: 30
                      },
                      {
                          opacity: 1,
                          scale: 1,
                          y: 0,
                          duration: 0.5,
                          stagger: 0.1,
                          ease: "back.out(1.7)"
                      }
                  );
              }
          });
      });
  });

  // Add click animations to service cards
  cards.forEach(card => {
      card.addEventListener('click', () => {
          gsap.to(card, {
              scale: 0.95,
              duration: 0.1,
              yoyo: true,
              repeat: 1,
              ease: "power2.inOut"
          });
      });

      // Add keyboard navigation
      card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              card.click();
          }
      });
  });

  // Parallax effect on scroll
  ScrollTrigger.create({
      trigger: ".services",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: self => {
          const progress = self.progress;
          gsap.to(".section-title", {
              y: progress * -50,
              duration: 0.3
          });
      }
  });

  // Add loading animation removal
  setTimeout(() => {
      cards.forEach(card => {
          card.classList.remove('loading');
      });
  }, 100);
});

// Add intersection observer for performance
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
      }
  });
}, observerOptions);

// Observe all service cards
document.querySelectorAll('.service-card').forEach(card => {
  observer.observe(card);
});
gsap.registerPlugin(ScrollTrigger);
      
      // Staggered card animation
      const cards = gsap.utils.toArray('.cta-card');
      
      gsap.fromTo(cards, {
          opacity: 0,
          y: 100,
          rotationX: 45,
          scale: 0.8
      }, {
          scrollTrigger: {
              trigger: ".cta-cards",
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
          },
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.3,
          ease: "power3.out"
      });
      
      // Title animation
      gsap.fromTo('.section-title', {
          opacity: 0,
          y: -50,
          scale: 0.8
      }, {
          scrollTrigger: {
              trigger: ".cta-section",
              start: "top 90%"
          },
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out"
      });
      
      // Subtitle animation
      gsap.fromTo('.section-subtitle', {
          opacity: 0,
          y: 30
      }, {
          scrollTrigger: {
              trigger: ".cta-section",
              start: "top 85%"
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out"
      });
      
      // Enhanced button functionality with loading states
      function handleButtonClick(buttonId, actionType, redirectUrl) {
          const button = document.getElementById(buttonId);
          const card = button.closest('.cta-card');
          
          button.addEventListener('click', async (e) => {
              e.preventDefault();
              
              // Add loading state
              card.classList.add('loading');
              button.textContent = 'Loading...';
              
              try {
                  // Simulate API call or processing
                  await new Promise(resolve => setTimeout(resolve, 1500));
                  
                  // Success feedback
                  button.textContent = 'Success!';
                  button.style.background = 'linear-gradient(45deg, #00ff88, #00cc66)';
                  
                  setTimeout(() => {
                      // Redirect or show success message
                      if (redirectUrl) {
                          window.location.href = redirectUrl;
                      } else {
                          showSuccessMessage(actionType);
                      }
                  }, 800);
                  
              } catch (error) {
                  // Error handling
                  button.textContent = 'Try Again';
                  button.style.background = 'linear-gradient(45deg, #ff4444, #cc3333)';
                  
                  setTimeout(() => {
                      resetButton(button, actionType);
                      card.classList.remove('loading');
                  }, 2000);
              }
          });
      }
      
      function resetButton(button, actionType) {
          button.textContent = actionType === 'customer' ? 'Find Services' : 'Join as Provider';
          button.style.background = 'linear-gradient(45deg, #00f7ff, #00e6e6)';
      }
      
      function showSuccessMessage(actionType) {
          const message = actionType === 'customer' 
              ? 'Redirecting to service search...' 
              : 'Redirecting to provider registration...';
          
          // Create and show a modern toast notification
          const toast = document.createElement('div');
          toast.style.cssText = `
              position: fixed;
              top: 20px;
              right: 20px;
              background: linear-gradient(45deg, #00f7ff, #00e6e6);
              color: #000;
              padding: 15px 25px;
              border-radius: 50px;
              font-weight: 600;
              box-shadow: 0 10px 25px rgba(0, 247, 255, 0.3);
              z-index: 1000;
              transform: translateX(100%);
              transition: transform 0.3s ease;
          `;
          toast.textContent = message;
          
          document.body.appendChild(toast);
          
          // Animate in
          setTimeout(() => {
              toast.style.transform = 'translateX(0)';
          }, 100);
          
          // Remove after delay
          setTimeout(() => {
              toast.style.transform = 'translateX(100%)';
              setTimeout(() => {
                  document.body.removeChild(toast);
              }, 300);
          }, 3000);
      }
      
      // Initialize button handlers
      handleButtonClick('customerBtn', 'customer', null); // Replace null with actual URL
      handleButtonClick('providerBtn', 'provider', null); // Replace null with actual URL
      
      // Keyboard navigation support
      document.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
              const focusedCard = document.activeElement;
              if (focusedCard.classList.contains('cta-card')) {
                  e.preventDefault();
                  const button = focusedCard.querySelector('.cta-btn');
                  button.click();
              }
          }
      });
      
      // Enhanced hover effects with mouse tracking
      cards.forEach(card => {
          card.addEventListener('mousemove', (e) => {
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              
              const rotateX = (y - centerY) / 20;
              const rotateY = (centerX - x) / 20;
              
              card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
          });
          
          card.addEventListener('mouseleave', () => {
              card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
          });
      });
      // Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Enhanced testimonial animations
const testimonialElements = gsap.utils.toArray('.testimonial-card');

// Staggered entrance animation
gsap.fromTo(testimonialElements, {
opacity: 0,
y: 80,
rotationX: 45,
scale: 0.8
}, {
scrollTrigger: {
  trigger: ".testimonial-grid",
  start: "top 85%",
  end: "bottom 15%",
  toggleActions: "play none none reverse"
},
opacity: 1,
y: 0,
rotationX: 0,
scale: 1,
duration: 0.8,
stagger: 0.15,
ease: "power3.out"
});

// Title animation with text reveal effect
gsap.fromTo('.section-title', {
opacity: 0,
y: -50,
clipPath: 'inset(0 100% 0 0)'
}, {
scrollTrigger: {
  trigger: ".testimonials",
  start: "top 90%"
},
opacity: 1,
y: 0,
clipPath: 'inset(0 0% 0 0)',
duration: 1.2,
ease: "power3.out"
});

// Subtitle animation
gsap.fromTo('.section-subtitle', {
opacity: 0,
y: 30
}, {
scrollTrigger: {
  trigger: ".testimonials",
  start: "top 85%"
},
opacity: 1,
y: 0,
duration: 0.8,
delay: 0.3,
ease: "power2.out"
});

// Floating elements animation
gsap.utils.toArray('.floating-star').forEach(starElement => {
gsap.fromTo(starElement, {
  opacity: 0,
  scale: 0
}, {
  scrollTrigger: {
    trigger: ".testimonials",
    start: "top 80%"
  },
  opacity: 0.3,
  scale: 1,
  duration: 1,
  delay: Math.random() * 2,
  ease: "back.out(1.7)"
});
});

// Statistics counter animation
function animateStatCounters() {
const statisticNumbers = document.querySelectorAll('.stat-number');

statisticNumbers.forEach(statElement => {
  const targetValue = parseInt(statElement.getAttribute('data-target'));
  const hasPercentage = statElement.textContent.includes('%');
  
  gsap.fromTo(statElement, {
    textContent: 0
  }, {
    scrollTrigger: {
      trigger: ".stats-section",
      start: "top 90%"
    },
    textContent: targetValue,
    duration: 2,
    ease: "power2.out",
    snap: { textContent: 1 },
    onUpdate: function() {
      const currentValue = Math.round(this.targets()[0].textContent);
      if (targetValue >= 1000000) {
        statElement.textContent = (currentValue / 1000000).toFixed(1) + 'M+';
      } else if (targetValue >= 1000) {
        statElement.textContent = (currentValue / 1000).toFixed(0) + 'K+';
      } else {
        statElement.textContent = currentValue + (hasPercentage ? '%' : '');
      }
    }
  });
});
}

// Advanced hover animations
testimonialElements.forEach(testimonialCard => {
// Mouse tracking effect
testimonialCard.addEventListener('mousemove', (mouseEvent) => {
  const cardRect = testimonialCard.getBoundingClientRect();
  const mouseX = mouseEvent.clientX - cardRect.left;
  const mouseY = mouseEvent.clientY - cardRect.top;
  
  const cardCenterX = cardRect.width / 2;
  const cardCenterY = cardRect.height / 2;
  
  const rotateXValue = (mouseY - cardCenterY) / 15;
  const rotateYValue = (cardCenterX - mouseX) / 15;
  
  gsap.to(testimonialCard, {
    rotationX: rotateXValue,
    rotationY: rotateYValue,
    transformPerspective: 1000,
    duration: 0.3,
    ease: "power2.out"
  });
});

testimonialCard.addEventListener('mouseleave', () => {
  gsap.to(testimonialCard, {
    rotationX: 0,
    rotationY: 0,
    duration: 0.5,
    ease: "power2.out"
  });
});

// Click animation
testimonialCard.addEventListener('click', () => {
  gsap.to(testimonialCard, {
    scale: 0.95,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    ease: "power2.inOut"
  });
});
});

// Scroll-triggered animations for individual elements
gsap.utils.toArray('.avatar').forEach(avatarElement => {
gsap.fromTo(avatarElement, {
  scale: 0,
  rotation: -180
}, {
  scrollTrigger: {
    trigger: avatarElement,
    start: "top 90%"
  },
  scale: 1,
  rotation: 0,
  duration: 0.6,
  ease: "back.out(1.7)"
});
});

// Stars animation sequence
gsap.utils.toArray('.stars').forEach(starsWrapper => {
const starElements = starsWrapper.querySelectorAll('.star');

gsap.fromTo(starElements, {
  opacity: 0,
  scale: 0,
  rotation: -180
}, {
  scrollTrigger: {
    trigger: starsWrapper,
    start: "top 85%"
  },
  opacity: 1,
  scale: 1,
  rotation: 0,
  duration: 0.4,
  stagger: 0.1,
  ease: "back.out(1.7)"
});
});

// Text reveal animation for testimonial content
gsap.utils.toArray('.testimonial-card p').forEach(testimonialText => {
gsap.fromTo(testimonialText, {
  opacity: 0,
  y: 20
}, {
  scrollTrigger: {
    trigger: testimonialText,
    start: "top 90%"
  },
  opacity: 1,
  y: 0,
  duration: 0.6,
  delay: 0.2,
  ease: "power2.out"
});
});

// Initialize counter animation
animateStatCounters();

// Intersection Observer for performance optimization
const testimonialObserverConfig = {
threshold: 0.1,
rootMargin: '0px 0px -50px 0px'
};

const testimonialIntersectionObserver = new IntersectionObserver((observedEntries) => {
observedEntries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('in-view');
  }
});
}, testimonialObserverConfig);

// Observe all testimonial cards
testimonialElements.forEach(testimonialCard => {
testimonialIntersectionObserver.observe(testimonialCard);
});

// Keyboard navigation support
document.addEventListener('keydown', (keyEvent) => {
if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
  const activeCard = document.activeElement;
  if (activeCard.classList.contains('testimonial-card')) {
    keyEvent.preventDefault();
    activeCard.click();
  }
}
});

// Dynamic loading simulation
function simulateTestimonialLoading() {
testimonialElements.forEach((testimonialCard, cardIndex) => {
  setTimeout(() => {
    testimonialCard.classList.add('loading');
    setTimeout(() => {
      testimonialCard.classList.remove('loading');
    }, 1000);
  }, cardIndex * 200);
});
}

// Optional: Trigger loading animation on scroll
ScrollTrigger.create({
trigger: ".testimonial-grid",
start: "top 90%",
once: true,
onEnter: () => {
  // simulateTestimonialLoading(); // Uncomment to enable loading simulation
}
});

// Performance optimization: Pause animations when not in view
ScrollTrigger.create({
trigger: ".testimonials",
start: "top bottom",
end: "bottom top",
onToggle: testimonialToggleState => {
  if (testimonialToggleState.isActive) {
    // Resume animations
    gsap.globalTimeline.play();
  } else {
    // Pause animations when section is not visible
    gsap.globalTimeline.pause();
  }
}
});
// GSAP entrance animation
gsap.from(".gsap-navbar", {
  duration: 1,
  y: -100,
  opacity: 0,
  ease: "power4.out"
});

gsap.from(".nav-links li", {
  duration: 1,
  y: -50,
  opacity: 0,
  stagger: 0.15,
  ease: "back.out(1.7)"
});

// 3D hover animation
const links = document.querySelectorAll(".nav-links li a");
links.forEach(link => {
  link.addEventListener("mouseenter", () => {
    gsap.to(link, { rotationY: 10, rotationX: 5, duration: 0.3 });
  });
  link.addEventListener("mouseleave", () => {
    gsap.to(link, { rotationY: 0, rotationX: 0, duration: 0.3 });
  });
});

// Mobile hamburger toggle
function toggleMenu() {
  const nav = document.querySelector('.nav-links');
  nav.classList.toggle('show');
  gsap.fromTo(nav, 
    { y: -20, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
  );
}
const navbar = document.querySelector(".gsap-navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
  