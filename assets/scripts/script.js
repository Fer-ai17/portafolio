// Elementos del DOM
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const modal = document.getElementById("project-modal");
const closeModal = document.querySelector(".close");
const contactForm = document.getElementById("contact-form");
const statNumbers = document.querySelectorAll(".stat-number");

// =============================================
// NAVEGACIÓN MÓVIL
// =============================================
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// =============================================
// SCROLL SUAVE Y MANEJO DE NAVEGACIÓN
// =============================================
    function scrollToProjects() {
        document.getElementById('proyectos').scrollIntoView({
            behavior: 'smooth' // Desplazamiento suave
        });
    }

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Maneja tanto el efecto del header como los links activos
window.addEventListener("scroll", debounce(() => {
  // Efecto de header al hacer scroll
  const header = document.querySelector(".header");
  header.classList.toggle("scrolled", window.scrollY > 100);
  
  // Resaltar links de navegación
  highlightNavLinks();
}, 10));

// Función para resaltar links de navegación
function highlightNavLinks() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// =============================================
// IMAGEN DE PROYECTO
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los contenedores de proyecto
    const projectImages = document.querySelectorAll('.project-image');
    
    projectImages.forEach(container => {
        // Obtener la URL de la imagen del atributo data
        const imageUrl = container.getAttribute('data-project-img');
        
        if (imageUrl) {
            // Crear elemento de imagen
            const img = document.createElement('img');
            img.className = 'project-preview';
            img.src = imageUrl;
            img.alt = 'Preview del proyecto';
            
            // Insertar la imagen en el contenedor
            container.appendChild(img);
            
            // Evento para mostrar la imagen al hacer hover
            container.addEventListener('mouseenter', function() {
                this.classList.add('show-image');
            });
            
            // Evento para mantener la imagen visible después del hover
            container.addEventListener('mouseleave', function() {
                this.classList.remove('show-image');
            });
        }
    });
});

// =============================================
// FILTRADO DE PROYECTOS
// =============================================
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remover clase active de todos los botones
    filterBtns.forEach((b) => b.classList.remove("active"));
    // Añadir clase active al botón clickeado
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");

    projectCards.forEach((card) => {
      if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
        card.classList.remove("hidden");
        setTimeout(() => {
          card.style.display = "block";
        }, 10);
      } else {
        card.classList.add("hidden");
        setTimeout(() => {
          if (card.classList.contains("hidden")) {
            card.style.display = "none";
          }
        }, 300);
      }
    });
  });
});

document.querySelectorAll('.btn-demo').forEach(btn => {
  btn.addEventListener('click', function() {
    const demoUrl = this.getAttribute('data-demo-url');
    if (demoUrl) {
      window.open(demoUrl, '_blank');
    }
  });
});

document.querySelectorAll('.btn-code[data-manual-url]').forEach(button => {
  button.addEventListener('click', function() {
      const manualUrl = this.getAttribute('data-manual-url');
      if (manualUrl) {
          window.open(manualUrl, '_blank');
      }
  });
});

// =============================================
// FORMULARIO DE CONTACTO
// =============================================
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  // Simular envío de formulario
  showNotification("¡Mensaje enviado correctamente! Te contactaremos pronto.", "success");
  contactForm.reset();
});

