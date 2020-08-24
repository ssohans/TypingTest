$(document).ready(function(){
   
  // jQuery methods go here...
  // function to change radio time color on select
    $(".zz").click(function(){
        $('.time label').css('color','grey');
        var id = $('.zz:checked').attr('id');
        var x = 'label[for="'+id+'"]';
        $(x).css("color","blue");
    });
  // function to select time and paragraph value
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
            $('.box').show();
            $('.words').show();
            // $('.box textarea').val('');
        }
    });
    


});