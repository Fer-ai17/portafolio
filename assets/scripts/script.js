// Elementos del DOM
const hamburger = document.querySelector(".hamburger");  // get the hamburger element
const navMenu = document.querySelector(".nav-menu");  // get the nav menu element
const filterBtns = document.querySelectorAll(".filter-btn");  // get all filter buttons
const projectCards = document.querySelectorAll(".project-card");  // get all project cards
const modal = document.getElementById("project-modal");  // get the project modal element
const closeModal = document.querySelector(".close");  // get the close modal element
const contactForm = document.getElementById("contact-form");  // get the contact form element
const statNumbers = document.querySelectorAll(".stat-number");  // get all stat numbers

// =============================================
// NAVEGACIÓN MÓVIL
// =============================================
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");  // toggle the "active" class on the hamburger
  navMenu.classList.toggle("active");  // toggle the "active" class on the nav menu
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll(".nav-link").forEach((link) => {  // for each link in the nav links
  link.addEventListener("click", () => {  // add a click event listener to the link
    hamburger.classList.remove("active");  // remove the "active" class from the hamburger
    navMenu.classList.remove("active");  // remove the "active" class from the nav menu
  });
});

// =============================================
// SCROLL SUAVE Y MANEJO DE NAVEGACIÓN
// =============================================
    function scrollToProjects() {
        document.getElementById('proyectos').scrollIntoView({  // scroll to the projects section
            behavior: 'smooth' // Desplazamiento suave
        });
    }

function scrollToSection(sectionId) {  // function to scroll to a section
  const section = document.getElementById(sectionId);  // get the section element with the specified id
  if (section) {  // check if the section exists
    section.scrollIntoView({  // scroll the section into view
      behavior: "smooth",   // smooth scrolling
      block: "start",  // block the start of the scroll
    });
  }
}

// Maneja tanto el efecto del header como los links activos
window.addEventListener("scroll", debounce(() => {  // debounce the function
  // Efecto de header al hacer scroll
  const header = document.querySelector(".header");  // get the header element
  header.classList.toggle("scrolled", window.scrollY > 100);  // toggle the "scrolled" class on the header based on the scrollY value
  
  // Resaltar links de navegación
  highlightNavLinks();  // highlight the navigation links
}, 10));

// Función para resaltar links de navegación
function highlightNavLinks() {
  const sections = document.querySelectorAll("section[id]");  // get all sections with an id attribute
  const navLinks = document.querySelectorAll(".nav-link");  // get all nav links

  let current = "";
  sections.forEach((section) => {  // for each section in the sections array
    const sectionTop = section.offsetTop;  // get the offsetTop of the section
    if (window.scrollY >= sectionTop - 200) {  // check if the scrollY is greater than or equal to the sectionTop minus 200
      current = section.getAttribute("id"); // set the current variable to the id attribute of the section
    }
  });

  navLinks.forEach((link) => {  // for each link in the navLinks array
    link.classList.remove("active"); // remove the "active" class from all links
    if (link.getAttribute("href") === `#${current}`) { // check if the href attribute of the link is equal to the current section
      link.classList.add("active"); // add the "active" class to the link
    }
  });
}

