
class FileManager {
    /// Reads a file from Folder path and returns data inside callback.
    static ReadFile(path, format, callback, errorHandler) {
        var fs = require('fs')

        try {
            debugger;
            let fileData = fs.readFileSync(path, format);
            if (callback) callback(fileData);
            else console.warn("FileManager:ReadFile:NoCallbackReceived");
        } catch (e) {
            console.error(e);
            errorHandler(e);
        }
    }

    static WriteFile(data, path, callback, errorHandler) {
        var fs = require('fs');
        try {
            fs.writeFile(path, data, function (err) {
                if (err) {
                    console.error(err);
                    errorHandler(err);
                }
                if (callback) callback();
                else console.warn("FileManager:WriteFile:NoCallbackReceived");
            });
        } catch (e) {
            console.error(e);
            errorHandler(err);            
        }
    }


}

export default FileManager