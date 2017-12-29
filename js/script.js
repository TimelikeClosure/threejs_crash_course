"use strict";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight
);

let view = null;

window.addEventListener('load', function(){
    view = createView(document.body);
});

function createView(viewContext){
    const view = {scene: null, camera: null, renderer: null};
    Object.seal(view);

    const fieldOfView = (currentFOV => (newFOV = currentFOV) => {
        currentFOV = newFOV;
        return currentFOV;
    })(75);

    const { width, height, aspectRatio } = (viewContainer => {
        const height = () => viewContainer.innerHeight;
        const width = () => viewContainer.innerWidth;
        const aspectRatio = () => width() / height();
        return { height, width, aspectRatio };
    })(viewContext);

    const clippingRange = ((currMin, currMax) => (newMin = currMin, newMax = currMax) => {
        currMin = newMin;
        currMax = newMax;
        return [currMin, currMax];
    })(0.1, 1000)

    view.scene = new THREE.Scene();
    view.camera = new THREE.PerspectiveCamera(
        fieldOfView(),
        aspectRatio(),
        ...clippingRange()
    );
    view.renderer = new THREE.WebGLRenderer();
    view.renderer.setSize(width(), height());
    
    viewContext.appendChild(view.renderer.domElement);

    return view;
}
