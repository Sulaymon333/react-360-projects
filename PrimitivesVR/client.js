import { Location, ReactInstance } from 'react-360-web';

function init(bundle, parent, options = {}) {
    const r360 = new ReactInstance(bundle, parent, {
        fullScreen: true,
        ...options,
    });
    const location = new Location([0, 0, -2]);
    r360.renderToLocation(
        r360.createRoot('PrimitivesVR', {
            /*initial props*/
        }),
        location
    );

    r360.compositor.setBackground(r360.getAssetURL('watercolor_world.jpg'));
}

window.React360 = { init };
