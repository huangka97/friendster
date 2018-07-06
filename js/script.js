
$("#contact_form2").hide();
$("#contact_form1").hide();
//$('.postContainer').hide();
//$('.newsfeedbutton').hide();
//$("#newsfeed").hide();
$('.registerButton').on('click', function(event) {
  event.preventDefault();
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
    type: "POST",
    data: {
      fname: $('#firstNameInput').val(),
      lname: $('#lastNameInput').val(),
      email: $('#emailInput').val(),
      password: $('#passwordInput').val()
    },
    error: function(err){
    	alert("Sorry! Please try again");
    },
    success: function(resp) {
    	 console.log(resp);
     	$("#contact_form1").hide();
     	$("#contact_form2").show();
      
    }
  });
});



$('.loginButton').on('click',function(event){
	event.preventDefault();
	$.ajax({
		url:"https://horizons-facebook.herokuapp.com/api/1.0/users/login",
		type:"POST",
		data:{
			email:$('#emailInput2').val(),
			password:$('#passwordInput2').val()

		},
		error: function(err){
    		alert("Sorry! Please try again");
    	},
		success: function(data){
			//console.log(data);
			localStorage.setItem('token', data.response.token);
			$("#contact_form2").hide();
			$("#newsfeed").show();
			$('.postContainer').show();
			$('.newsfeedbutton').show();
		}
		
	});
})
$('.newsfeedbutton').on('click',function(event){
	event.preventDefault();
	$.ajax({
		url:"https://horizons-facebook.herokuapp.com/api/1.0/posts/:pages",
		type:"GET",
		data:{
			token:localStorage.getItem('token')
		},
		error: function(err){
			alert("Sorry! Please try again");

		},
		success:function(resp){
			//console.log(resp);

			var actualData=(resp.response);
			$.each(actualData,function(index,value){
				//console.log(value);
        //console.log(value.comments);
        var additionalComments=``;
        
        $.each(value.comments,function(index,innerComment){
          var innerconvertedDate=new Date(innerComment.createdAt);
          additionalComments+=`<div class="userNAME1">
          <i><b>${innerComment.poster.name}</b></i>
          <div class='time1'>
            <p class="innerdate"><i>INNER DATE: ${innerconvertedDate.toString()}</i><i class="date1">1/20/2017</i></p>
              <p class="subcomments">INNER COMMENT: ${value.content}</p>
            </div>
          </div>`;
        });
        var convertedDate=new Date(value.createdAt);
				var html=
				`<div class="postContainer col-xs-6 col-xs-offset-3">
  				<div>
    <div class="userNAME">
      <b>${value.poster.name}</b><br/> 
    </div>
    <div class='time'>
      <i>${convertedDate.toString()}</i></div>
    <div class="comment">
      <b>Main Comment:</b> ${value.content}
    </div>
    <div class="repliesandlikes">
      <b>Replies: ${value.comments.length}, Likes: ${value.likes.length}</b>
      <hr>
      <div class="replies">
        ${additionalComments}
      </div>
      <button type="button" id=${value.poster.id} class="likeButton ">Like</button>

      <button type="button" class="replyButton">Reply</button>
    </div>
</div>
</div>`;
	$("#post-container").append(html);
			})			
	}
})
})

$("#commentPostButton").on("click",function(event){
  event.preventDefault();
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    type: "POST",
    data: {
      token:localStorage.getItem('token'),
      content:$("#CommentInput").val()
    },
    error: function(err){
      alert("Sorry! Please try again");
    },
    success: function(resp) {
       //console.log(resp);
      
    }
  });

})

$("body").on("click",".likeButton",function(event){
  event.preventDefault();
  
  $.ajax({
    url:"https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/"+$(this).id,
    type:"GET",
    data:{
      token:localStorage.getItem('token'),
    },
    error: function(err){
      alert("Sorry! Please try again");
    },
    success:function(resp){
      console.log(resp);
    }

  })
  
})



















