
var eqArgs = [];

window.onload = function () {

  var $title = $('<h2>Calculator</h2>');
  $('body').append($title);
  $title.css({
    'text-align' : 'center'
  });

  var $calcForm = $('<form id = "calcForm" style="margin", "auto">');
  $('body').append($calcForm);
  $calcForm.css({
        'display' : 'block',
        'margin' : 'auto',
        'text-align' : 'center'
    });

  var $textField = $('<input name = "textField" type = "text" placeholder = "OUTPUT"><br>');
  $('#calcForm').append($textField);

  addOperators();
  addNumbers();

  var $equalsbutton =('<button name = "equalsbutton" type = "button" value = "EQUALS">EQLS</button>');
  $('#calcForm').append($equalsbutton);
  $('#calcForm :button[name = equalsbutton]').click(function(e){
    eqArgs.push($('#calcForm :input[type=text]').val());
    $('#calcForm :input[type=text]').val(equalsFunction(eqArgs));
    eqArgs = [];
  });

}

var equalsFunction = function(args){
  console.log("in EF, args: "+args);

  if(!isNaN(args) && args.length < 3){

    console.log("in first if " + args[0]);
    return args[0];
  }else{
    for(var i = 0 ; i < args.length ; i++){
      console.log("in for loop, index = "+i);
      if(!isNaN(args[i])){
        console.log("in number");
        continue;
      }else if(typeof args[i] === 'function'){
        console.log("in function");
        if(!isNaN(args[i+1])){
          var result = args[i](args[i-1], args[i+1]);
          console.log("after result calc "+ args);
          args.unshift(result);
          console.log("after shift " + args);
          args.splice(1, 3);
          console.log("after splice: "+ args);
          return equalsFunction(args);
        } else {
          console.log("in error 1");
          return "ERROR"
        }
      }else{
        console.log("in error 2");
        return "ERROR";
      }
    }
  }
}

var addF = function(x, y){
  if(!isNaN(x) && !isNaN(y)){
    return (1*x)+(1*y);
  } else {
    return "ERROR";
  }
}
var subF = function(x, y){
  if(!isNaN(x) && !isNaN(y)){
    return x-y;
  } else {
    return "ERROR";
  }
}
var mulF = function(x, y){
  if(!isNaN(x) && !isNaN(y)){
    return x*y;
  } else {
    return "ERROR";
  }
}
var divF = function(x, y){
  if(!isNaN(x) && !isNaN(y)){
    return x/y;
  } else {
    return "ERROR";
  }
}

$("body").keydown(function(e){
  var $numbs = $('#calcForm :input[type = button]');

  console.log(e.key);

  $numbs.each(function(index){
    if((!isNaN($(this).val()) || $(this).val() === ".") && e.key === $(this).val()){
      var curText = $('#calcForm :input[type=text]').val();
      $('#calcForm :input[type=text]').val(curText+$(this).val());
    }
  });

  if(e.key === "c"){
    $('#calcForm :input[type=text]').val('');
    eqArgs = [];
  }
  if(e.key === "+"){
    eqArgs.push($('#calcForm :input[type=text]').val());
    eqArgs.push(addF);
    $('#calcForm :input[type=text]').val('');
  }
  if(e.key === "-" && $('#calcForm :input[type=text]').val().length < 1){
    $('#calcForm :input[type=text]').val(curText+'-');
  } else if (e.key === "-"){
    eqArgs.push($('#calcForm :input[type=text]').val());
    eqArgs.push(subF);
    $('#calcForm :input[type=text]').val('');
  }
  if(e.key === "/"){
    eqArgs.push($('#calcForm :input[type=text]').val());
    eqArgs.push(divF);
    $('#calcForm :input[type=text]').val('');
  }
  if(e.key === "*" || e.key === "x"){
    eqArgs.push($('#calcForm :input[type=text]').val());
    eqArgs.push(mulF);
    $('#calcForm :input[type=text]').val('');
  }
  if(e.which === 13){
    eqArgs.push($('#calcForm :input[type=text]').val());
    $('#calcForm :input[type=text]').val(equalsFunction(eqArgs));
    eqArgs = [];
  }

});

