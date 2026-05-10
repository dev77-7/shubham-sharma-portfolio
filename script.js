let particles = [];

function setup() {
    // Create canvas to match the full document height, not just window height
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1'); 
    canvas.style('pointer-events', 'none');
    canvas.style('position', 'fixed'); // Use fixed so it stays in the viewport
    for(let i = 0; i < 50; i++) particles.push(new Particle());
}

// to handle window resizing
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    clear();
    background(25, 25, 25, 400); // Slight trail effect
    particles.forEach(p => {
        p.update();
        p.draw();
        p.connect(particles);
    });
}

class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-1, 1), random(-1, 1));
        this.size = 12;
    }
    update(){
    this.pos.add(this.vel);
    
    // Boundary check
    if (this.pos.x > width || this.pos.x < 0) this.vel.x *= -1;
    if (this.pos.y > height || this.pos.y < 0) this.vel.y *= -1;
    
    // Interaction: mouseX and mouseY are built-in p5 variables
    let mouse = createVector(mouseX, mouseY);
    let d = dist(this.pos.x, this.pos.y, mouse.x, mouse.y);
    
    if (d < 100) { // Increased radius to 200 for better visibility
        let fly = p5.Vector.sub(this.pos, mouse);
        fly.normalize(); // Ensure constant speed push
        this.pos.add(fly.mult(2)); // Push particles away
    }
}
    draw() {
        noStroke();
        fill('#21f8e6'); // High-contrast Cyan
        circle(this.pos.x, this.pos.y, this.size);
    }
    connect(others) {
        others.forEach(o => {
            let d = dist(this.pos.x, this.pos.y, o.pos.x, o.pos.y);
            if (d < 120) { // Distance at which lines appear
                // Thicker, more visible lines with transparency gradient
                strokeWeight(1.5); 
                stroke(255, 255, 255, map(d, 0, 120, 150, 0));
                line(this.pos.x, this.pos.y, o.pos.x, o.pos.y);
            }
        });
    }
}

// =========================================================
// PROJECT FILTERING SYSTEM
// Projects can belong to multiple categories
// using the data-category attribute.
// =========================================================

function filterSelection(category, btn) {

    // Grab all project cards
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {

        // Read categories from HTML
        const itemCategory = card.dataset.category || "";

        // Show everything
        if (category === "all") {

            // IMPORTANT:
            // Cards use flex layout internally
            // so we restore them as flex.
            card.style.display = "flex";
        } 
        // Show matching category
        else if (itemCategory.includes(category)) {
            card.style.display = "flex";
        }
        
        // Hide non-matching cards
        else {
            card.style.display = "none";
        }
    });

    // =====================================================
    // ACTIVE FILTER BUTTON STYLING
    // =====================================================

    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(button => {
        button.classList.remove("active");
    });

    // Highlight currently selected button
    if (btn) {
        btn.classList.add("active");
    }
}

function toggleMenu() {
    const navList = document.getElementById("nav-list");
    const body = document.body;

    // Use the 1050px breakpoint established for the header layout
    if (window.innerWidth <= 1050) {
        const isActive = navList.classList.toggle("active");
        
        // LOCK SCROLL: Toggle a class on the body to prevent background movement
        if (isActive) {
            body.classList.add("no-scroll");
        } else {
            body.classList.remove("no-scroll");
        }
    }
}
// CLOSE ON OUTSIDE CLICK: Listen for clicks across the entire document
document.addEventListener('click', (e) => {
    const navList = document.getElementById("nav-list");
    const menuIcon = document.querySelector(".menu-icon");
    
    // If the menu is open AND the click happened outside the menu list 
    // AND it wasn't a click on the hamburger icon itself
    if (navList.classList.contains("active") && 
        !navList.contains(e.target) && 
        !menuIcon.contains(e.target)) {
        
        navList.classList.remove("active");
        document.body.classList.remove("no-scroll");
    }
});

// CLOSE ON SCROLL (Optional): For extra safety if the user manages to scroll
window.addEventListener('scroll', () => {
    const navList = document.getElementById("nav-list");
    if (navList.classList.contains("active")) {
        navList.classList.remove("active");
        document.body.classList.remove("no-scroll");
    }
}, { passive: true });

// --- TYPEWRITER LOGIC ---

const phrases = [
    "Computer Science Engineer",
    "Product Manager",
    "Computational Sustainability Enthusiast",
    "Researcher in the making"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const textElement = document.getElementById("typewriter");
    if (!textElement) return; // Safety check

    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        // BACKSPACING SPEED
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        // TYPING SPEED
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 50;
    }
    // PAUSE LOGIC
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; 
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; //pause before starting new word
    }

    setTimeout(type, typeSpeed);
}

    // Start the effect
    window.onload = () => {
    type();
};

