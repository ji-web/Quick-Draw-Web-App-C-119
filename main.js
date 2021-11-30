timer_counter=0;
timer_check="";
draw_sketch="";
answer_holder="";
score=0;
random_no=Math.floor((Math.random()*quick_draw_data_set.length)+1);
console.log(quick_draw_data_set[random_no]);
sketch=quick_draw_data_set[random_no];
document.getElementById("sketch_name").innerHTML="sketch to be drawn" + sketch;


function setup(){
    canvas=createCanvas(280,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth=window.speechSynthesis;
}

function preload(){
    classifier=ml5.imageClassifier('DoodleNet');
    
}

function draw(){
    strokeWeight(10);
    stroke(0);
    if(mouseIsPressed)
    {line(pmouseX,pmouseY,mouseX,mouseY);}
}

function classifyCanvas(){
    classifier.classify(canvas,gotResult);
}

function gotResult(error,results){
    if(error)
    {console.error(error);}
    else{
        console.log(results);
        document.getElementById("label").innerHTML="label: "+results[0].label;
        document.getElementById("confidence").innerHTML="confidence: "+Math.round(results[0].confidence*100)+" %";
        utterThis=new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterThis);
    }
}