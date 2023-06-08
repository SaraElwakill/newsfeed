/**
 * @generated SignedSource<<81ce7d63eb4622fbb74b92ae1329579e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ImageFragment$data = {
  readonly url: string;
  readonly " $fragmentType": "ImageFragment";
};
export type ImageFragment$key = {
  readonly " $data"?: ImageFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ImageFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ImageFragment",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "height",
          "value": 50
        },
        {
          "kind": "Literal",
          "name": "width",
          "value": 50
        }
      ],
      "kind": "ScalarField",
      "name": "url",
      "storageKey": "url(height:50,width:50)"
    }
  ],
  "type": "Image",
  "abstractKey": null
};

(node as any).hash = "33ca1bade00ba28bc5a0951ce52b8118";

export default node;
