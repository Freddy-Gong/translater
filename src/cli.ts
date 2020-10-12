import * as commander from 'commander'
import { translate } from './main';

const program = new commander.Command();

program
    .version('0.0.1')
    .name('fy')
    .usage('<world>')
    .arguments('<world>')
    .action((world) => {
        console.log(world)
        translate(world)
    })
program.parse(process.argv);