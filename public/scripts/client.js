/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  const renderTweets = function (tweets) {
    // loops through tweets
    tweets.forEach(tweet => {
      $('.tweet-display').prepend(createTweetElement(tweet))
    });
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  }

  const createTweetElement = (tweetData) => {
    const escape = function (str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }
    let $tweet = `
  <article class="tweet">
  <header>
    <div><img src=${tweetData.user.avatars}></div>
    <div><p>${tweetData.user.name}</p></div>
    <div><p>${tweetData.user.handle}</p></div>
  </header>
  <body>
    <p>${escape(tweetData.content.text)}</p>
  </body>
  <hr>
  <footer>
    <div>on ${tweetData.created_at}</div>
  </footer>
  </article>
  <br>`
      ;

    return $tweet;
  }


  $(function () {
    const $button = $('.tweet-button');
    $button.on('click', function () {
      event.preventDefault()
      const serialized = $('.form-field').serialize();
      // console.log('Button clicked, performing ajax call...');
      console.log(serialized)
      // console.log($('.form-field'))
      if (serialized.length > 140) {
        $('.error').text('Error! You have exceeded the character limit. Try making it more concise!')
        $('.error').animate({ opacity: 100 }, 1000);
        $('.error').animate({ opacity: 0 }, "slow");
        return;
      }
      if (serialized === "text=") {
        $('.error').text('Error! You have not written anything. Please let the world know what you think!')
        $('.error').animate({ opacity: 100 }, 1000);
        $('.error').animate({ opacity: 0 }, "slow");

      } else {
        $('.form-field').val('');
        $.ajax({
          type: 'POST',
          url: '/tweets',
          data: serialized
        }).then(loadTweets)
      }
    });
  });

  const loadTweets = () => {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      data: 'json',
      success: (response) => {
        $('.tweet-display').empty();
        renderTweets(response);
      }
    })
  }
  loadTweets();
});








