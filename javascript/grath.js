function el(id){
    //== сокращение
    return document.getElementById(id);
}

function clear_canv(){
    ctx.clearRect(0, 0, canv.width, canv.height);
}

function acos(x){
    return Math.acos(x);
}

function acosh(x){
    return Math.acosh(x);
}

function asinh(x){
    return Math.asinh(x);
}

function asin(x){
    return Math.asin(x);
}

function cos(x){
    return Math.cos(x);
}

function exp(x){
    return Math.exp(x);
}

function atan(x){
    return Math.atan(x);
}

function atanh(x){
    return Math.atanh(x);
}

function log(x){
    return Math.log(x);
}

function sign(x){
    return Math.sign(x);
}

function sin(x){
    return Math.sin(x);
}

function sqrt(x){
    return Math.acos(x);
}

function sqrt(x){
    return Math.acos(x);
}

function tan(x){
    return Math.tan(x);
}



function calc_minmax(){
    x_left = el('x_left').value;
    x_right = el('x_right').value;
    var st = el('func').value;

    var x = x_left;
    var dx = (x_right - x_left)/200;
    var y = eval(st);
    var y_min = y;
    var y_max = y;

    for(num=1; num <200; num++){
        x = Number(x) + dx;
        y = eval(st);
        if (y> y_max) y_max = y;
        if (y< y_min) y_min = y;

    el('func_min').value = y_min;
    el('func_max').value = y_max;   
    }

}

function get_params(){
    x_left = el('x_left').value;
    x_right = el('x_right').value;
    y_down = el('y_down').value;
    y_up = el('y_up').value;
}


function x2canv(x){
    return 20 + (x-x_left)*540/(x_right - x_left);
}

function y2canv(y){
    return 380 - (y-y_down)*340/(y_up - y_down);
}

function draw_grath(){
    x_left = el('x_left').value;
    x_right = el('x_right').value;
    y_down = el('y_down').value;
    y_up = el('y_up').value;
    st = el('func').value;
    pen_color = el('pencolor').value;
    var width = 2;
    var dx = (x_right - x_left)/200;

    var x = x_left;
    var y = eval(st);
    var x_canv = x2canv(x);
    var y_canv = y2canv(y);

    ctx.beginPath();
    ctx.moveTo(x_canv, y_canv);
    ctx.lineWidth = width;
    ctx.strokeStyle = pen_color;

    for(num = 1; num <200; num++){
        x = Number(x) + dx;
        y = eval(st);

        x_canv = x2canv(x);
        y_canv = y2canv(y);
        ctx.lineTo(x_canv, y_canv);
    }
    ctx.stroke();


    y0_canv = 200
    if ((y_up >= 0)&&(y_down<=0)){
        y0_canv = y2canv(0);
    } else if(y_up < 0){
        y0_canv = 10;
    } else if(y_down > 0){
        y0_canv = 390;
    }
    ctx.beginPath();
    ctx.moveTo(20, y0_canv);
    ctx.lineTo(580, y0_canv);
    ctx.lineWidth = width;
    ctx.strokeStyle = 'black';
    ctx.stroke();


    x0_canv = 300
    if ((x_right >= 0)&&(x_left<=0)){
        x0_canv = x2canv(0);
    } else if(x_right < 0){
        x0_canv = 590;
    } else if(x_left > 0){
        x0_canv = 10;
    }
    ctx.beginPath();
    ctx.moveTo(x0_canv, 10);
    ctx.lineTo(x0_canv, 390);
    ctx.lineWidth = width;
    ctx.strokeStyle = 'black';
    ctx.stroke();
}


function canv2x(x_canv){
    x = Number(x_left) + (x_canv-20)*(x_right - x_left)/540;
    return x.toString().substr(0,5);
}

function canv2y(y_canv){
    y = Number(y_down) + (380 - y_canv)*(y_up - y_down)/340;
    return y.toString().substr(0,5);
}



function hndl_move(ev) {
    var cRect = canv.getBoundingClientRect() ;
    var x_canv = Math.round(ev.clientX - cRect.left) ;
    var y_canv = Math.round(ev.clientY - cRect.top) ;
    var x = canv2x(x_canv) ;
    var Y = canv2y(y_canv) ;
    // var y = eval(st)
    // var Y = y.toString().substr(0,5);

    ctx.clearRect(520, 10, 70, 70);
    ctx.fillText("X: "+x, 520, 30);
    ctx.fillText("Y: "+Y, 520, 50);
}

// function

function onLoadHandler() {
    canv = el('canv')
    canv.addEventListener('mousemove', hndl_move);
    ctx = canv.getContext('2d');
    ctx.font = '16px Arial';
    func_color = 'blue';
    get_params();
}

window.onload = onLoadHandler;