$(() => {
  console.log('Ready!');
  $(".login").on('click', 'button', login);
});

function login(event) {
  event.preventDefault()
  console.log("Click")

  $.get('/users').done(data => {
    let user = $('#username').val();
    let password = $('#pass').val();
    let correct = data.some(val => {
        return val.user === user && val.password === password
    });
     if (correct) {
      $('.loginArea').addClass('hide')
      let  $messageArea = $('#messageArea').clone()
      $messageArea.css('display', 'initial')
      $messageArea.addClass('container')
      $('body').append($messageArea)
     } else
      alert('Wrong username or password. Try again!')
     
    }).fail( err => {
    console.log('Error getting users\n')
  });
}

