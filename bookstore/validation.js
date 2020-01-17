

var main = function() {
    $('form').submit(function() {

      var firstName = $('#usr').val();
      
      if(firstName === "") {
        $('.username-error').text('Please enter your first name.')
      }
  
      return false;
    });
    
    // $('form').submit(function() {
    //   var lastName = $('#pwd1').val();
      
    //   if(lastName === "") {
    //     $('.password-error').text('Please enter your password')
    //   }
  
    //   return false;
    // });
    
    $('form').submit(function() {
      var email = $('#em').val();
      
      if(email === "") {
        $('.email-error').text('Please enter your email address.')
      };
      
      if(email === "aundreydrummond@live.com"){
          $('.email-error').text('This email is already taken.')
      }
  
      return false;
    })
    
    $('form').submit(function() {
      var password = $('#pwd1').val();
      
      if(password === "") {
        $('.password-error').text('Please enter a password.')
      };
      
      if( password.length < 8 && password.length > 1){
          $('.password-error').text('Short passwords are easy to guess. Try one with at least 8 characters.')
      }
  
      return false;
    });
    
    
  }
  
  $(document).ready(main);