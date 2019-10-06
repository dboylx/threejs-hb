require('script-loader!./lib.js') 
import img from '../img/5deb20343f8e4a075f6daf9138a193df.jpg';
import catImg from '../img/img_219849.png';

var THREE = require('three');

var mousePosition = {x:0,y:0};

// 创建three对像
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// 定义全局变量
var mouse = new THREE.Vector2();

// 定义场景
var scene = new THREE.Scene();
scene.background = new THREE.TextureLoader().load( img );

// 定义摄像机
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// 相机Z往后移5个单位
camera.position.z = 5;

var light = new THREE.HemisphereLight(0x999999,0x777777,3); 
light.position.y = 0;
light.position.z = 5;
scene.add(light);

// 添加一个立方体，使用红色普通渲染材质
var boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
var cube = new THREE.Mesh( boxGeometry, material );
cube.rotation.x = 0.4;

scene.add( cube );


function render(){
	window.requestAnimationFrame(render);
  	var time = Date.now() * 0.0002;

	for ( var i = 0; i < scene.children.length; i ++ ) {
		var object = scene.children[ i ];
		if ( object instanceof THREE.Points ) {
			object.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );
		}
	}
	
	camera.position.y = mousePosition.y;
	camera.position.x = mousePosition.x;
	
	renderer.render(scene, camera);  
}

render();



// 监听鼠标移动事件
document.addEventListener( 'mousemove', onDocumentMouseMove, false );
var pointCounter = 0;
function onDocumentMouseMove( event ) {
	event.preventDefault();
	
	// 把页面上的XY坐标转换成canvas的坐标系 
	mousePosition.x = ( event.clientX / window.innerWidth ) * 7 - 1;
	mousePosition.y = -( event.clientY / window.innerHeight ) * 7 + 1;
	
}