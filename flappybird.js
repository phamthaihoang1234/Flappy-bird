let canvas = document.getElementById('gamezone');
let context = canvas.getContext('2d');
let scoreShow = document.getElementById('score');

let birdImg = new Image();
let background = new Image();
let pipe_first = new Image();
let pipe_second = new Image();

birdImg.src = "images/bird.png";
background.src = "images/background.png";
pipe_first.src = "images/pipe_first.png";
pipe_second.src = "images/pipe_second.png";

let score = 0;
let distance_between_two_pipes =140;
let distance_to_the_lower_tube ;

let bird = {
    x: background.width/5,
    y: background.height/2
}

let pipe = [];
pipe[0]={
    x : canvas.width,
    y : 0,
    check : false

}

function run(){
    context.drawImage(background,0,0);
    context.drawImage(birdImg,bird.x,bird.y);

    for (let i = 0; i < pipe.length; i++) {
        distance_to_the_lower_tube = pipe_first.height + distance_between_two_pipes;
        context.drawImage(pipe_first,pipe[i].x,pipe[i].y);
        context.drawImage(pipe_second,pipe[i].x,pipe[i].y+distance_to_the_lower_tube);

        pipe[i].x -= 5;
        // add a tube when the end of the tube moves to the center of the screen
        if(pipe[i].x == canvas.width / 2){
            pipe.push({
                x : canvas.width,
                y : Math.floor(Math.random()*pipe_first.height) - pipe_first.height,
                check : false
            })
        }
            // bird.x >= pipe[i].x + pipe_first.width
        // Delete the tube when the tube moves to the leftmost position

        if(pipe[i].x + pipe_first.width == 0) {pipe.splice(0,1);}
        if(bird.x == pipe[i].x  ) {

            score++;
            console.log(i)
            pipe[i].check = true;

        }

        if(bird.y + birdImg.height == canvas.height || bird.x + birdImg.width >= pipe[i].x && bird.x <= pipe[i].x + pipe_first.width &&
            (bird.y<= pipe[i].y + pipe_first.height || bird.y >= distance_to_the_lower_tube+ pipe[i].y)){
            return ;
        }




    }

    scoreShow.innerHTML = "Score : "+ score;
    bird.y += 3;
    requestAnimationFrame(run);
}

document.addEventListener('keypress', function (){
    bird.y -= 60;
})

run();




