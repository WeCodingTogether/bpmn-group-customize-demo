import { assign } from 'min-dash';

export default class CustomPaletteProvider {
    constructor(
      bpmnFactory,
      palette,
      create,
      elementFactory,
      globalConnect,
      translate,
      modeling,
      canvas,
      spaceTool,
      lassoTool,
      handTool
    ) {
            this._bpmnFactory = bpmnFactory;
            this._palette = palette;
            this._create = create;
            this._elementFactory = elementFactory,
            this._globalConnect = globalConnect;
            this._translate = translate;
            this._modeling  = modeling;
            this._canvas = canvas;
            this._spaceTool = spaceTool;
            this._lassoTool = lassoTool;
            this._handTool = handTool;

        palette.registerProvider(this);
      }

      getPaletteEntries(element) {
        const {
          _create: create,
          _elementFactory: elementFactory,
          _translate: translate,
          _spaceTool: spaceTool,
          _lassoTool: lassoTool,
          _handTool: handTool,
          _globalConnect: globalConnect
        } = this;

        function createServiceTask(event, type, options) {
          const shape = elementFactory.createShape(assign( { type : type },  options));

          if(options) {
            !shape.businessObject.di && (shape.businessObject.di = {});
            shape.businessObject.di.isExpanded = options.isExpanded;
          }

          create.start(event, shape);
        }

        function createAction( group, className, title, type, options ) {
          return {
            group: group,
            className: className,
            title: title,
            type: type,
            options: options,
            action: {
              dragstart: event => {
                createServiceTask(event, type, options)
              },
              click: event => {
                createServiceTask(event, type, options)
              }
            }
          }
        }

      const actions = {
        'create.group': createAction(
            'susie:LayoutGroup', 'artifact', 'bpmn-icon-group',
            translate('SUsie create group')
        ),
    }


        return actions;
    }
}

    CustomPaletteProvider.$inject = [
        'bpmnFactory',
        'palette',
        'create',
        'elementFactory',
        'globalConnect',
        'translate',
        'modeling',
        'canvas',
        'spaceTool',
        'lassoTool',
        'handTool'
    ];


