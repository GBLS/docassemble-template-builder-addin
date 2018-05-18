/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import * as OfficeHelpers from '@microsoft/office-js-helpers';

$(document).ready(() => {
    $('#if-para').click(if_para);
    $('#if-inline').click(if_inline);
});
  
// The initialize function must be run each time a new page is loaded
Office.initialize = (reason) => {
    $('#sideload-msg').hide();
    $('#app-body').show();
};

async function if_para() {
    return Word.run(async context => {
            /**
             * Insert your Word code here
             */
            const range = context.document.getSelection();
            
            // Read the range text
            range.load('text');

            // Update font color
            //range.font.color = 'red';

            range.insertParagraph('{%p if myVar %}','Before');
            range.insertParagraph('{%p endif %}','After');

            await context.sync();
            console.log(`The selected text was ${range.text}.`);
        });
}

async function if_inline() {
    return Word.run(async context => {
            /**
             * Insert your Word code here
             */
            const range = context.document.getSelection();
            
            // Read the range text
            range.load('text');

            // Update font color
            //range.font.color = 'red';

            range.insertText('{% if myVar %}','Before');
            range.insertText('{% endif %}','After');

            await context.sync();
            console.log(`The selected text was ${range.text}.`);
        });
}