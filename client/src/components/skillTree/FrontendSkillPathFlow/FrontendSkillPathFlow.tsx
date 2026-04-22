'use client';

import Box from '@mui/material/Box';
import {
  Background,
  Controls,
  MarkerType,
  ReactFlow,
  useReactFlow,
  type Edge,
  type Node,
} from '@xyflow/react';
import { useEffect } from 'react';

type SkillNodeData = {
  label: string;
  category: 'role' | 'foundation' | 'core' | 'delivery';
};

interface FrontendSkillPathFlowProps {
  layoutVersion?: string;
}

const skillPathFitViewOptions = {
  padding: 0.18,
  minZoom: 0.7,
};

const sidebarResizeTransitionMs = 300;

const nodeColorMap: Record<SkillNodeData['category'], { border: string; background: string; }> = {
  role: {
    border: '#0f172a',
    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(30, 41, 59, 0.94))',
  },
  foundation: {
    border: '#2563eb',
    background: 'linear-gradient(135deg, rgba(219, 234, 254, 1), rgba(191, 219, 254, 0.88))',
  },
  core: {
    border: '#0f766e',
    background: 'linear-gradient(135deg, rgba(204, 251, 241, 1), rgba(153, 246, 228, 0.88))',
  },
  delivery: {
    border: '#7c3aed',
    background: 'linear-gradient(135deg, rgba(237, 233, 254, 1), rgba(221, 214, 254, 0.88))',
  },
};

const skillNodes: Node<SkillNodeData>[] = [
  {
    id: 'role',
    position: { x: 290, y: 0 },
    data: {
      label: 'Frontend Developer',
      category: 'role',
    },
    style: {
      width: 260,
      borderRadius: 20,
      border: `2px solid ${nodeColorMap.role.border}`,
      background: nodeColorMap.role.background,
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 800,
      padding: 18,
      textAlign: 'center',
      boxShadow: '0 18px 44px rgba(15, 23, 42, 0.16)',
    },
  },
  {
    id: 'html',
    position: { x: 0, y: 190 },
    data: { label: 'HTML & Semantic Structure', category: 'foundation' },
    style: {
      width: 210,
      borderRadius: 18,
      border: `2px solid ${nodeColorMap.foundation.border}`,
      background: nodeColorMap.foundation.background,
      color: '#0f172a',
      fontSize: 14,
      fontWeight: 700,
      padding: 16,
      textAlign: 'center',
      boxShadow: '0 12px 30px rgba(37, 99, 235, 0.12)',
    },
  },
  {
    id: 'css',
    position: { x: 250, y: 190 },
    data: { label: 'CSS & Responsive UI', category: 'foundation' },
    style: {
      width: 210,
      borderRadius: 18,
      border: `2px solid ${nodeColorMap.foundation.border}`,
      background: nodeColorMap.foundation.background,
      color: '#0f172a',
      fontSize: 14,
      fontWeight: 700,
      padding: 16,
      textAlign: 'center',
      boxShadow: '0 12px 30px rgba(37, 99, 235, 0.12)',
    },
  },
  {
    id: 'javascript',
    position: { x: 500, y: 190 },
    data: { label: 'JavaScript', category: 'foundation' },
    style: {
      width: 210,
      borderRadius: 18,
      border: `2px solid ${nodeColorMap.foundation.border}`,
      background: nodeColorMap.foundation.background,
      color: '#0f172a',
      fontSize: 14,
      fontWeight: 700,
      padding: 16,
      textAlign: 'center',
      boxShadow: '0 12px 30px rgba(37, 99, 235, 0.12)',
    },
  },
  {
    id: 'typescript',
    position: { x: 620, y: 350 },
    data: { label: 'TypeScript', category: 'core' },
    style: {
      width: 190,
      borderRadius: 18,
      border: `2px solid ${nodeColorMap.core.border}`,
      background: nodeColorMap.core.background,
      color: '#0f172a',
      fontSize: 14,
      fontWeight: 700,
      padding: 16,
      textAlign: 'center',
      boxShadow: '0 12px 30px rgba(15, 118, 110, 0.12)',
    },
  },
  {
    id: 'react',
    position: { x: 410, y: 350 },
    data: { label: 'React', category: 'core' },
    style: {
      width: 190,
      borderRadius: 18,
      border: `2px solid ${nodeColorMap.core.border}`,
      background: nodeColorMap.core.background,
      color: '#0f172a',
      fontSize: 14,
      fontWeight: 700,
      padding: 16,
      textAlign: 'center',
      boxShadow: '0 12px 30px rgba(15, 118, 110, 0.12)',
    },
  },
  {
    id: 'accessibility',
    position: { x: 195, y: 350 },
    data: { label: 'Accessibility', category: 'core' },
    style: {
      width: 190,
      borderRadius: 18,
      border: `2px solid ${nodeColorMap.core.border}`,
      background: nodeColorMap.core.background,
      color: '#0f172a',
      fontSize: 14,
      fontWeight: 700,
      padding: 16,
      textAlign: 'center',
      boxShadow: '0 12px 30px rgba(15, 118, 110, 0.12)',
    },
  },
  {
    id: 'tooling',
    position: { x: -20, y: 350 },
    data: { label: 'Git, Tooling & Package Managers', category: 'core' },
    style: {
      width: 190,
      borderRadius: 18,
      border: `2px solid ${nodeColorMap.core.border}`,
      background: nodeColorMap.core.background,
      color: '#0f172a',
      fontSize: 14,
      fontWeight: 700,
      padding: 16,
      textAlign: 'center',
      boxShadow: '0 12px 30px rgba(15, 118, 110, 0.12)',
    },
  },
  {
    id: 'apis',
    position: { x: 300, y: 520 },
    data: { label: 'HTTP APIs & Data Fetching', category: 'delivery' },
    style: {
      width: 220,
      borderRadius: 18,
      border: `2px solid ${nodeColorMap.delivery.border}`,
      background: nodeColorMap.delivery.background,
      color: '#0f172a',
      fontSize: 14,
      fontWeight: 700,
      padding: 16,
      textAlign: 'center',
      boxShadow: '0 12px 30px rgba(124, 58, 237, 0.12)',
    },
  },
  {
    id: 'testing',
    position: { x: 550, y: 520 },
    data: { label: 'Testing & Debugging', category: 'delivery' },
    style: {
      width: 220,
      borderRadius: 18,
      border: `2px solid ${nodeColorMap.delivery.border}`,
      background: nodeColorMap.delivery.background,
      color: '#0f172a',
      fontSize: 14,
      fontWeight: 700,
      padding: 16,
      textAlign: 'center',
      boxShadow: '0 12px 30px rgba(124, 58, 237, 0.12)',
    },
  },
];

