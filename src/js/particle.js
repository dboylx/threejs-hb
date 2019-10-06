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

// 设置显示点的材质
var sprite1 = new THREE.TextureLoader().load( catImg );
var material = new THREE.PointCloudMaterial({
  color: 0xffffcc,
  size: 0.037,
  map: sprite1, 
  transparent: true, 
});

// 生成点的信息
var pointsGeometry = new THREE.Geometry();
var x, y, z;
var zone = 9;
var pointTotal = 9000;
for(var i=0;i<pointTotal;i++){
  x = (Math.random() * zone) - zone / 2;
  y = (Math.random() * zone) - zone / 2;
  z = (Math.random() * zone) - zone / 2;
  pointsGeometry.vertices.push(new THREE.Vector3(x, y, z));
}
var pointCloud = new THREE.PointCloud(pointsGeometry, material);
scene.add(pointCloud);

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
	mousePosition.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mousePosition.y = -( event.clientY / window.innerHeight ) * 2 + 1;
	
}