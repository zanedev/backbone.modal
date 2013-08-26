!function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},b={}.hasOwnProperty,c=function(a,c){function d(){this.constructor=a}for(var e in c)b.call(c,e)&&(a[e]=c[e]);return d.prototype=c.prototype,a.prototype=new d,a.__super__=c.prototype,a},d=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};if("undefined"==typeof Backbone||null===Backbone)throw new Error("Backbone is not defined. Please include the latest version from http://documentcloud.github.com/backbone/backbone.js");Backbone.Modal=function(b){function e(){this.triggerCancel=a(this.triggerCancel,this),this.triggerSubmit=a(this.triggerSubmit,this),this.triggerView=a(this.triggerView,this),this.clickOutside=a(this.clickOutside,this),this.checkKey=a(this.checkKey,this),this.args=Array.prototype.slice.apply(arguments),Backbone.View.prototype.constructor.apply(this,this.args),this.setUIElements(),this.delegateModalEvents()}return c(e,b),e.prototype.prefix="bbm",e.prototype.render=function(a){var b,c,d=this;return null==a&&(a={}),b=this.serializeData(),this.$el.addClass(""+this.prefix+"-wrapper"),this.modalEl=$("<div />").addClass(""+this.prefix+"-modal"),this.template&&this.modalEl.html(this.template(b)),this.$el.html(this.modalEl),$("body").on("keyup",this.checkKey),$("body").on("click",this.clickOutside),this.viewContainer?(this.viewContainerEl=this.modalEl.find(this.viewContainer),this.viewContainerEl.addClass(""+this.prefix+"-modal__views")):this.viewContainerEl=this.modalEl,this.$el.show(),(null!=(c=this.views)?c.length:void 0)>0&&this.openAt(0),"function"==typeof this.onRender&&this.onRender(),this.modalEl.css({opacity:0}),this.$el.fadeIn({duration:100,complete:function(){return d.modalEl.css({opacity:1}),d.modalEl.addClass(""+d.prefix+"-modal--open")}}),this},e.prototype.setUIElements=function(){var a;if(this.template=this.getOption("template"),this.views=this.getOption("views"),null!=(a=this.views)&&(a.length=_.size(this.views)),this.viewContainer=this.getOption("viewContainer"),this.$el.hide(),_.isUndefined(this.template)&&_.isUndefined(this.views))throw new Error("No template or views defined for Backbone.Modal");if(this.template&&this.views&&_.isUndefined(this.viewContainer))throw new Error("No viewContainer defined for Backbone.Modal")},e.prototype.getOption=function(a){return a?this.options&&d.call(this.options,a)>=0&&null!=this.options[a]?this.options[a]:this[a]:void 0},e.prototype.serializeData=function(){var a;return a={},this.model&&(a=_.extend(a,this.model.toJSON())),this.collection&&(a=_.extend(a,{items:this.collection.toJSON()})),a},e.prototype.delegateModalEvents=function(){var a,b,c,d,e,f,g;this.active=!0,a=this.getOption("cancelEl"),e=this.getOption("submitEl"),e&&this.$el.on("click",e,this.triggerSubmit),a&&this.$el.on("click",a,this.triggerCancel),g=[];for(b in this.views)"length"!==b?(c=b.match(/^(\S+)\s*(.*)$/),f=c[1],d=c[2],g.push(this.$el.on(f,d,this.views[b],this.triggerView))):g.push(void 0);return g},e.prototype.undelegateModalEvents=function(){var a,b,c,d,e,f,g;this.active=!1,a=this.getOption("cancelEl"),e=this.getOption("submitEl"),e&&this.$el.off("click",e,this.triggerSubmit),a&&this.$el.off("click",a,this.triggerCancel),g=[];for(b in this.views)"length"!==b?(c=b.match(/^(\S+)\s*(.*)$/),f=c[1],d=c[2],g.push(this.$el.off(f,d,this.views[b],this.triggerView))):g.push(void 0);return g},e.prototype.checkKey=function(a){if(this.active)switch(a.keyCode){case 27:return this.triggerCancel();case 13:return this.triggerSubmit()}},e.prototype.clickOutside=function(a){return $(a.target).hasClass(""+this.prefix+"-wrapper")&&this.active?this.triggerCancel(null,!0):void 0},e.prototype.buildView=function(a){var b;if(a)return _.isFunction(a)?(b=new a(this.args[0]),b instanceof Backbone.View?{el:b.render().$el,view:b}:{el:a(this.args[0])}):{view:a,el:a.$el}},e.prototype.triggerView=function(a){var b,c,d,e;null!=a&&"function"==typeof a.preventDefault&&a.preventDefault(),e=a.data,c=this.buildView(e.view),this.currentView&&(this.previousView=this.currentView),this.currentView=c.view||c.el,b=0;for(d in this.views)e.view===this.views[d].view&&(this.currentIndex=b),b++;return e.onActive&&(_.isFunction(e.onActive)?e.onActive(this):_.isString(e.onActive)&&this[e.onActive].call(this,e)),this.shouldAnimate?this.animateToView(c.el):(this.shouldAnimate=!0,this.$(this.viewContainerEl).html(c.el))},e.prototype.animateToView=function(a){var b,c,d,e,f,g,h=this;return e={position:"relative",top:-9999,left:-9999},f=$("<tester/>").css(e),f.html(this.$el.clone().css(e)),0!==$("tester").length?$("tester").replaceWith(f):$("body").append(f),b=this.viewContainer?f.find(this.viewContainer):f.find("."+this.prefix+"-modal"),b.removeAttr("style"),d=b.outerHeight(),b.html(a),c=b.outerHeight(),d===c?(this.$(this.viewContainerEl).html(a),null!=(g=this.previousView)?"function"==typeof g.close?g.close():void 0:void 0):(this.$(this.viewContainerEl).css({opacity:0}),this.$(this.viewContainerEl).animate({height:c},100,function(){var b;return h.$(h.viewContainerEl).css({opacity:1}).removeAttr("style"),h.$(h.viewContainerEl).html(a),null!=(b=h.previousView)?"function"==typeof b.close?b.close():void 0:void 0}))},e.prototype.triggerSubmit=function(a){return null!=a&&a.preventDefault(),this.beforeSubmit&&this.beforeSubmit()===!1?void 0:("function"==typeof this.submit&&this.submit(),this.regionEnabled?this.trigger("modal:close"):this.close())},e.prototype.triggerCancel=function(a){return null!=a&&a.preventDefault(),this.beforeCancel&&this.beforeCancel()===!1?void 0:("function"==typeof this.cancel&&this.cancel(),this.regionEnabled?this.trigger("modal:close"):this.close())},e.prototype.close=function(){var a=this;return $("body").off("keyup",this.checkKey),$("body").off("click",this.clickOutside),"function"==typeof this.onClose&&this.onClose(),this.shouldAnimate=!1,this.modalEl.addClass("{@prefix}-modal--close"),this.$el.fadeOut({duration:200}),_.delay(function(){var b;return null!=(b=a.currentView)&&"function"==typeof b.remove&&b.remove(),a.remove()},200)},e.prototype.openAt=function(a){var b,c,d;b=0;for(c in this.views)"length"!==c&&(b===a&&(d=this.views[c]),b++);return d&&(this.currentIndex=a,this.triggerView({data:d})),this},e.prototype.next=function(){return this.currentIndex+1<this.views.length?this.openAt(this.currentIndex+1):void 0},e.prototype.previous=function(){return this.currentIndex-1<this.views.length-1?this.openAt(this.currentIndex-1):void 0},e}(Backbone.View)}.call(this),function(){var a,b=function(a,b){return function(){return a.apply(b,arguments)}},c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};if("undefined"==typeof Backbone||null===Backbone)throw new Error("Backbone is not defined. Please include the latest version from http://documentcloud.github.com/backbone/backbone.js");Backbone.Marionette.Modals=function(c){function e(){return this.close=b(this.close,this),a=e.__super__.constructor.apply(this,arguments)}return d(e,c),e.prototype.modals=[],e.prototype.zIndex=0,e.prototype.show=function(a,b){var c,d,e,f,g,h;for(null==b&&(b={}),this.ensureEl(),this.modals.length>0&&(c=_.last(this.modals),c.modalEl.addClass(""+c.prefix+"-modal--stacked"),e=this.modals[this.modals.length-1],null!=e&&e.modalEl.removeClass(""+e.prefix+"-modal--stacked-reverse")),a.render(),a.regionEnabled=!0,this.$el.show(),this.$el.append(a.el),this.modals.length>0&&a.$el.css({background:"none"}),Marionette.triggerMethod.call(a,"show"),Marionette.triggerMethod.call(this,"show",a),this.currentView=a,h=this.modals,f=0,g=h.length;g>f;f++)d=h[f],d.undelegateModalEvents();return a.on("modal:close",this.close),this.modals.push(a),this.zIndex++},e.prototype.close=function(){var a,b;return b=this.currentView,b&&!b.isClosed?(b.close?b.close():b.remove&&b.remove(),b.off("modal:close",this.close),this.modals.splice(_.indexOf(this.modals,b),1),this.zIndex--,this.currentView=this.modals[this.zIndex-1],a=_.last(this.modals),a&&(a.modalEl.addClass(""+a.prefix+"-modal--stacked-reverse"),_.delay(function(){return a.modalEl.removeClass(""+a.prefix+"-modal--stacked")},300),0!==this.zIndex&&a.delegateModalEvents()),Marionette.triggerMethod.call(this,"close")):void 0},e.prototype.closeAll=function(){var a,b,c,d,e;for(d=this.modals,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(this.close());return e},e}(Backbone.Marionette.Region)}.call(this);