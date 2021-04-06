<script>
  //TODO: ADD IN EXTERNAL_URL FOR OPENSEA
  import { createEventDispatcher, getContext, onMount } from 'svelte';
  import defaultCode from '../conf/code.js';
  import Sandbox from '@beyondnft/sandbox';
  //import { ipfs } from '../utils.js';
  // import { init } from "../components/captureWebM"
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { HemisphereLight, LinearToneMapping, Box3, SpotLight, Scene, Color, Object3D, Vector3, PerspectiveCamera, PointLight, SphereGeometry, MeshStandardMaterial, InstancedMesh, Matrix4, AxesHelper, WebGLRenderer } from 'three'
import seedrandom from 'seedrandom'
import CCapture from '../components/ccapture.js/src/CCapture.js'
import { get, writable } from 'svelte/store';
import { ViewerScript } from '../components/ViewerScript';
import { Moon } from 'svelte-loading-spinners';
import router from 'page';

  
  const app = getContext('app');
  const dispatch = createEventDispatcher();
  const myApp = writable({camera: null, renderer: null})
  export let innerHeight;
  export let innerWidth;
  let minting = false;
  let TOTAL_SUPPLY = 1000;

  onMount(()=>{
    window.scrollTo(window.scrollX,1);
    const renderer = document.getElementById('canvas')
    document.getElementById('canvas-container').appendChild(renderer);
	
    document.getElementById('canvas').setAttribute('style', 'width: 100%; height: 100%;' )
    onWindowResize();
  })
  let contract = $app.contract;
  let account = $app.account;
  let static_image = "";

  let view;
  let data;
  let mintText;

  //FORM PRELIMINARY JSON STRUCTURE FOR UPLOAD
  let name = '';
  let description = 'An NFT of Negative Entropy: Series 1: Thomas'; //TODO include minter address in here + number it is
  let attributes = [];
  let image = '';
  let dependencies = [];
  let code = 'defaultCode';
  let valid = false;
  //TODO: Standardize to IPFS://, maybe store this in .env
  let code_uri = "https://gateway.ipfs.io/ipfs/QmTBNeRQTjrNEJdcManUaDPEXQgH1h1N47gfzpqtbQXkBL";

  // temp values
  let attrKey = '';
  let attrValue = '';
  let dependency = '';
  let dependencyType = 'script';

  let _camera, _recorder;
  $: view && code && data && renderSandbox();

  $: {
    let _data = {
      name,
      description,
      attributes,
      image,
    };

    if (code) {
      _data.interactive_nft = {
        code_uri,
        dependencies,
      };

      data = _data;

      validate();
    }
  }

  function onFile(e) {
    if (this.files && this.files.length) {
      image = this.files[0];
    }
  }

  function validate() {
    let _valid = true;
    _valid = _valid && data.name.trim() !== '';
    _valid = _valid && data.description.trim() !== '';
    _valid = _valid && data.image;
    _valid = _valid && data.interactive_nft.code;
    valid = _valid;
  }

  let _sandbox;
  function renderSandbox() {
    if (_sandbox) {
      _sandbox.$destroy();
    }

    view.innerHTML = '';
    _sandbox = new Sandbox({
      target: view,
      props: {
        data,
      },
    });
  }

  function addDependency() {
    if (dependency.trim() !== '') {
      dependencies.push({
        url: dependency,
        type: dependencyType,
      });
      dependencies = dependencies;
      dependency = '';
      dependencyType = 'script';
    }
  }

  function removeDependency(dep) {
    dependencies.splice(dependencies.indexOf(dep), 1);
    dependencies = dependencies;
  }

  function addAttribute() {
    if (attrKey.trim() !== '' && attrValue.trim() !== '') {
      attributes[attrKey] = attrValue;
      attributes = attributes;
      attrKey = attrValue = '';
    }
  }

  function removeAttribute(key) {
    delete attributes[key];
    attributes = attributes;
  }
let seed = 'Buck';
let camera, scene, renderer, mesh, headlight, stableOld, lockOld;

//Declare constants
const fr = 30;
const limit = 20;
const actual = 5;
let sizes = 350;
const recorder = new CCapture({
	verbose: false,
	display: false,
	framerate: fr,
	quality: 75,
	format: 'webm',
	timeLimit: limit,
	frameLimit: 0,
	autoSaveTime: 0
});
let opct = 1;

let STABILIZE = true;
let CAMERA_LOCK = false;
let OVER_POWER= 7;
let HEADLAMP = false;

var params = {
	stabilize: STABILIZE,
	lock: CAMERA_LOCK ,
	hide: false
}
const color = new Color();
var attr;

function getTier(rarity) {
	if (rarity < 6) {
		return "Common";
	}
	if(rarity < 324) {
		return "Uncommon";
	}
	if(rarity < 5125) {
		return "Rare";
	} else {
		return "Legendary";
	}
}
//Declare global vars
let rand, random, b, dummy, visPos, pos, totalAve, offsets, recording, frame, speedMult, count, amount, newSeed, palette;
let size, intensityBoost, metaly, rough, emissivity, random2, random3, random4, rotationRate, rotationRate2, rotationRate3, controls, container;



