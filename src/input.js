var inputRead = cc.Node.extend({
    ctor : function ( player) {
        this._super();
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
        
        this.player = player;
        
        this.KeyStates = {
            a     : 0,
            d     : 0,
            w     : 0,
            s     : 0,
            shift : 0
        }
        
    },
    onKeyPressed : function (key, event) {
        //console.log(this);
        switch (key) {
        case cc.KEY.a : {
            if (this.KeyStates.a == 0)
            {
                this.KeyStates.a = 1;
                
                if (this.KeyStates.shift)
                {this.player.switchSegmentLeft();}
                else
                {this.player.moveLogLeft();}
                cc.log("a");
            }
        } break; 
        case cc.KEY.s : {
            if (this.KeyStates.shift && !this.KeyStates.s)
            {
                this.player.switchLog(this.player.x, this.player.y - 64);
            }
            else
            {
                this.player.moveLogDown();
            }
            
            if (this.KeyStates.s == 0)
            {
                this.KeyStates.s = 1;
                cc.log("s");
            }
        } break;
        case cc.KEY.w : {
            if (this.KeyStates.shift && !this.KeyStates.w)
            {
                this.player.switchLog(this.player.x, this.player.y + 64);
            }
            else
            {
                this.player.moveLogUp();
            }
            
            if (this.KeyStates.w == 0)
            {
                this.KeyStates.w = 1;
                cc.log("w");
            }
        } break;
        case cc.KEY.d : {
            if (this.KeyStates.d == 0)
            {
                if (this.KeyStates.shift)
                {this.player.switchSegmentRight();}
                else
                {this.player.moveLogRight();}
                this.KeyStates.d = 1;
                cc.log("d");
            }
        } break;
        case cc.KEY.shift : {
            if (this.KeyStates.shift == 0)
            {
                this.KeyStates.shift = 1;
                cc.log("shift");
            }
        } break;
        default : {cc.log(key)} break;
        }
    },
    onKeyReleased : function (key, event) {
        switch (key) {
        case cc.KEY.a : {
            if (!this.KeyStates.d)
            {this.player.normalizeLogXVel();}
            this.KeyStates.a = 0;
            cc.log("a-");
        } break;
        case cc.KEY.s : {
            this.KeyStates.s = 0;
            cc.log("s-");
        } break;
        case cc.KEY.w : {
            this.KeyStates.w = 0;
            cc.log("w-");
        } break;
        case cc.KEY.d : {
            if (!this.KeyStates.a)
            {this.player.normalizeLogXVel();}
            this.KeyStates.d = 0;
            cc.log("d-");
        } break;
        case cc.KEY.shift : {
            this.KeyStates.shift = 0;
            cc.log("shift-");
        } break;
        default : {cc.log(key)} break;
        }
    }
});