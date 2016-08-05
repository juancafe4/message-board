$(() => {
  console.log('Ready!');
  $(".loginArea").on('click', 'button', login);

  $('#sendMessage').click(sendMessage);
});

function login(event) {
  event.preventDefault()
  console.log("Click")

  $.get('/users').done(data => {
    let user = $('#username').val();
    let password = $('#pass').val();
    let userId
    let correct = data.some(val => {
        if (val.user === user && val.password === password) {
          userId = val.id
          return true;
        }
        return false;
    });
     if (correct) {
      $('.loginArea').addClass('hide')
      // let  $messageArea = $('#messageArea').clone()
      // $messageArea.css('display', 'initial')
      // $('body').append($messageArea)
      $('#messageArea').css("display", "initial")
      $('.userName').text($('#username').val())
      $('.userName').data('userId', userId)
      console.log(userId)

      $.get('/messages').done(data => {
        console.log('data ', data)
        let $trs = data.map(val => {
          let $tr = $('#template').clone()
          $tr.removeAttr('id');
          $tr.find('.time').text(val.time)
          $tr.find('.message').text(val.message)
          $tr.data('id', val.id);
          $tr.data('userId', val.userId)

          return $tr;
        })
        $('#messageList').append($trs)
      }).fail(err => {
        console.log('Error getting messages')
      });
     } else
      alert('Wrong username or password. Try again!')
     
    }).fail( err => {
    console.log('Error getting users\n')
  });
}

function sendMessage(event) {
 let content = $('#textarea1').val()

 if (content) {
  let userId= $('.userName').data('userId')
  let obj ={userId: userId, message: content}
  $.post( "/messages", obj)
  .done(function(data) {
    console.log('Success posting ', data)
    let $tr = $('#template').clone()
    $tr.removeAttr('id');
    $tr.find('.time').text(data.time)
    $tr.find('.message').text(data.message)
    $tr.data('id', data.id);
    $tr.data('userId', data.userId)
    $('#messageList').append($tr)
    $('#textarea1').val('')
  }).fail(err => {
    console.log('Error posting')
  });
 } else alert('Message blank!')
}

