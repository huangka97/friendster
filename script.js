
$("#contact_form2").hide();
$("#contact_form1").hide();
$('.postContainer').hide();
//$('.replyInput').hide();
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
      console.log($(data).id);
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
        //console.log(value);
        
        $.each(value.comments,function(index,innerComment){
          var innerconvertedDate=new Date(innerComment.createdAt);
          //console.log(innerComment);
          additionalComments+=`<div class="userNAME1">
          <i><b>${innerComment.poster.name}</b></i>
          
          <div class='time1'>
            <p class="innerdate"><i>INNER DATE: ${innerconvertedDate.toString()}</i><i class="date1">1/20/2017</i></p>
              <p class="subcomments">INNER COMMENT: ${innerComment.content}</p>
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
      <button type="button" class="likeButton " id=${value._id}>Like</button>
      
      <button type="button" id=${value._id} class="replyButton">Reply</button>
      <div class="REPLYCOMMENT col-lg-4 col-lg-offset-4 form-group">
          <input style="width: 50%" name="email" placeholder="Reply" class="form-control"  id="replyInput" type="text">
      </div>
    </div>
</div>
</div>`;
  	$("#post-container").append(html);
			})		

	}


})
})

$("#commentPostButton").on("click",function(event){
  //console.log()

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
  //console.log($(this));
  var identity= $(this).attr("id");
  //console.log(ident ity);
  /*var id=$(this).id;
  console.log(id);*/
  $.ajax({
    url:`https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/${identity}`,
    type:"GET",
    data:{
      token:localStorage.getItem('token')
    },
    error: function(err){
      alert("Sorry! Please try again");
    },
    success:function(resp){
      console.log(resp);
    }

  })
  
})
$("body").on("click",".replyButton",function(event){
  event.preventDefault();

  var identity1= $(this).attr("id");
  //console.log($("#replyInput").val());
  var input=identity1;
  var parent=$(this).parent();
  var actualCommentParent=$(parent).find("#replyInput").val();
  //console.log(actualCommentParent);
  
  $.ajax({

    url:`https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/${identity1}`,
    type:"POST",
    data:{
      token:localStorage.getItem('token'),
      content: actualCommentParent
    },
    error: function(err){
      alert("Sorry! Please try again Reply Button Error");
    },
    success:function(resp){
      //console.log(resp);
      console.log(identity1);
      console.log(actualCommentParent);
    }


  })
  

  

})



















