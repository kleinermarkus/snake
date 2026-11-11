function start()
{
felder(); 
snake(); 
wall();
eat();
move(); 
timer('beginn','no');
s_futter["x"]=0-1;
s_futter["y"]=0-1;

//s_new();
}
function restart()
{
	pause();
document.all('main').innerHTML = "";
g=0;
level=1;
//document.all('wall').innerHTML = "1";
for (i=0;i<fields.length;i++)
	{
	fields.pop();
	}
for (i=0;i<snakefields.length;i++)
	{
	snakefields.pop();
	}
for (i=0;i<=change.length;i++)
	{
	change.pop();
	}
for (i=0;i<walls.length;i++)
	{
	walls.pop();
	}
start();
}
function felder()
{
x=0;
y=1;
fay = levels[level]["groesse"]['y'];
fax = levels[level]["groesse"]['x'];
document.all('main').style.width = fax*fw+border*2;
document.all('main').style.height = fay*fw+border*2;
document.all('main').style.left = top;
document.all('main').style.top = left;
document.all('main').style.border.width = mb+"px";
speed = levels[level]["speed"];
while (x<fay)
{
	fields[x]=new Array();
	i=0;
	while (i<fax)
	{
		fields[x][i]=new Array();
		fields[x][i]["x"]=i*fw;
		fields[x][i]["y"]=x*fw;
		//document.all('main').innerHTML += "<br>"+fields[x][i]["x"]+"; "+fields[x][i]["y"];
		y++;
		i++;
	}
x++;
}
s_futter["n"]="0";
s_futter["x"]="";
s_futter["y"]="";
document.all('main').innerHTML += '<div id="wall" style="z-index:2">';
document.all('main').innerHTML += "<img src='ob1.gif' class='sfutter' id='s_futter'>";
document.all('s_futter').style.width = fw;
document.all('s_futter').style.heigth = fw;
}
i=0;
x++;


function snake()
{
	i=0;
	while (i<=startl)
	{
	name="snake"+i;
	if (i==0) {
	document.all('main').innerHTML += "<img src='snaker.gif' class='feld' id='"+name+"'>"; }
	else {
	document.all('main').innerHTML += "<img src='"+bilds+"' class='feld' id='"+name+"'>"; }
	snakefields[i]=new Array();
	snakefields[i]["x"]=startl-i;
	snakefields[i]["y"]=Math.round(fax/2);
	snakefields[i]["r"]="r";
	document.all(name).style.left = fields[snakefields[i]["y"]][snakefields[i]["x"]]["x"];
	document.all(name).style.top = fields[snakefields[i]["y"]][snakefields[i]["x"]]["y"];
	document.all(name).style.width = fw;
	i++;
	}
	document.all('main').innerHTML += "<img src='"+futter+"' class='feld' id='futter'>"; 
	document.all("futter").style.width = fw;
}

