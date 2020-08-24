
var arr = ["qweeeeee eeeeeeeeeeeee eeeeeeeeeeee eeeeeeeee eeeeeeeee eeeeeeeeeeeee  eeeeeeeeeeeeeee eeeeeeeeeeeee eeeeeeeeeeeee eeeeeeeeeeeeeee eeeeeeeeeee eeeeeeeeee eeeeeeeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeeeeee eeeeeeeeeeeeee eeeeeeeer eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeereereeeer","asdfsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss","jkl","mnop"];
var start = false;
var timer = 0;
var charTyped = 0;

//interval function to update timer
function time_count() {
    timer--;
    var t = timer+'s';
    $('.curr_time').text(t);
    if(timer==0){
        $("textarea").prop('disabled', true);
    }
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
    var min,story;
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
            for(var i=0;i<arr[story-1].length;i++){
                $('.wordcontainer').append('<span>'+arr[story-1][i]+'</span>');
            }
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
          setInterval(time_count,1000);
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
        }
        else{
            $('.wordcontainer span').eq(charTyped).addClass('wrong');
        }

        charTyped++;
        


    });


});

