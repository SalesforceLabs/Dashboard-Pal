({
    doInit : function(component, event, helper) {
        if(component.get("v.showQuickStart")){
            helper.showModal(component);
        }
        helper.getCurrentUser(component);
        helper.getUsersDefaultDashboard(component);
        helper.getCommunityName(component);
    },
    
    changedFolder : function(component, event, helper) {
        if(component.find("folderSelect").get('v.value') != 'none'){
            component.set("v.selectedFolder", event.getSource().get("v.value"));
            helper.getDashboards(component);
        }else{
            component.set("v.dashboards", null);
            component.set("v.selectedFolder", null);
        }
    },
    
    changedDashboard : function(component, event, helper) {
        if(component.find("dashboardSelect").get('v.value') != 'none'){
            helper.changeDashboard(component);    
        }
    },
    
    resizeFrame : function(component, event, helper) {
        helper.resizeIframe(component);
    },
    
    togglePreferences : function(component, event, helper) {
        if(!component.get("v.dashboards")){
            helper.getUsersDefaultDashboardFolder(component)  
        }
        //$( ".configureDashboard" ).toggle('fast');
        document.getElementsByClassName("configureDashboard")[0].classList.toggle("collapsed");;
        //console.log(document.getElementsByClassName("configureDashboard")[0].classList);
    },
    
    reorderList : function(component, event, helper) {
        component.set('v.atoz', !component.get('v.atoz'));
        helper.getFolders(component);
        helper.getDashboards(component);
    },
    
    closeModal : function(component){
        component.set("v.showModal", false);  
    },
    
    showModal : function(component){
        component.set("v.showModal", true); 
    },
    
    acknowledgeModal : function(component){
        var cookieString = "; " + document.cookie;
        var parts = cookieString.split("; dashboardPalAcknowledged=");
        if (parts.length !== 2) {
            let expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + 3650 * 24* 60 * 60 * 1000);
            let expires = "; expires=" + expirationDate.toUTCString();
            document.cookie = "dashboardPalAcknowledged = true; expires=" + expirationDate.toUTCString() + "; path=/";
        }
        component.set("v.showModal", false);
    }
})