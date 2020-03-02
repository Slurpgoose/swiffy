
$(document).ready(function(){
    $(".btn").click(function(){
        let task = $(".user-input").val();
        let taskHTML = createTask(task);
        $(".new").append(taskHTML);
        $(".user-input").val("");
        getDogImage();
    });
  });

  function createTask(redRidingHood){
      return `<li class="list-group-item">${redRidingHood}</li>`
  }
  function getDogImage() {
    $.get( "https://dog.ceo/api/breeds/image/random").then(r => {
        console.log(r.message)
        var img = `<img src="${r.message}" alt="Smiley face" height="42" width="42">`
        $(".new").append(img);
    })
  }