function move()
{
	i=0;
	//document.all('test').innerHTML += snakefields.lenght;
	while (i<=snakefields.length-1)
	{
	x=0;
	name="snake"+i;
	while (x<=change.length-1)
	{
		if (snakefields[i]["x"]==change[x]["x"]&&snakefields[i]["y"]==change[x]["y"]) 
		{ 
			snakefields[i]["r"]=change[x]["r"];
			//document.all('main').innerHTML += "<br>"+i+"; "+snakefields[i]["r"]+"; ";
			// change löschen 
			if (i==snakefields.length-1) { change[x]["y"]="y"; change[x]["x"]="y"; change[x]["r"]="y"; }
		}
	x++;
	}
	switch (snakefields[i]["r"]) {
	case "r":
		snakefields[i]["x"]+=1; 
		break;
	case "l":
		snakefields[i]["x"]-=1;
		break;
	case "o":
		snakefields[i]["y"]-=1;
		break;
	case "u":
		snakefields[i]["y"]+=1;
		break;
	}
	// Rand 
	if (snakefields[i]["x"]<0) { snakefields[i]["x"]=fax-1; }
	if (snakefields[i]["x"]>fax-1) { snakefields[i]["x"]=0; }
	if (snakefields[i]["y"]<0) { snakefields[i]["y"]=fay-1; }
	if (snakefields[i]["y"]>fay-1) { snakefields[i]["y"]=0; }
	x=0;
	if (i==0) 
	{
	x=1;
	for (x=1;x<=snakefields.length-1;x++) 
		{
		if (snakefields[0]["y"]==snakefields[x]["y"]&&snakefields[0]["x"]==snakefields[x]["x"]) { loose(); return; }
		}
	for (wa=0;wa<walls.length;wa++)
		{
		if (snakefields[0]["y"]==walls[wa]["y"]&&snakefields[0]["x"]==walls[wa]["x"]) { loose(); return; }
		}

/*var t=test_fields(snakefields[0]["x"],snakefields[0]["y"]);
//alert(t);
window.status=t;
switch (t) {
	case "f_futter":
		break;
	case "f_s_futter":
		break;
	case "f_snake":
		break;
	case "r":
		break;
	default:
		return;
		break;
	}*/
	}
	// bewegen
	document.all(name).style.left = fields[snakefields[i]["y"]][snakefields[i]["x"]]["x"];
	document.all(name).style.top = fields[snakefields[i]["y"]][snakefields[i]["x"]]["y"];
	i++;
	}
	// futter prüfen
	if (snakefields[0]["y"]==futtery&&snakefields[0]["x"]==futterx) { eat(); news(); points(); }
	if (snakefields[0]["y"]==s_futter["y"]&&snakefields[0]["x"]==s_futter["x"]) {  s_eat(); }
	timerid=setTimeout('move()',speed);
}

function changehead(v)
{
document.all('main').innerHTML += v;
}

// #### Richtung bei Tasten druck wechseln ####
var tasten = new Array();
tasten[37] = new Array();
tasten[38] = new Array();
tasten[39] = new Array();
tasten[40] = new Array();
tasten[37][1] = "l";
tasten[38][1] = "o";
tasten[39][1] = "r";
tasten[40][1] = "u";
tasten[37][2] = "r";
tasten[38][2] = "u";
tasten[39][2] = "l";
tasten[40][2] = "o";
var g=0;

function TasteGedrueckt (Ereignis) 
{
  if (!Ereignis)
    Ereignis = window.event;
  if (Ereignis.which) {
    tastencode = Ereignis.which;
  } else if (Ereignis.keyCode) {
    tastencode = Ereignis.keyCode;
  }
if (tastencode==19) { pause();  return;}
else if (tastencode==27) { pause();  return;}
else if (tastencode>=37&&tastencode<=40) 
{ 
		if (snakefields[0]["r"]=="r"&&tasten[tastencode][go]=="l") { return; }
		if (snakefields[0]["r"]=="l"&&tasten[tastencode][go]=="r") { return; }
		if (snakefields[0]["r"]=="o"&&tasten[tastencode][go]=="u") { return; }
		if (snakefields[0]["r"]=="u"&&tasten[tastencode][go]=="o") { return; }
		else 
		{
		change[g]=new Array();
		change[g]["x"]=snakefields[0]["x"];
		change[g]["y"]=snakefields[0]["y"];
		change[g]["r"]= tasten[tastencode][go];
		//document.all('main').innerHTML += "<br>"+g+": "+change[g]["x"]+"; "+change[g]["y"]+"; R:"+change[g]["r"]+"; RS: "+snakefields[startl]["r"]+"; Gesamt: "+change.length;
		}
	if (tasten[tastencode][go]=="l") { document.all("snake0").src ="snakel.gif"; }
	if (tasten[tastencode][go]=="r") { document.all("snake0").src ="snaker.gif"; }
	if (tasten[tastencode][go]=="o") { document.all("snake0").src ="snakeo.gif"; }
	if (tasten[tastencode][go]=="u") { document.all("snake0").src ="snakeu.gif"; }
}
else { return; }
if (tasten[tastencode][go]) { tastencode = tasten[tastencode][go]; }
 // window.status = "Taste " + tasten[tastencode][1] + " gedrückt";
g++;
}


