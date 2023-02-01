/////////////////////////////////////////////
//
//	Draw a parametric curve of an ELLIPSE
//
//	Dr. M. Wachowiak
//	COSC 3207 WI 2023
//	1/21/23
//
//////////////////////////////////////////////



"use strict";

var canvas;
var gl;


// Number of vertices sent into render()
var N;


////////////////////////////////////////////////////////
//
//	Initialization and Geometry Generation
//
////////////////////////////////////////////////////////
window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL is not available." ); }

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
	
	
	// User-specified parameters (constants) from the HTML page
	// (Default values from the input boxes)
	var C = getParametricCurveConstants();
		
		
	// Vertices for the parametric curve of an ellipse/circle
	var vertices = computeVertices(C);
	
	// Length of the vertex array
	N = vertices.length;
	
	// Event listener (Render button)


    // Load the data into the GPU.
    var bufferId = gl.createBuffer();	
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate the shader variables with the data buffer.
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

	// Render the geometry.
    render();
	
}	// init()


/////////////////////////////////////////////////////
// Get the constants for the parametric curve.
/////////////////////////////////////////////////////
function getParametricCurveConstants() {
}	// getParametricCurveConstants()


/////////////////////////////////////////////////////
//	Compute the vertices of the ellipse or circle.
/////////////////////////////////////////////////////
function computeVertices(C) {
}	// computeVertices(C)


/////////////////////////////////////////////////////
// Render the parametric curve (ellipse/circle).
/////////////////////////////////////////////////////
function render() {
}	// render()