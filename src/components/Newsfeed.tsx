import * as React from "react";
import Story from "./Story";
import { graphql } from "relay-runtime";
import { useLazyLoadQuery, usePaginationFragment } from "react-relay";
import type { NewsfeedQuery as NewsfeedQueryType } from "./__generated__/NewsfeedQuery.graphql";
import InfiniteScrollTrigger from "./InfiniteScrollTrigger";
import type { NewsfeedContentsFragment$key } from "./__generated__/NewsfeedContentsFragment.graphql";
const NewsfeedQuery = graphql`
  query NewsfeedQuery {
    viewer {
      ...NewsfeedContentsFragment
    }
  }
`;
const NewsfeedContentsFragment = graphql`
  fragment NewsfeedContentsFragment on Viewer
  @refetchable(queryName: "NewsfeedContentsRefetchQuery")
  @argumentDefinitions(
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 3 }
  ) {
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
`;

// const Props = {
//   viewr{
//     newsfeedStories: NewsfeedContentsFragment$key,
//   }
// };

export default function Newsfeed() {
  const data = useLazyLoadQuery<NewsfeedQueryType>(NewsfeedQuery, {});
  console.log(data);

  const viewerObj = data.viewer;

  console.log(viewerObj);

  const {
    data: newData,
    loadNext,
    hasNext,
    isLoadingNext,
  } = usePaginationFragment(NewsfeedContentsFragment, viewerObj);
  const stories: { newsfeedStories: NewsfeedContentsFragment$key } =
    newData.newsfeedStories.edges;
  console.log(newData.newsfeedStories.edges);

  // const stories = newData.newsfeedStories.edges;
  function onEndReached() {
    loadNext(3);
  }
  return (
    <div className="newsfeed">
      {stories.map((story: any) => (
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
