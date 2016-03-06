var WinJS = require('winjs');
var vegetal = require('./vegetal')

var itemArray =[
        { title: "Marvelous Onion", text: "Onion", picture: "assets/img/Onion.JPG" },
        { title: "Succulent Tomato", text: "Tomato", picture: "assets/img/tomato.jpg" },
];

var items = [];

// Generate 160 items
for (var i = 0; i < 5; i++) {
    itemArray.forEach(function (item) {
        items.push(item);
    });
}


WinJS.Namespace.define("Sample.ListView", {
    modes: {
        single: {
            name: 'single',
            selectionMode: WinJS.UI.SelectionMode.single,
            tapBehavior: WinJS.UI.TapBehavior.directSelect
        }
    },
    listView: null,
    changeSelectionMode: WinJS.UI.eventHandler(function (ev) {
        var listView = Sample.ListView.listView;
        if (listView) {
            var command = ev.target;
            if (command.textContent) {
                var mode = command.textContent.toLowerCase();
                listView.selection.clear();

                Sample.ListView.context.currentMode = Sample.ListView.modes[mode];

                listView.selectionMode = Sample.ListView.context.currentMode.selectionMode;
                listView.tapBehavior = Sample.ListView.context.currentMode.tapBehavior;
            }
        }
    }),
    data: new WinJS.Binding.List(items)
});
Sample.ListView.context = WinJS.Binding.as({ currentMode: Sample.ListView.modes.single });

WinJS.UI.processAll();

var btnAddVegetal = document.querySelector('#btnAddVegetal');
btnAddVegetal.onclick = vegetal.vegetablesMenu

setTimeout(function(){
     $('.smallListIconTextItem').on('click', function(){
        vegetal.add_vegetal(this.children[0].src)
    })
     }, 1200)