export const init = async () => {


	palette = [ 0xEEF50C, 0x3498DB, 0xEAEDED, 0xF2B077, 0xF24405 , 0x68F904, 0xBCC112, 0xA93226];
	rand = new seedrandom(seed);
	random = rand();
	b = random * 208186.01 / 1000000.01;
	dummy = new Object3D();
	visPos = [];
	pos = [];
	totalAve = new Vector3();
	offsets = new Vector3();
	recording = false;
	frame = 0;
	speedMult = 1;

	size = 0.25 + random;
	intensityBoost = 1;

	randomize();


	amount = rand()*20+20;
	count = Math.pow( amount, 3 );
  

	var props = {
		metal: (metaly > 0),
		yRot: (rotationRate > 0),
		xRot: (rotationRate2 > 0),
		zRot: (rotationRate3 > 0)
	};
	var rarity = 1/((props.metal ? 0.2 : 0.8) * (props.yRot ? 0.25 : 0.75) * (props.xRot ? 0.25*0.25 : (1-0.25*0.25)) * (props.zRot ? 0.25*0.25*0.25 : (1-0.25*0.25*0.25)));
	var attr =  '{"Shiny"'+':"' + (props.metal ? 'Yes' : 'No') + '", ' +
			'"Y-Rotation"' +':"'+ (props.yRot ? (random2 > 0 ? 'Positive' : 'Negative') : 'None') + '", ' +
			'"X-Rotation"'+':"' + (props.xRot ? (random3 > 0 ? 'Positive' : 'Negative') : 'None') + '", ' +
			'"Z-Rotation"'+':"' + (props.zRot ? (random4 > 0 ? 'Positive' : 'Negative') : 'None') + '", ' +
			'"Number of Particles"' +':"'+ count.toFixed(0) + '", ' +
			'"Size of Particles"' +':"' + size.toFixed(3) + '", ' +
			'"Speed mutliplier"' +':"'+ random.toFixed(3) + '", ' + 
			'"Series":"Series 1: Thomas"' + ', ' +
			'"Tier"' +':"' + getTier(rarity.toFixed(0)) + '"}';

 
  	attributes = [getProperty("Shiny", (props.metal ? 'True' : 'False')), getProperty("Y-Rotation", (props.yRot ? (random2 > 0 ? 'Positive' : 'Negative') : 'None')), getProperty("X-Rotation", (props.xRot ? (random3 > 0 ? 'Positive' : 'Negative') : 'None')), getProperty("Z-Rotation", (props.zRot ? (random4 > 0 ? 'Positive' : 'Negative') : 'None')), getProperty("Number of Particles", count.toFixed(0), "number"),getProperty("Size of Particles", size.toFixed(3), "number"), getProperty("Speed Multiplier", random.toFixed(3), "number"), getProperty("Series", "Series 1: Thomas"), getProperty("Tier", getTier(rarity.toFixed(0))), getProperty("seed", seed)]

	camera = new PerspectiveCamera( 60, (innerWidth / innerHeight), 0.1, 1000 );
	camera.position.set( 77, 77, 77 );
	camera.lookAt( 0, 0, 0 );
  	myApp.set({camera: camera})

	scene = new Scene();
	scene.background = new Color( 0x1a1a1a );
	initLights(scene, camera);


	const geometry = new SphereGeometry( size, 5, 3 );

	const material = new MeshStandardMaterial( {
		color: 0xffffff,
		roughness: rough, //Shinyness
		metalness: metaly,
		emissiveIntensity: emissivity,
		emissive: 0x25fae8
	});
	material.color = material.color.convertSRGBToLinear();
	material.emissive = material.emissive.convertSRGBToLinear();

	mesh = new InstancedMesh( geometry, material, count );

	let counter = 0;
	const offset = ( amount - 1 ) / 2;

	const matrix = new Matrix4();

	for ( let x = 0; x < amount; x ++ ) {

		for ( let y = 0; y < amount; y ++ ) {

			for ( let z = 0; z < amount; z ++ ) {

				matrix.setPosition( offset - x, offset - y, offset - z );

				var index = getQuadrant(x,y,z,offset);
				color.setHex(palette[index]).convertSRGBToLinear();

				mesh.setMatrixAt( counter, matrix );
				mesh.setColorAt( counter, color );
			
				var position = new Vector3( offset - x, offset - y, offset - z );
				pos.push(position);
				visPos.push(position.clone());
				counter++;

			}

		}

	}


	scene.add( mesh );
	geometry.dispose();
    material.dispose();

	if(typeof newSeed === 'undefined') {

		renderer = new WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth/2, window.innerHeight/2);
		renderer.toneMapping = LinearToneMapping;
	  
    if (document.getElementById('canvas')) {
      document.getElementById('canvas-container').removeChild(document.getElementById('canvas'));
      document.getElementById('canvas-container').appendChild( renderer.domElement ).setAttribute('id', 'canvas');
	  document.getElementById('canvas').setAttribute('style', 'width: 100%; height: 100%;' )
    } else {
      document.body.appendChild( renderer.domElement ).setAttribute('id', 'canvas');
    }
    myApp.update(m=>{ 
      m.camera = camera; m.renderer = renderer
    })


	}

	controls = new OrbitControls(camera, renderer.domElement);
}

