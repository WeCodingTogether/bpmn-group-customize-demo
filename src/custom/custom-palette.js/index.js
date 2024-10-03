import CustomPaletteProvider from "./CustomPaletteProvider";
import PaletteModule from 'diagram-js/lib/features/palette';
import translate from 'diagram-js/lib/i18n/translate';

export default {
    __depends__: [
        PaletteModule,
        translate
    ],
    __init__: [ 'paletteProvider' ],
    paletteProvider: [ 'type', CustomPaletteProvider ],
};