// Lord Telecom - Dynamic Interaction Logic

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Header Scroll Shadow Effect
  const header = document.getElementById('main-header');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  // 2. Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
      
      // Animate hamburger lines
      const spans = hamburger.querySelectorAll('span');
      if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // 3. Hero Carousel Slider
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;
  let slideInterval;

  const showSlide = (index) => {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  };

  const nextSlide = () => {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
  };

  const startSlideShow = () => {
    stopSlideShow();
    slideInterval = setInterval(nextSlide, 6000);
  };

  const stopSlideShow = () => {
    if (slideInterval) clearInterval(slideInterval);
  };

  if (slides.length > 1 && dots.length > 0) {
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        startSlideShow(); // Reset interval
      });
    });

    // Start automated sliding
    startSlideShow();
  }

  // 4. Interactive Simulator
  const simOptionBtns = document.querySelectorAll('.sim-option-btn');
  const devicesSlider = document.getElementById('sim-devices-slider');
  const devicesValueText = document.getElementById('sim-devices-value');
  const recSpeedName = document.getElementById('sim-rec-speed-name');
  const recCta = document.getElementById('sim-rec-cta');
  
  let selectedActivity = 'casual';
  let deviceCount = 5;

  const updateRecommendation = () => {
    let recommendedSpeed = '300 Mega';
    let rawSpeed = '300M';
    let recommendedPrice = '79,90';

    if (selectedActivity === 'casual') {
      if (deviceCount <= 6) {
        recommendedSpeed = '300 Mega';
        rawSpeed = '300M';
        recommendedPrice = '79,90';
      } else if (deviceCount <= 15) {
        recommendedSpeed = '600 Mega';
        rawSpeed = '600M';
        recommendedPrice = '99,90';
      } else {
        recommendedSpeed = '1 Giga';
        rawSpeed = '1G';
        recommendedPrice = '149,90';
      }
    } else if (selectedActivity === 'streaming') {
      if (deviceCount <= 4) {
        recommendedSpeed = '300 Mega';
        rawSpeed = '300M';
        recommendedPrice = '79,90';
      } else if (deviceCount <= 12) {
        recommendedSpeed = '600 Mega';
        rawSpeed = '600M';
        recommendedPrice = '99,90';
      } else {
        recommendedSpeed = '1 Giga';
        rawSpeed = '1G';
        recommendedPrice = '149,90';
      }
    } else if (selectedActivity === 'gaming') {
      if (deviceCount <= 3) {
        recommendedSpeed = '300 Mega';
        rawSpeed = '300M';
        recommendedPrice = '79,90';
      } else if (deviceCount <= 8) {
        recommendedSpeed = '600 Mega';
        rawSpeed = '600M';
        recommendedPrice = '99,90';
      } else {
        recommendedSpeed = '1 Giga';
        rawSpeed = '1G';
        recommendedPrice = '149,90';
      }
    }

    // Update Text in Widget
    if (recSpeedName) {
      if (recommendedSpeed === '1 Giga') {
        recSpeedName.innerHTML = '1 <span>Giga</span>';
      } else {
        recSpeedName.innerHTML = `${recommendedSpeed.split(' ')[0]} <span>Mega</span>`;
      }
    }

    // Update CTA link
    if (recCta) {
      const activityText = {
        casual: 'Navegar e Redes Sociais',
        streaming: 'Filmes & Streaming 4K',
        gaming: 'Jogar Online e Home Office'
      };
      
      const whatsappMsg = `Olá! Utilizei o simulador no site e com base no meu uso (${activityText[selectedActivity]} com ${deviceCount} aparelhos), a velocidade recomendada foi o Plano de ${recommendedSpeed} (R$ ${recommendedPrice}/mês). Gostaria de assinar esse plano!`;
      recCta.href = `https://wa.me/5541985019307?text=${encodeURIComponent(whatsappMsg)}`;
    }
  };

  if (simOptionBtns.length > 0 && devicesSlider) {
    simOptionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        simOptionBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedActivity = btn.getAttribute('data-activity');
        updateRecommendation();
      });
    });

    devicesSlider.addEventListener('input', (e) => {
      deviceCount = parseInt(e.target.value);
      devicesValueText.textContent = `${deviceCount} ${deviceCount === 1 ? 'aparelho' : 'aparelhos'}`;
      updateRecommendation();
    });

    // Initialize Widget Recommendation
    updateRecommendation();
  }

  // 5. FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const answer = faqItem.querySelector('.faq-answer');
      const isActive = faqItem.classList.contains('active');

      // Close all other FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-answer').style.maxHeight = '0';
      });

      if (!isActive) {
        faqItem.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // 6. Viability Form Validation & Submit (Redirects to WhatsApp)
  const viabilityForm = document.getElementById('viability-form');
  if (viabilityForm) {
    viabilityForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name').value.trim();
      const whatsapp = document.getElementById('form-whatsapp').value.trim();
      const cep = document.getElementById('form-cep').value.trim();
      const address = document.getElementById('form-address').value.trim();
      
      // Formatting WhatsApp Message
      const message = `Olá! Gostaria de consultar a cobertura da Lord Telecom para o meu endereço. Seguem os dados:\n\n` + 
                      `*Nome:* ${name}\n` +
                      `*WhatsApp:* ${whatsapp}\n` +
                      `*CEP:* ${cep}\n` +
                      `*Endereço:* ${address}`;
      
      const whatsappUrl = `https://wa.me/5541985019307?text=${encodeURIComponent(message)}`;
      
      // Redirect in new window/tab
      window.open(whatsappUrl, '_blank');
    });
  }

});
