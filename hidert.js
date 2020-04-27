const toggleRetweets = (activeStatus) => {
  const svgIcons = document.querySelectorAll('article svg:first-child');
  const retweetIcons = [...svgIcons].filter(icon => icon.innerHTML.match(/M23\.615/));

  const retweets = retweetIcons.map(icon => {
    return getRetweet(icon);
  });

  for (let i = 0; i < retweets.length; i++) {;
    const retweet = retweets[i];

    if (activeStatus && !retweet.classList.contains('hide-rt')) {
      retweet.classList.add('hide-rt');
    } else if (!activeStatus && retweet.classList.contains('hide-rt')) {
      retweet.classList.remove('hide-rt');
    }
  }
}

const getRetweet = (element) => {
  const count = element.parentNode.childElementCount;
  return count < 5 ? getRetweet(element.parentNode) : element; //5 -> Random number, just to make sure it doesn't have many children
}

const handleScroll = (activeStatus) => {
  if (activeStatus) {
    const timeline = document.querySelector('section h1').parentNode;
    const config = { childList: true, subtree: true };

    const handleNewTweets = () => {
      toggleRetweets(activeStatus);
    };
    
    observer = new MutationObserver(handleNewTweets);
    
    observer.observe(timeline, config);
  } else 
    observer.disconnect();
}

let browser = chrome || browser;
let observer;

browser.storage.onChanged.addListener((changes) => {
  let activeStatus = changes.active.newValue;

  toggleRetweets(activeStatus);
  handleScroll(activeStatus);
});

browser.storage.sync.get(['active'], (result) => {
  if (result && result.active === true) {
    let icon;
    const tweetsLoaded = setInterval(() => {
      icon = document.querySelector('section article svg:first-child');

      if (icon) {
        toggleRetweets(result.active);
        handleScroll(result.active);
        clearInterval(tweetsLoaded);
      }
    }, 200);
  }
});