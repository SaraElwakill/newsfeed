import * as React from "react";
import { graphql } from "relay-runtime";
import type { ImageFragment$key } from "./__generated__/ImageFragment.graphql";
import { useFragment } from "react-relay";
const ImageFragment = graphql`
  fragment ImageFragment on Image {
    url(width: 50, height: 50)
  }
`;
type Props = {
  image: ImageFragment$key;
  // width?: number;
  // height?: number;
  className?: string;
};

export default function Image({ image, className }: Props): React.ReactElement {
  const data = useFragment(ImageFragment, image);
  console.log(data);

  if (image == null) {
    return null;
  }
  return <img key={data.url} src={data.url} className={className} />;
}
