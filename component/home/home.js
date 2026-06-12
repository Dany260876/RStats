import RSActivityManager from '../../../class/RSActivityManager.js'
import RSActivity from '../../../class/RSActivity.js'

const rsHome = {
    activityManager: {},
    initialize: () => {
        rsHome.activityManager = new RSActivityManager();
        // Load page
        rsHome.initContent().done(() => {
            // Register events
            $('#btnNextStepActivity').click(() => rsHome.clicNextStepActivity());
            $('#btnCreateActivity').click(() => rsHome.clicCreateActivity()); 
            $('#btnCancelActivity').click(() => rsHome.clicCancelActivity()); 
            $('#btnCancelActivity2').click(() => rsHome.clicCancelActivity()); 
        });
    },
    initContent: () => {
        let res = $.Deferred();
        $('#divNewActivityStep1').hide();
        $('#divNewActivityStep2').hide();
        rsHome.activityManager.load().done((activities) => {
            //console.log(btoa(JSON.stringify(activities)));
            //activities = JSON.parse(atob("W3siaWQiOiJhY3RfMTc4MTI2ODQxODAxMCIsImRhdGUiOiIyMDI2LTA2LTAzVDAwOjAwOjAwLjAwMFoiLCJ0eXBlIjoiZW50cmFpbmVtZW50IDogYXV0cmUiLCJuYW1lIjoiTm9tIGVudHJhaW5lbWVudCIsImxvY2F0aW9uIjoiTWVydmlsbGUiLCJkdXJhdGlvbiI6IjMwIiwiZGlzdGFuY2UiOiI2Iiwic3RhdGlzdGljcyI6eyJGQyI6eyJhdmdWYWx1ZSI6MTYwLCJtYXhWYWx1ZSI6MTY4fSwiQWxsdXJlIjp7ImF2Z1ZhbHVlIjo2LCJtYXhWYWx1ZSI6NS40NX0sIlNwZWVkIjp7ImF2Z1ZhbHVlIjoxMC4yLCJtYXhWYWx1ZSI6MTF9LCJSeXRobSI6eyJhdmdWYWx1ZSI6MTcwLCJtYXhWYWx1ZSI6MTcyLCJhdmdMZW5ndGgiOjAuOH19fSx7ImlkIjoiYWN0XzE3ODEyNzEwODY4NTAiLCJkYXRlIjoiMjAyNi0wNi0wNlQwMDowMDowMC4wMDBaIiwidHlwZSI6ImNvdXJzZSA6IDEwIGttcyIsIm5hbWUiOiJDb3Vyc2UiLCJsb2NhdGlvbiI6IlRvdWxvdXNlIiwiZHVyYXRpb24iOiI1NSIsImRpc3RhbmNlIjoiMTAiLCJzdGF0aXN0aWNzIjp7IkZDIjp7ImF2Z1ZhbHVlIjoxODAsIm1heFZhbHVlIjoxOTB9LCJBbGx1cmUiOnsiYXZnVmFsdWUiOjUsIm1heFZhbHVlIjo0LjN9LCJTcGVlZCI6eyJhdmdWYWx1ZSI6MTIuNSwibWF4VmFsdWUiOjE0fSwiUnl0aG0iOnsiYXZnVmFsdWUiOjE4MCwibWF4VmFsdWUiOjE5MCwiYXZnTGVuZ3RoIjoxLjAyfX19LHsiaWQiOiJhY3RfMTc4MTI3MTU1NTEzMiIsImRhdGUiOiIyMDI2LTA2LTExVDAwOjAwOjAwLjAwMFoiLCJ0eXBlIjoiZW50cmFpbmVtZW50IDogem9uZSAyIiwibmFtZSI6IkVudHJh7m5lbWVudCAxIiwibG9jYXRpb24iOiJNZXJ2aWxsZSIsImR1cmF0aW9uIjo0NSwiZGlzdGFuY2UiOiI4Iiwic3RhdGlzdGljcyI6eyJGQyI6eyJhdmdWYWx1ZSI6MTUwLCJtYXhWYWx1ZSI6MTU1fSwiQWxsdXJlIjp7ImF2Z1ZhbHVlIjo2LjEyLCJtYXhWYWx1ZSI6NS41fSwiU3BlZWQiOnsiYXZnVmFsdWUiOjEwLjIsIm1heFZhbHVlIjoxMX0sIlJ5dGhtIjp7ImF2Z1ZhbHVlIjoxNzAsIm1heFZhbHVlIjoxNzUsImF2Z0xlbmd0aCI6MS4wMn19fSx7ImlkIjoiYWN0XzE3ODEyNzE4MDg1NTMiLCJkYXRlIjoiMjAyNi0wNi0xMlQwMDowMDowMC4wMDBaIiwidHlwZSI6ImVudHJhaW5lbWVudCA6IHpvbmUgMiIsIm5hbWUiOiJFbnRyYWluZW1lbnQgMyIsImxvY2F0aW9uIjoiTWFyc3NhYyBzdXIgVGFybiIsImR1cmF0aW9uIjo0NiwiZGlzdGFuY2UiOiI4LjAwIiwic3RhdGlzdGljcyI6eyJGQyI6eyJhdmdWYWx1ZSI6MTYwLCJtYXhWYWx1ZSI6MTY1fSwiQWxsdXJlIjp7ImF2Z1ZhbHVlIjo1LjU1LCJtYXhWYWx1ZSI6NS4zfSwiU3BlZWQiOnsiYXZnVmFsdWUiOjExLjI1LCJtYXhWYWx1ZSI6MTN9LCJSeXRobSI6eyJhdmdWYWx1ZSI6MTc4LCJtYXhWYWx1ZSI6MTgwLCJhdmdMZW5ndGgiOjEuMDV9fX1d"));
            rsHome.showActivities(activities);
            rsHome.showActivityTypes();
            res.resolve();
        });
        return res.promise();
    },
    showActivities: (activities) => {
        let html = "";
        $('#divActivities').hide();
        if (activities) {
            html += "<table class='tblActivities'>";
            activities.forEach((act) => {
                let icon = "129517";
                if (act.type.startsWith('course')) icon = "127942";
                html += "<tr data-id='" + act.id + "'><td>";
                html += "<span class='spIcon'>&#" + icon + ";</span><span class='spTitle'>" + act.name + "</span>";
                html += "<span class='spAction spActionDelete'>&#10060;</span>"; 
                html += "<span class='spAction spActionEdit'>&#128221;</span>";
                html += "<br/><span class='spDetails'>" + act.type + " - " + act.location + " - " + new Date(act.date).toLocaleDateString('fr-fr') + "</span>";
                html += "</td></tr>";
            });
            html += "</table>";
        }
        html += "<p>";
        html += "<a href='#' id='btnAddNewActivity'>&#10133; Ajouter une activit&eacute;</a>";
        html += "</p>";
        $('#divActivities').html(html);    
        
        $('#btnAddNewActivity').click(() => rsHome.clicAddNewActivity());
        $('.spActionDelete').click(() => rsHome.clicDeleteActivity());
        $('.spActionEdit').click(() => rsHome.clicEditActivity());
        
        $('#divActivities').show();   
    },
    showActivityTypes: () => {
        // load activity types
        if (rsConfig && rsConfig.ActivityType) {
            let html = "";
            rsConfig.ActivityType.forEach((act, i) => {
                let value = act.type + " : " + act.name;
                html += "<option value='" + i + "'>" + value + "</option>";
            });
            $('#selActivityType').html(html);
            $('#selActivityType').change((elt) => {
                let index = $(elt.target).val()*1;
                let type = rsConfig.ActivityType[index];
                $("#txtDistance").val(1);
                $("#txtDuree").val(1);
                if (type.distance) $("#txtDistance").val(type.distance);
                if (type.duree) $("#txtDuree").val(type.duree);
            });
        }
    },
    initActivityFields: (activity) => {
        let values_1 = $('#divNewActivityStep1 input');
        let values_2 = $('#divNewActivityStep2 input');
        let typeActivity = $('#divNewActivityStep1 select');
        
        if (!activity) {
            // default values page 1
            $(values_1[0]).val("Nom");
            $(values_1[1]).val("Lieu");
            $(values_1[2]).val(new Date().toISOString().slice(0,10));
            $(typeActivity).val(0);
            $(values_1[3]).val(1);
            $(values_1[4]).val(1);
    
            // default values page 2
            values_2.each((val) => $(val).val(1));   
        }
        else {
            // restore values page 1
            $(values_1[0]).val(activity.name);
            $(values_1[1]).val(activity.location);
            $(values_1[2]).val(new Date(activity.date).toISOString().slice(0,10));

            let indexType = 0;
            $(typeActivity).children().each((i, opt) => {
                if ($(opt).text()==activity.type) {
                    indexType = i;
                    return;
                }
            });
            $(typeActivity).val(indexType);
            
            $(values_1[3]).val((activity.distance*1).toFixed(2));
            $(values_1[4]).val(activity.duration);
    
            // restore values page 2
            $(values_2[0]).val(activity.statistics.FC.avgValue);
            $(values_2[1]).val(activity.statistics.FC.maxValue);
            $(values_2[2]).val(activity.statistics.Allure.avgValue.toFixed(2));
            $(values_2[3]).val(activity.statistics.Allure.maxValue.toFixed(2));
            $(values_2[4]).val(activity.statistics.Speed.avgValue.toFixed(2));
            $(values_2[5]).val(activity.statistics.Speed.maxValue.toFixed(2));
            $(values_2[6]).val(activity.statistics.Rythm.avgValue);
            $(values_2[7]).val(activity.statistics.Rythm.maxValue);
            $(values_2[8]).val(activity.statistics.Rythm.avgLength.toFixed(2));

            sessionStorage['RSCurrentActivityId'] = activity.id;
        }
    },
    clicAddNewActivity: () => {
        rsHome.initActivityFields();
        $('#divActivities').hide();
        $('#divNewActivityStep1').show();
        $('#divNewActivityStep2').hide();
    },
    clicNextStepActivity: () => {      
        $('#divActivities').hide();
        $('#divNewActivityStep1').hide();
        $('#divNewActivityStep2').show();
    },
    clicCancelActivity: () => {      
        $('#divActivities').show();
        $('#divNewActivityStep1').hide();
        $('#divNewActivityStep2').hide();
    },
    clicCreateActivity: () => {
        // get values
        let values_1 = $('#divNewActivityStep1 input');
        let values_2 = $('#divNewActivityStep2 input');

        // get type
        let indexType = $("#selActivityType").val();
        let valueType = $($("#selActivityType").children()[indexType]).text()
     
        // create activity
        let newActivity = new RSActivity(
            valueType,
            $(values_1[0]).val(), 
            $(values_1[1]).val(), 
            $(values_1[2]).val(), 
            $(values_1[3]).val(), 
            $(values_1[4]).val()*1, 
            $(values_1[5]).val()*1 
        );
        
        // set stats
        newActivity.statistics.setFc($(values_2[0]).val()*1, $(values_2[1]).val()*1);
        newActivity.statistics.setAllure($(values_2[2]).val()*1, $(values_2[3]).val()*1);
        newActivity.statistics.setSpeed($(values_2[4]).val()*1, $(values_2[5]).val()*1);
        newActivity.statistics.setRythm($(values_2[6]).val()*1, $(values_2[7]).val()*1, $(values_2[8]).val()*1);

        // add or update
        if (sessionStorage['RSCurrentActivityId']) {
            rsHome.activityManager.update(sessionStorage['RSCurrentActivityId'], newActivity);
            sessionStorage.removeItem('RSCurrentActivityId');
        }
        else {
            rsHome.activityManager.add(newActivity);
        }
        
        // save
        rsHome.activityManager.save().done((activities) => {
            // close edit mode
            rsHome.showActivities(activities);
            $('#divNewActivityStep1').hide();
            $('#divNewActivityStep2').hide();
        });
    },
    clicDeleteActivity:() => {

        let settings = {
            'title' : "Suppression activit&eacute;",
            'message' : "<br/>Confirmez-vous la suppression de l'activit&eacute; selectionn&eacute;e ?",
            'type' : JSPopup.PopupType.YES_NO,
            'modal' : true,
            'handler' : (res) => { 
                if (res==2) {
                    let target = $(event.target);
                    let parent = $(target).parents('tr');
                    let id = $(parent).data('id');
                    rsHome.activityManager.remove(id);
                    rsHome.activityManager.save().done((activities) => {
                        rsHome.showActivities(activities);
                    });
                }
            }
        };
        JSPopup.ShowPopup(settings);
    },
    clicEditActivity:() => {
        let target = $(event.target);
        let parent = $(target).parents('tr');
        let id = $(parent).data('id');
        let act = rsHome.activityManager.get(id);
        rsHome.initActivityFields(act);
        $('#divActivities').hide();
        $('#divNewActivityStep1').show();
        $('#divNewActivityStep2').hide();
    }
}

export default rsHome;