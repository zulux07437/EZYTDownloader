const ytdl = require('ytdl-core');
const fs = require('fs');

const _arg_url = process.argv[2];
const _arg_title = process.argv[3];

const _args = [process.argv[4], process.argv[5]]; // Filter, Format

let ytdl_option = {};

if (_arg_url === undefined || _arg_url == "help") {
    console.log(
        "How to use:\n" +
        "   Argument 1: An url of the video\n" +
        "   Argument 2: The save path (Requires enough privileges)" +
        "   Argument 3, 4: Filter and Format (You can do the opposite)\n\n" +
        'For Example: https://youtube.com/watch?v=WJ16v-hD1mw "/home/user/music" audioonly mp3'
    );
    return;
}

// 引数に問題がなければダウンロード
if (check_args(_args)) {
    const video = ytdl(_arg_url, ytdl_option).pipe(fs.createWriteStream(`${_arg_title}.${ytdl_option.format}`));
} else {
    console.log("The download has been stopped.");
}

function check_args(args) {
    let result = true;

    args.some((arg) => {
        if (!result) return; // resultがfalseになったらループから抜ける

        switch (arg) {
            case "audioonly":
                ytdl_option.filter = arg;
                break;
            case "mp3":
            case "mp4":
                ytdl_option.format = arg;
                break;
            case undefined:
                console.log("Not enough arguments.");
                result = false;
                break;
            default:
                console.log(`An unknown argument: [${arg}]`);
                result = false;
                break;
        }
    });
    return result;
}