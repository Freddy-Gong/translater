#!/usr/bin/env node
import * as commander from 'commander'
import { translate } from './main';

const program = new commander.Command();

program
    .version('0.0.1')
    .name('fy')
    .usage('<world>')
    .arguments('<world>')
    .action((...arg) => {
        const text = arg[1].args.join(' ')
        translate(text)
    })
program.parse(process.argv);