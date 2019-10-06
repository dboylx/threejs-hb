require('script-loader!./lib.js') 
import img from '../img/5deb20343f8e4a075f6daf9138a193df.jpg';


var THREE = require('three');

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

// 初始化投影转换计算器
var raycaster = new THREE.Raycaster();
raycaster.params.Points.threshold = 0.1;

// 设置环境光
var light = new THREE.AmbientLight( 0xffffff); // soft white light
scene.add( light );
		
// 设置点光源
var light = new THREE.PointLight( 0xff0000, 5.5, 4.2 );
light.position.set( 1, 0, 4.5);
scene.add( light );

var light = new THREE.PointLight( 0xff0000, 2, 4.2 );
light.position.set( 1, 3, 0 );
scene.add( light );

// 添加一个立方体，使用红色普通渲染材质
var boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
var cube = new THREE.Mesh( boxGeometry, material );
cube.rotation.x = 0.3;
scene.add( cube );

// 初始化线对像
var pointNumberTotal = 200000;
var material = new THREE.LineBasicMaterial( { color: 0xffffff ,linewidth: 1} );
var lineGeometry = new THREE.BufferGeometry(); 
var positions = new Float32Array( pointNumberTotal * 3 ); // 3 vertices per point
lineGeometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
lineGeometry.setDrawRange( 0, pointNumberTotal );
lineGeometry.dynamic = true;
var line = new THREE.Line( lineGeometry, material );
//scene.add( line );

// create the particle variables
var particleCount = 1800,
    particles = new THREE.Geometry(),
    pMaterial = new THREE.ParticleBasicMaterial({
      color: 0x00FFFF,
      size: 0.1
    });

// now create the individual particles
for (var p = 0; p < particleCount; p++) {

  // create a particle with random
  // position values, -250 -> 250
  var pX = Math.random() * 500 - 250,
      pY = Math.random() * 500 - 250,
      pZ = Math.random() * 500 - 250,
      particle = new THREE.Vertex(
        new THREE.Vector3(pX, pY, pZ)
      );

  // add it to the geometry
  particles.vertices.push(particle);
}

// create the particle system
var particleSystem = new THREE.ParticleSystem(
    particles,
    pMaterial);

// add it to the scene
scene.add(particleSystem);

// 开始动画
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	cube.rotation.y += 0.02;
	
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
 	cube.position.copy(pos)
	
	
	// 获取raycaster感兴趣的对像 
    raycaster.setFromCamera( mouse, camera );    
    var intersects = raycaster.intersectObjects( scene.children );
    for ( var i = 0; i < intersects.length; i++ ) {
        //console.log( intersects[ i ] ); 
    }
	
	// 画线的逻辑计算，添加点
	var positions = line.geometry.attributes.position.array;
	var x, y, z, index;
	x = y = z = index = 0;
	
	positions.set([pos.x, pos.y +.5,pos.z], pointCounter * 3);
	line.geometry.setDrawRange( pointCounter * 3, pointNumberTotal );
	line.geometry.attributes.position.needsUpdate = true;
	
	pointCounter++;
	if(pointCounter > 800)
		pointCounter=0;
	



}
