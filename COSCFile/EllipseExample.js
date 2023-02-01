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
	document.getElementById("render").onclick = function() {
		// Read the constants in the input boxes.
		C = getParametricCurveConstants();
		
		console.log(C);
		// Recompute the vertices.
		vertices = computeVertices(C);
		N = vertices.length;
		// Update the data in the VBO.
		gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
		
		// Render the geometry.
		//render();
		
	};
	


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
	// Define a structure with the fields as the input box data.
	var C = {
	    x0: parseFloat(document.getElementById("x0").value),
	    y0: parseFloat(document.getElementById("y0").value),
	    a: parseFloat(document.getElementById("a").value),
	    b: parseFloat(document.getElementById("b").value)
	    
	}; // C
	
	// Return the input values
	return(C);
}	// getParametricCurveConstants()


/////////////////////////////////////////////////////
//	Compute the vertices of the ellipse or circle.
/////////////////////////////////////////////////////
function computeVertices(C) {
	
	// Initialize vertices
	var vertices = [];
	
	var theta0;
	var theta1;
	var theta;
	var dtheta;
	var x;
	var y;
	
	theta0 = 0.0;
	theta1 = 2. * Math.PI;
	
	
	// Number of vertices in the ellipse/circle
	var n = 400;
	
	dtheta = (theta1 - theta0)/n;
	// Initialize theta
	theta = 0.0;
	
	//Calculate the vertices.
	while (theta < theta1) {
	
		x = C.a * Math.cos(theta) + C.x0;
		y = C.b * Math.sin(theta) + C.y0;
		
		vertices.push(vec2(x, y));
		theta += dtheta;
		
	} // while()
	
	return(vertices);
	
	
}	// computeVertices(C)


/////////////////////////////////////////////////////
// Render the parametric curve (ellipse/circle).
/////////////////////////////////////////////////////
function render() {
	
	// Clear the display
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	// Draw the geometry.
	gl.drawArrays(gl.LINE_LOOP, 0, N);
}	// render()
