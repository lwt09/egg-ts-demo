// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase from '../../../app/controller/base';

declare module 'egg' {
  interface IController {
    base: ExportBase;
  }
}
