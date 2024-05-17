import React from 'react';
import { useDrag } from 'react-dnd';

const NodeTypes = {
  TEXT: 'textNode',
};

interface NodePanelItemProps {
  type: string;
  label: string;
}

const NodePanelItem: React.FC<NodePanelItemProps> = ({ type, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'node',
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className="p-[10px] mb-[5px] bg-white border cursor-grab rounded-lg w-auto max-w-[200px]" style={{ opacity: isDragging ? 0.5 : 1 }}>
      {label}
    </div>
  );
};

const NodesPanel: React.FC = () => {
  return (
    <>
     <div className='border-b flex justify-end self-start text-blue-500 py-2 px-5'>Nodes</div>
    <div className="m-3">
      <NodePanelItem type={NodeTypes.TEXT} label="Text Node" />
    </div>
    </>
  );
};

export default NodesPanel;
