import {downloadData, readFile} from "./utils/DOM.js";
import {Excel, getGridFromJson} from "./component/excel.js";
import {Modal} from "./component/modal.js";

let excel = new Excel(
    100, 26, 'excel-table',
    'background-color-picker', 'text-color-picker', 'font-size-input',
    'make-text-bold', 'make-text-italic', 'make-text-strikethrough',
    'current-cell', 'formula-input', 'font-selector', 'plot-graph-btn'
);
const helpSectionModal = new Modal({});

// HTML CODE !!
const helpSectionHTML = `
    <h2 class="help-modal-header center-text">HELP</h2>

    <div class="help-modal-body">
        <div class="content-section">
            <div class="help-col">
                <h3 class="help-section-title sub-header">HOW TO USE FORMULA</h3>
                <ul class="help-list">
                    <li>=FORMULA_FOR(A1:A3)</li>
                    <li>=FORMULA_FOR(A1:C1)</li>
                    <li>=FORMULA_FOR(A1,A2,A3)</li>
                    <li>=FORMULA_FOR(A1,A2,A3)</li>
                    <li>Any valid Mathematical Expression, use ^ for square. Raw values are not allowed, must be valid cell name</li>
                </ul>
                <br>
                <h2 class="theme-emphasis sub-header">NOTE</h2>
                <p>
                    \`<span class="theme-emphasis">:</span>\`
                    will be used for selecting range of vertical or horizontal cells.
                </p>
                <p>
                    \`<span class="theme-emphasis">,</span>\`
                    will be used for selecting particular cell.
                </p>
            </div>

            <div class="help-col">
                <h3 class="help-section-title sub-header">AVAILABLE FORMULA</h3>

                <ul class="help-list">
                    <li>
                        <span class="formula">SUM</span>
                        <span class="italic">#Gives Sum of given cells.</span>
                    </li>
                    <li>
                        <span class="formula">AVERAGE</span>
                        <span class="italic">#Gives Average of given cells.</span>
                    </li>
                    <li>
                        <span class="formula">COUNT</span>
                        <span class="italic">#Gives Count of Valid Number in given cells.</span>
                    </li>
                    <li>
                        <span class="formula">MIN</span>
                        <span class="italic">#Gives Minimum Number in given cells.</span>
                    </li>
                    <li>
                        <span class="formula">MAX</span>
                        <span class="italic">#Gives Maximum Number in given cells.</span>
                    </li>
                </ul>
                <br>
                <h2 class="theme-emphasis sub-header">FORMULA ERRORS</h2>
                <p>
                    \`<span class="theme-emphasis">RECURSION</span>\`
                    The value of same cell where formula is used is ignored to prevent recursion.
                </p>
            </div>
        </div>

        <div class="content-section">
            <div class="help-col">
                <h3 class="help-section-title sub-header">CREATING GRAPHS</h3>

                <ul class="help-list">
                    <li>Click on Plot graph to create either line or dot graph.</li>
                    <li>Provide Cell Range for Both X and Y values.</li>
                    <li>Provide label for graphs.</li>
                    <li>Select Graph type from dropdown.</li>
                    <li>Click on plot to plot the graph.</li>
                    <li>You can press \`ESC\` Key to close graph.</li>
                    <li>To download graph, Right click on graph and click on save image as.</li>
                </ul>
            </div>

            <div class="help-col">
                <h3 class="help-section-title sub-header">USING FILTERS</h3>

                <ul class="help-list">
                    <li>Filter are similar in syntax to \`FORMULA\`.</li>
                    <li>Use \`FILTER_ONLY_STRING\` to Keep only strings.</li>
                    <li>Use \`FILTER_ONLY_NUM\` to Keep only Numbers.</li>
                    <li>
                        USE \`=FILTER_FOR(A1:A3)\` OR \`=FILTER_FOR(A1,A2,A3)\`, Filter will be used in selected rows.
                    </li>
                </ul>
            </div>
        </div>
        <br>
        <p class="center-text">Press \`ESC\` Key to close Help Section.</p>
    </div>
`

// Selectors !!
const documentNameDOM = document.getElementById('current-doc-name-input');
const saveDataDOM = document.getElementById('save-data-btn');
const saveDataCSV = document.getElementById('save-data-in-csv-format-btn');
const uploadDataDOM = document.getElementById('upload-data-btn');
const htmlBtn = document.getElementById('help-btn');
const dataQualityBtn = document.getElementById('data-quality-btn'); // New button for Data Quality Functions
// END Selectors !!

helpSectionModal.addModelBody(helpSectionHTML, true);

/**
 *  downloads data in JSON format.
 */
