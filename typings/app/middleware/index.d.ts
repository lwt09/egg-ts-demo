// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportInputParser from '../../../app/middleware/inputParser';

declare module 'egg' {
  interface IMiddleware {
    inputParser: typeof ExportInputParser;
  }
}
