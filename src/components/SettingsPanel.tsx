import React, { useEffect, useState } from 'react';
import { Node } from 'reactflow';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

interface SettingsPanelProps {
  selectedNode: Node;
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setSelectedNode: React.Dispatch<React.SetStateAction<Node | null>>;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ selectedNode, setNodes, setSelectedNode }) => {
    const [inputText, setInputText] = useState(selectedNode.data.text);

    useEffect(() => {
        setInputText(selectedNode.data.text);
      }, [selectedNode]);

      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newText = event.target.value;
        setInputText(newText); // Update inputText
        setNodes((nodes) =>
          nodes.map((node) =>
            node.id === selectedNode.id ? { ...node, data: { ...node.data, text: newText } } : node
          )
        );
      };
    
    

  return (
    <div>
      <div className='border-b flex justify-between self-start text-blue-500 py-2 px-5'><span className='cursor-pointer self-center' onClick={()=> setSelectedNode(null)}><ArrowLeftIcon/></span>Message</div>
      <div className='p-4 '>
      <h3 className='mb-4'>Edit Text</h3>
      <input
        type="text"
        value={inputText}
        onChange={(e) => handleChange(e)}
        placeholder="Enter text"
        className='w-full border rounded-sm p-2'
      />
      </div>
    </div>
  );
};

export default SettingsPanel;
