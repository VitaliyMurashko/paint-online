import canvasState from "../store/canvasState";


export const canvasAnimation = (widthX, widthY) => {
            let x
            let y
            var c = canvasState.canvas
            var $ = c.getContext('2d');

            const memo = (r, g, b) => {
                const R = {}
               const G = {}
               const B = {}
            }

            
            var col = function(x, y, r, g, b) {
                console.log('render')
              $.fillStyle = "rgba(" + r + "," + g + "," + b + ","+ 0.9 +")";
              $.fillRect(0, 0, widthX,widthY);
            }
            var R = function(x, y, t) {
              return( Math.floor(192 + 64*Math.cos( (x*x-y*y)/300 + t )) );
            }
            
            var G = function(x, y, t) {
              return( Math.floor(192 + 64*Math.sin( (x*x*Math.cos(t/4)+y*y*Math.sin(t/3))/300 ) ) );
            }
            
            var B = function(x, y, t) {
              return( Math.floor(192 + 64*Math.sin( 5*Math.sin(t/9) + ((x-100)*(x-100)+(y-100)*(y-100))/1100) ));
            }
            
            var t = 0;
            const run = (x, y) => { 
              for(x=0;x<=35;x++) {
                for(y=0;y<=35;y++) {
                  col(x, y, R(x,y,t), G(x,y,t), B(x,y,t));
                }
              }
              t = t + 0.100;
              window.requestAnimationFrame(run);
}

run();
}