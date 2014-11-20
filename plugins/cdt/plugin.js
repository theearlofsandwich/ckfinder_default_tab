/**
 * @file
 * Written by Henri MEDOT <henri.medot[AT]absyx[DOT]fr>
 * http://www.absyx.fr
 *
 * Portions of code:
 * Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

(function($) {
  CKEDITOR.plugins.add('cdt_path', {

    init: function(editor, pluginPath) {

      CKEDITOR.on( 'instanceReady', function(ev) {
        if (ev.editor != editor) return;

        editor.addCommand("noAlign", {
          exec : function( editor ) {
            element = editor.getSelection().getSelectedElement()
            element.addClass('img-noalign');
            element.removeClass('img-left');
            element.removeClass('img-center');
            element.removeClass('img-right');
            element.setStyles({ 'float' : '' });
        }});

        editor.addCommand("leftAlign", {
          exec : function( editor ) {
            element = editor.getSelection().getSelectedElement()
              element.removeClass('img-noalign');
              element.addClass('img-left');
              element.removeClass('img-center');
              element.removeClass('img-right');
              element.setStyles({ 'float' : 'left' });
        }});

        editor.addCommand("centreAlign", {
          exec : function( editor ) {
              element = editor.getSelection().getSelectedElement()
              element.removeClass('img-noalign');
              element.removeClass('img-left');
              element.addClass('img-center');
              element.removeClass('img-right');
              element.setStyles({ 'float' : '' });

          }});

        editor.addCommand("rightAlign", {
          exec : function( editor ) {
            element = editor.getSelection().getSelectedElement()
              element.removeClass('img-noalign');
              element.removeClass('img-left');
              element.removeClass('img-center');
              element.addClass('img-right');
              element.setStyles({ 'float' : 'right' });
        }});

        editor.contextMenu.addListener( function( element, selection ) {
          if(! element || !element.is('img'))
                    return null;
           return {
              noAlign : CKEDITOR.TRISTATE_OFF,
              leftAlign : CKEDITOR.TRISTATE_OFF,
              centreAlign : CKEDITOR.TRISTATE_OFF,
              rightAlign : CKEDITOR.TRISTATE_OFF
           };
        });

        if(editor.addMenuItems){
          editor.addMenuItems({
            noAlign: {
              label: "Don't align",
              command: 'noAlign',
              group: 'image'
            },
            leftAlign: {
                  label: 'Left align',
                  command: 'leftAlign',
                  group: 'image'
              },
            centreAlign: {
                  label: 'Centre align',
                  command: 'centreAlign',
                  group: 'image'
              },
            rightAlign: {
              label: 'Right align',
              command: 'rightAlign',
              group: 'image'
            }
            });
        }

      });

      CKEDITOR.on('dialogDefinition', function(ev) {

        if (ev.editor != editor) return;

         var dialogDefinition = ev.data.definition;

        if (ev.data.name == 'link') {
          dialogDefinition.getContents('advanced').hidden=true;
        } else if (ev.data.name == 'image') {

          var infoTab = dialogDefinition.getContents( 'info' ),
            alignField = infoTab.get( 'cmbAlign' );

          // Set the default image alignment
          //alignField['default'] = 'left';

          // Remove some of the more un-necessary buttons
          infoTab.remove( 'txtBorder');
          infoTab.remove( 'txtHSpace');
          infoTab.remove( 'txtVSpace');
//          infoTab.remove( 'ratioLock');
//          infoTab.remove( 'txtWidth');
//          infoTab.remove( 'txtHeight');

          var extraStyles = infoTab.get( 'cmbAlign' );

          var captionField_config = {
            type : 'text',
            id : 'caption',
            label: 'Caption',
            setup: function(type, element) {
              this.setValue( element.getAttribute('data-caption') );
            },
            commit: function(type, element) { //onCommit
                // this = CKEDITOR.ui.dialog.checkbox
              if ( this.getValue() || this.isChanged() )
              {
                if (this.getValue() != "") {
                  element.setAttribute( 'data-caption', this.getValue() );
                } else {
                  element.removeAttribute( 'data-caption');
                }
              }
            }          
          };
          infoTab.add(captionField_config);


          // Remove the advanced and link tabs
          dialogDefinition.getContents('advanced').hidden=true;
          dialogDefinition.getContents('Link').hidden=true;

          // Let's get rid of the link advanced tab while we're at it


          dialogDefinition.onLoad = function () {
            // This code will open the Upload tab.
            this.selectPage('Upload');

          };
        }

      });
    }
  }
  );
})(jQuery);
