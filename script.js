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

// Filtering Function
function filterSelection(c) {
    let x = document.getElementsByClassName("card");
    let category = c === "all" ? "" : c;
    for (let i = 0; i < x.length; i++) {
        x[i].classList.add("hidden");
        if (x[i].getAttribute("data-category").indexOf(category) > -1 || category === "") {
            x[i].classList.remove("hidden");
        }
    }
    // Update button active state
    let btns = document.getElementsByClassName("filter-btn");
    for (let i = 0; i < btns.length; i++) {
        btns[i].classList.remove("active");
    }
    if(event) event.currentTarget.classList.add("active");
}
    function toggleMenu() {
        const navList = document.getElementById("nav-list");
        // Only toggle if we are on a mobile screen
        if (window.innerWidth <= 850) {
            navList.classList.toggle("active");
        }
    }
    // --- TYPEWRITER LOGIC ---

const phrases = [
    "Computer Science Engineer",
    "Web Developer",
    "Product Manager",
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

