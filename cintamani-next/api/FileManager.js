
class FileManager {
    static isDropboxEnabled = true;

    /// Reads a file from Folder path and returns data inside callback.
    static ReadFile(path, format, callback, errorHandler, testFlag=false) {
        let fs = require('fs')
        try {
            let fileData = fs.readFileSync(path, format);
            if (callback) callback(fileData);
            if (testFlag) return;
            else console.warn("FileManager:ReadFile:NoCallbackReceived");
        } catch (e) {
             errorHandler(e);
             if (testFlag) return;             
             console.error(e);
        }
    }

    static WriteFile(data, path, format = "binary", callback, errorHandler) {
        let fs = require('fs');
        try {
            fs.writeFile(path, data, format, function (err) {
                if (err) {
                    console.error(err);
                    errorHandler(err);
                }
                if (callback) callback();
                // else console.warn("FileManager:WriteFile:NoCallbackReceived");
            });
        } catch (e) {
            console.error(e);
            errorHandler(err);
        }
    }

    static DownloadFile(dbPath, localPath, callback, errorHandler) {
        if(this.isDropboxEnabled){
            let Dropbox = require('dropbox');
            let dbx = new Dropbox({ accessToken: 'MYYp9clMLBIAAAAAAAALSk6hF4_cib45bGn3Tr5j84BzAms8t9Srkycin7V5pLDh' });
            let file = dbx.filesDownload({ path: dbPath })
            file.then((data) => {
                this.WriteFile(data.fileBinary, localPath, 'binary', callback, errorHandler)
            });
        }else console.error("No Dropbox enabled.")
    }
}

export default FileManager