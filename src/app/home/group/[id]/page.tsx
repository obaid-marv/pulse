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
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  };

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
        <span className={styles.text}># {group?.name}</span>
      </div>
      <div className={styles.headingContainer}>
        <h1 className={styles.heading}>
          <span className={styles.hashtag}>#</span> {group?.name}
        </h1>
        <p className={styles.description}>
          <span className={styles.mention}>@{creator?.name}</span> created this group on{" "}
          {formatDate(group?.createdAt || "")}. This is the very beginning of the {group?.name}
        </p>
      </div>
      <GroupChatSection groupData={group} />
    </div>
  );
}
