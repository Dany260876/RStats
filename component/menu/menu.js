const rsMenu = {
    initialize : () => {

        // Toggle menu
        $("#btnHamburger").on("click", function() {
            $("#menuItemsList").toggleClass("show");
        });
    
        // Close menu
        $(".menuItem").on("click", function() {
            $("#menuItemsList").removeClass("show");
        });
        
        // Menu events
        $("#tdMenuHome").click(() => rsMenu.clickMenu('home'));
        $("#tdMenuConfig").click(() => rsMenu.clickMenu('config'));
        $("#tdMenuStats").click(() => rsMenu.clickMenu('stats'));
    },
    clickMenu: (idMenu) => {
        $("div.content").removeClass('visible').addClass('hidden');
        if (idMenu=='home') $("#divContent").addClass('visible').removeClass('hidden');
        if (idMenu=='config') $("#divConfiguration").addClass('visible').removeClass('hidden');
        if (idMenu=='stats') $("#divStatistics").addClass('visible').removeClass('hidden');
    }
}

export default rsMenu;