import React, { useState, useMemo, useCallback } from 'react'
import { Card } from '../ui'
import { useDownlineData } from '@/hooks/7kols/queries/useDownlineData'
import { useConnection } from 'wagmi'
import type { TreeNode } from '@/types/7kols/downlineData'

const levels = [
  { id: 1, label: 'L1' },
  { id: 2, label: 'L2' },
  { id: 3, label: 'L3' },
  { id: 4, label: 'L4' },
  { id: 5, label: 'L5' },
  { id: 6, label: 'L6' },
]

const countDescendants = (node: TreeNode): number => {
  if (!node.children || node.children.length === 0) return 0
  return node.children.reduce((sum, child) => sum + 1 + countDescendants(child), 0)
}

interface TreeNodeRowProps {
  node: TreeNode
  isExpanded: boolean
  onToggle: () => void
  hasChildren: boolean
}

const TreeNodeRow: React.FC<TreeNodeRowProps> = ({ 
  node, 
  isExpanded, 
  onToggle, 
  hasChildren
}) => {
  const descendantCount = countDescendants(node)
  
  return (
    <div className="flex my-3 items-center gap-3 py-2 border-2 border-[#00FFD1]/10 rounded-lg p-4 bg-[#00FFD1]/5">
      {/* Expand/collapse button */}
      <button 
        onClick={onToggle}
        className={`w-6 h-6 rounded flex items-center justify-center transition-all ${
          hasChildren 
            ? 'bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#00FFD1]/50 text-gray-400 hover:text-[#00FFD1] cursor-pointer' 
            : 'text-transparent cursor-default'
        }`}
        disabled={!hasChildren}
      >
        {hasChildren && (
          <svg 
            width="12" 
            height="12" 
            viewBox="0 0 12 12" 
            fill="none" 
            className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          >
            <path 
              d="M3 4.5L6 7.5L9 4.5" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
      
      {/* Level badge */}
      <div className="w-9 h-9 rounded-lg bg-primary-gradient flex items-center justify-center ">
        <span className="text-[#0d0d0d] font-bold text-sm">L{node.depth}</span>
      </div>
      
      {/* Address */}
      <div className="flex-1 font-mono text-sm text-gray-300 tracking-wide">
        {node.addr}
      </div>
      
      {/* Downline count badge */}
      <div className="px-4 py-1.5 rounded-lg border border-[#00FFD1]/40 bg-[#00FFD1]/10">
        <span className="text-[#00FFD1] font-medium text-sm">
          Downline {node.depth===6?'-':`${descendantCount}`}
        </span>
      </div>
    </div>
  )
}

interface TreeBranchProps {
  node: TreeNode
  nodeId: string
  expandedNodes: Set<string>
  toggleNode: (nodeId: string) => void
}

const TreeBranch: React.FC<TreeBranchProps> = ({ 
  node, 
  nodeId,
  expandedNodes, 
  toggleNode,
}) => {
  const isExpanded = expandedNodes.has(nodeId)
  const hasChildren = node.children && node.children.length > 0
  const indentLevel = node.depth
  
  return (
    <div className="relative">
      {/* Horizontal connector to node
      {node.depth > 0 && (
        <div 
          className="absolute top-5 h-px bg-cyan-500"
          style={{ 
            left: `${15 + (indentLevel - 1) * 40}px`,
            width: '25px'
          }}
        />
      )} */}
      
      {/* Node content with indentation */}
      <div style={{ marginLeft: `${indentLevel * 40}px` }}>
        <TreeNodeRow 
          node={node}
          isExpanded={isExpanded}
          onToggle={() => toggleNode(nodeId)}
          hasChildren={hasChildren}
        />
      </div>
      
      {hasChildren && isExpanded && (
        <div className="relative">
          {/* Vertical line connecting children */}
          <div 
            className="absolute border-dashed border border-[#00FFD1]/50 "
            style={{ 
              left: `${15 + indentLevel * 40}px`,
              top: 0,
              bottom: 0
            }}
          />
          {node.children.map((child, index) => (
            <TreeBranch
              key={`${nodeId}-${index}`}
              node={child}
              nodeId={`${nodeId}-${index}`}
              expandedNodes={expandedNodes}
              toggleNode={toggleNode}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const collectNodesAtDepth = (node: TreeNode, targetDepth: number): TreeNode[] => {
  const result: TreeNode[] = []
  const traverse = (n: TreeNode) => {
    if (n.depth === targetDepth) {
      result.push(n)
    }
    n.children?.forEach(traverse)
  }
  traverse(node)
  return result
}

export const DownlineSummary: React.FC = () => {
  const [viewMode, setViewMode] = useState<'realtime' | 'demo'>('demo')
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const [isCardExpanded, setIsCardExpanded] = useState(true)
  const connection = useConnection() 
  const userAddress = connection.address ?? ''
  
  const { getTotalDownlineCount, getDownlineTree } = useDownlineData()
  
  const totalDownlineQuery = getTotalDownlineCount(userAddress)
  const downlineTreeQuery = getDownlineTree(userAddress)

  const totalDownlineCount = totalDownlineQuery.data ?? 0
  const levelCounts: Record<number, number> = downlineTreeQuery.data?.levelCounts ?? {}
  const treeRoot = downlineTreeQuery.data?.root

  const generateDemoAddress = (seed: number) => {
    const chars = '0123456789ABCDEFabcdef'
    let addr = '0x'
    for (let i = 0; i < 40; i++) {
      addr += chars[(seed * (i + 1) * 7) % chars.length]
    }
    return addr
  }

  const demoTree: TreeNode = useMemo(() => {
    const createChildren = (depth: number, parentSeed: number, count: number): TreeNode[] => {
      if (depth > 6) return []
      return Array.from({ length: count }, (_, i) => {
        const seed = parentSeed * 10 + i + 1
        const childCount = depth < 6 ? Math.max(1, Math.floor(Math.random() * 3) + 1) : 0
        return {
          addr: generateDemoAddress(seed),
          depth,
          children: createChildren(depth + 1, seed, childCount)
        }
      })
    }

    return {
      addr: '0x09Bd4ACB98A9D90263526l6760F07dAb430e6foC3',
      depth: 0,
      children: [
        {
          addr: generateDemoAddress(1),
          depth: 1,
          children: [
            { addr: generateDemoAddress(11), depth: 2, children: [
              { addr: generateDemoAddress(111), depth: 3, children: [
                { addr: generateDemoAddress(1111), depth: 4, children: [
                  { addr: generateDemoAddress(11111), depth: 5, children: [
                    { addr: generateDemoAddress(111111), depth: 6, children: [] }
                  ]}
                ]},
                { addr: generateDemoAddress(1112), depth: 4, children: [] }
              ]},
              { addr: generateDemoAddress(112), depth: 3, children: [] }
            ]},
            { addr: generateDemoAddress(12), depth: 2, children: [
              { addr: generateDemoAddress(121), depth: 3, children: [] }
            ]}
          ]
        },
        {
          addr: generateDemoAddress(2),
          depth: 1,
          children: [
            { addr: generateDemoAddress(21), depth: 2, children: [
              { addr: generateDemoAddress(211), depth: 3, children: [
                { addr: generateDemoAddress(2111), depth: 4, children: [
                  { addr: generateDemoAddress(21111), depth: 5, children: [
                    { addr: generateDemoAddress(211111), depth: 6, children: [] }
                  ]}
                ]}
              ]}
            ]},
            { addr: generateDemoAddress(22), depth: 2, children: [] }
          ]
        },
        {
          addr: generateDemoAddress(3),
          depth: 1,
          children: [
            { addr: generateDemoAddress(31), depth: 2, children: [] },
            { addr: generateDemoAddress(32), depth: 2, children: [
              { addr: generateDemoAddress(321), depth: 3, children: [
                { addr: generateDemoAddress(3211), depth: 4, children: [] }
              ]}
            ]}
          ]
        }
      ]
    }
  }, [])

  const displayTree = viewMode === 'demo' ? demoTree : treeRoot

  const demoLevelCounts = useMemo(() => {
    if (!demoTree) return [0, 0, 0, 0, 0, 0]
    return levels.map(level => collectNodesAtDepth(demoTree, level.id).length)
  }, [demoTree])

  const toggleNode = useCallback((nodeId: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev)
      if (next.has(nodeId)) {
        next.delete(nodeId)
      } else {
        next.add(nodeId)
      }
      return next
    })
  }, [])

  const expandAll = useCallback(() => {
    if (!displayTree) return
    const allNodeIds = new Set<string>()
    const collectNodeIds = (node: TreeNode, parentId: string) => {
      allNodeIds.add(parentId)
      node.children?.forEach((child, index) => {
        collectNodeIds(child, `${parentId}-${index}`)
      })
    }
    collectNodeIds(displayTree, 'root')
    setExpandedNodes(allNodeIds)
  }, [displayTree])

  const collapseAll = useCallback(() => {
    setExpandedNodes(new Set())
  }, [])

  const handleRefresh = () => {
    downlineTreeQuery.refetch()
  }

  const isLoading = useMemo(() => {
    return downlineTreeQuery.isFetching || downlineTreeQuery.isLoading
  }, [downlineTreeQuery])

  return (
    <Card className="p-6">
      {/* Header */}
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsCardExpanded(!isCardExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L12 8" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 8L4 14" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 8L20 14" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="2" r="2" fill="#22D3EE"/>
              <circle cx="4" cy="16" r="3" stroke="#22D3EE" strokeWidth="2"/>
              <circle cx="20" cy="16" r="3" stroke="#22D3EE" strokeWidth="2"/>
              <circle cx="12" cy="22" r="2" fill="#22D3EE"/>
              <path d="M4 19L4 22L12 22" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round"/>
              <path d="M20 19L20 22L12 22" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">Downline (My Network)</h3>
            <p className="text-gray-500 text-sm">Your referral tree and network structure</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none"
            className={`transition-transform duration-200 ${isCardExpanded ? '' : 'rotate-180'}`}
          >
            <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {isCardExpanded && (
        <>
      {/* Downline Summary */}
      <div className="mt-4 mb-4">
        <h4 className="text-white font-semibold mb-1">Downline Summary</h4>
        <p className="text-gray-500 text-sm">
          Total downline {viewMode === 'demo' ? '(demo)' : ''}: <span className="text-[#00FFD1] font-semibold">{viewMode === 'demo' ? demoLevelCounts.reduce((a, b) => a + b, 0) : totalDownlineCount}</span>
        </p>
      </div>

      {/* Level pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {levels.map((level) => (
          <div
            key={level.id}
            className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#1a1a1a] text-gray-400 border border-[#2a2a2a]"
          >
            {level.label}: {viewMode === 'demo' ? demoLevelCounts[level.id - 1] : (levelCounts[level.id] ?? 0)}
          </div>
        ))}
      </div>

      {/* View mode toggle */}
      <div className="flex gap-3 mb-6">
        <button 
          onClick={() => setViewMode('realtime')}
          className={`flex-1 py-3 px-4 rounded-full text-sm font-medium transition-all ${
            viewMode === 'realtime'
              ? 'bg-primary-gradient text-[#0D0D0D]'
              : 'bg-[#1a1a1a] border border-[#2a2a2a] text-gray-400 hover:text-white'
          }`}
        >
          Real Time (contract)
        </button>
        <button 
          onClick={() => setViewMode('demo')}
          className={`flex-1 py-3 px-4 rounded-full text-sm font-medium transition-all ${
            viewMode === 'demo'
              ? 'bg-primary-gradient text-[#0D0D0D]'
              : 'bg-[#1a1a1a] border border-[#2a2a2a] text-gray-400 hover:text-white'
          }`}
        >
          Demo Tree (mock)
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <button 
          onClick={expandAll}
          className="px-3 py-1.5 text-xs font-medium text-[#00FFD1] hover:text-[#00FFD1] transition-colors"
        >
          Expand All
        </button>
        <button 
          onClick={collapseAll}
          className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors"
        >
          Collapse All
        </button>
        {viewMode === 'realtime' && (
          <button 
            onClick={handleRefresh}
            disabled={isLoading}
            className="ml-auto px-3 py-1.5 text-xs font-medium text-[#00FFD1] hover:text-[#00FFD1] transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : 'Refresh'}
          </button>
        )}
      </div>

      {/* Tree view */}
      {isLoading && viewMode === 'realtime' ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00FFD1]"></div>
        </div>
      ) : (
        <div className="bg-[#00FFD1]/3 rounded-xl p-4 overflow-x-auto">
          {displayTree ? (
            <div className="min-w-fit">
              <TreeBranch 
                node={displayTree}
                nodeId="root"
                expandedNodes={expandedNodes}
                toggleNode={toggleNode}
              />
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              {viewMode === 'realtime' 
                ? 'Connect your wallet to view your downline tree'
                : 'No tree data available'
              }
            </div>
          )}
        </div>
      )}
        </>
      )}
    </Card>
  )
}