function reset() {
	seed = (' ' + newSeed).slice(1);//Force deep copy of newSeed

	//Remove all
	scene.traverse(object => {
		if (!object.isMesh) return
		
		object.geometry.dispose()

		if (object.material.isMaterial) {
			cleanMaterial(object.material)
		} else {
			// an array of materials
			for (const material of object.material) cleanMaterial(material)
		}
	})

	



	while(scene.children.length > 0){ 
    	scene.remove(scene.children[0]);
	}

	renderer.renderLists.dispose();

	init();
  onWindowResize();
}

function getProperty(namee, val, display="string") {
	var property;
	if(display == "string") {
		property = {
			trait_type: namee,
			value: val
		}
	} else {
		property = {
			display_type: display,
			trait_type: namee,
			value: val
		}
	}
	return property;
}

const cleanMaterial = material => {
		material.dispose()

		// dispose textures
		for (const key of Object.keys(material)) {
			const value = material[key]
			if (value && typeof value === 'object' && 'minFilter' in value) {
				value.dispose()
			}
	}
}

function randomize() {
	//Randomize palette
	for(var iter = 0; iter < palette.length; iter++) {
		var val = palette[iter];
	    var num = parseInt(Number(val), 10);
	    num += Math.floor(16777215*rand()%16777215);
	    var newVal = "0x"+num.toString(16);
	    palette[iter] = newVal;
	}

	//Randomize if shiny or not
	//0.8 to keep it kinda rare
	if(rand() > 0.8) {
		metaly = rand();
		rough = rand();
		emissivity = 0.1*rand();
	  	intensityBoost = 1;
	} else {
		metaly = 0; 
		rough = 1;
		emissivity = 0;
	}

	random2 = rand() * ( random > 0.5 ? 1 : -1);
	random3 = rand() * ( random2 > 0.5 ? 1 : -1);
	random4 = rand() * ( random3 > 0.5 ? 1: -1);
	rotationRate = (rand() > 0.75 ? 0.005 : 0);
	rotationRate2 = (rand() > 0.75 & rotationRate > 0 ? 0.005 : 0);
	rotationRate3 = ((rand() > 0.75 & rotationRate > 0 & rotationRate2 > 0) ? 0.005 : 0);
  
}


init();


function fitCameraToSelection( camera, controls, posArray, fitOffset = 1.2 ) {
  
	const box = new Box3().setFromPoints(posArray);

	const size = box.getSize( new Vector3() );
	const center = box.getCenter( new Vector3() );

	const maxSize = Math.max( size.x, size.y, size.z ); //Find the maximum dimension of the box
	const fitHeightDistance = maxSize / ( 2 * Math.atan( Math.PI * camera.fov / 360 ) ); //Fancy math
	const fitWidthDistance = fitHeightDistance / camera.aspect; //More fancy math to find distance camera needs to be to see
	const distance = fitOffset * Math.max( fitHeightDistance, fitWidthDistance ); //Take whichever of these distances is larger and use it with the offset

	const direction = controls.target.clone()
	.sub( camera.position ) //Find camera position relative to target
	.normalize() //Get unit normal vector for this value
	.multiplyScalar(distance); //Convert that unit normal to distance camera needs to be from target to fit everything

	controls.maxDistance = distance * 10; //

	camera.near = distance / 100;//100 is the max view distance(?)
	camera.far = distance * 100;
	camera.updateProjectionMatrix(); //Update the camera

	camera.position.copy( controls.target ).sub(direction); //Set position of camera to our target, then subtract the direction we calculated previously

	controls.update();
  
}


function getQuadrant(x,y,z,offset) {
	var xPositive = offset - x > 0;
	var yPositive = offset - y > 0;
	var zPositive = offset - z > 0;
	if(xPositive) {
		if(yPositive) {
			if(zPositive) {
				return 0;
			} else {
				return 1;
			}
		} else {
			if(zPositive) {
				return 2;
			} else {
				return 3;
			}
		}
	} else {
		if(yPositive) {
			if(zPositive) {
				return 4;
			} else {
				return 5;
			}
		} else {
			if(zPositive) {
				return 6;
			} else {
				return 7;
			}
		}
	}
	return -1;
}

function initLights(scene, camera) {
	//ILLUMINGATED CAMERA
	headlight = new PointLight( 0xFBFAF5, intensityBoost, 300);
	if(HEADLAMP) {
		camera.add( headlight );
	}
	scene.add(camera);

	const keyLight = new SpotLight( 0xffffff, intensityBoost);
	keyLight.position.set(55, 99, 88);
	scene.add( keyLight );

	const fillLight = new SpotLight( 0xffa95c, intensityBoost/2);
	fillLight.position.set(99, 77, 55);
	scene.add( fillLight );

	const rimLight = new SpotLight( 0xffffff, intensityBoost);
	rimLight.position.set(-99, 88, -99);
	scene.add( rimLight );
}

