/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

/** Simple extension that adds a "File > Hello World" menu item */
define(function (require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager"),
	    EditorManager  = brackets.getModule("editor/EditorManager"),
        Menus          = brackets.getModule("command/Menus");


    // Function to run when the menu item is clicked
    function findFunction() {
		var editor = EditorManager.getCurrentFullEditor();
		var text = editor.document.getText();
        var selected = editor.getSelectedText();
		var lines = text.split(/\n/);
		var line = "";
		var lineIndex = 0;
		for(var i=0;i<lines.length;i++){
			line = lines[i];
			if(line.indexOf(selected)>=0 && line.indexOf("function")>=0) lineIndex=i;
		}
		  editor.setCursorPos(lineIndex,0, true, false);
		  editor._codeMirror.setSelection({line: lineIndex, ch: 0}, {line: lineIndex, ch: null});
    }
	

    // First, register a command - a UI-less object associating an id to a handler
    var MY_COMMAND_ID = "functionFinder.findFunction";   // package-style naming to avoid collisions
    CommandManager.register("Find Function", MY_COMMAND_ID, findFunction);

    // Then create a menu item bound to the command
    // The label of the menu item is the name we gave the command (see above)
    var menu = Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU);
    menu.addMenuItem(MY_COMMAND_ID,null,Menus.FIRST);

    // We could also add a key binding at the same time:
    //menu.addMenuItem(MY_COMMAND_ID, "Ctrl-Alt-H");
    // (Note: "Ctrl" is automatically mapped to "Cmd" on Mac)
});