// =============================================
// IMAGEN DE PROYECTO
// =============================================
document.addEventListener('DOMContentLoaded', function() {  // add a DOMContentLoaded event listener to the document
    // Seleccionar todos los contenedores de proyecto
    const projectImages = document.querySelectorAll('.project-image');  // get all project images
    
    projectImages.forEach(container => {  // for each container in the projectImages array
        // Obtener la URL de la imagen del atributo data
        const imageUrl = container.getAttribute('data-project-img');  // get the imageUrl attribute of the container
        
        if (imageUrl) {
            // Crear elemento de imagen
            const img = document.createElement('img');  // create a new image element
            img.className = 'project-preview';  // set the className attribute of the image to "project-preview"
            img.src = imageUrl;  // set the src attribute of the image to the imageUrl
            img.alt = 'Preview del proyecto';  // set the alt attribute of the image to "Preview del proyecto"
            
            // Insertar la imagen en el contenedor
            container.appendChild(img);  // append the image to the container
             
            // Evento para mostrar la imagen al hacer hover
            container.addEventListener('mouseenter', function() {  // add a mouseenter event listener to the container
                this.classList.add('show-image');  // add the "show-image" class to the container
            });
            
            // Evento para mantener la imagen visible después del hover
            container.addEventListener('mouseleave', function() {  // add a mouseleave event listener to the container
                this.classList.remove('show-image');  // remove the "show-image" class from the container
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
    filterBtns.forEach((b) => b.classList.remove("active"));  // remove the "active" class from all filter buttons
    // Añadir clase active al botón clickeado
    btn.classList.add("active");  // add the "active" class to the button

    const filterValue = btn.getAttribute("data-filter");  // get the filterValue attribute of the button

    projectCards.forEach((card) => {  // for each card in the projectCards array
      if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {  // check if the filterValue is "all" or the card's data-category attribute is equal to the filterValue
        card.classList.remove("hidden"); // remove the "hidden" class from the card
        setTimeout(() => {  // set a timeout to show the card after 10 milliseconds
          card.style.display = "block";  // set the display property of the card to block
        }, 10); // wait for 10 milliseconds
      } else {
        card.classList.add("hidden");  // add the "hidden" class to the card
        setTimeout(() => {  // set a timeout to hide the card after 300 milliseconds
          if (card.classList.contains("hidden")) {  // check if the card is hidden
            card.style.display = "none";  // hide the card
          }
        }, 300);
      }
    });
  });
});

document.querySelectorAll('.btn-demo').forEach(btn => {
  btn.addEventListener('click', function() {  // add a click event listener to the button
    const demoUrl = this.getAttribute('data-demo-url');  // get the demoUrl attribute of the button
    if (demoUrl) {  // check if the demoUrl is not empty
      window.open(demoUrl, '_blank');  // open the demo in a new tab
    }
  });
});

document.querySelectorAll('.btn-code[data-manual-url]').forEach(button => { // for each button with the class "btn-code" and the data-manual-url attribute
  button.addEventListener('click', function() {  // add a click event listener to the button
      const manualUrl = this.getAttribute('data-manual-url');  // get the manualUrl attribute of the button
      if (manualUrl) {  // check if the manualUrl is not empty
          window.open(manualUrl, '_blank');  // open the manual in a new tab
      }
  });
});

// =============================================
// ANIMACIONES Y EFECTOS
// =============================================
// Contador animado para estadísticas
function animateCounter(element, target, duration = 2000) {  // function to animate a counter
  let start = 0;  // initialize a start variable
  const increment = target / (duration / 16);  // calculate the increment value

  const timer = setInterval(() => {  // set a timer to increment the start value every 16 milliseconds
    start += increment;  // increment the start value
    element.textContent = Math.floor(start);  // set the text content of the element to the current value

    if (start >= target) {  // check if the start is greater than or equal to the target
      element.textContent = target; // set the text content of the element to the target value
      clearInterval(timer); // clear the timer
    }
  }, 16);
}

// Observer para animaciones al aparecer elementos
const observer = new IntersectionObserver((entries) => {  // create a new IntersectionObserver
  entries.forEach((entry) => {  // for each entry in the entries array
    if (entry.isIntersecting) {  // check if the entry is intersecting
      // Animación para estadísticas
      if (entry.target.classList.contains("stats")) {  // check if the target element is a stats element
        statNumbers.forEach((stat) => { // for each stat number element
          const target = Number.parseInt(stat.getAttribute("data-target")); // get the target value from the data-target attribute
          animateCounter(stat, target); // animate the stat counter with the target value
        });
      }

      // Animación para tarjetas de proyectos y features
      if (entry.target.classList.contains("project-card") ||  // check if the target element is a project card
          entry.target.classList.contains("feature")) {  // check if the target element is a project card or feature
        entry.target.style.animation = "fadeInUp 0.6s ease forwards";  // animate the target element with a fadeInUp animation
      }
    }
  });
}, {
  threshold: 0.1,  // set the threshold to 0.1
  rootMargin: "0px 0px -50px 0px"  // set the rootMargin to 0px 0px -50px 0px
});

// Observar elementos para animaciones
document.querySelectorAll(".stats, .project-card, .feature").forEach((el) => {  // for each element with the class "stats", "project-card", or "feature"
  observer.observe(el);  // observe the element for changes
});

// =============================================
// ACCESIBILIDAD Y NAVEGACIÓN POR TECLADO
// =============================================
document.addEventListener("keydown", (e) => {
  // Cerrar modal con tecla Escape
  if (e.key === "Escape" && modal.style.display === "block") {  // check if the key is Escape and the modal is displayed
    modal.style.display = "none";  // hide the modal
  }

  // Navegación con teclas en grid de proyectos
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {  // check if the key is ArrowLeft or ArrowRight
    const activeElement = document.activeElement;  // get the active element
    if (activeElement.classList.contains("project-card")) {  // check if the active element is a project card
      const cards = Array.from(document.querySelectorAll(".project-card:not(.hidden)"));  // get all project cards that are not hidden
      const currentIndex = cards.indexOf(activeElement);  // get the index of the active element in the cards array

      if (e.key === "ArrowRight" && currentIndex < cards.length - 1) {  // check if the key is ArrowRight and the current index is less than the length of the cards array minus 1
        cards[currentIndex + 1].focus(); // focus the next card
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {  // check if the key is ArrowLeft and the current index is greater than 0
        cards[currentIndex - 1].focus(); // focus the previous card
      }
    }
  }
});

// Hacer tarjetas de proyectos enfocables
projectCards.forEach((card) => {  // for each card in the projectCards array
  card.setAttribute("tabindex", "0");  // set the tabindex attribute to 0
  card.addEventListener("keydown", (e) => {  // add a keydown event listener to the card
    if (e.key === "Enter" || e.key === " ") {  // check if the key is Enter or Space
      e.preventDefault(); // prevent the default behavior of the event
      const demoBtn = card.querySelector(".btn-demo");  // get the demo button of the card
      if (demoBtn) {  // check if the demo button exists
        demoBtn.click(); // click the demo button
      }
    }
  });
});

// =============================================
// ANIMACIÓN DE CARGA
// =============================================
window.addEventListener("load", () => {
  document.body.classList.add("loaded");  // add the "loaded" class to the body element

  // Animar elementos del hero
  const heroElements = document.querySelectorAll(".hero-title, .hero-subtitle, .cta-button");  // get all elements with the class "hero-title", "hero-subtitle", or "cta-button"
  heroElements.forEach((el, index) => {  // for each element in the heroElements array
    setTimeout(() => {
      el.style.animation = `fadeInUp 1s ease ${index * 0.2}s both`;  // animate the element with a fadeInUp animation
    }, 100);
  });
});

// =============================================
// FUNCIONES UTILITARIAS
// =============================================
function debounce(func, wait) {
  let timeout;  // initialize a timeout variable
  return function executedFunction(...args) {  // return a function that takes arguments
    const later = () => {  // define a function to be executed later
      clearTimeout(timeout); // clear the timeout
      func(...args); // execute the function with the provided arguments
    };
    clearTimeout(timeout); // clear the previous timeout
    timeout = setTimeout(later, wait); // set a timeout to execute the function after the specified delay
  };
}

// =============================================
// BACKGROUND ANIMADO (RED DE NODOS)
// =============================================
class NetworkBackground {
  constructor(canvasId, color) {  // constructor
    this.canvas = document.getElementById(canvasId); // get the canvas element
    if (!this.canvas) return; // return if the canvas element is not found
    
    this.ctx = this.canvas.getContext('2d'); // get the 2d context of the canvas
    this.color = color || '#00ff4c'; // set the default color to green
    this.nodes = []; // initialize an empty array to store the nodes
    this.maxDistance = 150; // set the maximum distance between nodes
    this.animationId = null; // initialize an empty variable to store the animation id

    this.init(); // initialize the network
  }

  init() {
    this.setupCanvas(); 
    this.createNodes();
    this.setupEvents();
    this.animate();
  }

  setupCanvas() {
    this.canvas.width = this.canvas.offsetWidth; // update canvas width and height
    this.canvas.height = this.canvas.offsetHeight; // update canvas width and height
  }

  createNodes() {
    const nodeCount = window.innerWidth < 768 ? 40 : 80;  // calculate the number of nodes based on the screen width
    for (let i = 0; i < nodeCount; i++) { // for each node
      this.nodes.push({ // push a new node object to the nodes array
        x: Math.random() * this.canvas.width,  // x position
        y: Math.random() * this.canvas.height, // y position
        vx: (Math.random() - 0.5) * 1.5, // x velocity
        vy: (Math.random() - 0.5) * 1.5, // y velocity
        radius: Math.random() * 1.5 + 1 // radius
      });
    }
  }

  setupEvents() {
    window.addEventListener('resize', this.handleResize.bind(this)); // add the resize event listener
    
    // Interacción con el mouse
    this.canvas.addEventListener('mousemove', (e) => {  // add a mousemove event listener to the canvas
      const rect = this.canvas.getBoundingClientRect(); // get the bounding rectangle of the canvas
      const mouseX = e.clientX - rect.left; // calculate the mouse position relative to the canvas
      const mouseY = e.clientY - rect.top; // calculate the mouse position relative to the canvas

      this.nodes.forEach(node => {
        const dx = mouseX - node.x; // distance between mouse and node x position
        const dy = mouseY - node.y; // distance between mouse and node y position
        const distance = Math.sqrt(dx * dx + dy * dy); // distance between mouse and node

        if (distance < 100) {
          node.vx = -dx * 0.01; // decrease node velocity if mouse is close to node
          node.vy = -dy * 0.01; // decrease node velocity if mouse is close to node
        }
      });
    });
  }

  handleResize() {
    this.canvas.width = this.canvas.offsetWidth; // update canvas width and height
    this.canvas.height = this.canvas.offsetHeight; // update canvas width and height
  }

  updateNodes() {
    this.nodes.forEach(node => {
      node.x += node.vx; // update node position
      node.y += node.vy; // update node position

      // Rebotar en los bordes
      if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1; // bounce node if it hits the left or right border
      if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1; // bounce node if it hits the top or bottom border
    });
  }

  drawConnections() {
    const rgb = this.hexToRgb(this.color);
    
    for (let i = 0; i < this.nodes.length; i++) {   // for each node
      for (let j = i + 1; j < this.nodes.length; j++) { // for each node after the current node
        const dx = this.nodes[i].x - this.nodes[j].x; // calculate the distance between the current node and the next node
        const dy = this.nodes[i].y - this.nodes[j].y; // calculate the distance between the current node and the next node
        const distance = Math.sqrt(dx * dx + dy * dy); // calculate the distance between the current node and the next node

        if (distance < this.maxDistance) {
          const opacity = 1 - distance / this.maxDistance;
          this.ctx.beginPath(); // start a new path
          this.ctx.moveTo(this.nodes[i].x, this.nodes[i].y); // move to the current node
          this.ctx.lineTo(this.nodes[j].x, this.nodes[j].y); // move to the next node
          this.ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity * 0.6})`; // set the stroke color to the current node color
          this.ctx.lineWidth = 0.7;  // set the line width to 0.7
          this.ctx.stroke(); // draw the line
        }
      }
    }
  }

  drawNodes() {
    this.nodes.forEach(node => {        // for each node
      this.ctx.beginPath(); // start a new path
      this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2); // draw a circle at the current node position with the current node radius
      this.ctx.fillStyle = this.color; // set the fill color to the current node color
      this.ctx.fill(); // fill the circle
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clear the canvas
    this.updateNodes(); // update the nodes position
    this.drawConnections(); // draw the connections
    this.drawNodes(); // draw the nodes
    this.animationId = requestAnimationFrame(() => this.animate()); // request the next frame
  }

  hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16); // convert hex to decimal
    const g = parseInt(hex.slice(3, 5), 16); // convert hex to decimal
    const b = parseInt(hex.slice(5, 7), 16); // convert hex to decimal
    return { r, g, b }; // return the rgb object
  }

  destroy() {
    cancelAnimationFrame(this.animationId); // cancel the animation frame
    window.removeEventListener('resize', this.handleResize); // remove the resize event listener
  }
}

// =============================================
// INICIALIZACIÓN AL CARGAR EL DOCUMENTO
// =============================================
document.addEventListener('DOMContentLoaded', () => {  // add a DOMContentLoaded event listener to the document
  // Inicializar fondos animados
  const backgrounds = [  // create an array of backgrounds
    new NetworkBackground('hero-canvas', '#2ecc71'), // create a new background with the id hero-canvas and color #2ecc71
    new NetworkBackground('stats-canvas', '#27ae60') // create a new background with the id stats-canvas and color #27ae60
  ];

  // Limpieza al salir
  window.addEventListener('beforeunload', () => {  // add a beforeunload event listener to the window
    backgrounds.forEach(bg => bg.destroy()); // destroy all backgrounds
  });
});


// =============================================
// MONITOREO DE RENDIMIENTO
// =============================================
if ("performance" in window) {  // check if performance is supported
  window.addEventListener("load", () => {  // add a load event listener to the window
    setTimeout(() => {  // set a timeout to execute the code after the page is loaded
      const perfData = performance.getEntriesByType("navigation")[0];  // get the first navigation entry
      console.log(`⚡ Página cargada en ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`); // log the page load time
    }, 0);
  });
}

// =============================================
// MODAL DE MANUALES
// =============================================
function showProjectDetails(title, description, tutorialUrl, manualUrl) {  // function to show project details in a modal
  const modal = document.getElementById("project-modal");  // get the project modal element
  const modalTitle = document.getElementById("modal-title");  // get the modal title element
  const modalDescription = document.getElementById("modal-description");  // get the modal description element
  
  modalTitle.textContent = title;  // set the modal title
  modalDescription.textContent = description;  // set the modal description
  
  const modalActions = document.querySelector(".modal-actions");  // get the modal actions element
  modalActions.innerHTML = `  
    <button class="btn-primary" onclick="window.open('${tutorialUrl}', '_blank')">Ver Tutorial</button> 
    <button class="btn-secondary" onclick="downloadFile('${manualUrl}')">Descargar Manual</button> 
  `; 
  // add a button to open the tutorial in a new tab
  // add a button to download the manual
  
  modal.style.display = "block";  // display the modal
}

// Función para descarga de archivos
function downloadFile(url) {
  // Crear un enlace temporal
  const link = document.createElement('a');  // create a temporary link element
  link.href = url;  // set the href attribute of the link to the url
  
  // Extraer el nombre del archivo de la URL
  const fileName = url.split('/').pop();  // split the url by '/' and get the last part
  link.download = fileName || 'manual.pdf';  // set the download attribute of the link to the file name or 'manual.pdf' if the file name is not available
   
  // Simular click
  document.body.appendChild(link);  // append the link to the body
  link.click();  // click the link
  
  // Limpiar
  document.body.removeChild(link);  // remove the link from the body
}

  // Añadir animación
  setTimeout(() => {
    modal.querySelector(".modal-content").style.animation = "modalSlideIn 0.3s ease";  // add an animation to the modal content
  }, 10);


// Cerrar modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";  // hide the modal
});

// Cerrar modal al hacer clic fuera
window.addEventListener("click", (e) => {
  if (e.target === modal) {  // check if the clicked element is the modal
    modal.style.display = "none";  // hide the modal
  }
});

document.querySelectorAll('.btn-manual').forEach(btn => {
  btn.addEventListener('click', function() {  // add a click event listener to the button
    const title = this.getAttribute('data-title');  // get the title attribute of the button
    const description = this.getAttribute('data-description');  // get the description attribute of the button
    const tutorialUrl = this.getAttribute('data-tutorial');  // get the tutorialUrl attribute of the button
    const manualUrl = this.getAttribute('data-manual');  // get the manualUrl attribute of the button
    
    showProjectDetails(title, description, tutorialUrl, manualUrl);  // call the showProjectDetails function with the provided parameters
  });
});

