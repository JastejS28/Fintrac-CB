// // frontend/src/components/SpendingPieChart.jsx

// import React, { useRef, useState } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Text } from '@react-three/drei';

// // A single slice of the pie chart
// function Slice({ position, rotation, size, color, label, onHover, isHovered }) {
//   return (
//     <mesh position={position} rotation={rotation} onPointerOver={() => onHover(true)} onPointerOut={() => onHover(false)}>
//       <cylinderGeometry args={[1, 1, 0.2, 32, 1, false, 0, size]} />
//       <meshStandardMaterial color={isHovered ? 'hotpink' : color} />
//     </mesh>
//   );
// }

// function SpendingPieChart({ data }) {
//   const [hoveredSlice, setHoveredSlice] = useState(null);

//   if (!data || data.length === 0) {
//     return <p>No expense data available to display chart.</p>;
//   }

//   // Calculate total spending to determine percentages
//   const totalAmount = data.reduce((sum, item) => sum + item.totalAmount, 0);
//   let currentAngle = 0;

//   const colors = ['#4285F4', '#DB4437', '#F4B400', '#0F9D58', '#AB47BC', '#00ACC1'];

//   return (
//     <div style={{ height: '400px', width: '100%' }}>
//       <Canvas camera={{ position: [0, 2.5, 2.5], fov: 50 }}>
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[10, 10, 5]} intensity={1} />
        
//         {data.map((slice, index) => {
//           const percentage = slice.totalAmount / totalAmount;
//           const sliceAngle = percentage * Math.PI * 2;
//           const rotationY = currentAngle + sliceAngle / 2;
//           currentAngle += sliceAngle;

//           return (
//             <Slice
//               key={slice._id}
//               position={[0, 0, 0]}
//               rotation={[Math.PI / 2, rotationY, 0]}
//               size={sliceAngle}
//               color={colors[index % colors.length]}
//               label={slice._id}
//               onHover={(isHovering) => setHoveredSlice(isHovering ? slice._id : null)}
//               isHovered={hoveredSlice === slice._id}
//             />
//           );
//         })}

//         {hoveredSlice && (
//           <Text position={[0, 0, 0.2]} fontSize={0.2} color="white" anchorX="center" anchorY="middle">
//             {hoveredSlice}
//           </Text>
//         )}
//         <OrbitControls />
//       </Canvas>
//     </div>
//   );
// }

// export default SpendingPieChart;


import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';

// We now use 'a.mesh' which is an animatable mesh from react-spring
function Slice({ position, rotation, size, color, label, onHover, isHovered }) {
  // 1. Add a spring animation for hover effect
  const { scale } = useSpring({
    scale: isHovered ? 1.1 : 1, // Scale up when hovered
    config: { friction: 20, tension: 300 },
  });

  return (
    <a.mesh
      position={position}
      rotation={rotation}
      scale={scale} // Apply the animation
      onPointerOver={() => onHover(true)}
      onPointerOut={() => onHover(false)}
    >
      {/* 2. Change geometry to 'ringGeometry' to create a doughnut chart */}
      <ringGeometry args={[0.6, 1, 32, 1, 0, size]} />
      <meshStandardMaterial color={color} />
    </a.mesh>
  );
}

function SpendingPieChart({ data }) {
  const [hoveredSlice, setHoveredSlice] = useState(null);

  if (!data || data.length === 0) {
    return <p>No expense data available to display chart.</p>;
  }

  const totalAmount = data.reduce((sum, item) => sum + item.totalAmount, 0);
  let currentAngle = 0;
  const colors = ['#4285F4', '#DB4437', '#F4B400', '#0F9D58', '#AB47BC', '#00ACC1'];

  // Find the currently hovered slice's data
  const hoveredData = data.find(d => d._id === hoveredSlice);

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        
        {data.map((slice, index) => {
          const percentage = slice.totalAmount / totalAmount;
          const sliceAngle = percentage * Math.PI * 2;
          const rotationZ = currentAngle;
          currentAngle += sliceAngle;

          return (
            <Slice
              key={slice._id}
              position={[0, 0, 0]}
              rotation={[0, 0, -rotationZ]}
              size={sliceAngle}
              color={colors[index % colors.length]}
              label={slice._id}
              onHover={(isHovering) => setHoveredSlice(isHovering ? slice._id : null)}
              isHovered={hoveredSlice === slice._id}
            />
          );
        })}

        {/* 3. Improved tooltip in the center */}
        {hoveredData && (
          <>
            <Text position={[0, 0.1, 0]} fontSize={0.15} color="white" anchorX="center" anchorY="middle">
              {hoveredData._id}
            </Text>
            <Text position={[0, -0.1, 0]} fontSize={0.12} color="white" anchorX="center" anchorY="middle">
              {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(hoveredData.totalAmount)}
            </Text>
          </>
        )}
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

export default SpendingPieChart;