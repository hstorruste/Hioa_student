
var TAU=2*Math.PI;

var vector={ang:TAU, speed:6};

var myVar = new Array();

var count = new Array();

var nr=1;

var dead=0;

/*jQuery(function(){
var trigger_keys = [83, 84, 65, 82, 32, 87, 65, 82, 83];
var t_index = 0;
$(document).keydown(function(e){
    if(e.keyCode === trigger_keys[t_index++]){
        if(t_index === trigger_keys.length){
            start();

        }
    }else{
        t_index = 0;
    }
});
});*/

function start(){

	$("#fluebox").append("<div class='fluer' id='flue"+ nr++ +"'>"+"<img src='flue2.svg' alt='flue' width='45px' height='55px' onclick='die("+(nr-1)+")'>"+"</div>")

	$("#flue"+(nr-1)).offset({left:$("#fluebox").width()/2 - 200,top:$("#fluebox").height()/2 -100});

	count[nr-1] = 0;
	lagVector(nr-1);
	flytt(nr-1);


}

function lagVector(nu)
{

	vec=Object.create(vector);
	vec.ang=Math.random()*TAU;
	vec.speed=Math.random()*vec.speed;
	$("#flue"+nu).data("vector",vec);
	$("#flue"+nu).data("number",nu);


}

function flytt(nu){

	myVar[nu]=setInterval(function(){moveflue(nu)},2);

}

function moveflue(nu){
	count[nu]++;
    //console.log(count[nu]);
	flue=$("#flue"+nu);
	//var nu=flue.data("number");
    var offs=flue.offset();
  	var vector=flue.data("vector");
	var grad = ((vector.ang*360)/TAU)+180;

	if(count[nu]%200 == 0)
	{
		count[nu] = 0;
		myStopFunction(nu);
		lagVector(nu);
		flytt(nu);
	}

	offs.top+=vector.speed*Math.sin(vector.ang);
	offs.left+=vector.speed*Math.cos(vector.ang);

	f = document.getElementById("flue"+nu);
	f.style.webkitTransform="rotate("+grad+"deg)";
	f.style.msTransform = "rotate("+grad+"deg)";
	f.style.transform = "rotate("+grad+"deg)";

  	var bredde=$("#fluebox").width();
    var hoyde=$("#fluebox").height();

    if(offs.left < 0)
	{
		lagVector(nu);
		offs.left=0;
	}
	if(offs.left > (bredde-45))
	{
		lagVector(nu);
		offs.left=(bredde-45);
	}
	if(offs.top < 0)
	{
		lagVector(nu);
		offs.top=0;
	}
	if(offs.top > (hoyde-55))
	{
		lagVector(nu);
		offs.top=(hoyde-55);
	}

    flue.offset(offs);
}

function myStopFunction(nu)
{
	//console.log(myVar);
	clearInterval(myVar[nu]);
}

function die(d)
{
	dead++;
	count[d] = 0;
	$("#flue" + d).html("<img src='deadfly.svg' alt='dead' width='45px' height='55px' >");
	myStopFunction(d);
	start();
}

function avslutt()
{
	for(i = 1; i <= myVar.length; i++)
	{
		myStopFunction(i);
	}

	var utskrift = "You killed ";
	if(dead == 1)
	{
		utskrift += dead + " fly!";
	}
	else if(dead < 1)
	{
		utskrift += "no flies!";
	}
	else
	{
		utskrift += dead + " flies!";
	}
	alert(utskrift);

	$("#fluebox").html("");
	dead = 0;

}