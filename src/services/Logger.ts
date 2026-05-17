export class Logger {
    private logs: string[] = [];

    public log(message: string): void {
        this.logs.push(message);
        console.log(message);
    }

    public getLogs(): string[] {
        return this.logs;
    }
}