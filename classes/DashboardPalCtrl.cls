public with sharing class DashboardPalCtrl {
    @AuraEnabled
    public static String getActiveUser() {
        Id userId = UserInfo.getUserId();
        return userId;
    }
    
    @AuraEnabled
    public static List<Folder> getFolderList(Boolean atoz) {
        if(atoz){
            return [SELECT Name, Id FROM Folder WHERE Type = 'Dashboard' WITH SECURITY_ENFORCED ORDER BY Name ASC];
        }else{
            return [SELECT Name, Id FROM Folder WHERE Type = 'Dashboard' WITH SECURITY_ENFORCED ORDER BY Name DESC];
        }
    }
    
    @AuraEnabled
    public static List<Dashboard> getDashboardList(Boolean atoz, String folder) {
        if(!String.isBlank(folder)){
            if(folder == 'private'){
                if(atoz){
                    return [SELECT Title, Id FROM Dashboard WHERE IsDeleted = false AND FolderId =: UserInfo.getUserId() WITH SECURITY_ENFORCED ORDER BY Title ASC];
                }else{
                    return [SELECT Title, Id FROM Dashboard WHERE IsDeleted = false AND FolderId =: UserInfo.getUserId() WITH SECURITY_ENFORCED ORDER BY Title DESC];
                }
            }else if(folder == 'createdByMe'){
                if(atoz){
                    return [SELECT Title, Id FROM Dashboard WHERE IsDeleted = false AND createdById =: UserInfo.getUserId() WITH SECURITY_ENFORCED ORDER BY Title ASC];
                }else{
                    return [SELECT Title, Id FROM Dashboard WHERE IsDeleted = false AND createdById =: UserInfo.getUserId() WITH SECURITY_ENFORCED ORDER BY Title DESC];
                }
            }else{
                if(atoz){
                    return [SELECT Title, Id FROM Dashboard WHERE IsDeleted = false AND FolderId =: folder WITH SECURITY_ENFORCED ORDER BY Title ASC];
                }else{
                    return [SELECT Title, Id FROM Dashboard WHERE IsDeleted = false AND FolderId =: folder WITH SECURITY_ENFORCED ORDER BY Title DESC];
                }
            }
        }else{
            if(atoz){
                return [SELECT Title, Id FROM Dashboard WHERE IsDeleted = false WITH SECURITY_ENFORCED ORDER BY Title ASC];
            }else{
                return [SELECT Title, Id FROM Dashboard WHERE IsDeleted = false WITH SECURITY_ENFORCED ORDER BY Title DESC];
            }
        }
    }
    
    @AuraEnabled
    public static String getDefaultDashboardFolder(String dashboardId){
        return [SELECT FolderId FROM Dashboard WHERE Id =: dashboardId WITH SECURITY_ENFORCED LIMIT 1].FolderId;
    }
    
    @AuraEnabled
    public static String getDefaultDashboard(){
        return [SELECT Default_Dashboard__c FROM User WHERE Id =: UserInfo.getUserId() WITH SECURITY_ENFORCED LIMIT 1].Default_Dashboard__c;
    }
    
    @AuraEnabled
    public static void setDefaultDashboard(String dashboardId){
        if (Schema.sObjectType.User.fields.Default_Dashboard__c.isUpdateable()) {
            User currentUser = [SELECT Id FROM User WHERE Id =: UserInfo.getUserId() WITH SECURITY_ENFORCED LIMIT 1];
            currentUser.Default_Dashboard__c = dashboardId;
            update currentUser;
        }
    }
    
    @AuraEnabled
    public static String getFirstDashboard(){
        return [SELECT Id FROM Dashboard WITH SECURITY_ENFORCED LIMIT 1].Id;
    }
    
    @AuraEnabled
    public static String isCommunity(){
        return Site.getBaseSecureUrl();
    }
}