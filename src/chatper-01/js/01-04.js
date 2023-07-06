function init() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    var stats = initStats();

    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    var axes = new THREE.AxesHelper(20);
    //scene.add(axes);

    var planeGeometry = new THREE.PlaneGeometry(60, 20);
    var planeMeterial = new THREE.MeshLambertMaterial({ color: 0xAAAAAA });
    var plane = new THREE.Mesh(planeGeometry, planeMeterial);
    plane.receiveShadow = true;

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0)

    scene.add(plane);

    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMetarial = new THREE.MeshLambertMaterial({
        color: 0xFF0000,

    });
    var cube = new THREE.Mesh(cubeGeometry, cubeMetarial);
    cube.castShadow = true;

    cube.position.set(-4, 3, 0);

    scene.add(cube);

    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMetarial = new THREE.MeshLambertMaterial({
        color: 0x7777FF,

    });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMetarial);
    sphere.castShadow = true;

    scene.add(sphere)

    sphere.position.set(20, 4, 2);

    scene.add(sphere);

    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);

    var spotLight = new THREE.SpotLight(0xffffff);
    var spotLight = new THREE.SpotLight(0xFFFFFF);
    spotLight.position.set(-40, 40, -15);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    spotLight.shadow.camera.far = 130;
    spotLight.shadow.camera.near = 40;


    scene.add(spotLight);

    var ambienLight = new THREE.AmbientLight(0x353535);
    scene.add(ambienLight);

    document.getElementById('webgl-output').appendChild(renderer.domElement);
    var step = 0;
    renderScene();

    function renderScene() {

        stats.update();

        // rotate the cube around its axes
        cube.rotation.x += 0.02;
        cube.rotation.y += 0.02;
        cube.rotation.z += 0.02;

        // bounce the sphere up and down
        step += 0.04;
        sphere.position.x = 20 + (10 * (Math.cos(step)));
        sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

        // render using requestAnimationFrame
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    }

    // renderer.render(scene, camera);

}



