/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />

(function () {
    "use strict";

    var util = WinJS.Utilities;

    WinJS.Namespace.define("Application.Controls", {
        Popup: WinJS.Class.define(
            // Define the constructor function for the PageControlNavigator.
            function Popup(element, options) {
                var that = this;

                this._element = element || document.createElement("div");

                if (this._element.childElementCount > 1) {
                    throw "There is more than one element in the control";
                }
                if (this._element.firstElementChild.tagName !== "DIV") {
                    throw "No div element was found in the control body";
                }
                
                options = options || {};

                if (options.width) {
                    this._width = options.width;
                }
                
                if (options.height) {
                    this._height = options.height;
                }

                if (options.backgroundColor) {
                    this._backgroundColor = options.backgroundColor;
                }

                if (options.splashColor) {
                    this._splashColor = options.splashColor;
                }

                if (options.visible) {
                    this._visible = options.visible;
                }

                this._parent = document.createElement("div");

                this._initialize();

            }, {
                // fields
                _element: null,
                _parent: null,
                _content: null,

                // properties
                _width: '700px',
                _height: '500px',
                _backgroundColor: 'white',
                _splashColor: 'rgba(0, 0, 0, 0.5)',
                _visible: false,

                // methods
                _initialize: function () {
                    var that = this;
                    // remove children so we can rebuild the div
                    this._content = this._element.firstElementChild;
                    this._element.removeChild(this._content);

                    this._element.style.display = "none";
                    this._element.style.position = "absolute";
                    this._element.style.width = "100%";
                    this._element.style.height = "100%";
                    util.addClass(this._element, "control-popup");
                    
                    
                    util.addClass(this._parent, 'popupContainer');
                    

                    this.height = this._height;
                    this.width = this._width;

                    this._parent.style.backgroundColor = this._splashColor;
                    this._parent.style.width = "100%";
                    this._parent.style.height = "100%";
                    this._parent.style.msGridRowSpan = 2;
                    this._parent.style.display = "-ms-grid";
                    this._parent.addEventListener("click", function (args) { that.dismiss(args.srcElement); });

                    var floatingContainer = document.createElement("div");
                    util.addClass(floatingContainer, "floatingContainer");
                    floatingContainer.style.backgroundColor = this._backgroundColor;
                    floatingContainer.style.msGridColumn = 2;
                    floatingContainer.style.msGridRow = 2;
                    floatingContainer.style.width = "100%";
                    floatingContainer.style.height = "100%";
                    floatingContainer.style.boxShadow = "8px 8px 15px 0px hsla(0, 0%, 0%, 0.20)";

                    floatingContainer.appendChild(this._content);

                    this._parent.appendChild(floatingContainer);
                    this._element.appendChild(this._parent);
                },
                show: function () {
                    var that = this;
                    return new WinJS.Promise(function (complete) {
                        if (that._element.style.display === "none") {
                            that._element.style.display = "block";
                        }
                        else {
                            that._element.style.display = "none";
                        }
                        
                        complete();
                    }).then(function () {
                        that.dispatchEvent("visibilitychanged", { source: that });
                    });
                },
                dismiss: function (element) {
                    var that = this;
                    if (element.classList.contains("popupContainer")) {
                        this.show();
                    }
                },
                width: {
                    get: function () {
                        return this._width;
                    },
                    set: function (value) {
                        this._width = value;
                        this._parent.style.msGridColumns = "1fr " + value + " 1fr";
                    }
                },

                height: {
                    get: function () {
                        return this._height;
                    },
                    set: function (value) {
                        this._height = value;
                        this._parent.style.msGridRows = "1fr " + value + " 1fr";
                    }
                },

                backgroundColor: {
                    get: function () {
                        return this._backgroundColor;
                    },
                    set: function (value) {
                        this._height = value;
                        this._content.style.backgroundColor = value;
                    }
                },

                splashColor: {
                    get: function () {
                        return this._splashColor;
                    },
                    set: function (value) {
                        this._splashColor = value;
                        this._parent.style.msGridColumns = value;
                    }
                },

                contentElement: {
                    get: function () {
                        return this._content;
                    }
                }

            }
        )
    });

    WinJS.Class.mix(Application.Controls.Popup, WinJS.Utilities.eventMixin);

})();