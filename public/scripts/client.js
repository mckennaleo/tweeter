/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


//How long ago function
const periods = {
  year: 12 * 30 * 24 * 60 * 60 * 1000,
  month: 30 * 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000
};

function formatTime(timeCreated) {
  const diff = Date.now() - timeCreated;

  if (diff > periods.year) {
    if (Math.floor(diff / periods.year) === 1) {
      return "1 year ago";
    } else {
      return Math.floor(diff / periods.year) + " years ago";
    }
  } else if (diff > periods.month) {
    if (Math.floor(diff / periods.month) === 1) {
      return "1 month ago";
    } else {
      return Math.floor(diff / periods.month) + " months ago";
    }
  } else if (diff > periods.week) {
    if (Math.floor(diff / periods.week) === 1) {
      return "1 week ago";
    } else {
      return Math.floor(diff / periods.week) + " weeks ago";
    }
  } else if (diff > periods.day) {
    if (Math.floor(diff / periods.day) === 1) {
      return "1 days ago";
    } else {
      return Math.floor(diff / periods.day) + " days ago";
    }
  } else if (diff > periods.hour) {
    if (Math.floor(diff / periods.hour) === 1) {
      return "1 hour ago";
    } else {
      return Math.floor(diff / periods.hour) + " hours ago";
    }
  } else if (diff > periods.minute) {
    if (Math.floor(diff / periods.minute) === 1) {
      return "1 minute ago";
    } else {
      return Math.floor(diff / periods.minute) + " minutes ago";
    }
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
          <div class="user">  
            <img src=${tweetData.user.avatars}>
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
  $(function newTweet() {
    const $button = $('.tweet-button');

    $button.on('click', function (event) {
      event.preventDefault()
      const serialized = $('.form-field').serialize();

      if (serialized.length > 145) {
        $('.error').text('Error! You have exceeded the character limit. Try making it more concise!')
        $('.error').animate({ opacity: 100 }, 2000);
        $('.error').animate({ opacity: 0 }, "slow");
        return;
      }

      if (serialized === "text=") {
        $('.error').text('Error! You have not written anything. Please let the world know what you think!')
        $('.error').animate({ opacity: 100 }, 2000);
        $('.error').animate({ opacity: 0 }, "slow");
        return;

      } else {
        $('.form-field').val('');
        $.ajax({
          type: 'POST',
          url: '/tweets',
          data: serialized,
          success: loadTweets()
        })
      }
      setInterval(500)
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








