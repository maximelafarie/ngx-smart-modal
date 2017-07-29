import resolve from 'rollup-plugin-node-resolve';

// Add here external dependencies that actually you use.
const globals = {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/animations': 'ng.animations',
    '@angular/platform-browser': 'ng.platformBrowser',
    'web-animations-js': 'WaJs',
    'rxjs/Observable': 'Rx',
    'rxjs/Observer': 'Rx',
    'rxjs/add/operator/map': 'Rx'
};

export default {
    entry: './dist/modules/ngx-smart-modal.es5.js',
    dest: './dist/bundles/ngx-smart-modal.umd.js',
    format: 'umd',
    exports: 'named',
    moduleName: 'ng.ngxSmartModal',
    plugins: [resolve()],
    external: Object.keys(globals),
    globals: globals,
    onwarn: () => { return }
}
