/**
 * @generated SignedSource<<53d6aac1c3e51ec724f14069d61f7c1d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type pageAlbumQuery$variables = {
  id: string;
};
export type pageAlbumQuery$data = {
  readonly albums: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
  } | null | undefined> | null | undefined;
};
export type pageAlbumQuery = {
  response: pageAlbumQuery$data;
  variables: pageAlbumQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "items": [
          {
            "kind": "Variable",
            "name": "ids.0",
            "variableName": "id"
          }
        ],
        "kind": "ListValue",
        "name": "ids"
      }
    ],
    "concreteType": "GalleryAlbum",
    "kind": "LinkedField",
    "name": "albums",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "pageAlbumQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "pageAlbumQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "10a2e6b4ff5755cdfde3dd427598bbad",
    "id": null,
    "metadata": {},
    "name": "pageAlbumQuery",
    "operationKind": "query",
    "text": "query pageAlbumQuery(\n  $id: ID!\n) {\n  albums(ids: [$id]) {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "18f633f0a7459541893ed8d6253306b7";

export default node;
