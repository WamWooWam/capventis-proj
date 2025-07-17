/**
 * @generated SignedSource<<ebbcc6babf9ba5a9dc4e3ef42a89541b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type authGetUserQuery$variables = Record<PropertyKey, never>;
export type authGetUserQuery$data = {
  readonly user: {
    readonly id: string;
    readonly name: string;
  } | null | undefined;
};
export type authGetUserQuery = {
  response: authGetUserQuery$data;
  variables: authGetUserQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "GalleryUser",
    "kind": "LinkedField",
    "name": "user",
    "plural": false,
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "authGetUserQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "authGetUserQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "f9840343cb455f35faa3b94e61cf5909",
    "id": null,
    "metadata": {},
    "name": "authGetUserQuery",
    "operationKind": "query",
    "text": "query authGetUserQuery {\n  user {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "ae6448c4adc5aa80453beb9689b76aee";

export default node;
