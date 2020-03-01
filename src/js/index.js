import {AnimationAction} from "three/src/animation/AnimationAction";

require('script-loader!./lib.js')
import img from '../img/5deb20343f8e4a075f6daf9138a193df.jpg';
var THREE = require('three');

// 加载GLTF的加载器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// 镜头的鼠标交互
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import cubeAnimation from '../asset/atest9.glb';

// 当前场景的动画的时钟
const clock = new THREE.Clock();

// 创建three对像
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;

// 定义全局变量
var mouse = new THREE.Vector2();

// 定义场景
var scene = new THREE.Scene();
scene.background = new THREE.TextureLoader().load( img );

// 定义摄像机
var camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 1000 );

// 相机Z往后移5个单位
camera.position.z = 10;
camera.position.y = 105;
camera.position.x = 1;

// 设置相机观查的对像（但如果用了orbitcontrols，此设置会不起作用）
camera.lookAt(new THREE.Vector3(0,30,30))

// 初始化投影转换计算器
var raycaster = new THREE.Raycaster();
raycaster.params.Points.threshold = 0.1;

// 添加灯光
// const ambientLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, .1);
// const mainLight = new THREE.DirectionalLight( 0xffffff, 0.97 );
// mainLight.position.set( 0, 30, -20 );
// scene.add( ambientLight, mainLight );

// 添加控制
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = .15
controls.enableZoom = false

// add gltf file
// maed by the glender
var gltfLoader = new GLTFLoader();
var cube,mixer;

var monkeyHeadAction ;
gltfLoader.load(
	cubeAnimation,
	function ( gltf ) {

		const model = gltf.scene;
		const animations = gltf.animations;
		mixer = new THREE.AnimationMixer( model );
		monkeyHeadAction = mixer.clipAction( gltf.animations[ 0 ] );

		var action = mixer.clipAction( gltf.animations[ 1 ] );
 		action.play();


		for(var n in gltf.scene.children){
			if(gltf.scene.children[n].name == "Plane"){
				gltf.scene.children[n].material.roughness= .526;
			}
 		}

		// const action = mixer.clipAction( animations[ 1 ] );
		// action.play();
		model.position.z = -20;
		model.position.y = -6;
		scene.add( model );

 	},
);


// 开始动画
function animate() {
	requestAnimationFrame( animate );

	const delta = clock.getDelta();

	if ( mixer ) mixer.update( delta );

	renderer.render( scene, camera );


}
animate();

// 监听鼠标移动事件
document.addEventListener( 'mousemove', onDocumentMouseMove, false );
var pointCounter = 0;
function onDocumentMouseMove( event ) {
	event.preventDefault();
	
	// 把页面上的XY坐标转换成canvas的坐标系 
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;
	
	// 
	// 把平面坐标，转换到3D场景中的XYZ的坐标
	// 由于需要在场景中渲染出来，渲染的对像需要在3D场景中描述出来，
	// 所以需要对屏幕上的2维坐标进行3D的场景转换，而这个转换与相机的位置
	// 也可以直接使用raycasting来进行坐标系的转换
	// 参考：
	// 	https://segmentfault.com/a/1190000010490845
	//	https://blog.csdn.net/qq_30100043/article/details/79054862
	//	https://riptutorial.com/three-js/example/17088/object-picking---raycasting　　
	// 
	var vector = new THREE.Vector3(mouse.x, mouse.y, 0);
	vector.unproject( camera );
	var dir = vector.sub( camera.position ).normalize();
	var distance = - camera.position.z / dir.z;
	var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );

	
	// 获取raycaster感兴趣的对像 
    raycaster.setFromCamera( mouse, camera );    
    var intersects = raycaster.intersectObjects( scene.children );
    for ( var i = 0; i < intersects.length; i++ ) {
        //console.log( intersects[ i ] ); 
    }

window.addEventListener( 'click', function(e) {
	if (e.button === 0) {
		console.log("点击了鼠标左键");


		monkeyHeadAction.reset();
		monkeyHeadAction.play();
	}
});

}
