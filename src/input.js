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
        
        this.DOWN = 0;
        this.UP = 1;
        
        this.KeyStates = {
            a     : this.UP,
            d     : this.UP,
            w     : this.UP,
            s     : this.UP,
            shift : this.UP
        }
        
    },
    onKeyPressed : function (key, event) {
        //console.log(this);
        switch (key) {
        case cc.KEY.a : {
            if (this.KeyStates.a == this.UP)
            {
                cc.log("a");
                this.KeyStates.a = this.DOWN;
            }
        } break; 
        case cc.KEY.s : {
            if (this.KeyStates.s == this.UP)
            {
                cc.log("s");
                this.KeyStates.s = this.DOWN;
            }
        } break;
        case cc.KEY.w : {
            if (this.KeyStates.w == this.UP)
            {
                cc.log("w");
                this.KeyStates.w = this.DOWN;
            }
        } break;
        case cc.KEY.d : {
            if (this.KeyStates.d == this.UP)
            {
                cc.log("d");
                this.KeyStates.d = this.DOWN;
            }
        } break;
        case cc.KEY.shift : {c
            if (this.KeyStates.shift == this.UP)
            {
                c.log("SHIFT");
                this.KeyStates.shift = this.DOWN;
            }
        } break;
        default : {cc.log(key)} break;
        }
    },
    onKeyReleased : function (key, event) {
        switch (key) {
        case cc.KEY.a : {
            this.KeyStates.a = this.UP;
            cc.log("A-");
        } break;
        case cc.KEY.s : {
            this.KeyStates.s = this.UP;
            cc.log("S-");
        } break;
        case cc.KEY.w : {
            this.KeyStates.w = this.UP;
            cc.log("W-");
        } break;
        case cc.KEY.d : {
            this.KeyStates.d = this.UP;
            cc.log("D-");
        } break;
        case cc.KEY.shift : {
            this.KeyStates.shift = this.UP;
            cc.log("SHIFT-");
        } break;
        default : {cc.log(key)} break;
        }
    }
});