var num;
var z=0;
function news()
{	
	z++;
	num =snakefields.length;
	name="snake"+num;
	snakefields[num]=new Array();
	snakefields[num]["y"]=snakefields[num-1]["y"];
	snakefields[num]["x"]=snakefields[num-1]["x"];
	snakefields[num]["r"]=snakefields[num-1]["r"];
	if (snakefields[num-1]["r"]=="r") { snakefields[num]["x"]=snakefields[num-1]["x"]-1; }
	if (snakefields[num-1]["r"]=="l") { snakefields[num]["x"]=snakefields[num-1]["x"]+1; }
	if (snakefields[num-1]["r"]=="o") { snakefields[num]["y"]=snakefields[num-1]["y"]+1; }
	if (snakefields[num-1]["r"]=="u") { snakefields[num]["y"]=snakefields[num-1]["y"]-1; }

	if (snakefields[num]["x"]<0) { snakefields[num]["x"]=fax-1; }
	if (snakefields[num]["x"]>fax-1) { snakefields[num]["x"]=0; }
	if (snakefields[num]["y"]<0) { snakefields[num]["y"]=fay-1; }
	if (snakefields[num]["y"]>fay-1) {snakefields[num]["y"]=0; }
	document.all('main').innerHTML += "<img src='"+bilds+"' class='feld' id='"+name+"'>" // <div class='feld' id='"+name+"'><img src='"+bilds+"' width='"+fw+"'><div id='display3'></div></div>"; 
	//ocument.all('display2').innerHTML = snakefields.length;
	document.all(name).style.width = fw;
	document.all(name).style.left = fields[snakefields[num-1]["y"]][snakefields[num-1]["x"]]["x"];
	document.all(name).style.top = fields[snakefields[num-1]["y"]][snakefields[num-1]["x"]]["y"];
}

function eat()
{
f=0;
futterx=random2(0,fax-1);
futtery=random2(0,fay-1);
	while (f<=snakefields.length-1)
	{
		if (snakefields[f]["x"]==futterx&&snakefields[f]["y"]==futtery) { eat(); return; }
		f++;
	}
	for (wa=0;wa<walls.length;wa++)
		{
		if (futtery==walls[wa]["y"]&&futterx==walls[wa]["x"]) { eat(); return; }
		}
	document.all('display').innerHTML = "x: "+futterx+"; y: "+futtery;
	//alert (futterx+"; "+futtery);
	document.all("futter").style.left = fields[futtery][futterx]["x"];
	document.all("futter").style.top = fields[futtery][futterx]["y"];
}

var pau=1;
function pause()
{
if (pau==1) { window.clearTimeout(timerid);
window.clearTimeout(timerid_timer);
 pau=2; }
else { move(); timer('weiter','no'); pau=1;}
}

function points()
{
p++;
document.all('display').innerHTML = "Punkte: "+p;
}


// #### Wände ####
function wall()
{
for (f=1;f<levels[level]["wall"].length;f++)
	{
	w_number=walls.length;
	walls[w_number]=new Array();
	walls[w_number]['x']=levels[level]["wall"][f]['x'];
	walls[w_number]['y']=levels[level]["wall"][f]['y'];
	walls[w_number]['id']="wall_f"+w_number;
	document.all("wall").innerHTML += "<img src='"+bilder["wall1"]+"' class='feld' id='"+walls[w_number]['id']+"'>"; 
	document.all(walls[w_number]['id']).style.width = fw;
	document.all(walls[w_number]['id']).style.left = fields[walls[w_number]['y']][walls[w_number]['x']]["x"];
	document.all(walls[w_number]['id']).style.top = fields[walls[w_number]['y']][walls[w_number]['x']]["y"];
	}
}

