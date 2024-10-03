import "jquery";
import BpmnJs from "bpmn-js/lib/Modeler";
import blankXml from "../resources/canvasOnly.bpmn";
import {
    BpmnPropertiesPanelModule,
    BpmnPropertiesProviderModule,
    // ZeebePropertiesProviderModule
} from 'bpmn-js-properties-panel';
import CustomPaletteProviderModule from "./custom/custom-palette.js/CustomPaletteProvider";
import susieModdleExtension from "../resources/susieModdle.json";

const bpmnModeler = new BpmnJs({
    container: $("#canvas"),
    keyboard: {
        bindTo: document
    },
    propertiesPanel: {
        parent: $("#properties")
    },
    additionalModules: [
        // BpmnPropertiesPanelModule,
        // BpmnPropertiesProviderModule
        CustomPaletteProviderModule
    ],
    moddleExtensions: {
        susie: susieModdleExtension
    }
});

bpmnModeler.importXML(blankXml);

