import * as React from "react";
import Story from "./Story";
import { FragmentRefs, graphql } from "relay-runtime";
import { useLazyLoadQuery, usePaginationFragment } from "react-relay";
import type { NewsfeedQuery as NewsfeedQueryType } from "./__generated__/NewsfeedQuery.graphql";
import InfiniteScrollTrigger from "./InfiniteScrollTrigger";
import type { NewsfeedContentsFragment$data } from "./__generated__/NewsfeedContentsFragment.graphql";
// import type { NewsfeedContentsRefetchQuery$key } from "./__generated__/NewsfeedContentsRefetchQuery.graphql";
import type {
  StoryFragment$data,
  StoryFragment$key,
} from "./__generated__/StoryFragment.graphql";

const NewsfeedQuery = graphql`
  query NewsfeedQuery {
    ...NewsfeedContentsFragment
  }
`;
const NewsfeedContentsFragment = graphql`
  fragment NewsfeedContentsFragment on Query
  @refetchable(queryName: "NewsfeedContentsRefetchQuery")
  @argumentDefinitions(
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 3 }
  ) {
    viewer {
      newsfeedStories(after: $cursor, first: $count)
        @connection(key: "NewsfeedContentsFragment_newsfeedStories") {
        edges {
          node {
            id
            ...StoryFragment
          }
        }
      }
    }
  }
`;
type story = {
  node: StoryFragment$key & { id: string };
};

export default function Newsfeed() {
  const queryData = useLazyLoadQuery<NewsfeedQueryType>(NewsfeedQuery, {});

  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment(
    NewsfeedContentsFragment,
    queryData
  );

  const mydata = data as NewsfeedContentsFragment$data;
  const stories = mydata.viewer.newsfeedStories.edges;

  function onEndReached() {
    loadNext(3);
  }

  return (
    <div className="newsfeed">
      {stories.map((story: story) => (
        <Story key={story.node.id} story={story.node} />
      ))}
      <InfiniteScrollTrigger
        onEndReached={onEndReached}
        hasNext={hasNext}
        isLoadingNext={isLoadingNext}
      />
    </div>
  );
}
