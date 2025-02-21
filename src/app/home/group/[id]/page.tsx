"use client";
import styles from "./page.module.scss";
import GroupChatSection from "@/app/components/GroupChatSection";
import useAllGroups from "@/hooks/group/useAllGroups";
import { useEffect, useState } from "react";
import { Group } from "@/types/group/Interfaces";
import { useParams } from "next/navigation";
import { User } from "@/types/auth/interfaces";
import useAllUsers from "@/hooks/user/usegetAllUsers";

export default function GroupChatPage() {
  const params = useParams();
  const groupId = Array.isArray(params.id)
    ? parseInt(params.id[0])
    : params.id
      ? parseInt(params.id)
      : null;
  const [group, setGroup] = useState<Group>();
  const [creator, setCreator] = useState<User>();
  const { data: allGroupsData, isPending, refetch } = useAllGroups();
  const { data: allUsersData } = useAllUsers();

  useEffect(() => {
    if (!allGroupsData?.success && !isPending) {
      refetch();
    }
    if (allGroupsData?.success) {
      const foundedGroup = allGroupsData.groups.find((group) => group.id == groupId);
      setGroup(foundedGroup);
      setCreator(allUsersData?.users.find((user) => user.id == foundedGroup?.createdBy));
    }
  }, [allGroupsData, refetch]);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>
          <span className={styles.hashtag}>#</span> {group?.name}
        </h1>
      </div>

      {isPending && <span>Loading ...</span>}
      {creator && <GroupChatSection groupData={group} creator={creator?.name || ""} />}
    </div>
  );
}