// #### Timer für Sonderfutter ####
function timer(was,zustand)
{
next_zustand=zustand;
day = new Date();
switch (was) {
	case "beginn":
		s_timer_start=day.getTime();
		timerid_timer=setTimeout('timer("weiter",next_zustand)',abstand_timer);
		break;
	case "weiter":
		s_timer_now=day.getTime();
		time=Math.round((s_timer_now-s_timer_start)/1000);
		//window.status=time;
		switch (next_zustand) {
			case "no":
				if (time>=s_futter_time*2) { s_new(); return;}
				break;
			case "eat":
				if (time>=s_futter_time) { window.status='stop'; 
					switch (s_futter["n"]) {
						case 0: 
							speed=speed*2; 
							//window.status=speed;
							break;
						case 1:
							go = 1;
							break;
						case 2:
							
							break;
						default:
							fehler('timer - case: eat','s_futter["n"]='+s_futter["n"]);
							}
						timer('beginn','no');
						return; 
						}
				break;
			case "yes":
				if (time>=s_futter_time) { s_out(); return;}
				break;

			}
		timerid_timer=setTimeout('timer("weiter",next_zustand)',abstand_timer);	
	}
}

function s_new()
{
s_futter["n"]=random2(0,s_funktionen);
s_futter["x"]=random2(0,fax-1);
s_futter["y"]=random2(0,fay-1);
var t=test_fields(s_futter["x"],s_futter["y"]);
switch (t) {
	case "f_s_futter":
		break;
	case "r":
		break;
	default:
		s_new();
		break;
		return;
}
document.all('s_futter').src = 'ob'+s_futter["n"]+'.gif';
document.all('s_futter').style.visibility='visible';
document.all('s_futter').style.left = fields[s_futter["y"]][s_futter["x"]]["x"]
document.all('s_futter').style.top = fields[s_futter["y"]][s_futter["x"]]["y"]
timer('beginn','yes');
}

function s_out()
{
s_futter["x"]=0-1;
s_futter["y"]=0-1;
document.all('s_futter').style.visibility='hidden';
timer('beginn','no');
}

function s_eat()
{
s_out();
//window.status=s_futter["n"];
window.clearTimeout(timerid_timer);
switch (s_futter["n"]) {
	case 0:
		speed=speed/2;
		window.status='los';
		timer('beginn','eat');
		break;
	case 1:
		go=2;
		window.status='los';
		timer('beginn','eat');
		break;
	default:
		fehler('s_eat','switch s_futter:'+s_futter["n"]+'; 0 oder 1 möglich');
	}
}


function random2(min,max)
{
var wert = -1;
while (wert<min)
{
wert=Math.floor((max+1)*(Math.random()));
}
   return wert;
}

function test_fields(posx,posy)
{
for (x=0;x<=snakefields.length-1;x++) 
		{
		if (posy==snakefields[x]["y"]&&posx==snakefields[x]["x"]) {  return 'f_snake'; }
		}
for (wa=0;wa<walls.length;wa++)
		{
		if (posy==walls[wa]["y"]&&posx==walls[wa]["x"]) { return 'f_wall'; }
		}
if (posy==futtery&&posx==futterx) {  return 'f_futter'; }
if (posy==s_futter["y"]&&posx==s_futter["x"]) {  return 'f_s_futter'; }
return 'r';
}
function loose()
{
alert ("Verloren! Zum Neustart OK drücken.");
restart();
}
function fehler(wo,detail)
{
alert("Es ist ein unerwarteter Fehler in Function "+wo+" aufgetreten! Bitte starten Sie das Programm neu! Details: "+ detail);
}
// #### Taste ####
document.onkeydown = TasteGedrueckt;