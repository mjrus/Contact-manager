var starRatingNo = 0;
var messageNo = 0;





var toggle  = document.getElementById("toggle");
var content = document.getElementById("content");

/*var load = function(){
    var i = 1;
    while(true){
       var messageStorage = "message" + i;
       var reviewIndex = "starRating" + i;
       if(localStorage.getItem(messageStorage) == null||localStorage.getItem(reviewIndex) == null)break;
       var mesg = localStorage.getItem(messageStorage);
       var star = localStorage.getItem(reviewIndex);
       makeReview(star, mesg);
       i++;
        
    }
}*/
toggle.addEventListener("click", function(){
  content.classList.toggle("appear");
}, false);




var toggle2 = document.getElementById("friendsButton");
var content2 = document.getElementById("friendsList");

toggle2.addEventListener("click", function(){
    content2.classList.toggle("show");
},false);


var toggle3 = document.getElementById("friendsButton");
var content3 = document.getElementById("friendsButton");

toggle3.addEventListener("click", function(){
    content3.classList.toggle("move");
  
    
}, false);


var toggle5 = document.getElementById("closeJPG");
var content5 = document.getElementById("addContactScreen");

toggle5.addEventListener("click", function(){
    content5.classList.toggle("show");
}, false);

var toggle7 = document.getElementById("closeJPG2");
var content7 = document.getElementById("addGroupScreen");

toggle7.addEventListener("click", function(){
    content7.classList.toggle("show");
}, false);

var toggle8 = document.getElementById("settingsIMG");
var content8 = document.getElementById("userSettings");

toggle8.addEventListener("click", function(){
    window.location.replace("userSettings.html");
}, false);

var toggle9 = document.getElementById("closeJPG3");
var content9 = document.getElementById("userSettings");

toggle9.addEventListener("click", function(){
    content9.classList.toggle("show");
}, false);

var toggle10 = document.getElementById("info");
var content10 = document.getElementById("About");

toggle10.addEventListener("click", function(){
    content10.classList.toggle("show");
}, false);

var toggle11 = document.getElementById("closeJPG4");
var content11 = document.getElementById("About");

toggle11.addEventListener("click", function(){
    content11.classList.toggle("show");
}, false);

var toggle12 = document.getElementById("feedbackPNG");
var content12 = document.getElementById("giveFeedback");

toggle12.addEventListener("click", function(){
    content12.classList.toggle("show");
}, false);

var toggle13 = document.getElementById("closeJPG5");
var content13 = document.getElementById("giveFeedback");

toggle13.addEventListener("click", function(){
    content13.classList.toggle("show");
}, false);

var toggle14 = document.getElementById("contactus");
var content14 = document.getElementById("contactUsDiv");

toggle14.addEventListener("click", function(){
    content14.classList.toggle("show");
}, false);

var toggle15 = document.getElementById("closeJPG6");
var content15 = document.getElementById("contactUsDiv");

toggle15.addEventListener("click", function(){
    content15.classList.toggle("show");
}, false);

var toggle16 = document.getElementById("blockIMG");
var content16 = document.getElementById("reviewList");

toggle16.addEventListener("click", function(){
    content16.classList.toggle("show");
}, false);

var toggle17 = document.getElementById("closeJPG7");
var content17 = document.getElementById("reviewList");

toggle17.addEventListener("click", function(){
    content17.classList.toggle("show");
}, false);




$(document).ready(function () {
    var comment = $('form#enquiry textarea'),
        counter = '',
        counterValue = 140, //change this to set the max character count
        minCommentLength = 10, //set minimum comment length
        $commentValue = comment.val(),
        $commentLength = $commentValue.length,
        submitButton = $('form#enquiry input[type=submit]').hide();
  
    $('form#enquiry').prepend('<span class="counter"></span>').append('<p class="info">Min length: <span></span></p>');
    counter = $('span.counter');
    counter.html(counterValue); //display your set max length
    comment.attr('maxlength', counterValue); //apply max length to textarea
    $('form#enquiry').find('p.info > span').html(minCommentLength);
    // everytime a key is pressed inside the textarea, update counter
    comment.keyup(function () {
      var $this = $(this);
      $commentLength = $this.val().length; //get number of characters
      counter.html(counterValue - $commentLength); //update counter
      if ($commentLength > minCommentLength - 1) {
        submitButton.fadeIn(200);
      } else {
        submitButton.fadeOut(200);
      }
    });
  });

$('#enquiry').submit(function(){
    
        var message = document.getElementById("message").value;
        var starRating = document.querySelector('input[name="rating"]:checked').value;
        
        makeReview(starRating, message);
});

var makeReview = function(starRating, message){
        messageNo++;
        var messageIndex = "message" + messageNo;
        localStorage.setItem(messageIndex, message);
        
        
        starRatingNo++;
        localStorage.setItem("starRating" + starRatingNo, starRating);
      
    
        if(starRating == 1)
        {
        starRating ="★";
        }
        else if(starRating == 2){
                starRating ="★★";
        }
        else if(starRating == 3){
             starRating ="★★★";
        }
        else if(starRating == 4){
            starRating ="★★★★";
        }
        else{
             starRating ="★★★★★";
        }
    
  
    $('#reviewContainer').append(
    $('<div</div>', {"class": 'reviewC'})
    .append($('<p></p>', {"class": 'reviewRating'}).append(starRating))
    .append($('<div></div>',{"class": 'reviewBody'}).append(message))
    );
}


/*$(function(){
    $(window).scroll(function(){
        if($(this).scrollTop() > 75){
            $("#container2:hidden").css('visibility','visible');
            $("container2:hidden").fadeIn('slow');
        }
        else {
            $("container2:visible").fadeOut('slow');
        }
    });
}); */




 /* if(document.querySelector('input[name="rating"]:checked').value === 1)
 {
                $('.reviewRating').append("★");
        else if(document.querySelector('input[name="rating"]:checked').value === 2){
                $('.reviewRating').append("★★");
        }
        else if(document.querySelector('input[name="rating"]:checked').value === 3){
             $('.reviewRating').append("★★★");
        }
        else if(document.querySelector('input[name="rating"]:checked').value === 4){
            $('.reviewRating').append("★★★★");
        }
        else{
             $('.reviewRating').append("★★★★★");
        }
 }
*/
