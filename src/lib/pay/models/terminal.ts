export class Terminal{
    // 	终端号
    terminalSn: string;
    // 	终端密钥
    terminalKey: string;

    constructor(terminalSn: string, terminalKey: string) {
        this.terminalSn = terminalSn;
        this.terminalKey = terminalKey;
    }
}