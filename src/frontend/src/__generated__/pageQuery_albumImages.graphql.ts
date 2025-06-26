/**
 * @generated SignedSource<<f553ecc5c561d129cc0914e7966e9a35>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type pageQuery_albumImages$data = {
  readonly id: string;
  readonly imagesConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly description: string | null | undefined;
        readonly id: string;
        readonly name: string | null | undefined;
        readonly url: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
  readonly " $fragmentType": "pageQuery_albumImages";
};
export type pageQuery_albumImages$key = {
  readonly " $data"?: pageQuery_albumImages$data;
  readonly " $fragmentSpreads": FragmentRefs<"pageQuery_albumImages">;
};

import AlbumImagesPaginationQuery_graphql from './AlbumImagesPaginationQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "imagesConnection"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 5,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [
        "node"
      ],
      "operation": AlbumImagesPaginationQuery_graphql,
      "identifierInfo": {
        "identifierField": "id",
        "identifierQueryVariableName": "id"
      }
    }
  },
  "name": "pageQuery_albumImages",
  "selections": [
    {
      "alias": "imagesConnection",
      "args": null,
      "concreteType": "GalleryAlbumImagesConnection",
      "kind": "LinkedField",
      "name": "__pageAlbums__imagesConnection_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "GalleryAlbumImagesEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "GalleryImage",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "name",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "description",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "url",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    (v1/*: any*/)
  ],
  "type": "GalleryAlbum",
  "abstractKey": null
};
})();

(node as any).hash = "cdddd91a307a40d0292c2c60cd5ff09c";

export default node;
