/**
 * @generated SignedSource<<4b77b01ec77e9fc04b30dc9df2d9d2de>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TimestampFragment$data = {
  readonly createdAt: string;
  readonly " $fragmentType": "TimestampFragment";
};
export type TimestampFragment$key = {
  readonly " $data"?: TimestampFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"TimestampFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TimestampFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAt",
      "storageKey": null
    }
  ],
  "type": "Story",
  "abstractKey": null
};

(node as any).hash = "76a088a95dd0f45a09f0e158c0f1199e";

export default node;
