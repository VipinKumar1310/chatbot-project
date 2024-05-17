import React from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

const TextNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div className="p-[10px] border bg-[#fff] relative rounded-lg shadow-lg">
      <Handle type="target" position={Position.Top} />
      <div className=" text-black w-40 h-auto">{data.text}</div>
      <Handle type="source" position={Position.Bottom}/>
    </div>
  );
};

export default TextNode;
