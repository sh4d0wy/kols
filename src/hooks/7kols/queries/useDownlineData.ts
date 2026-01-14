import { useQuery } from "@tanstack/react-query";
import { formatUnits, parseUnits } from "ethers";
import { use7KolsContract } from "@/hooks/use7KolsContract";
import { ZeroAddress } from "ethers";
import type { LevelRevenue, TreeNode } from "@/types/7kols/downlineData";

async function buildRealTreeAllLevels(startAddress: string, maxDepth = 6) {
  const { readContract: contract } = use7KolsContract();
  if (!contract) return null;
  const root: TreeNode = { addr: startAddress, depth: 0, children: [] };
  const lm: Record<number, TreeNode[]> = {
    0: [root],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  };
  const visited = new Set([startAddress.toLowerCase()]);
  const queue = [root];

  while (queue.length) {
    const node = queue.shift();
    if (node?.depth && node?.depth >= maxDepth) continue;

    let directs = [];
    try {
      directs = await contract.getDirectReferrals(node?.addr);
    } catch (e) {
      console.error("getDirectReferrals error for", node?.addr, e);
      continue;
    }

    for (const addr of directs) {
      if (!addr || addr === ZeroAddress) continue;
      const k = addr.toLowerCase();
      if (visited.has(k)) continue;
      visited.add(k);

      const child: TreeNode = {
        addr,
        depth: node?.depth ? node?.depth + 1 : 1,
        children: [],
      };
      node?.children?.push(child);
      if (lm[child?.depth as keyof typeof lm])
        lm[child?.depth as keyof typeof lm]?.push(child);
      queue.push(child);
    }
  }
  return { root, lm };
}

export const useDownlineData = () => {
  const getTotalDownlineCount = (userAddress: string) => {
    const { readContract: contract } = use7KolsContract();
    if (!contract) return null;
    return useQuery({
      queryKey: ["totalDownlineCount", userAddress],
      queryFn: async () => {
        if (!userAddress) return 0;
        const count = await contract.getDownlineCount(userAddress);
        return Number(count);
      },
      enabled: !!contract && !!userAddress,
      staleTime: 30000,
    });
  };

  const getDownlineTree = (userAddress: string, enabled = false) => {
    const { readContract: contract } = use7KolsContract();
    if (!contract) return null;
    return useQuery({
      queryKey: ["downlineTree", userAddress],
      queryFn: async () => {
        if (!userAddress) return null;
        const result = await buildRealTreeAllLevels(userAddress, 6);
        if (!result) return null;
        const { root, lm } = result;

        return {
          root,
          levelMap: lm,
          levelCounts: {
            1: lm[1]?.length || 0,
            2: lm[2]?.length || 0,
            3: lm[3]?.length || 0,
            4: lm[4]?.length || 0,
            5: lm[5]?.length || 0,
            6: lm[6]?.length || 0,
          },
        };
      },
      enabled: enabled && !!contract && !!userAddress,
      staleTime: 60000,
    });
  };

  const getLevelRevenue = (
    userAddress: string,
    level: number,
    levelAddresses: string[]
  ) => {
    const { readContract: contract } = use7KolsContract();
    if (!contract) return null;
    return useQuery({
      queryKey: ["levelRevenue", userAddress, level, levelAddresses.length],
      queryFn: async () => {
        if (!userAddress || !levelAddresses.length) {
          return {
            level,
            activeMembers: 0,
            totalRevenue: "0",
            averagePerMember: "0",
          };
        }

        let totalRevenue = BigInt(0);
        let activeCount = 0;

        for (const memberAddress of levelAddresses) {
          try {
            const userInfo = await contract.users(memberAddress);

            if (userInfo.registered) {
              activeCount++;
            }

            const deposits = userInfo.totalDeposited;
            const timesDeposited = deposits.div(parseUnits("7", 18));
            const revenueFromThis = timesDeposited.mul(parseUnits("1", 18));

            totalRevenue = totalRevenue + revenueFromThis;
          } catch (e) {
            console.error("Error fetching user data:", memberAddress, e);
          }
        }

        const averagePerMember =
          activeCount > 0 ? totalRevenue / BigInt(activeCount) : BigInt(0);

        return {
          level,
          activeMembers: activeCount,
          totalMembers: levelAddresses.length,
          totalRevenue: formatUnits(totalRevenue, 18),
          averagePerMember: formatUnits(averagePerMember, 18),
        };
      },
      enabled:
        !!contract &&
        !!userAddress &&
        !!levelAddresses &&
        levelAddresses.length > 0,
      staleTime: 30000,
    });
  };

  const getAllLevelsRevenue = (
    userAddress: string,
    levelMap: Record<number, TreeNode[]>,
    enabled = false
  ) => {
    const { readContract: contract } = use7KolsContract();
    if (!contract) return null;
    return useQuery({
      queryKey: ["allLevelsRevenue", userAddress, enabled],
      queryFn: async () => {
        if (!userAddress || !levelMap) return {};

        const results: Record<number, LevelRevenue> = {};

        for (let level = 1; level <= 6; level++) {
          const levelAddresses = levelMap[level] || [];

          if (levelAddresses.length === 0) {
            results[level] = {
              level,
              activeMembers: 0,
              totalMembers: 0,
              totalRevenue: "0",
              averagePerMember: "0",
            };
            continue;
          }

          let totalRevenue = BigInt(0);
          let activeCount = 0;

          for (const memberAddress of levelAddresses) {
            try {
              const userInfo = await contract.users(memberAddress.addr);
              if (userInfo[6]) activeCount++;
              const deposits = userInfo[1];
              const timesDeposited = deposits.div(parseUnits("7", 18));
              const revenueFromThis = timesDeposited.mul(parseUnits("1", 18));
              totalRevenue = totalRevenue + revenueFromThis;
            } catch (e) {
              console.error("Error fetching user data:", memberAddress, e);
            }
          }

          const averagePerMember =
            activeCount > 0 ? totalRevenue / BigInt(activeCount) : BigInt(0);

          results[level] = {
            level,
            activeMembers: activeCount,
            totalMembers: levelAddresses.length,
            totalRevenue: formatUnits(totalRevenue, 18),
            averagePerMember: formatUnits(averagePerMember, 18),
          };
        }

        return results;
      },
      enabled: enabled && !!contract && !!userAddress && !!levelMap,
      staleTime: 60000,
    });
  };
  return {
    getTotalDownlineCount,
    getDownlineTree,
    getLevelRevenue,
    getAllLevelsRevenue,
  };
};
