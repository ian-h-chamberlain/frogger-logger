var player = cc.Sprite.extend({
    ctor : function( parent, logList) {
//  ctor : function( parent) {
        this._super(res.PlayerStanding_png);
        this.ParentLog = parent;
        this.ParentLog.y = 375;
        this.ParentLog.velY = 0;
        
        this.yAcceleration = .1;
        this.logList = logList;
        
        this.ContactPoints = this.ParentLog.getContactPoints();
        for (var i = 0 ; i < this.ContactPoints.length; i++)
        {
            this.ContactPoints[i].x -= this.ParentLog.x;
            this.ContactPoints[i].y -= this.ParentLog.y;
        }
        this.ParentContactIndex = Math.floor(this.ContactPoints.length / 2);
        
        this.setLocalZOrder(2000000);
        this.setAnchorPoint(cc.p(0.5,0.05));
        this.scheduleUpdate();    
        },
    update : function() {
        this.x = this.ParentLog.x + this.ContactPoints[this.ParentContactIndex].x;
        this.y = this.ParentLog.y + this.ContactPoints[this.ParentContactIndex].y;
        
        return true;
    },
    moveLogLeft : function( ) {
        this.ParentLog.velX = -.8;
        return true;
    },
    switchSegmentLeft : function ( ) {
        if (this.ParentContactIndex > 0)
        {this.ParentContactIndex--;}
        else
        {this.switchLog(this.x - 64, this.y);}
        return true;
    },
    moveLogRight : function( ) {
        this.ParentLog.velX = 2.6;
        return true;
    },
    switchSegmentRight : function ( ) {
        if (this.ParentContactIndex < this.ContactPoints.length-1)
        {this.ParentContactIndex++;}
        else
        {this.switchLog(this.x + 64, this.y);}
    },
    moveLogUp : function( ) {
        this.ParentLog.velY += this.yAcceleration;
        if (this.ParentLog.velY > .8)
        {this.ParentLog.velY = .8}
        return true;
    },
    moveLogDown : function( ) {
        this.ParentLog.velY -= this.yAcceleration;
        if (this.ParentLog.velY < -.8)
        {this.ParentLog.velY = -.8}
        return true;
    },
    normalizeLogXVel : function( ) {
        this.ParentLog.velX = 1.6;
        return true;
    },
    switchLog : function( JumpPositionX, JumpPositionY) {
        // loop through the logs to see if there is one that does fits our destination.
        cc.log("looking for jump");
        for (var logIndex = 0 ; logIndex < this.logList.length; logIndex++) {
            var log = this.logList[logIndex];
            if ((Math.abs(log.x - JumpPositionX) < log.width/2)){
                cc.log((Math.abs(log.y - JumpPositionY) +" < "+ log.height/2));
            if ((Math.abs(log.y - JumpPositionY) < log.height/2))
            {   
                cc.log("Log in Y");
                this.ParentLog = this.logList[logIndex];
                this.ContactPoints = this.ParentLog.getContactPoints();
                for (var i = 0 ; i < this.ContactPoints.length; i++)
                {
                    this.ContactPoints[i].x -= this.ParentLog.x;
                    this.ContactPoints[i].y -= this.ParentLog.y;
                }
                if (JumpPositionX < this.x)
                {
                    this.ParentContactIndex = this.ContactPoints.length-1;
                }
                else if (JumpPositionX > this.x)
                {
                    this.ParentContactIndex = 0;
                }
                return true;
            }}
        }
        return false;
    }
});