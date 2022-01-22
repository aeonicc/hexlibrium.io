// import React, { Component } from 'react';

// import "../libs/blockly/blockly_compressed.js"
// import "../libs/blockly/blocks_compressed.js"
// import "../libs/blockly/javascript_compressed.js"
// import "../libs/blockly/en.js"

// import "../libs/gamepad/gamepad.min.js"

// import "../docs/icons/favicon/icon.svg"
// import "css/style.css"

// import "js/levels.js"
// import "js/gui.js"
// import "js/game.js"
// import "js/index.js"
// // class App extends Component {

// //     async componentWillMount() {


//         // function Box(props) {
//         //     const mesh = useRef();
//         //     // rotate the box
//         //     useFrame((state, delta) => {
//         //       mesh.current.rotation.x = mesh.current.rotation.y += 0.01
//         //     });
//         //     // draw the box
//         //     return (
//         //       <mesh {...props} ref={mesh}>
//         //         <boxGeometry args={[1, 1, 1]} />
//         //         <meshStandardMaterial color="#FFAE00" />
//         //       </mesh>
//         //     );
//         //   }


//         function getUrlVars() {
//         var vars = {};
//         var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
//             vars[key] = value;
//         });
//         return vars;
//     }

    
//         let {
//             start,
//             categories,
//             id
//         } = getUrlVars()

//         // update parameters
//         start = start != undefined
//         categories = categories != undefined
//         id = (id == '1') ? 0 : 1

//         // update the checkers
//         if (start) document.getElementById('start_check').checked = true
//         if (categories) document.getElementById('categories_check').checked = true

//         // set the toolbox
//         const toolbox = document.getElementById(categories ? 'toolbox_c' : 'toolbox')   
   
//         // link the buttons
//         document.getElementById('load').onclick = () => game.loadCode() + console.clear()
//         document.getElementById('level_1').onclick = () => game.loadLevel(levels[id = 0]) + console.clear()
//         document.getElementById('level_2').onclick = () => game.loadLevel(levels[id = 1]) + console.clear()

//         document.getElementById('forward').onclick = () => gamepad.forward() + gui.removeAnimation()
//         document.getElementById('backward').onclick = () => gamepad.backward() + gui.removeAnimation()
//         document.getElementById('play').onclick = () => gamepad.play()
//         document.getElementById('pause').onclick = () => gamepad.pause()
     
  
//         Blockly.getMainWorkspace().addChangeListener(() => {
//             let capacity = Blockly.getMainWorkspace().remainingCapacity()
//             if (capacity != Infinity) {
//                 // show capacity div
//                 document.getElementById('capacity').style.display = 'block'
//                 document.getElementById('capacityNumber').innerHTML = capacity
//             } else {
//                 // hide capacity div
//                 document.getElementById('capacity').style.display = 'none'
//             }
//         })


    
//         const getUrl = (start, categories) => {
//             let url = []

//             if (start) url.push('start=true')
//             if (categories) url.push('categories=true')
//             url.push('id=' + (id + 1))

//             return 'index.html?' + url.join('&')
//         }

//         // add handlers
//         document.getElementById('start_check').onclick =
//             (event) => window.location.href = getUrl(event.target.checked, categories)

//         document.getElementById('categories_check').onclick =
//             (event) => window.location.href = getUrl(start, event.target.checked)

//         // show capacity div
//         if (id == 2) document.getElementById('capacity').style.display = 'block'
  
//         );
//     }
          
// export default function Render() {
// return (
// //   <Canvas dpr={window.devicePixelRatio}>
// //     <ambientLight />
// //     <pointLight position={[10, 10, 10]} />
// //     <Box position={[0, 0, 0]} />
// //   </Canvas>
        



     
//         <span className="switch_span">start</span>

//         <label className="switch">
//             <input id="start_check" type="checkbox">
//             <span className="slider round"></span>
//         </label>

//         <vr></vr>

       
//         <span className="switch_span">categories</span>
//         <label className="switch">
//             <input id="categories_check" type="checkbox">
//             <span className="slider round"></span>
//         </label>
//         <vr></vr>
      

//         <span className="switch_span">levels</span>
//         <button className="button level" id="level_1">1</button>
//         <button className="button level" id="level_2">2</button>
//         <vr></vr>
   

//         <div id="game-div">
          
//             <svg xmlns="http://www.w3.org/2000/svg" style="display: none" version="1.1" id="1" width="400px"
//                 height="400px" viewBox="0 0 400 400">
//                 <image xlink:href="images/maze1.png" className="maze" x="0" y="-1" width="400" height="399"></image>
//                 <image id="finish1" xlink:href="images/marker.png" height="34" width="20" x="215" y="146"></image>
//                 <clipPath id="pegmanClipPath1">
//                     <rect id="clipRect1" width="49" height="52" x="101" y="191"></rect>
//                 </clipPath>
//                 <image id="pegman1" xlink:href="images/pegman.png" height="52" width="1029"
//                     clip-path="url(#pegmanClipPath1)" x="-95" y="191" transform="rotate(0, 0, 0)"></image>
//             </svg>
//             {/* <!--game 2--> */}
//             <svg xmlns="http://www.w3.org/2000/svg" style="display: none" version="1.1" id="2" width="400px"
//                 height="400px" viewBox="0 0 400 400">
//                 <image xlink:href="images/maze2.png" className="maze" x="0" y="0" width="400" height="400"></image>
//                 <image id="finish2" xlink:href="images/marker.png" height="34" width="20" x="215" y="46"></image>
//                 <clipPath id="2pegmanClipPath">
//                     <rect id="clipRect2" width="49" height="52" x="51" y="291"></rect>
//                 </clipPath>
//                 <image id="pegman2" xlink:href="images/pegman.png" height="52" width="1029"
//                     clip-path="url(#2pegmanClipPath)" x="-145" y="291" transform="rotate(0, 0, 0)"></image>
//             </svg>
//             {/* <!--capacity div--> */}
//             <div id="capacity" style="display: none;">You have <span id="capacityNumber">10</span> blocks left.</div>
//             {/* <!--buttons--> */}
//             <div className="buttons">
//                 <button id="play" className="button green" style="grid-area: 1">Play</button>
//                 <button id="pause" className="button green" style="grid-area: 2">Pause</button>
//                 <hr>
//                 <button id="forward" className="button blue" style="grid-area: 2">Forward</button>
//                 <button id="backward" className="button blue" style="grid-area: 3">Backward</button>
//                 <hr>
//                 <button id="load" className="button violet" style="grid-area: 1"> &nbsp;Load&ensp;code</button>
//             </div>
//         </div>
      
//         <div id="blockly-editor">
//             <div id="blockly-div"></div>
          
          
//             <xml id="toolbox" style="display: none">
//                 <block type="move"></block>
//                 <block type="turn"></block>
//                 <block type="turn">
//                     <field name="DIRECTION">3</field>
//                 </block>
//                 <block type="repeat_until"></block>
//                 <block type="if_path"></block>
//                 <block type="if_else_path"></block>
//             </xml>
           
           
//             <xml id="toolbox_c" style="display: none">
//                 <category name="Controls" colour="285">
//                     <block type="move"></block>
//                     <block type="turn"></block>
//                     <block type="turn">
//                         <field name="DIRECTION">3</field>
//                     </block>
//                 </category>
//                 <category name="Logic" colour="120">
//                     <block type="repeat_until"></block>
//                     <block type="if_path"></block>
//                     <block type="if_else_path"></block>
//                 </category>
//             </xml>
//         </div>
   



    
    


//  }
//  }

// // export default App;
