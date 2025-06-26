/**
 * @generated SignedSource<<ac91408c48559989ea9143e3defce773>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type pageAlbumsViewQuery$variables = Record<PropertyKey, never>;
export type pageAlbumsViewQuery$data = {
  readonly albums: ReadonlyArray<{
    readonly id: string;
    readonly imagesConnection: {
      readonly images: ReadonlyArray<{
        readonly description: string | null | undefined;
        readonly height: number;
        readonly name: string | null | undefined;
        readonly url: string;
        readonly width: number;
      } | null | undefined> | null | undefined;
    };
    readonly name: string;
  } | null | undefined> | null | undefined;
};
export type pageAlbumsViewQuery = {
  response: pageAlbumsViewQuery$data;
  variables: pageAlbumsViewQuery$variables;
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
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "pageAlbumsViewQuery",
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
                  (v6/*: any*/)
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
    "name": "pageAlbumsViewQuery",
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
    "cacheID": "d451f41eb466c1c07279cb4344c4dc63",
    "id": null,
    "metadata": {},
    "name": "pageAlbumsViewQuery",
    "operationKind": "query",
    "text": "query pageAlbumsViewQuery {\n  albums {\n    id\n    name\n    imagesConnection(first: 8) {\n      images {\n        name\n        description\n        width\n        height\n        url\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b0d0ad5e13b07ad590354292c546c3d4";

export default node;
