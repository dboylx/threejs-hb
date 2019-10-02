require('script-loader!./lib.js') 
console.log("ok index!!!")
var THREE = require('three');


var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var mouse = new THREE.Vector2();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

var raycaster = new THREE.Raycaster();
raycaster.params.Points.threshold = 0.1;

var light = new THREE.AmbientLight( 0xf0f0f0 ); // soft white light
scene.add( light );
		
var light = new THREE.PointLight( 0xff0000, 2, 100 );
light.position.set( 2, 0.5, 3 );
scene.add( light );

var boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
var cube = new THREE.Mesh( boxGeometry, material );
scene.add( cube );

// init the line
var pointNumberTotal = 200000;
var material = new THREE.LineBasicMaterial( { color: 0xffffff ,linewidth: 1} );
var lineGeometry = new THREE.BufferGeometry(); 
var positions = new Float32Array( pointNumberTotal * 3 ); // 3 vertices per point
lineGeometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
lineGeometry.setDrawRange( 0, pointNumberTotal );
lineGeometry.dynamic = true;
var line = new THREE.Line( lineGeometry, material );
scene.add( line );

cube.rotation.x = 0.3;

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	cube.rotation.y += 0.01;
	
 }
animate();


document.addEventListener( 'mousemove', onDocumentMouseMove, false );
var pointCounter = 0;
function onDocumentMouseMove( event ) {
	event.preventDefault();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	
	var vector = new THREE.Vector3(mouse.x, mouse.y, 0);
	vector.unproject( camera );
	var dir = vector.sub( camera.position ).normalize();
	var distance = - camera.position.z / dir.z;
	var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
	pos.z = 0;
	cube.position.copy(pos)

	
	var positions = line.geometry.attributes.position.array;
	var x, y, z, index;
	x = y = z = index = 0;

	positions.set([pos.x, pos.y,0.5], pointCounter * 3);

	line.geometry.setDrawRange( 0, pointNumberTotal );
	line.geometry.attributes.position.needsUpdate = true;
	
	pointCounter++;
	



}
