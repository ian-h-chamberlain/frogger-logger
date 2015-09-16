var player = cc.Sprite.extend({
    ctor : function() {
//  ctor : function( parent) {
        this._super(res.PlayerStanding_png);
        //this.ParentLog = parent;
        
        this.scheduleUpdate();    },
    update : function() {
        
        return true;
    },
    move : function( direction) {
        
        return true;
    },
    switchLog : function( direction) {
        
        return false;
    }
});