var addOperators = function(){

  var $clearbutton =('<button name = "clearbutton" type = "button" value = "c">C</button>');
  $('#calcForm').append($clearbutton);
  $('#calcForm :button[name = clearbutton]').click(function(e){
      $('#calcForm :input[type=text]').val('');
      eqArgs = [];
  });

  var $addButton =('<button name = "addButton" type = "button" value = "+">+</button>');
  $('#calcForm').append($addButton);
  $('#calcForm :button[name = addButton]').click(function(e){
    eqArgs.push($('#calcForm :input[type=text]').val());
    eqArgs.push(addF);
    $('#calcForm :input[type=text]').val('');
  });

  var $subbutton =('<button name = "subbutton" type = "button" value = "-">-</button>');
  $('#calcForm').append($subbutton);
    $('#calcForm :button[name = subbutton]').click(function(e){
      var curText = $('#calcForm :input[type=text]').val();
      if($('#calcForm :input[type=text]').val().length < 1){
      $('#calcForm :input[type=text]').val(curText+'-');
    } else {
      eqArgs.push($('#calcForm :input[type=text]').val());
      eqArgs.push(subF);
      $('#calcForm :input[type=text]').val('');
    }
    });

  var $divbutton =('<button name = "divbutton" type = "button" value = "/">÷</button>');
  $('#calcForm').append($divbutton);
  $('#calcForm :button[name = divbutton]').click(function(e){
    eqArgs.push($('#calcForm :input[type=text]').val());
    eqArgs.push(divF);
    $('#calcForm :input[type=text]').val('');
  });

  var $mulbutton =('<button name = "mulbutton" type = "button" value = "*">×</button>');
  $('#calcForm').append($mulbutton);
  $('#calcForm :button[name = mulbutton]').click(function(e){
    eqArgs.push($('#calcForm :input[type=text]').val());
    eqArgs.push(mulF);
    $('#calcForm :input[type=text]').val('');
  });

  var $dotbutton =('<button name = "dotbutton" type = "button" value = ".">.</button><br>');
  $('#calcForm').append($dotbutton);
  $('#calcForm :button[name = dotbutton]').click(function(e){
    var curText = $('#calcForm :input[type=text]').val();
    $('#calcForm :input[type=text]').val(curText+'.');
  });

}

var addNumbers = function(){

  var $zerob =('<button name = "zerob" type = "button" value = "0">0</button>');
  $('#calcForm').append($zerob);

  var $oneb =('<button name = "oneb" type = "button" value = "1">1</button>');
  $('#calcForm').append($oneb);

  var $twob =('<button name = "twob" type = "button" value = "2">2</button>');
  $('#calcForm').append($twob);

  var $threeb =('<button name = "threeb" type = "button" value = "3">3</button>');
  $('#calcForm').append($threeb);

  var $fourb =('<button name = "fourb" type = "button" value = "4">4</button>');
  $('#calcForm').append($fourb);

  var $fiveb =('<button name = "fiveb" type = "button" value = "5">5</button><br>');
  $('#calcForm').append($fiveb);

  var $sixb =('<button name = "sixb" type = "button" value = "6">6</button>');
  $('#calcForm').append($sixb);

  var $sevenb =('<button name = "sevenb" type = "button" value = "7">7</button>');
  $('#calcForm').append($sevenb);

  var $eightb =('<button name = "eightb" type = "button" value = "8">8</button>');
  $('#calcForm').append($eightb);

  var $nineb =('<button name = "nineb" type = "button" value = "9">9</button>');
  $('#calcForm').append($nineb);


  var $numbs = $('#calcForm :input[type = button]');

  $numbs.each(function(index){
    if(!isNaN($(this).val())){
      $(this).click(function(e){
        var curText = $('#calcForm :input[type=text]').val();
        $('#calcForm :input[type=text]').val(curText+$(this).val());
      });
    }
  });

}
