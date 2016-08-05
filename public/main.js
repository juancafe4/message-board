$(() => {
  console.log('Ready!');
  $(".loginArea").on('click', 'button', login);

  $('#sendMessage').click(sendMessage);

  $('#messageList').on('click', '.delete', deleteMessage)
});

function login(event) {
  event.preventDefault()
  console.log("Click")

  //Getting all the users
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
          console.log('Getting...id ', $tr.data('id'))
          console.log('Getting...user id ', $tr.data('userId'))
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

function deleteMessage(e) {
  console.log("Delete me bitch")
  let messageId = $(this).closest('tr').data('id')
  let userId = $(this).closest('tr').data('userId')

  console.log('messageId ', messageId)
  console.log('user id ', userId)
  console.log('h3 id', $('.userName').data('userId'))
  if ($('.userName').data('userId') === userId) {
    console.log('We can delete')
  } else alert("You are authorized to delete this message")
  $.ajax(`/messages/${userId}`,  {
    method: 'DELETE',
  })
  .done( () => {
    console.log('Delete success!')
    $(this).closest('tr').remove()
    
    //Update
  })
  .fail(err => {
    console.log('Delete fail! ', err)
  });
}
