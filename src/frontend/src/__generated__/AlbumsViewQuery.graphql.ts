/**
 * @generated SignedSource<<306351263d04ef5d0830953e5a71b1c6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type AlbumsViewQuery$variables = Record<PropertyKey, never>;
export type AlbumsViewQuery$data = {
  readonly albums: ReadonlyArray<{
    readonly id: string;
    readonly imagesConnection: {
      readonly images: ReadonlyArray<{
        readonly description: string | null | undefined;
        readonly height: number;
        readonly name: string | null | undefined;
        readonly thumbUrl: string;
        readonly url: string;
        readonly width: number;
      } | null | undefined> | null | undefined;
    };
    readonly name: string;
  } | null | undefined> | null | undefined;
};
export type AlbumsViewQuery = {
  response: AlbumsViewQuery$data;
  variables: AlbumsViewQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 8
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "thumbUrl",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AlbumsViewQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GalleryAlbum",
        "kind": "LinkedField",
        "name": "albums",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "GalleryAlbumImagesConnection",
            "kind": "LinkedField",
            "name": "imagesConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GalleryImage",
                "kind": "LinkedField",
                "name": "images",
                "plural": true,
                "selections": [
                  (v1/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "imagesConnection(first:8)"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AlbumsViewQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GalleryAlbum",
        "kind": "LinkedField",
        "name": "albums",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "GalleryAlbumImagesConnection",
            "kind": "LinkedField",
            "name": "imagesConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GalleryImage",
                "kind": "LinkedField",
                "name": "images",
                "plural": true,
                "selections": [
                  (v1/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v0/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "imagesConnection(first:8)"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "43edc7a1178b8e7fa0f4074c8a40ca26",
    "id": null,
    "metadata": {},
    "name": "AlbumsViewQuery",
    "operationKind": "query",
    "text": "query AlbumsViewQuery {\n  albums {\n    id\n    name\n    imagesConnection(first: 8) {\n      images {\n        name\n        description\n        width\n        height\n        url\n        thumbUrl\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e3cb6a84b8292227970699319a9a1dac";

export default node;
