import React, { useEffect, useState } from "react";
import Head from "next/head";

import { client } from "@/lib/apollo-client";
import { useMutation, useQuery } from "@apollo/client";
import Card from "@/components/card/card";
import { ADD_STAR_MUTATION, GET_REPOSITORIES, REMOVE_STAR_MUTATION } from "@/lib/endpoints";

interface Props {
  repos: any[];
  starredRepos: any[];
}

export default function Home({ repos, starredRepos }: Props): JSX.Element {
  const [reposLocal, setReposLocal] = useState(repos);
  const [starredReposLocal, setStarredReposLocal] = useState(starredRepos);
  const { loading, error, data, refetch } = useQuery(GET_REPOSITORIES);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (data) {
      setReposLocal(data.user.repositories.edges.map((edge: any) => edge.node));
      setStarredReposLocal(data.user.starredRepositories.nodes);
    }
  }, [loading, data]);

  const [addStar] = useMutation(ADD_STAR_MUTATION, {
    onError: (err) => {
      // Rollback optimistic update on error
      setStarredReposLocal((prev) => prev.slice(0, -1));
    },
    onCompleted: () => {
      refetch();
    },
  });

  const [removeStar] = useMutation(REMOVE_STAR_MUTATION, {
    onError: (err) => {
      // Rollback optimistic update on error
      setStarredReposLocal((prev) => prev.slice(0, -1));
    },
    onCompleted: () => {
      refetch();
    },
  });

  const handleStarClick = (repo: any, isStarred: boolean, isForbidden: boolean) => {
    if (isForbidden) {
      alert("Only owned repositories can be starred/unstarred. Try a repository owned by theYoungWolf.");
      return;
    }
    if (isStarred) {
      removeStar({
        variables: {
          repositoryId: repo.id,
          clientMutationId: {},
        },
      });
    } else {
      addStar({
        variables: {
          repositoryId: repo.id,
          clientMutationId: {},
        },
      });
    }
  };
  return (
    <>
      <Head>
        <title>Dikurium demo</title>
        <meta name="description" content="Dikurium app demonstrating Github API integration" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <div>
              <h1>Starred repositories</h1>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16, maxWidth: 1200, margin: 20 }}>
                {starredReposLocal.map((repo) => (
                  <Card key={repo.id} repo={repo} isStarred handleStarClick={handleStarClick} />
                ))}
              </div>
            </div>
            <div>
              <h1>All repositories</h1>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16, maxWidth: 1200, margin: 20 }}>
                {reposLocal.map((repo) => (
                  <Card key={repo.id} repo={repo} isStarred={!!repo.stargazerCount} handleStarClick={handleStarClick} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_REPOSITORIES,
  });

  const repositories = data.user.repositories.edges.map((edge: any) => edge.node);
  const starredRepositories = data.user.starredRepositories.nodes;
  return {
    props: {
      repos: repositories,
      starredRepos: starredRepositories,
    },
  };
}
