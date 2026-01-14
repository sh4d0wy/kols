export interface TreeNode {
    addr: string;
    depth: number;
    children: TreeNode[];
}
export interface LevelRevenue {
    level: number;
    activeMembers: number;
    totalMembers: number;
    totalRevenue: string;
    averagePerMember: string;
}