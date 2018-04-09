$(document).ready(function(){
  $('.makePost').on('click', createPost);
});

$(document).ready(function(){
  $('.postDelete').on('click', deletePost);
});

$(document).ready(function(){
  $('.titleEdit').on('click', editTitle);
});

$(document).ready(function(){
  $('.postEdit').on('click', editPost);
});

function createPost(){
  var titlepost = prompt('Post title:', '');
  var bodypost = prompt('Post body:', '');

  $.ajax({
    type: 'POST',
    url: '/blogposts/:id'+$(this).data().id,
    data: {
      title: titlepost,
      post: bodypost
    }
  }).done(function(response){
    window.location.replace('/');
  }).fail(function(response){
    console.log("An Error Occured");
  });
}

function deletePost(){
  var confirmation = confirm("Are you sure?");

  if(confirmation){
    $.ajax({
      type: 'DELETE',
      url: '/blogposts/delete/'+$(this).data().id
    }).done(function(response){
      window.location.replace('/');
    });

    window.location.replace('/');
    } else{
      return false;
  }
}

function editTitle(){
    var change = prompt('Change title to:', '');

    while(change === '' || change === null){
      return;
    }
    $.ajax({
      type:'PUT',
      url: '/blogposts/update/'+$(this).data().id,
      data: {title: change}
    }).done(function(response){
      console.log(response);
      window.location.replace('/editPost');
    }).fail(function(response){
      console.log("An Error Occured");
    });
}

function editPost(){
    var change = prompt('Change post:', '');

    while(change === '' || change === null){
      return;
    }
    $.ajax({
      type:'PUT',
      url: '/blogposts/update/'+$(this).data().id,
      data: {post: change}
    }).done(function(response){
      console.log(response);
      window.location.replace('/editPost');
    }).fail(function(response){
      console.log("An Error Occured");
    });
}