function onWindowResize() {
  
  setAttributes();
  const _camera = get(myApp)

  

	if (recording) {
		return;
	}
	camera.aspect = (window.innerWidth / window.innerHeight);
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth/2, window.innerHeight/2);
	document.getElementById('canvas').setAttribute('style', 'width: 100%;' )

}

export const setAttributes = () => {
  const $attributes = document.getElementById('attributes');
  if ($attributes) {
    $attributes.value = attr;
  }
}

export const start = async (e) => {
	
	var destination = BACKEND+"seed?seed="+seed;
    var seeds = await fetch(destination, {mode: 'cors'});
    var seedJSON = await seeds.json();
	if(seedJSON.claimed){
		alert("Seed has already been claimed!");
		return;
	}
	if(navigator.userAgent.indexOf("Firefox") > -1) {
		//User is on Firefox, CCapture will not work for them
		alert("Our apologies, the plugin used to record the webm of your NFT does not work on Firefox.\n We recommend Chrome for the optimal user-experience");
		return;
	}
	if(navigator.userAgent.indexOf("OPR") > -1) {
		//User is on Opera, CCapture will not work for them
		alert("Our apologies, the plugin used to record the webm of your NFT does not work on Opera.\n We recommend Chrome for the optimal user-experience");
		return;
	}
	if(navigator.userAgent.indexOf("MSIE") > -1 || navigator.userAgent.indexOf("rv:") > -1) {
		//User is on Internet Explorer, CCapture will not work for them
		alert("Our apologies, the plugin used to record the webm of your NFT does not work on Internet Explorer.\n We recommend Chrome for the optimal user-experience");
		return;
	}




	var txt = document.getElementById("textareaID").value.trim();
	if(txt != seed) {
		_reset();
	}
   
 	if($app.contract == null) {
  		//We are not set up with Web3, alert user and return
	  	alert("Web3 is not Connected!");
  		return;
  	}
	minting = true;

  const $start = document.getElementById('start');

  const $headlamp = document.getElementById('headlamp');

  const $stabilize = document.getElementById('stabilize');
  
  const $lock = document.getElementById('lock');
  const $reset = document.getElementById('reset');
  const $hide = document.getElementById('reset');
  resize(225, 225);
  $start.textContent = "Recording & Minting..."
  $headlamp.style.display = 'none';
  $stabilize.style.display = 'none';
  $lock.style.display = 'none';
  $reset.style.display = 'none';
  $hide.style.display = 'none';
  opct = 0;
  stableOld = params.stabilize;
  lockOld = params.lock;
  params.lock = true;
  params.stabilize = true;
  recording = true;
  speedMult = OVER_POWER;
  controls.target.set(0,0,0);
  controls.update();
  controls.enabled = false;
  recorder.start();
}
export const headlamp = e => {
  const $headlamp = document.getElementById('headlamp');

	if(HEADLAMP) {
			$headlamp.style.fill = "black";
			HEADLAMP = false;
			camera.remove(headlight);
		} else {
			$headlamp.style.fill = "red";
			HEADLAMP = true;
			camera.add(headlight);
		}
}

export const stabilize = e => {
  const $stabilize = document.getElementById('stabilize');
  	//e.preventDefault();
		if(params.stabilize) {
			$stabilize.style.fill = "black";
			params.stabilize = false;
		} else {
			$stabilize.style.fill = "red";
			params.stabilize = true;
		}

}

export const lock = e => {

	const $lock = document.getElementById('lock');

		if(params.lock) {
			//$lock.innerHTML = "Enable Camera-Lock"
			$lock.style.fill = "black";
			params.lock = false;
		} else {
			$lock.style.fill = "red";
			params.lock = true;
		}
}

export const _reset = e => {

		newSeed = document.getElementById("textareaID").value.trim();

		reset();
}

export const hide = () => {
  const $hide = document.getElementById('hide')
  console.log("HIDDEN");
  if(params.hide) {
			//Already hidden, unhide
			$hide.style.fill = "black";
			document.getElementById("inner_div").style.visibility = "visible";
			params.hide = false;
			opct = 1;
		} else {
			//Not hidden, hide
			$hide.style.fill = "red";
			document.getElementById("inner_div").style.visibility = "hidden";
			params.hide = true;
			opct = 0;
  }

}





function hideEnter() {
	if(params.hide) {
		opct = 1;
	}
}

function hideExit() {
	if(params.hide) {
		opct = 0;
	}
}
	

export const resize = (width, height) =>{
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize(width, height);
}


function animate() {
	render();
  if (recording) {
	  recorder.capture(renderer.domElement);
		frame++;
		if(frame > fr*actual) {
			onRecordingEnd();
		}
	}
	requestAnimationFrame( animate );
}

