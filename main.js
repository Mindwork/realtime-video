video="";
stat="";
objects=[];
function gotresults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}
function preload(){
    video=createVideo("video.mp4");
}
function setup(){
    canvas=createCanvas(500,400);
    canvas.center();
    video.hide();
}
function draw(){
    image(video,0,0,500,400);
    if(stat!=""){
        objectdetector.detect(video, gotresults);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status:Objects Detected";
            document.getElementById("no_objects").innerHTML="Number of Objects detected: "+objects.length;
            fill("red");
            var percent=floor(objects[i.confidence]*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("lightblue");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)  
        }
    }
}
function start(){
    objectdetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="status:Detecting objects";
}
function modelloaded(){
    console.log("modelloaded");
    stat=true;
    video.loop();
    video.speed(2);
    video.volume(0);
}