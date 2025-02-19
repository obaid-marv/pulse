"use client";
import { useEffect, useState } from "react";
import Label from "../Label";
import styles from "./GroupDropdown.module.scss";
import useAllGroups from "@/hooks/group/useAllGroups";
import { Group } from "@/types/group/Interfaces";
import { useParams, usePathname } from "next/navigation";

export default function GroupDropdown() {
  const [groups, setGroups] = useState<Group[]>([]);
  const pathname = usePathname();
  const params = useParams();
  const { data: allGroupsData, refetch, isPending } = useAllGroups();

  const checkActive = (id: number) => {
    if (pathname.includes("/home/group")) {
      if (id.toString() == params.id) return true;
    }
    return false;
  };

  useEffect(() => {
    if (!allGroupsData?.success && !isPending) {
      refetch();
    }
    if (allGroupsData?.success) {
      setGroups(allGroupsData?.groups || []);
    }
  }, [allGroupsData, refetch]);
  return (
    <div className={styles.container}>
      {isPending && <span>Loading...</span>}
      {!isPending && groups.length == 0 && <span>No groups exist!</span>}
      {groups.length > 0 &&
        groups.map((group) => (
          <Label
            id={group.id}
            key={group.id}
            type="group"
            name={group.name}
            isActive={checkActive(group.id)}
          />
        ))}
    </div>
  );
}
