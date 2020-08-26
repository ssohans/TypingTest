var start = false;
var timer = 0;
var charTyped = 0;
var correct = 0;
var interval;
var min,story;
//interval function to update timer
function time_count() {
    timer--;
    var t = timer+'s';
    $('.curr_time').text(t);
    if(timer==0){
        finish();
    }
}

//test finished function

function finish(){
    clearInterval(interval);
    $('.timer').hide();
    var txt = $("textarea").val();
    $("textarea").prop('disabled', true);
    var words = txt.split(" ");
    var word = 0;
    for(var i=0;i<words.length;i++){
        if(words[i].length>0) word++;
    }
    var cpm = (charTyped/min).toFixed(0);
    var wpm = (word/min).toFixed(0);
    $('.curr_wpm').text(wpm);
    $('.curr_cpm').text(cpm);
    $('.wpm').show();
    $('.cpm').show();
    $('#home').show();
    $('#stop').hide();
}

$(document).ready(function(){

  // jQuery methods go here...
  // function to change radio time color on select
  $(".zz").click(function(){
    $('.time label').css('color','grey');
    $('.time label').css('background-color','white');
    var id = $('.zz:checked').attr('id');
    var x = 'label[for="'+id+'"]';
    $(x).css("color","black");
    $(x).css("background-color","grey");
});
  // function for new interface
  var container;
  
  $("#start").click(function(){

    min = $('.zz:checked').val();
    story = $('select.opt').children('option:selected').val();
    if(!min){
        $('.errormin').show();
    }else if(!story){
        $('.errorstory').show();
    }else{
        $('.para, .time').hide();
        $(this).hide();
        $()
        $('.box').show();
        $('.words').show();
        $('.calculations').show();
        $('.notice').show();
        var t = (min*60)+'s';
        $('.curr_time').text(t);
        var file = 'res/'+story+'.txt';
        $.get(file, function(data) {
            for(var i=0;i<data.length;i++){
                $('.wordcontainer').append('<span>'+data[i]+'</span>');
            }
            $('.wordcontainer p').hide();
            container = $('.wordcontainer span');
            
        });
        
    }
});

  $('#stop').click(function() {
      finish();
  });

  $('textarea').on("keydown", function (e) {
    if (e.which === 8 && !$(e.target).is("")) {
        e.preventDefault();
    }
});

  // start test when started type in textarea and check each charecter typed
  var c = 259;
  var last = 0;
  $('textarea').keypress(function(e) {

        if(!start){
          $('#stop').show();
          interval = setInterval(time_count,1000);
          start = true;
          timer = min*60;
        }
        // ++charTyped;
        var code = e.keyCode || e.which;
        var res = String.fromCharCode(code);
        var char = container.eq(charTyped).text();
        if(code==8){
            return ;
        }
        container.eq(charTyped).removeClass('focus');
        if(char === res){
            container.eq(charTyped).addClass('correct');
            correct++;
        }else{
            container.eq(charTyped).addClass('wrong');
        }
        charTyped++;
        container.eq(charTyped).addClass('focus');
        var acu  = ((correct/charTyped)*100).toFixed(2);
        $('.curr_accuracy').text(acu);
        var err = (charTyped-correct);
        $('.curr_errors').text(err);
        var v = container.eq(charTyped).offset().top
        v = Math.floor( v-c )
        // console.log(v,c,last);
        if(v>0){
            
            $(".wordcontainer").animate({
                scrollTop: last+v
            }, 0);
            // c = $('.wordcontainer span').eq(charTyped).offset().top;
            last += v;
        }

    });
    $('.wordcontainer').scroll();
    $('#home').click(function() {
        location.reload(true);
    });



});