function render() {
	const SCALING_FACTOR = 10;

	if ( mesh ) {
		var reps = 0;
		while(reps < speedMult) { 

			var len = pos.length;

			if(params.stabilize) {
				offsets.copy(totalAve).divideScalar(len).negate();
				totalAve.set(0,0,0);
			}

			mesh.rotation.x += rotationRate2*random3;
		  	mesh.rotation.y += rotationRate*random2;
	   		mesh.rotation.z += rotationRate3*random4;
			let i = 0;

			while(i < count) {	

				var position = pos[i];
				var visPosition = visPos[i];

			    var dx = position.x/SCALING_FACTOR;
			    var dy = position.y/SCALING_FACTOR;
			    var dz = position.z/SCALING_FACTOR;
			      
			    var x1 = (-b*dx+Math.sin(dy))*random;
			    var y1 = (-b*dy+Math.sin(dz))*random;
			    var z1 = (-b*dz+Math.sin(dx))*random;

			    //var randCall = rand();
			    var xm = rand();
			    var ym = rand();//randCall*random3;
			    var zm = rand();//randCall*random4;

			    position.x += x1 + xm/5;
			    position.y += y1 + ym/5;
			    position.z += z1 + zm/5;	
	        	
	        	visPosition.copy(position).add(offsets);

			    if(params.stabilize) {
					dummy.position.set( visPosition.x,  visPosition.y, visPosition.z );
					totalAve = totalAve.addVectors(totalAve, position);
			  	} else {
	       			dummy.position.set( position.x,  position.y, position.z );
	        	}
			    
				dummy.updateMatrix();
				mesh.setMatrixAt( i++, dummy.matrix );
			}
			reps++;
    	}
		mesh.instanceMatrix.needsUpdate = true;
		mesh.instanceColor.needsUpdate = true;

	}
	if(params.lock) {
		fitCameraToSelection(camera, controls, visPos, 1.3)
    }
	renderer.render( scene, camera );

}

animate();



var webMfile = writable();


async function onRecordingEnd() {
  
  //FORM JSON 
  name = seed; //Name the NFT after it's seed
  //TODO: Add number to description here
  //FORM ATTRIBUTES
	
  


  
  recording = false;
  recorder.stop();
  var blob = new Blob();
  await recorder.save(async (_blob) => {

    blob = _blob;

    const _code = ViewerScript(); 
    mint(new File([blob], "blob.webm"))
  })
  
  onWindowResize();
	speedMult = 1;
	controls.enabled = true;
	const $start = document.getElementById('start');
	const $headlamp = document.getElementById('headlamp');
	const $stabilize = document.getElementById('stabilize');
	const $lock = document.getElementById('lock');
	const $reset = document.getElementById('reset');
	$start.style.display = 'inline';
	$headlamp.style.display = 'inline';
	$stabilize.style.display = 'inline';
	$lock.style.display = 'inline';
	$reset.style.display = 'inline';
	params.stabilize = stableOld;
	params.lock = lockOld;
	opct = 1;
  $start.textContent = "Mint"
  
 
}


async function mint(file) {
    if (
      !confirm(
        `Are you sure you would like to mint this token?`
      )
    ) {
      minting = false;
      return;
    }
    

    contract = $app.contract;
    account = $app.account;

    let nextId = await contract.methods.totalSupply().call();
    if(nextId >= TOTAL_SUPPLY) {
      alert("All NFT's have been claimed!")
      minting = false;
      return;
    }

    const base_url = "https://www.negativeentropy.app/viewer/";
    var extURL = base_url + nextId;
    console.log(extURL);
    data.external_url = extURL;


    const formData = new FormData();
    formData.append('file', file);
    var destination = BACKEND+"file";
    var imageUp = await fetch(destination, {
      method: 'POST',
	  mode: 'cors',
      body: formData
     });
    const image_uri = await imageUp.json();
    data.image = image_uri;


    console.log(JSON.stringify(data));
    // here is where you'd set external_url in the json
    var payload = {}
    payload.customer = $app.account;
    payload.nft = data;
    //Backend verifies that seed is unique, uploads JSON to IPFS
 	//Backend signs message (seed+URI) and returns signed message
    var destination = BACKEND+"signature";
    let response = await fetch(destination, {
    	method: 'POST',
    	headers: {
    		'Content-Type': 'application/json;charset=utf-8'
    	},
		mode: 'cors',
    	body: JSON.stringify(payload)
    });
	let result = await response.json();
	if(!response.ok) {
		alert("Error communicating with server. The error is: " + result.error);
		minting = false;
		return;
	}

    



    //Take signed message, communicate with contract, and mint
    const cost = await contract.methods.PRICE().call({from: $app.account});
    const price_act = $app.web3.utils.fromWei(cost);


    mintText = 'Adding NFT to blockchain - See MetaMask (or the like) for transaction';
    const payment = await contract.methods.mint($app.account, result.v, result.r, result.s, result.URI, result.seed).send({from: $app.account, value: cost})
    .once('confirmation', function(confirmationNumber, receipt){
      //This is called when the transaction is confirmed
      console.log("CONFRIMED");
      minting = false;
      dispatch('minted');
      router("/viewer/" + nextId);
	  payment.removeListener('confirmation');

    })
    .once('error', function(error) {
      console.log(error);
      minting = false;
      alert("Transaction failed! Check your web3 Provider for more info");
	  payment.removeListener('error');
    });    

  }


  onMount(function() {
	  window.scrollTo(window.scrollX, window.scrollY + 1);
  })
