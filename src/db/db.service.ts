import { Injectable } from '@nestjs/common';
import * as low from 'lowdb';
const FileSync = require('lowdb/adapters/FileSync')
import * as path from 'path';
import * as fs from 'fs';

interface ErrorItem {
    lever: 'info' | 'warn' | 'error';
    message: string;
    timestamp: string;
}

export interface LowDBData {
    errorLogs: ErrorItem[]
}

export interface LowDBInstance {
    get: (string) => any;
    pushOne: (string, any) => any;
}

@Injectable()
export class LowDbService {
    private db;
    private dbDirectory = './database-file'
    private dbFile = path.resolve(process.cwd(), this.dbDirectory, 'lowDB.json');
    constructor() {
        this.init()
    }

    init() {
        this.checkDirectoryExist();
        const adapter = new FileSync(this.dbFile);
        this.db = low(adapter);
        this.db.read();
        this.db.defaults({ errorLogs: [] }).write();
    }

    checkDirectoryExist() {
        if (!fs.existsSync(this.dbDirectory)) {
            fs.mkdirSync(this.dbDirectory);
        }
    }

    getDBInstance() {
        return this.db;
    }

    pushOne(key: string, value: any) {
        this.db.get(key).push(value).write();
    }

    readAll(key) {
        return this.db.has(key).value();
    }
}
