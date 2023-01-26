({
    getCurrentUser : function(component) {
        var action = component.get("c.getActiveUser");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set('v.userId', response.getReturnValue());
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.error("Error message: " + 
                                          errors[0].message);
                        }
                    } else {
                        console.error("Unknown error");
                    }
                }
        });
        $A.enqueueAction(action);
    },
    
    getFolders : function(component) {
        var action = component.get("c.getFolderList");
        action.setParams({ 
            atoz : component.get('v.atoz')
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set('v.folders', response.getReturnValue());
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.error("Error message: " + 
                                          errors[0].message);
                        }
                    } else {
                        console.error("Unknown error");
                    }
                }
        });
        $A.enqueueAction(action);
    },
    
    getDashboards : function(component) {
        var action = component.get("c.getDashboardList");
        var selectedFolder = component.get("v.selectedFolder");
        action.setParams({ 
            atoz : component.get("v.atoz"),
            folder : selectedFolder
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set('v.dashboards', response.getReturnValue());
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.error("Error message: " + 
                                          errors[0].message);
                        }
                    } else {
                        console.error("Unknown error");
                    }
                }
        });
        if(!component.get("v.foldersEnforced") || selectedFolder){
            $A.enqueueAction(action);
        }
    },
    
    getUsersDefaultDashboard : function(component){
        var action = component.get("c.getDefaultDashboard");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                if(response.getReturnValue()){
                    component.set('v.dashboardId', response.getReturnValue()); 
                    component.find("dashboardSelect").set('v.value',response.getReturnValue());
                }else{
                    this.getRandomDashboard(component);   
                }
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.error("Error message: " + 
                                          errors[0].message);
                        }
                    } else {
                        console.error("Unknown error");
                    }
                    this.getRandomDashboard(component);
                }
        });
        $A.enqueueAction(action);
    },
    
    getRandomDashboard : function(component){
        var action = component.get("c.getFirstDashboard");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                if(response.getReturnValue()){
                    component.set('v.dashboardId', response.getReturnValue());
                    component.find("dashboardSelect").set('v.value',response.getReturnValue());
                }
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.error("Error message: " + 
                                          errors[0].message);
                        }
                    } else {
                        console.error("Unknown error");
                    }
                }
        });
        $A.enqueueAction(action);
    },
    
    getUsersDefaultDashboardFolder : function(component){
        var dashId = component.get("v.dashboardId");
        var action = component.get("c.getDefaultDashboardFolder");
        action.setParams({
            dashboardId : dashId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                if(response.getReturnValue()){
                    if(response.getReturnValue().substring(0, 3) == '005'){
                        component.set("v.selectedFolder", "private");
                    }else{
                        component.set("v.selectedFolder", response.getReturnValue());
                    }
                    this.getFolders(component);
                    this.getDashboards(component);
                }
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.error("Error message: " + 
                                          errors[0].message);
                        }
                    } else {
                        console.error("Unknown error");
                    }
                }
        });
        $A.enqueueAction(action);
    },
    
    changeDashboard : function(component){
        var dashId = component.find("dashboardSelect").get('v.value');
        var action = component.get("c.setDefaultDashboard");
        action.setParams({ 
            dashboardId : dashId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.dashboardId",component.find("dashboardSelect").get('v.value'));
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.error("Error message: " + 
                                          errors[0].message);
                        }
                    } else {
                        console.error("Unknown error");
                    }
                }
        });
        $A.enqueueAction(action);
    },
    
    resizeIframe : function(component){
        var iframe = document.getElementById('ifrm')
        iframe.height = component.get('v.height');
    },
    
    getCommunityName : function(component){
        var action = component.get("c.isCommunity");
        action.setCallback(this, function(response) {
            var pathPrefix = response.getReturnValue();
            if(pathPrefix){
                component.set("v.communityPrefix", pathPrefix.slice(0, -2));
            }
        });
        $A.enqueueAction(action);
    },
    
    showModal : function(component){
        var cookieString = "; " + document.cookie;
        var parts = cookieString.split("; dashboardPalAcknowledged=");
        if (parts.length !== 2) {
            component.set("v.showModal", true);
        }
    }
})