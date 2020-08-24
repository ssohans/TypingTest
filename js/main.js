var start = false;
var timer = 0;
var charTyped = 0;
var correct = 0;
var stringStory;
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

//game finished function

function finish(){
    clearInterval(interval);
    $('.timer').hide();
    var txt = $("textarea").val();
    $("textarea").prop('disabled', true);
    var word = txt.spilt(" ");
    var cpm = (charTyped/min).toFixed(0);
    var wpm = (word.length/min).toFixed(0);
    $('.curr_wpm').text(wpm);
    $('.curr_cpm').text(cpm);
    $('.wpm').show();
    $('.cpm').show();
}

$(document).ready(function(){

  // jQuery methods go here...
  // function to change radio time color on select
  $(".zz").click(function(){
    $('.time label').css('color','grey');
    var id = $('.zz:checked').attr('id');
    var x = 'label[for="'+id+'"]';
    $(x).css("color","blue");
});
  // function for new interface
  
  $("#start").click(function(){

    min = $('.zz:checked').val();
    story = $('select.opt').children('option:selected').val();
    if(!min){
        $('.errormin').show();
    }
    else{
        $('.para, .time').hide();
        $(this).hide();
        $()
        $('.box').show();
        $('.words').show();
        $('.calculations').show();
        var t = (min*60)+'s';
        $('.curr_time').text(t);
        var file = 'res/'+story+'.txt';
        $.get(file, function(data) {
            stringStory = data;
            for(var i=0;i<data.length;i++){
                $('.wordcontainer').append('<span>'+data[i]+'</span>');
            }
            
        });
        
    }
});

  $('textarea').on("keydown", function (e) {
    if (e.which === 8 && !$(e.target).is("")) {
        e.preventDefault();
    }
});

  // start game when started type in textarea and check each charecter typed

  $('textarea').keypress(function(e) {
        if(!start){
          interval = setInterval(time_count,1000);
          start = true;
          timer = min*60;
        }
        // ++charTyped;
        var code = e.keyCode || e.which;
        var res = String.fromCharCode(code);
        var char = $('.wordcontainer span').eq(charTyped).text();
        if(code==8){
            return ;
        }
        if(char === res){
            $('.wordcontainer span').eq(charTyped).addClass('correct');
            correct++;
        }else{
            $('.wordcontainer span').eq(charTyped).addClass('wrong');
        }
        charTyped++;
        var acu  = ((correct/charTyped)*100).toFixed(2);
        $('.curr_accuracy').text(acu);
        var err = (charTyped-correct);
        $('.curr_errors').text(err);
        if(charTyped==stringStory.length){
            finish();
        }

    });


});

