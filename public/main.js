$(() => {
  console.log('Ready!');
  $('.modal-trigger').leanModal();
  $(".loginArea").on('click', 'button', login);

  $('#sendMessage').click(sendMessage);

  $('#messageList').on('click', '.delete', deleteMessage)
  $('#messageList').on('click', '.edit', editMessage)
  $('#newMessage').click(newMessage)
});

function login(event) {
  event.preventDefault()
  console.log("Click")

  //Getting all the users
  $.get('/users').done(data => {
    let user = $('#username').val();
    let password = $('#pass').val();
    let userId
    console.log('getting data... ', data)
    let correct = data.some(val => {
      if (val.username === user && val.password === password) {
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
          $tr.find('.userNameTable').text(val.userName)
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
  let obj ={userId: userId, message: content , 
    userName: $('.userName').text()}
    $.post( "/messages", obj)
    .done(function(data) {
      console.log('Success posting ', data)
      let $tr = $('#template').clone()
      $tr.removeAttr('id');
      $tr.find('.time').text(data.time)
      $tr.find('.message').text(data.message)
      $tr.find('.userNameTable').text(data.userName)
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
  let messageId = $(this).closest('tr').data('id')
  let userId = $(this).closest('tr').data('userId')

  if ($('.userName').data('userId') == userId) {
    $.ajax(`/messages/${messageId}`,  {
      method: 'DELETE',
    })
    .done( () => {
      console.log('Delete success!')
      $(this).closest('tr').remove()
    })
    .fail(err => {
      console.log('Delete fail!')
    });
  } else alert("You are not authorized to delete this message")
}

function editMessage(e) {
  let userId = $(this).closest('tr').data('userId')
  
  if ($('.userName').data('userId') == userId) {
    $('#modal1').openModal();
    $('#newMessage').data('id', $(this).closest('tr').data('id'))
    $('#newMessage').data('index', $(this).closest('tr').index())
  } else {
    alert("You are not authorized to delete this message")
  }
}

function newMessage(event) {
  let newMessage = $('#textarea2').val();
  let id = $('#newMessage').data('id')

  if (newMessage) {
    console.log('Comming!')
    let index = $('#newMessage').data('index')
    $.ajax(`/messages/${id}`,  {
      method: 'PUT',
      data: {newMessage: newMessage},
    })
    .done((data) => {
      let $tr = $('#messageList').children()[index]
      console.log('Updating success!');
      $($tr).find('.time').text(data.time);
      $($tr).find('.message').text(data.message);
      $('#modal1').closeModal();
    })
    .fail(err => {
      console.log('Updating fail!')
      $('#modal1').closeModal();

    });

  } else alert("New message is empty!")
}


