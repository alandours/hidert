const toggle = () => {

    let status, title, icon16, icon32;

    browser.storage.sync.get(['active'], (result) => {

        if(result.active === undefined){
            status = true;
        }else{
            status = !result.active;
        }
        
        browser.storage.sync.set({'active': status});

        changeIcon(status);
        
        
    });

}

const changeIcon = (activeStatus) => {

    if(activeStatus){
        title = 'Show retweets';
        icon16 = 'icons/icon16.png';
        icon32 = 'icons/icon32.png';
    }else{
        title = 'Hide retweets';
        icon16 = 'icons/icon-disabled16.png';
        icon32 = 'icons/icon-disabled32.png';
    }

    browser.browserAction.setTitle({title: title});
    browser.browserAction.setIcon({path: {16: icon16, 32: icon32}});

}

let browser = chrome || browser;

browser.storage.sync.get(['active'], (result) => {

    if(result.active === undefined){
        toggle();
    }else if(result.active === false){
        changeIcon(result.active);
    }

});

browser.browserAction.onClicked.addListener(toggle);

