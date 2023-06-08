import * as React from "react";
import Card from "./Card";
import Heading from "./Heading";
import PosterByline, { type Props as PosterBylineProps } from "./PosterByline";
import StorySummary from "./StorySummary";
import Image from "./Image";
import { graphql } from "relay-runtime";
import { useFragment } from "react-relay";
import type { StoryFragment$key } from "./__generated__/StoryFragment.graphql";
import Timestamp from "./Timestamp";
const StoryFragment = graphql`
  fragment StoryFragment on Story {
    createdAt
    title
    summary
    poster {
      ...PosterBylineFragment
    }
    thumbnail {
      ...ImageFragment
    }
  }
`;

type Props = {
  story: StoryFragment$key;
};

export default function Story({ story }: Props): React.ReactElement {
  const [show, SetShow] = React.useState(false);
  const data = useFragment(StoryFragment, story);
  console.log(data);
  const showModal = () => SetShow(!show);
  console.log(show);

  return (
    <Card>
      <PosterByline poster={data.poster} />
      <Heading>{data.title}</Heading>
      <Timestamp time={data.createdAt} />
      <Image image={data.thumbnail} className="thumbnail__image" />
      <StorySummary summary={data.summary} />
      <button onClick={showModal}>{show ? "Hide" : "Show"}</button>
      {show && <Image image={data.thumbnail} className="thumbnail__image" />}
    </Card>
  );
}
// width={400} height={400}
