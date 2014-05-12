;( function( window ) {
	
	'use strict';

	var docElem = window.document.documentElement,
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = {
			transitions : Modernizr.csstransitions,
			support3d : Modernizr.csstransforms3d
		}; 

	function setTransform( el, transformStr ) {
		el.style.WebkitTransform = transformStr;
		el.style.msTransform = transformStr;
		el.style.transform = transformStr;
	}

	// from http://responsejs.com/labs/dimensions/
	function getViewportW() {
		var client = docElem['clientWidth'],
			inner = window['innerWidth'];
		
		if( client < inner )
			return inner;
		else
			return client;
	}

       
	
    function MartaLightbox( el ) {
		this.el = el;
                this.items = el.children( "img" );
                this.itemsCount = this.items.length;
            	this.current = -1;
		// lightbox control buttons
		this.ctrlPrev = this.el.find( 'nav > span.nav-prev' );
		this.ctrlNext = this.el.find( 'nav > span.nav-next' );
		this.ctrlClose = this.el.find( 'nav > span.nav-close' );
                
                this._initEvents();
	};
        
        MartaLightbox.prototype._initEvents = function() {
		var self = this;

		// open the slideshow when clicking on the item
		this.items.each( function( idx, item ) {
			$(this).on( 'click', function() {
                            self._openSlideshow( idx );
			} );
		} );

		// slideshow controls
		this.ctrlPrev.on( 'click', function() { self._navigate( 'prev' ); } );
		this.ctrlNext.on( 'click', function() { self._navigate( 'next' ); } );
		this.ctrlClose.on( 'click', function() { self._closeSlideshow(); } );
                
                
                // trick to prevent scrolling when slideshow is visible
		window.addEventListener( 'scroll', function() {
			if ( self.isSlideshowVisible ) {
				window.scrollTo( self.scrollPosition ? self.scrollPosition.x : 0, self.scrollPosition ? self.scrollPosition.y : 0 );
			}
			else {
				self.scrollPosition = { x : window.pageXOffset || docElem.scrollLeft, y : window.pageYOffset || docElem.scrollTop };
			}
		});
	};
        
        
        MartaLightbox.prototype._openSlideshow = function(initItem) {
            this.isSlideshowVisible = true;
            this.current = initItem;
            
            this.el.addClass('slideshow-open');
            
            /* position slideshow items */

		this.currentItem = null;
		this.prevItem = null;
		this.nextItem = null;

		if( this.current > 0 ) {
			this.prevItem = this.items[ this.current - 1 ];
		}
		if( this.current < this.itemsCount - 1 ) {
			this.nextItem = this.items[ this.current + 1 ];
		}
		this.currentItem = this.items.eq( this.current );
                
		
		// add class "current" and "show" to currentItem
                this.currentItem.addClass('current show' );
	            
        };
        
        
        MartaLightbox.prototype.__navigate = function () {
            alert("abc");
        };
        
        MartaLightbox.prototype._closeSlideshow = function () {
            alert("close");
        };
        
        MartaLightbox.prototype._setViewportItems = function() {
		this.currentItem = null;
		this.prevItem = null;
		this.nextItem = null;

		if( this.current > 0 ) {
			this.prevItem = this.items[ this.current - 1 ];
		}
		if( this.current < this.itemsCount - 1 ) {
			this.nextItem = this.items[ this.current + 1 ];
		}
		this.currentItem = this.items[ this.current ];
                
	};

	
	// add to global namespace
	window.MartaLightbox = MartaLightbox;

})( window );
