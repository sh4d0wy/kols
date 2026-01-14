import { useQuery } from "@tanstack/react-query";
import { formatUnits, parseUnits, ZeroAddress } from "ethers";
import { use7KolsContract } from "@/hooks/use7KolsContract";
import type { LevelRevenue, TreeNode } from "@/types/7kols/downlineData";
import type { Contract } from "ethers";

// Helper function to build tree recursively
async function buildRealTreeAllLevels(contract: Contract, startAddress: string, maxDepth = 6) {
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
  const { readContract: contract } = use7KolsContract();

  const getTotalDownlineCount = (userAddress: string) => {
    return useQuery({
      queryKey: ["totalDownlineCount", userAddress],
      queryFn: async () => {
        if (!userAddress || !contract) return 0;
        try {
          // downlineCount is at index 5 in the users struct
          const userInfo = await contract.users(userAddress);
          const downlineCount = userInfo[5];
          console.log("downlineCount from users():", downlineCount);
          return Number(downlineCount);
        } catch (error) {
          console.error("Error fetching downlineCount:", error);
          return 0;
        }
      },
      enabled: !!contract && !!userAddress,
      staleTime: 30000,
    });
  };

  const getDownlineTree = (userAddress: string) => {
    return useQuery({
      queryKey: ["downlineTree", userAddress],
      queryFn: async () => {
        if (!userAddress || !contract) return null;
        const result = await buildRealTreeAllLevels(contract, userAddress, 6);
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
      enabled: !!contract && !!userAddress,
      staleTime: 60000,
    });
  };

  const getLevelRevenue = (
    userAddress: string,
    level: number,
    levelAddresses: string[]
  ) => {
    return useQuery({
      queryKey: ["levelRevenue", userAddress, level, levelAddresses.length],
      queryFn: async () => {
        if (!userAddress || !levelAddresses.length || !contract) {
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

            // userInfo[6] is the 'registered' boolean
            if (userInfo[6]) {
              activeCount++;
            }

            // userInfo[1] is 'totalDeposited'
            const deposits = BigInt(userInfo[1]);
            const depositUnit = parseUnits("7", 18);
            const timesDeposited = deposits / depositUnit;
            const revenueFromThis = timesDeposited * parseUnits("1", 18);

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
  ) => {
    return useQuery({
      queryKey: ["allLevelsRevenue", userAddress],
      queryFn: async () => {
        if (!userAddress || !levelMap || !contract) return {};

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

          for (const member of levelAddresses) {
            try {
              const userInfo = await contract.users(member.addr);
              if (userInfo[6]) activeCount++;
              const deposits = BigInt(userInfo[1]);
              const depositUnit = parseUnits("7", 18);
              const timesDeposited = deposits / depositUnit;
              const revenueFromThis = timesDeposited * parseUnits("1", 18);
              totalRevenue = totalRevenue + revenueFromThis;
            } catch (e) {
              console.error("Error fetching user data:", member.addr, e);
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
      enabled: !!contract && !!userAddress && !!levelMap,
      staleTime: 60000,
    });
  };

  return {
    getTotalDownlineCount,
    getDownlineTree,
    getLevelRevenue,
    getAllLevelsRevenue,
    contract, // expose contract for debugging
  };
};
