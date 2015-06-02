(function() {
    var cursorMarkup = '<div class="cursor"></div>';
    
    Array.prototype.getAllInLeftOfIndex = function(threshold) {
        return this.filter(function(item, index) {
            return index < threshold;
        });
    };
    Array.prototype.getAllInRightOfIndex = function(threshold) {
        return this.filter(function(item, index) {
            return index >= threshold;
        });
    };
    
    var getTextLeftToCursor = function(textBox) {
        return textBox.html().split('<div class="cursor"')[0];
    };
    
    var getTextRightToCursor = function(textBox) {
        return textBox.html().split('</div>')[1];
    };
    
    var blinkCursors = function() {
        showCursors();
    }
    
    var hideCursors = function() {
        setTimeout(function() { $(".cursor").hide(); showCursors(); }, 1000);
    }
    
    var showCursors = function() {
        setTimeout(function() { $(".cursor").show(); hideCursors(); }, 1000);
    }
    
    var refreshCursor = function(textBox) {
        $(".cursor").css("height", parseInt(parseInt(textBox.css("font-size")) * 0.9));
        $(".cursor").css("background-color", textBox.css("color"));
    }

    $.prototype.fluxionTextBox = function() {
        $(this).addClass("textBox");
        
        $(this).append(cursorMarkup.trim());
        
        refreshCursor($(this));
        
        blinkCursors();
    }
    
    $(document).on("click", ".textBox", function(event) {
        $(this).children(".cursor").remove();
        
        var text = $(this).html().trim();
        
        var index = parseInt(((event.originalEvent.x / $(this).width()) * text.length));
        
        console.log($(this).width());
        console.log(event.originalEvent.x);
        console.log(index);
        
        $(this).html(text.split("").getAllInLeftOfIndex(index).join("") + cursorMarkup + text.split("").getAllInRightOfIndex(index).join(""));
        
        refreshCursor($(this));
    });

    $.prototype.delete = function() {
        $(this).html(getTextLeftToCursor($(this)) + cursorMarkup + getTextRightToCursor($(this)).substring(1));
        
        refreshCursor($(this));
    }

    $.prototype.backspace = function() {
        var leftOfCursor = getTextLeftToCursor($(this));
        leftOfCursor = leftOfCursor.substring(0, leftOfCursor.length - 1);
        
        $(this).html(leftOfCursor + cursorMarkup + getTextRightToCursor($(this)));
        
        refreshCursor($(this));
    }

    $.prototype.type = function(characters) {
        $(this).html(getTextLeftToCursor($(this)) + characters + cursorMarkup + getTextRightToCursor($(this)));
        
        refreshCursor($(this));
    }
})();
