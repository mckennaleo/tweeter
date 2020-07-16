/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


//How long ago function
var periods = {
  month: 30 * 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000
};

function formatTime(timeCreated) {
  var diff = Date.now() - timeCreated;

  if (diff > periods.month) {
    return Math.floor(diff / periods.month) + "m ago";
  } else if (diff > periods.week) {
    return Math.floor(diff / periods.week) + "w ago";
  } else if (diff > periods.day) {
    return Math.floor(diff / periods.day) + "d ago";
  } else if (diff > periods.hour) {
    return Math.floor(diff / periods.hour) + "h ago";
  } else if (diff > periods.minute) {
    return Math.floor(diff / periods.minute) + "m ago";
  }
  return "Just now";
}



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
    //tweet html
    let $tweet = `
  <article class="tweet">
    <header>
      <div class="user"> <img src=${tweetData.user.avatars}>
            <p>${tweetData.user.name}</p>
      </div>
      <div class='handle'>${tweetData.user.handle}</div>
    </header>
    <body>
      <p>${escape(tweetData.content.text)}</p>
    </body>
    <hr>
    <footer>
      <h4>${formatTime(tweetData.created_at)} </h4 >
      <div class='icon-group'>
        <i class="fa fa-flag" aria-hidden="true"></i>
        <i class="fa fa-retweet"></i>
        <i class="fa fa-heart"></i>
      </div>
    </footer >
  </article >
  <br>`
    return $tweet;
  }

  //posting the tweets and error messages
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

  //Loading tweets on page

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








