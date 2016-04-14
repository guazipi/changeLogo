/**
 * Created by Administrator on 2016/4/14.
 */
var app;
function init() {
    var logoMesh, lingkouMesh, lingkou, geo, uvarr;
    var logo = THREE.ImageUtils.loadTexture("model/logo.png");
    var logo1 = THREE.ImageUtils.loadTexture("model/logo1.png");
    var logo2 = THREE.ImageUtils.loadTexture("model/logo2.png");
    var lingkou1 = THREE.ImageUtils.loadTexture("model/lingkou1.jpg");
    var lingkou2 = THREE.ImageUtils.loadTexture("model/lingkou2.jpg");

    var f = !1, g;
    //    l = function (a) {
    //    f = !1
    //}, m = function (a) {
    //    f = !0;
    //    g = a.clientX
    //}, n = function (a) {
    //    f && (modelS.rotation.y = g > a.clientX ? modelS.rotation.y - .07 : modelS.rotation.y + .07, g = a.clientX)
    //},
    var h = function (a) {
        a.traverse(function (a) {
            a instanceof THREE.Mesh && a.material.color.setHex(8947848)
        })
    };

    var webglRender = new THREE.WebGLRenderer;
    webglRender.setSize(window.innerWidth, window.innerHeight);
    webglRender.setClearColor(8947848);
    webglRender.shadowMapEnabled = !0;

    document.body.appendChild(webglRender.domElement);

    webglRender.shadowMapEnabled = !0;
    //webglRender.domElement.addEventListener("mousedown", m, !1);
    //webglRender.domElement.addEventListener("mouseup", l, !1);
    //webglRender.domElement.addEventListener("mousemove", n, !1);
    var scene = new THREE.Scene;

    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
    camera.position.set(0, 10, 40);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    var camera2 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 2E8);
    camera2.position.set(0, 15, 40);
    camera2.lookAt(new THREE.Vector3(0, 15, 0));

    var orbitControls = new THREE.OrbitControls(camera);
    orbitControls.autoRotate = true;
    var clock = new THREE.Clock();

    var stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = "absolute";
    stats.domElement.style.top = stats.domElement.style.right = "0px";
    document.body.appendChild(stats.domElement);

    scene.add(new THREE.AmbientLight(16777215));
    var direcLight = new THREE.DirectionalLight(16777215, 1.8);
    direcLight.position.set(100, 100, 100);
    direcLight.castShadow = !0;
    direcLight.shadowMapWidth = direcLight.shadowMapHeight = 4096;
    direcLight.shadowCameraFar = 500;
    direcLight.shadowCameraNear = 10;
    direcLight.shadowDarkness = .35;
    scene.add(direcLight);

    var modelS = new THREE.Group;
    scene.add(modelS)
    var objLoader = new THREE.OBJMTLLoader;
    objLoader.load("model/yifu_2.obj", "model/yifu_2.mtl", function (a) {
        h(a);
        a.traverse(function (a) {
            a instanceof THREE.Mesh && (a.material.side = THREE.DoubleSide)
        });
        modelS.add(a)
    });
    objLoader.load("model/lingzi.obj", "model/lingzi.mtl", function (a) {
        h(a);
        a.traverse(function (a) {
            a instanceof THREE.Mesh && (a.material.side = THREE.DoubleSide, lingkouMesh = a, lingkou = a.material.map)
        });
        modelS.add(a)
    });
    objLoader.load("model/logo.obj", "model/logo.mtl", function (a) {
        h(a);
        a.traverse(function (a) {
            a instanceof THREE.Mesh && (a.material = new THREE.MeshLambertMaterial({
                transparent: !0,
                map: logo
            }), logoMesh = a, geo = logoMesh.geometry, uvarr = geo.faceVertexUvs[0])
        });
        modelS.add(a)
    });
    render();

    function render() {
        stats.update()
        var delta = clock.getDelta();
        orbitControls.update(delta);

        requestAnimationFrame(render);
        webglRender.render(scene, camera);
    };
    app = {};
    app.smallerLogo = function () {
        if (void 0 != logoMesh) {
            for (var b = 0; b != uvarr.length; ++b)
                for (var c = uvarr[b], a = 0; a != c.length; ++a) {
                    var d = c[a];
                    d.x = 2 * d.x - .5;
                    d.y = 2 * d.y - .5
                }
            geo.uvsNeedUpdate = !0
        }
    }
    app.biggerLogo = function () {
        if (void 0 != logoMesh) {
            for (var b = 0; b != uvarr.length; ++b)
                for (var c = uvarr[b], a = 0; a != c.length; ++a) {
                    var d = c[a];
                    d.x = (d.x + .5) / 2;
                    d.y = (d.y + .5) / 2
                }
            geo.uvsNeedUpdate = !0
        }
    }
    var nowScale = 1;
    app.smallerModel = function () {
        nowScale -= .1;
        .7 > nowScale && (nowScale = .7);
        modelS.scale.set(nowScale, nowScale, nowScale)
    }
    app.biggerModel = function () {
        nowScale += .1;
        1.2 < nowScale && (nowScale = 1.2);
        modelS.scale.set(nowScale, nowScale, nowScale)
    }
    app.moveLeft = function () {
        if (void 0 != logoMesh) {
            for (var b = 0; b != uvarr.length; ++b)
                for (var c = uvarr[b], a = 0; a != c.length; ++a)c[a].x += .1;
            geo.uvsNeedUpdate = !0
        }
    }
    app.moveRight = function () {
        if (void 0 != logoMesh) {
            for (var b = 0; b != uvarr.length; ++b)
                for (var c = uvarr[b], a = 0; a != c.length; ++a)c[a].x -= .1;
            geo.uvsNeedUpdate = !0
        }
    }
    app.moveTop = function () {
        if (void 0 != logoMesh) {
            for (var b = 0; b != uvarr.length; ++b)
                for (var c = uvarr[b], a = 0; a != c.length; ++a)c[a].y -= .1;
            geo.uvsNeedUpdate = !0
        }
    }
    app.moveBottom = function () {
        if (void 0 != logoMesh) {
            for (var b = 0; b != uvarr.length; ++b)
                for (var c = uvarr[b], a = 0; a != c.length; ++a)c[a].y += .1;
            geo.uvsNeedUpdate = !0
        }
    }
    app.changeLogo = function () {
        logoMesh.material.map = logo
    }
    app.changeLogo1 = function () {
        logoMesh.material.map = logo1
    }
    app.changeLogo2 = function () {
        logoMesh.material.map = logo2
    }
    app.changeLingkou = function () {
        lingkouMesh.material.map = lingkou
    }
    app.changeLingkou1 = function () {
        lingkouMesh.material.map = lingkou1
    }
    app.changeLingkou2 = function () {
        lingkouMesh.material.map = lingkou2
    };
}
window.onload = init;