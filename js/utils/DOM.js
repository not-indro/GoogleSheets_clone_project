/**
 * Downloads data in given format, only JSON and CSV supported.
 *
 * @param {string} filetype         File format.
 * @param {string} filename         Name of file.
 * @param {string} data             Data of the file.
 */
export const downloadData = (filetype, filename, data) => {
    switch (filetype) {
        case ('json') : {
            filetype = 'data:text/json;charset=utf-8,';
            break;
        }
        case ('csv') : {
            filetype = 'data:text/csv;charset=utf-8,';
        }
    }

    const a = document.createElement('a');
    const downloadContent = filetype + encodeURIComponent(data);

    a.style.display = 'none';
    a.setAttribute("download", filename);
    a.setAttribute('href', downloadContent);

    document.body.appendChild(a);
    a.click();
    a.remove();
}

/**
 * Simpler function to read data from file.
 *
 * @param {File} file       File to read data from.
 * @param onFileLoad        Callback to run when file read is complete.
 */
export const readFile = (file, onFileLoad) => {
    // REF: https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications !!
    const fileReader = new FileReader();

    fileReader.onload = function (e) {
        onFileLoad(e.target.result);
    };

    fileReader.readAsText(file);
}
