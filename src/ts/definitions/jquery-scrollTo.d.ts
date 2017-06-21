// Type definitions for jQuery ScrollTo
// Project:
// Definitions
// Author: Oliver Steiner

/// <reference types="jquery"/>


interface JQuery {

    scrollTo(): JQuery;
    scrollTo(methodName: string): JQuery;
    scrollTo(target: string, duration?: any, settings?: any): JQuery;
}


interface JQueryStatic {
    scrollTo(target: string, duration?: any, settings?: any): JQuery;
}
