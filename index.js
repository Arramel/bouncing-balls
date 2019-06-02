const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
let width = window.innerWidth
let height = window.innerHeight

canvas.width = width;
canvas.height = height;

const randomColour = () => {
    return 'rgba(' + Math.floor(Math.random() * 250) +
        ',' + Math.floor(Math.random() * 250) +
        ',' + Math.floor(Math.random() * 250) +
        ',' + Math.ceil(Math.random() * 10) / 10 + ')';
};

class Ball {

    constructor() {
        this.colour = randomColour();
        this.radius = Math.random() * 15 + 20;
        this.x = Math.random() * (width - this.radius * 2) + this.radius;
        this.y = Math.random() * (height - this.radius * 2) + this.radius;
        this.vx = Math.random() * 1.5 + 2;
        this.vy = Math.random() * 2;
        this.g = Math.random() / 5;
        this.update = () => {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fillStyle = this.colour;
            ctx.fill();
        }
    }

}

const balls = [];

for (let i = 0; i < 50; i++) {
    balls.push(new Ball());
}

const animate = () => {

    if (window.innerWidth != width || window.innerHeight != height) {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, width, height);

    for (ball of balls) {

        ball.update();
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.x + ball.radius >= width || ball.x - ball.radius <= 0) {
            ball.vx = -ball.vx;
        }

        if (ball.y + ball.radius >= height) {
            ball.vy = -ball.vy;
        } else {
            ball.vy += ball.g;
        }

    }

};

animate();

setInterval(() => {
    balls.push(new Ball());
    balls.shift();
}, 500);