/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import * as OfficeHelpers from '@microsoft/office-js-helpers';

$(document).ready(() => {
    $('#ifPara').click(ifPara);
    $('#ifInline').click(ifInline);
    $('#listPara').click(listPara);
    $('#insertTemplate').click(insertTemplate);
    $('#commentPara').click(commentPara);
    $('#insertVariable').click(insertVariable);
});
  
// The initialize function must be run each time a new page is loaded
Office.initialize = (reason) => {
    $('#sideload-msg').hide();
    $('#app-body').show();
};

////////////////////////////////////////////////////////////////
// Docassemble code actions
async function insertVariable() {
    return Word.run(async context => {
        const range = context.document.getSelection();

        var variableName = document.getElementById('inputVariableName').value;
        //checkboxVariableReplaceAll
        var variableReplaceAll = document.getElementById('checkboxVariableReplaceAll').checked;

        range.load('text');

        if (! variableReplaceAll) {
            range.insertText('{{ ' + variableName + ' }}','Replace');
        } else {
            await context.sync();
            var textToReplace = range.text;

            var results = context.document.body.search(textToReplace);
            
            await context.sync();

            for (var i = 0; i < results.items.length; i++) {
                results.items[i].insertText('{{ ' + variableName + ' }}', "Replace");
            }
        }

        await context.sync();
    });
}

async function ifPara() {
    return Word.run(async context => {
            const range = context.document.getSelection();
            var ifExpression = document.getElementById('inputIfExpression').value;

            // Read the range text
            range.load('text');
            var textBefore = '{%p if ' + ifExpression + ' %}';

            range.insertParagraph(textBefore,'Before');
            range.insertParagraph('{%p endif %}','After');

            await context.sync();
            console.log(`The selected text was ${range.text}.`);
        });
}

async function ifInline() {
    return Word.run(async context => {
            const range = context.document.getSelection();
            var ifExpression = document.getElementById('inputIfExpression').value;
            var textBefore = '{% if ' + ifExpression + ' %}';

            // Read the range text
            range.load('text');

            range.insertText(textBefore,'Before');
            range.insertText('{% endif %}','After');

            await context.sync();
            console.log(`The selected text was ${range.text}.`);
        });
}

async function listPara() {
    return Word.run(async context => {
            const range = context.document.getSelection();
            var listVariableName = document.getElementById('inputListVariableName').value;
            var onlyTrue = document.getElementById('checkboxOnlyTrue').checked;
            if (onlyTrue) {
                var textBefore = '{%p for item in ' + listVariableName + '.true_values() %}'; 
            } else {
                var textBefore = '{%p for item in ' + listVariableName + '%}'; 
            }
            // Read the range text
            range.load('text');
            range.insertText('{{ item }}','Replace');
            range.insertParagraph(textBefore,'Before');
            range.insertParagraph('{%p endfor %}','After');

            await context.sync();
            console.log(`The selected text was ${range.text}.`);
        });
}

async function commentPara() {
    return Word.run(async context => {
        const range = context.document.getSelection();
            
        // Read the range text
        range.load('text');
        await context.sync(); // Guess this has a performance penalty?
        
        // Regexp with 3 groups: {# , text between comments, #}. We match both whitespace and non-whitespace, including newlines
        var re = new RegExp('({#)([\\s\\S]*)(#})');
        var matches = re.exec(range.text);

        if (matches) { // index 1 is the uncommented string
            // This is not correct as it removes formatting from the text
            // This sample looks like it shows how to do it correctly: https://github.com/OfficeDev/Word-Add-in-JS-SpecKit/blob/master/scripts/boilerplate.js in addBoilerplateParagraph
            // we should use var paragraphs = context.document.getSelection().paragraphs; and then loop through paragraph collection
            range.insertText(matches[2],'Replace'); 
            console.log('Removed comments.')
        } else {
            range.insertParagraph('{#','Before');
            range.insertParagraph('#}','After');
            console.log('Added comments.')
            // we should extend the selection to include the newly added text
        }
        await context.sync();
    });
}

async function insertTemplate() {
    return Word.run(async context => {
        const range = context.document.getSelection();
        var templateName = document.getElementById('inputTemplateName').value;
 
        var templateOptions = document.getElementById('inputTemplateOptions').value;
        if (templateOptions == "") {
            var textBefore = '{{p include_docx_template("' + templateName + '") }}'; 
        } else {
            var textBefore = '{{p include_docx_template("' + templateName + '", ' + templateOptions + ') }}'; 
        }

        // Read the range text
        range.load('text');
        
        range.insertText(textBefore,'Replace');
        
        await context.sync();
        console.log(`The selected text was ${range.text}.`);
    });
}

/////////////////////////////////////////////////////////////////////
// Helper functions

// File handling
function getDocumentAsCompressed() {
    Office.context.document.getFileAsync(Office.FileType.Compressed, {  }, 
        function (result) {
            if (result.status == "succeeded") {
            // If the getFileAsync call succeeded, then
            // result.value will return a valid File Object.
            var myFile = result.value;
            var sliceCount = myFile.sliceCount;
            var slicesReceived = 0, gotAllSlices = true, docdataSlices = [];
            app.showNotification("File size:" + myFile.size + " #Slices: " + sliceCount);

            // Get the file slices.
            getSliceAsync(myFile, 0, sliceCount, gotAllSlices, docdataSlices, slicesReceived);
            }
            else {
            app.showNotification("Error:", result.error.message);
            }
    });
}

function getSliceAsync(file, nextSlice, sliceCount, gotAllSlices, docdataSlices, slicesReceived) {
    file.getSliceAsync(nextSlice, function (sliceResult) {
        if (sliceResult.status == "succeeded") {
            if (!gotAllSlices) { // Failed to get all slices, no need to continue.
                return;
            }

            // Got one slice, store it in a temporary array.
            // (Or you can do something else, such as
            // send it to a third-party server.)
            docdataSlices[sliceResult.value.index] = sliceResult.value.data;
            if (++slicesReceived == sliceCount) {
               // All slices have been received.
               file.closeAsync();
               onGotAllSlices(docdataSlices);
            }
            else {
                getSliceAsync(file, ++nextSlice, sliceCount, gotAllSlices, docdataSlices, slicesReceived);
            }
        }
            else {
                gotAllSlices = false;
                file.closeAsync();
                app.showNotification("getSliceAsync Error:", sliceResult.error.message);
            }
    });
}

function onGotAllSlices(docdataSlices) {
    var docdata = [];
    for (var i = 0; i < docdataSlices.length; i++) {
        docdata = docdata.concat(docdataSlices[i]);
    }

    var fileContent = new String();
    for (var j = 0; j < docdata.length; j++) {
        fileContent += String.fromCharCode(docdata[j]);
    }

    // Now all the file content is stored in 'fileContent' variable,
    // you can do something with it, such as print, fax...
}