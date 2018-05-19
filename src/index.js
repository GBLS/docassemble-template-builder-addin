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

async function insertVariable() {
    return Word.run(async context => {
        const range = context.document.getSelection();

        var variableName = document.getElementById('inputVariableName').value;

        range.load('text');
        range.insertText('{{ ' + variableName + ' }}','Replace');

        await context.sync();
    });
}

async function ifPara() {
    return Word.run(async context => {
             const range = context.document.getSelection();
            
            // Read the range text
            range.load('text');

            range.insertParagraph('{%p if myVar %}','Before');
            range.insertParagraph('{%p endif %}','After');

            await context.sync();
            console.log(`The selected text was ${range.text}.`);
        });
}

async function ifInline() {
    return Word.run(async context => {
            const range = context.document.getSelection();
            
            // Read the range text
            range.load('text');

            range.insertText('{% if myVar %}','Before');
            range.insertText('{% endif %}','After');

            await context.sync();
            console.log(`The selected text was ${range.text}.`);
        });
}

async function listPara() {
    return Word.run(async context => {
            const range = context.document.getSelection();
            
            // Read the range text
            range.load('text');
            range.insertText('{{ item }}','Replace');
            range.insertParagraph('{%p for item in myVar %}','Before');
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
        
        // Read the range text
        range.load('text');
        
        range.insertText('{{p include_docx_template("myTemplate.docx") }}','Replace');
        
        await context.sync();
        console.log(`The selected text was ${range.text}.`);
    });
}