// =============================================
// SISTEMA DE NOTIFICACIONES
// =============================================
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${type === "success" ? "check-circle" : "info-circle"}"></i>
      <span>${message}</span>
    </div>
  `;

  document.body.appendChild(notification);

  // Eliminar notificación después de 3 segundos
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Añadir animaciones CSS para notificaciones
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  
  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    z-index: 3000;
    animation: slideInRight 0.3s ease;
  }
  
  .notification.success { background: #10b981; color: white; }
  .notification.info { background: #3b82f6; color: white; }
  
  .notification-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;
document.head.appendChild(styleSheet);

// =============================================
// ANIMACIONES Y EFECTOS
// =============================================
// Contador animado para estadísticas
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    element.textContent = Math.floor(start);

    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    }
  }, 16);
}

// Observer para animaciones al aparecer elementos
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Animación para estadísticas
      if (entry.target.classList.contains("stats")) {
        statNumbers.forEach((stat) => {
          const target = Number.parseInt(stat.getAttribute("data-target"));
          animateCounter(stat, target);
        });
      }

      // Animación para tarjetas de proyectos y features
      if (entry.target.classList.contains("project-card") || 
          entry.target.classList.contains("feature")) {
        entry.target.style.animation = "fadeInUp 0.6s ease forwards";
      }
    }
  });
}, {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
});

// Observar elementos para animaciones
document.querySelectorAll(".stats, .project-card, .feature").forEach((el) => {
  observer.observe(el);
});

// =============================================
// ACCESIBILIDAD Y NAVEGACIÓN POR TECLADO
// =============================================
document.addEventListener("keydown", (e) => {
  // Cerrar modal con tecla Escape
  if (e.key === "Escape" && modal.style.display === "block") {
    modal.style.display = "none";
  }

  // Navegación con teclas en grid de proyectos
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    const activeElement = document.activeElement;
    if (activeElement.classList.contains("project-card")) {
      const cards = Array.from(document.querySelectorAll(".project-card:not(.hidden)"));
      const currentIndex = cards.indexOf(activeElement);

      if (e.key === "ArrowRight" && currentIndex < cards.length - 1) {
        cards[currentIndex + 1].focus();
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        cards[currentIndex - 1].focus();
      }
    }
  }
});

// Hacer tarjetas de proyectos enfocables
projectCards.forEach((card) => {
  card.setAttribute("tabindex", "0");
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const demoBtn = card.querySelector(".btn-demo");
      if (demoBtn) {
        demoBtn.click();
      }
    }
  });
});

// =============================================
// ANIMACIÓN DE CARGA
// =============================================
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Animar elementos del hero
  const heroElements = document.querySelectorAll(".hero-title, .hero-subtitle, .cta-button");
  heroElements.forEach((el, index) => {
    setTimeout(() => {
      el.style.animation = `fadeInUp 1s ease ${index * 0.2}s both`;
    }, 100);
  });
});

// =============================================
// FUNCIONES UTILITARIAS
// =============================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// =============================================
// BACKGROUND ANIMADO (RED DE NODOS)
// =============================================
class NetworkBackground {
  constructor(canvasId, color) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.color = color || '#00ff4c';
    this.nodes = [];
    this.maxDistance = 150;
    this.animationId = null;

    this.init();
  }

  init() {
    this.setupCanvas();
    this.createNodes();
    this.setupEvents();
    this.animate();
  }

  setupCanvas() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  createNodes() {
    const nodeCount = window.innerWidth < 768 ? 40 : 80;
    for (let i = 0; i < nodeCount; i++) {
      this.nodes.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 1.5 + 1
      });
    }
  }

  setupEvents() {
    window.addEventListener('resize', this.handleResize.bind(this));
    
    // Interacción con el mouse
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      this.nodes.forEach(node => {
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          node.vx = -dx * 0.01;
          node.vy = -dy * 0.01;
        }
      });
    });
  }

  handleResize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  updateNodes() {
    this.nodes.forEach(node => {
      node.x += node.vx;
      node.y += node.vy;

      // Rebotar en los bordes
      if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
      if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;
    });
  }

  drawConnections() {
    const rgb = this.hexToRgb(this.color);
    
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const dx = this.nodes[i].x - this.nodes[j].x;
        const dy = this.nodes[i].y - this.nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.maxDistance) {
          const opacity = 1 - distance / this.maxDistance;
          this.ctx.beginPath();
          this.ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
          this.ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
          this.ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity * 0.6})`;
          this.ctx.lineWidth = 0.7;
          this.ctx.stroke();
        }
      }
    }
  }

  drawNodes() {
    this.nodes.forEach(node => {
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updateNodes();
    this.drawConnections();
    this.drawNodes();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  }

  destroy() {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.handleResize);
  }
}

// =============================================
// INICIALIZACIÓN AL CARGAR EL DOCUMENTO
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar fondos animados
  const backgrounds = [
    new NetworkBackground('hero-canvas', '#2ecc71'),
    new NetworkBackground('stats-canvas', '#27ae60')
  ];

  // Limpieza al salir
  window.addEventListener('beforeunload', () => {
    backgrounds.forEach(bg => bg.destroy());
  });
});


// =============================================
// MONITOREO DE RENDIMIENTO
// =============================================
if ("performance" in window) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType("navigation")[0];
      console.log(`⚡ Página cargada en ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
    }, 0);
  });
}

// =============================================
// MODAL DE MANUALES
// =============================================
function showProjectDetails(title, description, tutorialUrl, manualUrl) {
  const modal = document.getElementById("project-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  
  modalTitle.textContent = title;
  modalDescription.textContent = description;
  
  const modalActions = document.querySelector(".modal-actions");
  modalActions.innerHTML = `
    <button class="btn-primary" onclick="window.open('${tutorialUrl}', '_blank')">Ver Tutorial</button>
    <button class="btn-secondary" onclick="downloadFile('${manualUrl}')">Descargar Manual</button>
  `;
  
  modal.style.display = "block";
}

// Función para descarga de archivos
function downloadFile(url) {
  // Crear un enlace temporal
  const link = document.createElement('a');
  link.href = url;
  
  // Extraer el nombre del archivo de la URL
  const fileName = url.split('/').pop();
  link.download = fileName || 'manual.pdf';
  
  // Simular click
  document.body.appendChild(link);
  link.click();
  
  // Limpiar
  document.body.removeChild(link);
}

  // Añadir animación
  setTimeout(() => {
    modal.querySelector(".modal-content").style.animation = "modalSlideIn 0.3s ease";
  }, 10);


// Cerrar modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Cerrar modal al hacer clic fuera
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

document.querySelectorAll('.btn-manual').forEach(btn => {
  btn.addEventListener('click', function() {
    const title = this.getAttribute('data-title');
    const description = this.getAttribute('data-description');
    const tutorialUrl = this.getAttribute('data-tutorial');
    const manualUrl = this.getAttribute('data-manual');
    
    showProjectDetails(title, description, tutorialUrl, manualUrl);
  });
});

// =============================================
// SERVICE WORKER (PARA FUTURAS FUNCIONALIDADES PWA)
// =============================================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Descomentar cuando haya un archivo service worker
    // navigator.serviceWorker.register('/sw.js')
    //     .then(registration => console.log('SW registered'))
    //     .catch(error => console.log('SW registration failed'));
  });
}