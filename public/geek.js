/**
 * Manage dragable geeks in a droppable playground environnement.
 */

window.addEvent('domready', function() {
    var geeks = new Array();
    $$('ul.geeks li.geek').each(function(elmt) {
        // the right geek at the right places
        var z = $(elmt.getElement('form input[name=z]').value);
        if(z != null && z != '')
        {
            var x = z.getCoordinates().left + parseInt( elmt.getElement('form input[name=x]').value );
            var y = z.getCoordinates().top + parseInt( elmt.getElement('form input[name=y]').value );
            elmt.setStyle('left', x + 'px');
            elmt.setStyle('top',  y + 'px');
            elmt.setStyle('position', 'absolute');
        } else {
            outside_playground(elmt);
        }



        // give geeks the draggable ability.
        geeks.push(new Drag.Move(elmt, {
            droppables: [$('haut'), $('bas')],
            precalculate: true,
            onDrop: playground_drop
        }));
    });

});

// geek position change. Will post and save on server.
// if not drop on a play_ground, will reset to list position.
var playground_drop = function(element, droppable, event) {
        var coords = element.getCoordinates(droppable);
        element.getElement('form input[name=x]').value = droppable ? coords.left : 0;
        element.getElement('form input[name=y]').value = droppable ? coords.top : 0;
        element.getElement('form input[name=z]').value = droppable ? droppable.getAttribute('id') : '';
        element.setStyle('position', 'absolute');
        element.getElement('form').send();
        if(!droppable)
        {
            outside_playground(element);
        }
}

// move geek to the toolbar.
var  outside_playground = function(element)
{
    element.setStyle('position', 'relative');
    element.setStyle('left', '0');
    element.setStyle('top', '0');
}