const handleSaveDataAsJSON = () => {
    downloadData('json', documentNameDOM.value + '.json', JSON.stringify(excel.serialize()));
}

/**
 * downloads data in CSV format.
 */
const handleSaveDataAsCSV = () => {
    downloadData('csv', documentNameDOM.value + '.csv', excel.serialize('csv'));
}

/**
 * Change box size of document name if edited.
 * @param e
 */
const changeInputSizeOnInput = (e) => {
    e.target.style.width = '0px';

    if (e.target.scrollWidth >= 400) e.target.style.width = 400 + 'px';
    else if (e.target.scrollWidth <= 30) e.target.style.width = 30 + 'px';
    else e.target.style.width = e.target.scrollWidth + 'px';
}

/**
 * Loads JSON data from file and converts to spreadsheet.
 * @param {Event} e
 */
const handleLoadDataFromFile = (e) => {
    const file = e.target.files[0];

    readFile(file, (fileData) => {
        const spreadsheetJsonData = JSON.parse(fileData);
        const data = getGridFromJson(spreadsheetJsonData);

        excel.resetGrid(data);
        documentNameDOM.value = spreadsheetJsonData.name;
        document.title = spreadsheetJsonData.name;
        changeInputSizeOnInput({target: documentNameDOM})
    });
}

/**
 * Handles Data Quality Functions.
 */
const handleDataQualityFunctions = () => {
    const selectedRange = prompt("Enter the range for Data Quality Function (e.g., A1:C3):");
    if (!selectedRange) return;

    const [startCell, endCell] = selectedRange.split(':');
    const startX = startCell.charCodeAt(0) - 65; // Convert 'A' to 0, 'B' to 1, etc.
    const startY = parseInt(startCell.slice(1)) - 1; // Convert '1' to 0, '2' to 1, etc.
    const endX = endCell.charCodeAt(0) - 65;
    const endY = parseInt(endCell.slice(1)) - 1;

    const functionName = prompt("Enter the Data Quality Function (TRIM, UPPER, LOWER, REMOVE_DUPLICATES, FIND_AND_REPLACE):").toUpperCase();
    switch (functionName) {
        case 'TRIM':
            for (let y = startY; y <= endY; y++) {
                for (let x = startX; x <= endX; x++) {
                    excel.TRIM(x, y);
                }
            }
            break;
        case 'UPPER':
            for (let y = startY; y <= endY; y++) {
                for (let x = startX; x <= endX; x++) {
                    excel.UPPER(x, y);
                }
            }
            break;
        case 'LOWER':
            for (let y = startY; y <= endY; y++) {
                for (let x = startX; x <= endX; x++) {
                    excel.LOWER(x, y);
                }
            }
            break;
        case 'REMOVE_DUPLICATES':
            excel.REMOVE_DUPLICATES(startX, startY, endX, endY);
            break;
        case 'FIND_AND_REPLACE':
            const find = prompt("Enter text to find:");
            const replace = prompt("Enter text to replace:");
            excel.FIND_AND_REPLACE(startX, startY, endX, endY, find, replace);
            break;
        default:
            alert("Invalid Data Quality Function!");
            break;
    }
}

/**
 * Handles events that is not related to spreadsheet.
 */
const handleEvents = () => {
    documentNameDOM.addEventListener('input', (e) => {
        changeInputSizeOnInput(e);
        document.title = e.target.value;
    });
    documentNameDOM.addEventListener('focusin', () => {
        excel.isEditing = true
        excel.isWorkingInExternalInput = true;
    });
    documentNameDOM.addEventListener('focusout', () => {
        excel.isEditing = false;
        excel.isWorkingInExternalInput = false;
        if (!documentNameDOM.value) documentNameDOM.value = 'Untitled Document';
        changeInputSizeOnInput({target: documentNameDOM});
        document.title = documentNameDOM.value;
        changeInputSizeOnInput({target: documentNameDOM})
    });
    documentNameDOM.addEventListener('keydown', (e) => {
        if (e.code === 'Enter') documentNameDOM.blur();
    });

    saveDataDOM.addEventListener('click', handleSaveDataAsJSON);
    saveDataCSV.addEventListener('click', handleSaveDataAsCSV);
    uploadDataDOM.addEventListener('change', handleLoadDataFromFile);

    htmlBtn.addEventListener('click', () => helpSectionModal.show());
    dataQualityBtn.addEventListener('click', handleDataQualityFunctions); // Add event listener for Data Quality Functions
}

/**
 * Entrypoint for other functions !!
 */
const main = () => {
    excel.render();
    handleEvents();
    document.title = documentNameDOM.value;
    changeInputSizeOnInput({target: documentNameDOM})
}

main();