const skillEdges: Edge[] = [
  {
    id: 'role-html',
    source: 'role',
    target: 'html',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'role-css',
    source: 'role',
    target: 'css',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'role-javascript',
    source: 'role',
    target: 'javascript',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'html-accessibility',
    source: 'html',
    target: 'accessibility',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'css-accessibility',
    source: 'css',
    target: 'accessibility',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'javascript-react',
    source: 'javascript',
    target: 'react',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'javascript-typescript',
    source: 'javascript',
    target: 'typescript',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'javascript-tooling',
    source: 'javascript',
    target: 'tooling',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'react-apis',
    source: 'react',
    target: 'apis',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'typescript-testing',
    source: 'typescript',
    target: 'testing',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'tooling-testing',
    source: 'tooling',
    target: 'testing',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'accessibility-testing',
    source: 'accessibility',
    target: 'testing',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];

/**
 * Refits the read-only skill tree after desktop layout changes resize the flow surface.
 *
 * @param props Controls when the flow should recompute its viewport.
 * @returns Null because this component only synchronizes the React Flow viewport.
 */
function SkillPathViewportSync({ layoutVersion }: Required<FrontendSkillPathFlowProps>) {
  const reactFlow = useReactFlow<Node<SkillNodeData>, Edge>();

  useEffect(() => {
    // Wait until the desktop sidebar width transition settles so fitView uses
    // the final graph width instead of the intermediate animated width.
    const timeoutId = window.setTimeout(() => {
      void reactFlow.fitView(skillPathFitViewOptions);
    }, sidebarResizeTransitionMs);

    return () => window.clearTimeout(timeoutId);
  }, [layoutVersion, reactFlow]);

  return null;
}

/**
 * Renders a starter React Flow skill path for a frontend role.
 *
 * @param props Controls when the viewport should refit after layout changes.
 * @returns A read-only node graph that groups high-level frontend skills into a suggested path.
 */
export default function FrontendSkillPathFlow({
  layoutVersion = 'mobile',
}: FrontendSkillPathFlowProps) {
  return (
    <Box
      sx={{
        height: '100%',
        minHeight: 0,
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <ReactFlow
        aria-label="Suggested frontend skill path"
        nodes={skillNodes}
        edges={skillEdges}
        fitView
        fitViewOptions={skillPathFitViewOptions}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        panOnDrag
        proOptions={{ hideAttribution: true }}
      >
        <SkillPathViewportSync layoutVersion={layoutVersion} />
        <Background color="rgba(148, 163, 184, 0.2)" gap={24} />
        <Controls showInteractive={false} position="bottom-right" />
      </ReactFlow>
    </Box>
  );
}
