import React from 'react';
import { Node, Edge } from 'reactflow';

interface SaveButtonProps {
  nodes: Node[];
  edges: Edge[];
}

const SaveButton: React.FC<SaveButtonProps> = ({ nodes, edges }) => {
  const handleSave = () => {
    const nodesWithNoTargets = nodes.filter(
      (node) => !edges.some((edge) => edge.source === node.id)
    );
    console.log("nodesWithNoTargets",nodesWithNoTargets)

    if (nodes.length > 1 && nodesWithNoTargets.length > 1) {
      alert('Error: More than one node has no target handles.');
    } else {
      // Handle saving the flow (e.g., send to a server or save to local storage)
      console.log('Flow saved:', { nodes, edges });
      alert('Flow saved!');
    }
  };

  return <button onClick={handleSave} className='rounded-md border bg-blue-300 hover:bg-blue-500 p-2 my-1'>Save Flow</button>;
};

export default SaveButton;
