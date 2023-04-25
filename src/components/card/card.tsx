import React from "react";
import Image from "next/image";
import { FaCode, FaGithub, FaRegStar, FaStar } from "react-icons/fa";
import { Badge, Button, Card as MantineCard, StarIcon, Text, useMantineTheme } from "@mantine/core";

interface CardProps {
  repo: {
    id: string;
    name: string;
    description: string;
    url: string;
    language: string;
    stargazerCount: number;
    forkCount: number;
    owner: {
      login: string;
      avatarUrl: string;
    };
  };
  isStarred: boolean;
  handleStarClick: (repo: any, isStarred: boolean, isForbidden: boolean) => void;
}

const Card = ({ repo, isStarred, handleStarClick }: CardProps): JSX.Element => {
  const theme = useMantineTheme();

  return (
    <MantineCard
      shadow="lg"
      padding={20}
      //   padding={{ xs: "sm", md: "lg" }}
      radius="lg"
      withBorder
      style={{
        minWidth: "30%",
        maxWidth: "30%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "start", justifyContent: "around", marginBottom: 8 }}>
        <Image
          src={repo.owner.avatarUrl}
          alt={`${repo.owner.login} avatar`}
          width={52}
          height={52}
          //   radius="xl"
          style={{ marginRight: 8, borderRadius: "50%" }}
        />
        <div>
          <Text weight={500} size="lg" mt={4} mb={2} lineClamp={1}>
            {repo.name}
          </Text>
          <Text size="sm" color="gray" lineClamp={2}>
            {repo.description}
          </Text>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaGithub size={16} style={{ marginRight: 8 }} />
          <Text size="sm">{repo.owner.login}</Text>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {repo.language && (
            <Badge variant="light" color={theme.colors.blue[6]}>
              {repo.language}
            </Badge>
          )}
          <Text size="sm">
            <span style={{ display: "flex", alignItems: "center" }}>
              <div
                onClick={() => handleStarClick(repo, isStarred, !(repo.owner.login === process.env.NEXT_PUBLIC_OWNER))}
                style={{ cursor: "pointer" }}
              >
                {isStarred ? <FaStar style={{ marginRight: 4 }} /> : <FaRegStar style={{ marginRight: 4 }} />}
              </div>
              {repo.stargazerCount}
            </span>
          </Text>
          {repo.language && (
            <Text size="sm" style={{ marginLeft: 8 }}>
              <span style={{ display: "flex", alignItems: "center" }}>
                <FaCode style={{ marginRight: 4 }} /> {repo.forkCount}
              </span>
            </Text>
          )}
        </div>
      </div>
      <a target="_blank" href={repo.url} rel="noopener noreferrer">
        <Button variant="light" color={theme.colors.blue[6]} fullWidth>
          View on GitHub
        </Button>
      </a>
    </MantineCard>
  );
};

export default Card;
