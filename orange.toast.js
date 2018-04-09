/**
 * Orange Toast
 * @author @sgb004 to Orange
 * @version 1.0
 */
function OrangeToast( e, o ){
	this.toastContainer = document.getElementById( e );
	if( typeof( o ) != 'object' ){ o = {}; }
	this.main = ( o.useMain == true ) ? document.createElement( 'div' ) : null;
	this.showDuration = ( typeof( o.showDuration ) == 'number' ) ? parseInt( o.showDuration ) : 5000;
	this.hideDuration = ( typeof( o.hideDuration ) == 'number' ) ? parseInt( o.hideDuration ) : 1000;
	this.mouseLeaveDuration = ( typeof( o.mouseLeaveDuration ) == 'number' ) ? parseInt( o.mouseLeaveDuration ) : 1000;
	return this.init( this );
}

OrangeToast.prototype = {
	init: function( _this ){
		this.toastContainer.classList.add( 'o-toast' );
		this.toastContainer.classList.add( 'toast-top-right' );
		if( typeof this.main == 'object' && this.main != null ){
			this.main.classList.add( 'toast' );
			this.main.classList.add( 'toast-main' );
			this.main.classList.add( 'hidden' );
			this.main.addEventListener( 'click', function(){
				_this.mainHide();
			});
			this.main.addEventListener( 'mouseleave', function(){
				setTimeout(function(){
					_this.mainHide();
				}, _this.hideDuration);
			});
			this.toastContainer.appendChild( this.main );
		}
		return this;
	},
	add: function( type, message, title ){
		var _this = this;
		var toast = document.createElement( 'div' );
		var toastContent = '';
		toast.classList.add( 'toast' );
		toast.classList.add( 'toast-'+type );
		if( title != undefined ){
			toastContent += '<div class="toast-title">'+title+'</div>';
		}
		if( message != undefined ){
			toastContent += '<div class="toast-title">'+message+'</div>';
		}
		toast.innerHTML = toastContent;
		toast.addEventListener( 'click', function(){
			_this.hidden( toast );
		});
		toast.addEventListener( 'mouseleave', function(){
			setTimeout(function(){
				_this.hidden( toast );
			}, _this.hideDuration);
		});
		this.toastContainer.appendChild( toast );
		if( this.showDuration > 0 ){
			setTimeout(function(){
				_this.hidden( toast );
			}, this.showDuration);
		}
		return toast;
	},
	hidden: function( toast ){
		if( toast.parentNode != null ){
			var _this = this;
			toast.classList.add( 'o-toast-hide' );
			setTimeout(function(){
				_this.deleteToast( toast );
			}, this.hideDuration);
		}
	},
	clear: function(){
		var toasts = this.toastContainer.querySelectorAll( '.toast' );
		var i;
		if( this.main != null ){
			this._mainHide();
		}
		for( i=0; i<toasts.length; i++ ){
			if( !toasts[i].classList.contains( 'toast-main' ) ){
				this.deleteToast( toasts[i] );
			}
		}
	},
	mainChange: function( type, message, title ){
		var mainClass = 'toast toast-'+type+' toast-main';
		var toastContent = '';

		if( title != undefined ){
			toastContent += '<div class="toast-title">'+title+'</div>';
		}

		if( message != undefined ){
			toastContent += '<div class="toast-title">'+message+'</div>';
		}
		this.main.innerHTML = toastContent;
		this.main.setAttribute( 'class', mainClass );
		return this.main;
	},
	mainShow: function(){
		this.main.classList.remove( 'hidden' );
	},
	mainHide: function(){
		var _this = this;
		this.main.classList.add( 'o-toast-hide' );
		setTimeout(function(){
			_this._mainHide();
		}, this.hideDuration);
	},
	_mainHide: function(){
		this.main.classList.add( 'hidden' );
		this.main.classList.remove( 'o-toast-hide' );
	},
	deleteToast: function( toast ){
		if( toast.parentNode != null ){
			this.toastContainer.removeChild( toast );
		}
	}
}
