import RSConfiguration from "/class/RSConfiguration.js"
import RSComponentManager from "/class/RSComponentManager.js"

/*
* Main RStats application
*/
const rsApplication = {
    start : () => {

        // Refresh on orientation change
        $(window).on("orientationchange",() => {
            if (JSPopup.isVisible) window.document.location.reload();
        });
       
        // load configuration
        let config = new RSConfiguration();
        config.load().done((conf) => {
            window.rsConfig = conf;
			new RSComponentManager().build().done(() => {
			});   
        });     
    }
}

export default rsApplication;