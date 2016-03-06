var app = NSApplication.sharedApplication()

var checkLayerCount = function(selectionCount) {
  var isOneLayerSelected = false

  switch (selectionCount) {
    case 0:
      app.displayDialog_withTitle("You must select a layer first.", "Color Copier")
    break

    case 1:
      isOneLayerSelected = true
    break

    default:
      app.displayDialog_withTitle("Only one layer can be selected.", "Color Copier")
    break
  }

  return isOneLayerSelected
}

var checkFill = function(layer) {
  var isFillPresent = false

  if (layer.style().fills().count() > 0 || (layer instanceof MSTextLayer)) {
    isFillPresent = true
  } else {
    app.displayDialog_withTitle("No fill on this object.", "Color Copier")
  }

  return isFillPresent
}

var checkBorder = function(layer) {
  var isBorderPresent = false

  if (layer.style().borders().count() > 0) {
    isBorderPresent = true
  } else {
    app.displayDialog_withTitle("No border on this object.", "Color Copier")
  }

  return isBorderPresent
}

var getColor = function(selectionType, layer) {
  var color

  if (selectionType === "fill") {
    if (layer instanceof MSTextLayer) {
      color = layer.textColor()
    } else {
      color = layer.style().fills().firstObject().color()
    }
  } else {
    color = layer.style().borders().firstObject().color()
  }

  return color
}

// JSTalk clipboard
// https://gist.github.com/uhunkler/5465857
var clipboard = {
	pasteBoard : null,
	init : function() {
		this.pasteBoard = NSPasteboard.generalPasteboard();
	},
	set : function( text ) {
		if( typeof text === 'undefined' ) return null;

		if( !this.pasteBoard )
			this.init();

		this.pasteBoard.declareTypes_owner( [ NSPasteboardTypeString ], null );
		this.pasteBoard.setString_forType( text, NSPasteboardTypeString );

		return true;
	},
	get : function() {
		if( !this.pasteBoard )
			this.init();

		var text = this.pasteBoard.stringForType( NSPasteboardTypeString );

		return text.toString();
	}
};
