var mw = Number("150");
var mh = Number("210"); 
var mb=Number(1);
var fw = Number("15");
var top = Number(80);
var left =Number(80);
var startl=Number(3);
var level="3";
var speed=Number(400);
var border=1;
var futter="eat.gif";
var bilds="snake.gif";

// #### Arrays für Objekte #####
var fields = new Array();
var snakefields = new Array();
var change = new Array();
var walls = new Array();

//#### Bilder ####
var bilder = new Array();
bilder["wall1"] = "wall1.gif";

// #### Sonderfutter zum fressen ####
var s_futter_time=10;
var timerid_timer;
var s_timer_start;
var s_timer_now;
var s_funktionen=1;
var abstand_timer=100;
var s_futter = new Array()
s_futter["n"]="1";
s_futter["x"]="-1";
s_futter["y"]="-1";


var fay;
var fax;
var i; 
var x;
var y;
var f;
var p=0;
var name;
var posx;
var posy;
var futterx;
var futtery;
var timerid;
var richtung="r";
var go = 1;
