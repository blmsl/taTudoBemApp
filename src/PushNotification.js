Ext.define('MyApp.util.Pushwoosh', {
 
    singleton: true,
 
    initPushwoosh: function(){
 
        var pushNotification = window.plugins.pushNotification;
 
        if(Ext.os.is.Android){
            registerPushwooshAndroid();
        }
 
        if(Ext.os.is.iOS){
            registerPushwooshIOS();
        }
 
        pushNotification.onDeviceReady();
 
    }
 
});