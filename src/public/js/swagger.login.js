$(document).ready(function () {
  $('#login-form').on('submit', function (event) {
    event.preventDefault()

    const username = $('#username').val()
    const password = $('#password').val()

    clearErrorMessages()

    $.ajax({
      url: '/swagger-sign-in',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ username, password }),
      success: function (xhr) {
        if (xhr.status === 200) {
          window.location.href = '/api-docs'
        }
      },
      error: function (xhr) {
        const response = xhr.responseJSON

        if (xhr.status === 401) {
          $('#login-error').text('Incorrect username or password').removeClass('d-none')
        }

        if (xhr.status === 422) {
          const messages = response.message

          if (Array.isArray(messages)) {
            messages.forEach(({ path, msg }) => {
              displayErrorMessage(path, msg)
            })

            return
          }
        }

        if (xhr.status === 429) {
          $('#login-error').text(response.message).removeClass('d-none')
          return
        }
      }
    })
  })

  function clearErrorMessages() {
    $('#username-error').text('')
    $('#password-error').text('')
    $('#login-error').addClass('d-none')
  }

  function displayErrorMessage(path, msg) {
    switch (path) {
      case 'username':
        $('#username-error').text(msg)
        break
      case 'password':
        $('#password-error').text(msg)
        break
      default:
        break
    }
  }
})
