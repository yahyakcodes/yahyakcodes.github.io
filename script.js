// ---------- NAVBAR SCROLL + ACTIVE NAV ----------
const navbar   = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-item');

function setActiveNav() {
  const scrollPos = window.scrollY + 100;
  const atBottom  = (window.scrollY + window.innerHeight) >= (document.documentElement.scrollHeight - 5);

  // At very bottom: force last section (contact) active
  if (atBottom) {
    const last = sections[sections.length - 1];
    navItems.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + last.id);
    });
    return;
  }

  sections.forEach(section => {
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (scrollPos >= top && scrollPos < bottom) {
      navItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + section.id);
      });
    }
  });
}

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  setActiveNav();
});

setActiveNav(); // set correct state on initial page load

// ---------- HAMBURGER MENU ----------
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile menu when any nav link is tapped
document.querySelectorAll('.nav-item').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ---------- SKILLS BAR ANIMATION ----------
const skillsSection = document.getElementById("skills");
const bars = document.querySelectorAll(".bar-item");

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    bars.forEach(bar => {
      const barHeight  = parseInt(bar.dataset.pct);
      const displayPct = parseInt(bar.dataset.display);
      const fill       = bar.querySelector(".bar-fill");
      const pctText    = bar.querySelector(".bar-pct");

      clearInterval(bar.counter);

      if (entry.isIntersecting) {
        fill.style.height = barHeight + "%";
        let current = 0;
        bar.counter = setInterval(() => {
          current++;
          pctText.innerHTML = current + "<span>%</span>";
          if (current >= displayPct) {
            clearInterval(bar.counter);
            pctText.innerHTML = displayPct + "<span>%</span>";
          }
        }, 18);
      } else {
        fill.style.height = "0%";
        pctText.innerHTML  = "0<span>%</span>";
      }
    });
  });
}, { threshold: 0.45 });

skillsObserver.observe(skillsSection);