</script>

  

<style>

#load_ind {
    display: flex;
    background: none;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: absolute; 
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 20;
    font-size: 60px;
}


</style>

<svelte:window on:resize={()=>onWindowResize()}/>

<section>
  <div class="mint-container">

    <div class="canvas-container fade-in fade-in-1" id="canvas-container">
	  
      <div class="button-container">
        <div class="button-actual" id="inner_div">
      
          <button id="lock" on:click={()=>lock()}>
            <svg width="48px" height="36px" enable-background="new 0 0 52 52" id="Layer_1" version="1.1" viewBox="0 0 52 52" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g><path d="M21.9989624,14.0064087V4.0002441h27v-2h-29v12.0045166L14,13.9997559v4.6199951L2,14.6397705V39.40979l12-3.9900513    v4.5800171l6.9971313,0.008667c-0.0490112-0.4731445-0.0772705-0.9525146-0.0772705-1.4388428    c0-3.1660156,1.1289063-6.296875,3.1210938-8.7148438v-3.4072266c0-5.7607422,4.4296875-10.4472656,9.875-10.4472656    s9.875,4.6865234,9.875,10.4472656v3.4072266c1.9970703,2.4179688,3.1289063,5.5498047,3.1289063,8.7148438    c0,0.4933472-0.0298462,0.9793091-0.0802612,1.4590454L50,40.0297852v-26L21.9989624,14.0064087z"/></g><g><path d="M41.7909546,26.4475098c0-4.6582031-3.5322266-8.4472656-7.875-8.4472656    s-7.875,3.7890625-7.875,8.4472656v4.1594238c-1.9874268,2.1243286-3.1209717,4.9937134-3.1209717,7.9628296    c0,6.2999878,4.9299927,11.4299927,11,11.4299927c6.0599976,0,11-5.1300049,11-11.4299927    c0-2.9725952-1.1450806-5.8452759-3.1290283-7.961792V26.4475098z M36.1699829,40.0197754v3.4599609h-4.5v-3.4599609    c-0.789978-0.6700439-1.25-1.6900024-1.25-2.7600098c0-1.9899902,1.5700073-3.6099854,3.5-3.6099854s3.5,1.6199951,3.5,3.6099854    C37.4199829,38.3297729,36.9499512,39.3497314,36.1699829,40.0197754z M39.7909546,28.9006348    c-0.0093994-0.0068359-0.0188599-0.0128784-0.0282593-0.0188599c-0.0009766-0.0006104-0.00177-0.0014038-0.0027466-0.0020142    c-2.3612671-1.553833-5.2926636-2.0270386-8.020813-1.472229c-1.2930298,0.2623901-2.545166,0.7348633-3.6630249,1.4696655    c-0.0117188,0.0078125-0.0234375,0.015625-0.0351563,0.0234375v-2.453125c0-3.5546875,2.6357422-6.4472656,5.875-6.4472656    s5.875,2.8925781,5.875,6.4472656V28.9006348z" fill="#3A92CC"/></g></g></svg>
            <div class="controls-info">Lock the camera.</div>
          </button>
          
          <button id="headlamp" on:click={()=>headlamp()}>
            <svg width="48px" height="36px" id="Layer_1" style="enable-background:new 0 0 100.353 100.352;" version="1.1" viewBox="0 0 100.353 100.352" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M69.294,11.442c-6.788-5.594-15.724-7.82-24.512-6.109C32.951,7.636,23.449,17.623,21.675,29.62  c-1.447,9.79,2.031,19.567,9.304,26.155c3.277,2.968,5.254,7.243,5.568,12.039c0.006,0.087,0.023,0.171,0.042,0.254v15.039  c0,0.828,0.671,1.5,1.5,1.5h1.495c0.609,4.359,3.813,7.697,7.672,7.697h6.81c3.859,0,7.062-3.338,7.671-7.697h1.495  c0.828,0,1.5-0.672,1.5-1.5V67.828c0-0.003,0.001-0.006,0.001-0.01c0-4.462,2.026-8.771,5.706-12.133  c6.062-5.538,9.538-13.415,9.538-21.61C79.978,25.287,76.084,17.037,69.294,11.442z M45.357,39.91h-2.305  c-1.271,0-2.305-1.034-2.305-2.305s1.034-2.305,2.305-2.305s2.305,1.034,2.305,2.305V39.91z M55.966,37.605  c0-1.271,1.034-2.305,2.306-2.305c1.271,0,2.305,1.034,2.305,2.305s-1.034,2.305-2.305,2.305h-2.303L55.966,37.605z M55.063,69.211  h6.67v12.396H60.36c-0.003,0-0.006-0.001-0.01-0.001s-0.006,0.001-0.01,0.001H40.982c-0.003,0-0.006-0.001-0.01-0.001  s-0.006,0.001-0.01,0.001H39.59V69.211h14.366 M48.357,66.211V42.91h4.617l0.034,23.301H48.357z M54.066,89.304h-6.81  c-2.238,0-4.117-2.004-4.637-4.697h16.083C58.183,87.3,56.304,89.304,54.066,89.304z M68.416,53.471  c-3.872,3.537-6.164,8.013-6.593,12.74h-5.816L55.974,42.91h2.298c2.925,0,5.305-2.38,5.305-5.305c0-2.925-2.38-5.305-5.305-5.305  c-2.926,0-5.306,2.38-5.306,5.307l0.003,2.303h-4.612v-2.305c0-2.925-2.38-5.305-5.305-5.305c-2.925,0-5.305,2.38-5.305,5.305  c0,2.925,2.38,5.305,5.305,5.305h2.305v23.301h-5.972c-0.636-5.005-2.864-9.465-6.393-12.66c-6.528-5.914-9.65-14.696-8.35-23.493  c1.591-10.76,10.108-19.716,20.712-21.781c7.908-1.538,15.938,0.458,22.03,5.48c6.096,5.023,9.592,12.429,9.592,20.319  C76.978,41.43,73.857,48.5,68.416,53.471z"/></svg>
            <div class="controls-info">Turn on the lighs!</div>
          </button>
          
          <button id="stabilize" on:click={()=>stabilize()}>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 1023.000000 639.000000" preserveAspectRatio="xMidYMid meet">
              <g transform="translate(0.000000,639.000000) scale(0.100000,-0.100000)" stroke="none">
                <path d="M1255 6374 c-235 -39 -491 -152 -670 -295 -104 -83 -284 -274 -344 
                -364 -102 -155 -190 -364 -225 -537 -10 -48 -16 -129 -16 -216 0 -128 2 -142
                23 -172 33 -49 98 -80 169 -80 107 0 166 45 192 145 9 32 16 76 16 96 0 62 38
                260 64 338 83 240 276 461 503 575 115 58 226 89 378 106 188 22 217 28 254
                58 56 44 73 85 69 168 -4 86 -30 131 -99 169 -41 22 -58 25 -140 24 -52 -1
                -130 -7 -174 -15z"/>
                <path d="M4465 6366 c-198 -65 -297 -154 -499 -451 -205 -300 -222 -321 -281
                -353 -32 -17 -283 -29 -652 -31 -182 -1 -183 -1 -271 -34 -134 -51 -244 -120
                -342 -217 -121 -119 -196 -235 -259 -405 l-26 -70 -3 -1387 c-3 -1554 -7
                -1457 71 -1621 103 -216 297 -389 527 -469 l95 -33 2275 0 2275 0 95 32 c261
                89 468 294 568 564 l27 74 3 1375 c2 965 0 1394 -8 1439 -47 273 -251 538
                -516 670 -166 82 -171 83 -609 90 -436 7 -420 4 -491 81 -21 22 -85 111 -144
                198 -58 86 -126 186 -151 222 -71 105 -203 230 -286 273 -147 76 -157 77 -777
                77 -547 -1 -552 -1 -621 -24z m1165 -401 c46 -9 86 -39 115 -84 13 -21 29 -44
                37 -52 7 -8 36 -48 64 -89 258 -381 291 -423 391 -491 52 -36 152 -87 198
                -100 73 -22 186 -29 491 -29 341 -1 379 -5 475 -48 93 -42 189 -145 221 -234
                39 -108 39 -116 35 -1478 -2 -729 -7 -1342 -12 -1363 -4 -20 -11 -40 -16 -43
                -5 -3 -9 -11 -9 -19 0 -8 -14 -34 -30 -58 -70 -104 -153 -148 -310 -166 -111
                -13 -4149 -13 -4321 -1 -70 5 -140 15 -155 21 -77 31 -97 43 -129 71 -36 31
                -95 111 -95 129 0 5 -4 17 -9 27 -29 57 -31 140 -31 1427 0 1338 0 1346 38
                1453 31 89 128 191 222 234 92 42 142 47 488 48 400 0 447 7 602 85 76 38 192
                141 243 214 17 25 37 52 43 61 11 14 85 122 188 275 22 33 46 66 53 73 7 7 13
                17 13 21 0 4 21 30 48 58 46 50 49 51 117 58 39 3 74 8 79 9 23 6 925 -3 956
                -9z"/>
                <path d="M4905 4675 c-254 -42 -487 -167 -696 -375 -256 -256 -384 -551 -384
                -885 2 -572 416 -1092 989 -1240 126 -32 147 -35 284 -35 126 0 165 4 251 25
                255 63 425 155 604 324 233 222 354 439 407 733 31 171 24 306 -25 498 -88
                347 -374 686 -715 848 -176 83 -293 112 -485 117 -94 3 -169 0 -230 -10z m364
                -421 c17 -4 29 -10 26 -14 -2 -4 6 -5 19 -3 43 9 190 -52 288 -118 82 -56 152
                -125 142 -140 -4 -7 -3 -10 3 -6 22 14 114 -131 151 -239 43 -127 47 -156 46
                -329 0 -148 -3 -180 -23 -244 -30 -98 -70 -183 -81 -176 -6 3 -7 -1 -4 -9 13
                -35 -135 -203 -241 -273 -253 -166 -603 -190 -885 -60 -65 30 -121 68 -114 78
                3 5 -1 6 -8 4 -30 -12 -219 190 -202 216 4 7 3 9 -3 6 -18 -11 -77 116 -111
                233 -21 73 -23 373 -3 445 22 83 53 168 74 205 128 229 300 357 562 419 46 10
                317 14 364 5z"/>
                <path d="M8655 6380 c-58 -18 -108 -79 -124 -150 -22 -97 33 -203 116 -228 21
                -6 96 -18 167 -27 200 -24 296 -50 417 -111 94 -46 156 -91 242 -174 198 -189
                299 -413 327 -728 12 -132 24 -166 73 -209 42 -37 85 -47 162 -41 120 10 191
                106 182 243 -11 167 -62 373 -132 528 -197 443 -596 769 -1074 878 -97 22
                -310 34 -356 19z"/>
                <path d="M1310 5511 c-203 -65 -385 -250 -444 -450 -20 -70 -21 -212 -2 -250
                67 -129 271 -138 355 -16 14 21 26 63 35 122 7 49 19 100 25 112 31 58 87 88
                179 97 31 3 71 10 88 15 38 12 93 64 110 106 17 39 18 131 3 170 -13 34 -55
                80 -91 99 -39 20 -189 18 -258 -5z"/>
                <path d="M8625 5512 c-40 -26 -71 -61 -84 -95 -18 -47 -13 -136 10 -184 33
                -69 80 -93 215 -111 120 -16 158 -59 180 -205 22 -145 83 -207 207 -207 67 0
                102 12 140 48 47 45 57 73 57 169 -1 231 -160 452 -409 566 -58 27 -79 31
                -176 34 -96 4 -114 2 -140 -15z"/>
                <path d="M1034 1694 c-5 -1 -26 -5 -47 -9 -45 -7 -105 -57 -123 -102 -19 -44
                -18 -177 2 -244 59 -200 244 -388 446 -450 71 -23 204 -25 251 -5 79 32 126
                135 106 226 -24 105 -82 149 -223 165 -125 15 -179 72 -192 203 -3 31 -10 71
                -16 87 -12 33 -62 90 -93 108 -21 11 -94 25 -111 21z"/>
                <path d="M9097 1686 c-96 -26 -136 -83 -152 -220 -15 -121 -69 -176 -191 -191
                -88 -11 -109 -17 -146 -42 -50 -34 -78 -94 -78 -166 0 -67 12 -102 48 -140 43
                -46 74 -57 159 -57 162 0 291 58 423 190 132 132 190 261 190 423 0 85 -11
                116 -57 159 -49 47 -123 63 -196 44z"/>
                <path d="M9994 1694 c-5 -1 -26 -5 -47 -9 -49 -8 -110 -63 -125 -112 -6 -21
                -18 -99 -27 -173 -25 -215 -75 -366 -169 -513 -52 -83 -189 -222 -275 -280
                -156 -105 -305 -156 -531 -182 -172 -20 -203 -30 -244 -76 -76 -83 -62 -232
                28 -299 60 -45 170 -51 351 -20 200 34 402 115 580 232 90 59 281 239 364 343
                176 221 298 542 318 841 5 63 2 77 -23 129 -33 67 -82 105 -148 115 -23 3 -46
                5 -52 4z"/>
                <path d="M105 1675 c-42 -20 -59 -35 -84 -75 -19 -31 -21 -50 -21 -168 0 -199
                40 -361 140 -567 80 -165 141 -248 299 -406 158 -157 238 -216 406 -299 198
                -97 440 -155 615 -148 76 3 92 7 128 32 55 37 82 95 82 172 0 70 -21 116 -71
                156 -37 30 -67 37 -259 59 -271 30 -476 131 -658 323 -164 173 -244 360 -277
                646 -9 74 -21 151 -27 170 -12 40 -51 85 -90 106 -35 18 -144 18 -183 -1z"/>
              </g>
            </svg>
            <div class="controls-info">Stabilize camera.</div>
          </button>
          
        </div>
        <button id="hide" on:click={()=>hide()} on:mouseover={hideEnter} on:mouseout={hideExit}>
          <svg opacity={opct} height=48px width=48px xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><g ><path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288c-.335.48-.83 1.12-1.465 1.755c-.165.165-.337.328-.517.486l.708.709z"/><path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/><path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884l-12-12l.708-.708l12 12l-.708.708z"/></g></svg>
          <div class="controls-info">Hide controls.</div>
        </button>
      </div>

    </div>  


    <textarea class="form-control mint-text-area fade-in fade-in-2" name="textarea" id="textareaID" placeholder="Choose a unique name for your NFT and hit Load Seed..."></textarea>

    <div class="mint-buttons fade-in fade-in-3">
      <button class="button-secondary" id="reset" on:click={()=>_reset()}>Load Seed</button>
      <button class="button-main" id="start" on:click={(e)=>start(e)}>Mint</button> 
    </div>
  </div>
  {#if minting}
  <div id = load_ind>
  <Moon size="180" color="#FFFFFF" unit="px" duration="2s"></Moon>
  </div>
  {/if}

<div class="section-break section-break-final"></div>

  
    
</section>
