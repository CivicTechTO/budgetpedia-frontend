declare module 'browserify-fs' {
    var fs: {
        writeFile: Function;
    }
    export = fs
}
