const toggleRetweets = (activeStatus) => {

    const tweets = document.getElementsByClassName('tweet');
    const retweets = [...tweets].filter((t) => t.hasAttribute('data-retweet-id'));

    for(let i = 0; i < retweets.length; i++){;

        let retweetContainer = retweets[i].parentNode;

        if(activeStatus && !retweetContainer.classList.contains('no-rt-hide')){

            retweetContainer.classList.add('no-rt-hide');

        }else if(!activeStatus && retweetContainer.classList.contains('no-rt-hide')){

            retweetContainer.classList.remove('no-rt-hide');

        }

    }

}

const handleScroll = (activeStatus) => {

    if(activeStatus){

        const timeline = document.getElementById('stream-items-id');
        const config = {childList: true};

        const handleNewTweets = () => {
            toggleRetweets(activeStatus);
        };
        
        observer = new MutationObserver(handleNewTweets);
        
        observer.observe(timeline, config);

    }else{

        observer.disconnect();

    }

}

let browser = chrome || browser;
let observer;

browser.storage.onChanged.addListener((changes) => {

    let activeStatus = changes.active.newValue;

    toggleRetweets(activeStatus);
    handleScroll(activeStatus);
    
});

browser.storage.sync.get(['active'], (result) => {

    if(result.active === true){
        toggleRetweets(result.active);
        handleScroll(result.active);
    }

});