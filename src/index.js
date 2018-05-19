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
});
  
// The initialize function must be run each time a new page is loaded
Office.initialize = (reason) => {
    $('#sideload-msg').hide();
    $('#app-body').show();
};

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
        
        // Regexp with 3 groups: {# , text between comments, #}. We match both whitespace and non-whitespace, including newlines
        var re = new RegExp('({#)([\s\S]*)(#})');
        var matches = re.exec(range.text);

        if (matches) { // index 1 is the uncommented string
            range.insertText(matches[1],'Replace');
        } else {
            range.insertParagraph('{#','Before');
            range.insertParagraph('#}','After');
        }
        await context.sync();
        console.log(`The selected text was ${range.text}.`);
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

