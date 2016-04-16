/**
 * Created by Administrator on 2016/4/14.
 */
var app = {};
function init() {
    var lingkouMesh, lingkou, geo, uvarr;
    //var logo = THREE.ImageUtils.loadTexture("model/logo.png");
    var logo = THREE.ImageUtils.loadTexture("laozi1.jpg");
    var logo1 = THREE.ImageUtils.loadTexture("model/logo1.png");
    var logo2 = THREE.ImageUtils.loadTexture("model/logo2.png");
    var lingkou1 = THREE.ImageUtils.loadTexture("model/lingkou1.jpg");
    var lingkou2 = THREE.ImageUtils.loadTexture("model/lingkou2.jpg");

    var f = !1, g;
    var h = function (a) {
        a.traverse(function (a) {
            a instanceof THREE.Mesh && a.material.color.setHex(8947848)
        })
    };

    var webglRender = new THREE.WebGLRenderer;
    //webglRender.setSize(window.innerWidth, window.innerHeight);
    webglRender.setSize(800, 800);

    webglRender.setClearColor(8947848);
    webglRender.shadowMapEnabled = !0;

    document.getElementById("modelDiv").appendChild(webglRender.domElement);
    //document.body.appendChild(webglRender.domElement);

    webglRender.shadowMapEnabled = !0;
    var scene = new THREE.Scene;

    //var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
    var camera = new THREE.PerspectiveCamera(45, 1, .1, 1000);

    camera.position.set(0, 10, 40);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    //var camera2 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 2E8);
    //camera2.position.set(0, 15, 40);
    //camera2.lookAt(new THREE.Vector3(0, 15, 0));

    var orbitControls = new THREE.OrbitControls(camera, webglRender.domElement);
//    var trackballControls = new THREE.TrackballControls(camera);
//    trackballControls.rotateSpeed = 1.0;
//    trackballControls.zoomSpeed = 1.0;
//    trackballControls.panSpeed = 1.0;
////        trackballControls.noZoom=false;
////        trackballControls.noPan=false;
//    trackballControls.staticMoving = true;


    //orbitControls.autoRotate = true;
    var clock = new THREE.Clock();

    var stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = "absolute";
    stats.domElement.style.top = stats.domElement.style.right = "0px";
    //document.body.appendChild(stats.domElement);
    document.getElementById("modelDiv").appendChild(stats.domElement);

    scene.add(new THREE.AmbientLight(16777215));
    var direcLight = new THREE.DirectionalLight(16777215, 0.5);
    direcLight.position.set(100, 100, 100);
    direcLight.castShadow = !0;
    direcLight.shadowMapWidth = direcLight.shadowMapHeight = 4096;
    direcLight.shadowCameraFar = 500;
    direcLight.shadowCameraNear = 10;
    direcLight.shadowDarkness = .35;
    scene.add(direcLight);

    var modelS = new THREE.Group;
    scene.add(modelS);

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
            }), app.logoMesh = a, geo = app.logoMesh.geometry, uvarr = geo.faceVertexUvs[0], app.logoMap = a.material.map)
        });
        modelS.add(a)
    });

    //objLoader.load("model/short/xz_short.obj", "model/short/xz_short.mtl", function (a) {
    //    h(a);
    //    a.traverse(function (a) {
    //        a instanceof THREE.Mesh && (a.material.side = THREE.DoubleSide)
    //    });
    //    //a.traverse(function (a) {
    //    //    a instanceof THREE.Mesh && (a.material.side = THREE.DoubleSide, lingkouMesh = a, lingkou = a.material.map)
    //    //});
    //    modelS.add(a)
    //});
    //objLoader.load("model/short/yf_short.obj", "model/short/yf_short.mtl", function (a) {
    //    h(a);
    //    a.traverse(function (a) {
    //        a instanceof THREE.Mesh && (a.material.side = THREE.DoubleSide)
    //    });
    //    modelS.add(a)
    //});


    render();

    function render() {
        stats.update()
        var delta = clock.getDelta();
        orbitControls.update(delta);
        //trackballControls.update(delta);

        requestAnimationFrame(render);
        webglRender.render(scene, camera);
    };

    app.smallerLogo = function () {
        if (void 0 != app.logoMesh) {
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
        if (void 0 != app.logoMesh) {
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
        if (void 0 != app.logoMesh) {
            for (var b = 0; b != uvarr.length; ++b)
                for (var c = uvarr[b], a = 0; a != c.length; ++a)c[a].x += .1;
            geo.uvsNeedUpdate = !0
        }
    }
    app.moveRight = function () {
        if (void 0 != app.logoMesh) {
            for (var b = 0; b != uvarr.length; ++b)
                for (var c = uvarr[b], a = 0; a != c.length; ++a)c[a].x -= .1;
            geo.uvsNeedUpdate = !0
        }
    }
    app.moveTop = function () {
        if (void 0 != app.logoMesh) {
            for (var b = 0; b != uvarr.length; ++b)
                for (var c = uvarr[b], a = 0; a != c.length; ++a)c[a].y -= .1;
            geo.uvsNeedUpdate = !0
        }
    }
    app.moveBottom = function () {
        if (void 0 != app.logoMesh) {
            for (var b = 0; b != uvarr.length; ++b)
                for (var c = uvarr[b], a = 0; a != c.length; ++a)c[a].y += .1;
            geo.uvsNeedUpdate = !0
        }
    }
    app.changeLogo = function () {
        app.logoMesh.material.map = logo
    }
    app.changeLogo1 = function () {
        app.logoMesh.material.map = logo1
    }
    app.changeLogo2 = function () {
        app.logoMesh.material.map = logo2
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

    initDiy();
}

function initDiy() {
    var canvas = document.getElementById("myCanvas");
    canvas.width = 500;
    canvas.height = 526;

    // 默认可编辑区域
    var TShirtScope = {
        x: 157,
        y: 137,
        w: 186,
        h: 249
    }
    var currentScope = TShirtScope;

    // diy自定义配置
    var config = {
        maxSize_image: 5,		// 最多图层限制数量
        scaleScope_max: 2,		// 缩放最大范围限制
        scaleScope_min: 0.1,	// 缩放最小范围限制
        lineWidth: 1,			// 边框线粗细
        strokeStyle: '#000000',	// 边框线颜色
        fillStyle: '#000000',	// 节点填充颜色
        nodeStyle: 1,			// 节点样式:1方块,0圆点
        scaleAreaSize: 4		// 节点大小
    }

    // 初始化diy
    hbdiy.init({
        diyid: 'myCanvas',			// canvas的id
        scope_x: currentScope.x,			// 可编辑区域范围
        scope_y: currentScope.y,
        scope_width: currentScope.w,
        scope_height: currentScope.h,
        maxSize_image: config.maxSize_image,		// 最多图层限制数量
        maxSize_text: 5,
        scaleScope_max: config.scaleScope_max,	// 缩放范围限制
        scaleScope_min: config.scaleScope_min,
        resizeType: 1,
        lineWidth: config.lineWidth,			// 焦点样式
        strokeStyle: config.strokeStyle,
        fillStyle: config.fillStyle,
        nodeStyle: config.nodeStyle,
        scaleAreaSize: config.scaleAreaSize,
        debug: config.debug,			// 调试
        tools: './test/images/tools.png'
    });
    hbdiy.unlock();

    var fileInput = document.getElementById('uploadedFile');
    //监听是否有文件被选中
    fileInput.onchange = function () {
        //这里判断一下文件长度可以确定用户是否真的选择了文件，如果点了取消则文件长度为0
        if (fileInput.files.length !== 0) {
            var reader = new FileReader();
            reader.onload = function (evt) {
                //prevDiv.innerHTML = '<img src="' + evt.target.result + '" />';
                //console.log(evt.target.result);
                hbdiy.addImage(evt.target.result, evt.target.result, 1);
            }
            reader.readAsDataURL(fileInput.files[0]);
        }
        ;
    };

    function getImgUrl() {
        var ImgUrl = hbdiy.download();
        //window.location.href=ImgUrl;
        app.logoMap = THREE.ImageUtils.loadTexture(ImgUrl);
        //
        ////app.logoMesh.material.wrapS = THREE.RepeatWrapping;
        ////app.logoMesh.material.wrapT = THREE.RepeatWrapping;
        ////
        ////app.logoMesh.material.map.repeat.set(0.1,0.1);
        //
        app.logoMesh.material.map = app.logoMap;

    }
    document.getElementById("apply").onclick = getImgUrl;


    //    hbdiy.addImage($("#myImage").attr('src'), $("#myImage").data('image'), 1);
    //
    //    //    hbdiy.editImage("./images/laozi.jpg", "laozi.jpg", 2);
    //    hbdiy.leftImage();
//
//    /************** diy操作按钮 **************/
//        // 对齐方式
//    $('.am_top').click(function () {
//        hbdiy.topImage();
//    });
//    $('.am_middle').click(function () {
//        hbdiy.middleImage();
//    });
//    $('.am_bottom').click(function () {
//        hbdiy.bottomImage();
//    });
//    $('.am_left').click(function () {
//        hbdiy.leftImage();
//    });
//    $('.am_center').click(function () {
//        hbdiy.centerImage();
//    });
//    $('.am_right').click(function () {
//        hbdiy.rightImage();
//    });
//    // 重置
//    $('.reset').click(function () {
//        hbdiy.deleteAll();
//    });
//    // 撤消&重做
//    $('.repealPrev').click(function () {
//        hbdiy.undo();
//    });
//    $('.repealNext').click(function () {
//        hbdiy.redo();
//    });
};

window.onload = init;