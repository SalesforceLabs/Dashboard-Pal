@isTest
private class DashboardPalTest {
    
    static testMethod void testDashboardPal() {
        String defaultDash='Default Dashboard';
        String activeUser = DashboardPalCtrl.getActiveUser();
        List<Dashboard> var1 = DashboardPalCtrl.getDashboardList(true,'');
		List<Folder> var2 = DashboardPalCtrl.getFolderList(true);
        List<Dashboard> var3 = DashboardPalCtrl.getDashboardList(false,'');
		List<Folder> var4 = DashboardPalCtrl.getFolderList(false);
        String var5 = DashboardPalCtrl.getDefaultDashboard();
        List<Dashboard> var6 = DashboardPalCtrl.getDashboardList(true,'private');
        List<Dashboard> var7 = DashboardPalCtrl.getDashboardList(true,'createdByMe');
        List<Dashboard> var8 = DashboardPalCtrl.getDashboardList(false,'private');
        List<Dashboard> var9 = DashboardPalCtrl.getDashboardList(false,'createdByMe');
        List<Dashboard> var10 = DashboardPalCtrl.getDashboardList(true,'abc');
        List<Dashboard> var11 = DashboardPalCtrl.getDashboardList(false,'abc');
        DashboardPalCtrl.setDefaultDashboard(defaultDash);    
        Dashboard myDash = new Dashboard();
        String isCommunity = DashboardPalCtrl.isCommunity();
        //String var4 = DashbboardPalCtrl.getFirstDashboard();
    }
    
}