var inputRead = cc.Node.extend({
    ctor : function ( inplayer) {
        this._super();
        this.player = inplayer;
        
        if (cc.sys.capabilities.hasOwnProperty('keyboard'))
        {
            cc.eventManager.addListener(
                cc.EventListener.create({
                    event: cc.EventListener.KEYBOARD,
                    onKeyPressed: this.onKeyPressed.bind(this),
                    onKeyReleased: this.onKeyReleased.bind(this)
                }),
            this );
        }
        
        
        this.KeyStates = {
            a     : 0,
            d     : 0,
            w     : 0,
            s     : 0,
            shift : 0
        }
        
    },
    onKeyPressed : function (key, event) {
        
        if (this.player.isDead)
        {
            if (key == cc.KEY.enter ) {
                //cc.log("word");
                cc.log("death acceptance call");
                cc.director.getRunningScene().acceptDeath();
            }
            return true;
        }
        //console.log(this);
        switch (key) {
        case cc.KEY.a : {
            if (this.KeyStates.a == 0)
            {
                this.KeyStates.a = 1;
                {this.player.moveLogLeft();}
                
                if (this.KeyStates.shift)
                {this.player.switchSegmentLeft();}
                //cc.log("a");
            }
        } break; 
        case cc.KEY.s : {
            this.player.LogSetVerticalAcceleration(-this.player.standardAcceleration);
            cc.log("s");
            if (this.KeyStates.shift && !this.KeyStates.s)
            {
                this.player.switchLog(this.player.x, this.player.y - 64);
            }
            else
            {
            }
            
            if (this.KeyStates.s == 0)
            {
                this.KeyStates.s = 1;
            }
        } break;
        case cc.KEY.w : {
            this.player.LogSetVerticalAcceleration(this.player.standardAcceleration);
            if (this.KeyStates.shift && !this.KeyStates.w)
            {
                this.player.switchLog(this.player.x, this.player.y + 64);
            }
            
            if (this.KeyStates.w == 0)
            {
                this.KeyStates.w = 1;
                //cc.log("w");
            }
        } break;
        case cc.KEY.d : {
            if (this.KeyStates.d == 0)
            {
                {this.player.moveLogRight();}
                if (this.KeyStates.shift)
                {this.player.switchSegmentRight();}
                this.KeyStates.d = 1;
                //cc.log("d");
            }
        } break;
        case cc.KEY.shift : {
            if (this.KeyStates.shift == 0)
            {
                this.KeyStates.shift = 1;
                //cc.log("shift");
                if (this.KeyStates.a)
                {this.player.switchSegmentLeft();}
                else if (this.KeyStates.d)
                {this.player.switchSegmentRight()}
                else if (this.KeyStates.w)
                {this.player.switchLog(this.player.x, this.player.y + 64);}
                else if (this.KeyStates.s)
                {this.player.switchLog(this.player.x, this.player.y - 64);}
            }
        } break;
        
        default : {
            this.player.Scene.changeScoreBy(key);
            } break;
        }
    },
    onKeyReleased : function (key, event) {
        if (this.player.isDead)
        {return true;}
        switch (key) {
        case cc.KEY.a : {
            {this.player.normalizeLogXVel();}
            if (this.KeyStates.d)
            {this.player.moveLogRight();}
            this.KeyStates.a = 0;
            //cc.log("a-");
        } break;
        case cc.KEY.s : {
            this.KeyStates.s = 0;
            if (this.KeyStates.w)
            {
                this.player.LogSetVerticalAcceleration(this.player.standardAcceleration);
            }
            else
            {
                this.player.LogSetVerticalAcceleration( 0 );
            }
            //cc.log("s-");
        } break;
        case cc.KEY.w : {
            this.KeyStates.w = 0;
            if (this.KeyStates.s)
            {
                this.player.LogSetVerticalAcceleration(-this.player.standardAcceleration);
            }
            else
            {
                this.player.LogSetVerticalAcceleration( 0 );
            }
            //cc.log("w-");
        } break;
        case cc.KEY.d : {
            {this.player.normalizeLogXVel();}
            if (this.KeyStates.a)
            {this.player.moveLogLeft();}
            this.KeyStates.d = 0;
            //cc.log("d-");
        } break;
        case cc.KEY.shift : {
            this.KeyStates.shift = 0;
            //cc.log("shift-");
        } break;
        default : {
            //cc.log(key)
            } break;
        }
    }
});