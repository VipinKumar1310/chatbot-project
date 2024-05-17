import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Connection,
  ReactFlowInstance,
  Controls,
  Background,
  BackgroundVariant,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useDrop } from 'react-dnd';
import TextNode from './TextNode';

const nodeTypes = {
  textNode: TextNode,
};

interface FlowBuilderProps {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  setSelectedNode: React.Dispatch<React.SetStateAction<Node | null>>;
}

const FlowBuilder: React.FC<FlowBuilderProps> = ({ nodes, setNodes, edges, setEdges, setSelectedNode }) => {
  const [reactFlowNodes, setReactFlowNodes, onNodesChange] = useNodesState(nodes);
  const [reactFlowEdges, setReactFlowEdges, onEdgesChange] = useEdgesState(edges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  const onConnect = useCallback((params: Edge | Connection) => {
    setReactFlowEdges((eds) => addEdge(params, eds));
    setEdges((eds) => addEdge(params, eds));  // Update parent state
  }, [setReactFlowEdges]);

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'node',
    drop: (item: { type: string }, monitor) => {
      if (reactFlowInstance) {
        const offset = monitor.getClientOffset();
        const position = reactFlowInstance.project({
          x: offset!.x,
          y: offset!.y,
        });

        const newNode = {
          id: `${reactFlowNodes.length + 1}`,
          type: item.type,
          position,
          data: { text: `Node ${reactFlowNodes.length + 1}` },
        };

        setReactFlowNodes((nds) => nds.concat(newNode));
        setNodes((nds) => nds.concat(newNode));  // Update parent state
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const onLoad = useCallback((rfi: ReactFlowInstance) => {
    setReactFlowInstance(rfi);
  }, []);

 // This effect runs only once when nodes prop changes initially
 useEffect(() => {
    setReactFlowNodes(nodes);
  }, [nodes]); // Only trigger when nodes change initially

  return (
    <div ref={drop} className="bg-white h-full w-full" style={{ height: '100%', width: '100%' }}>
      <ReactFlow
        nodes={reactFlowNodes}
        edges={reactFlowEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onLoad}
        nodeTypes={nodeTypes}
        onNodeClick={(event, node) => setSelectedNode(node)}
      >
   <Controls />
   <MiniMap/>
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default FlowBuilder;
