import React, { useState } from 'react';
import { ReactFlowProvider, Edge, Node } from 'reactflow';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import 'reactflow/dist/style.css';
import FlowBuilder from './components/FlowBuilder';
import NodesPanel from './components/NodesPanel';
import SettingsPanel from './components/SettingsPanel';
import SaveButton from './components/SaveButton';
import './index.css'

const App: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  return (
    <div className="flex flex-col h-screen">
      <ReactFlowProvider>
        <DndProvider backend={HTML5Backend}>
   <header className='h-auto bg-gray-200 flex justify-end pr-4'>
   <SaveButton nodes={nodes} edges={edges} />
   </header>
   <section className='flex h-full'>
          <div className="flex-1 relative">
            <FlowBuilder
              nodes={nodes}
              setNodes={setNodes}
              edges={edges}
              setEdges={setEdges}
              setSelectedNode={setSelectedNode}
            />
          </div>
        
          <div className="w-[230px] bg-[#f4f4f4] border">
          {selectedNode ? 
          <SettingsPanel selectedNode={selectedNode} setNodes={setNodes} setSelectedNode={setSelectedNode}/> 
          : 
          <NodesPanel />
          }
        </div>
          </section>
         
        </DndProvider>
      </ReactFlowProvider>
    </div>
  );
}

export default App;
