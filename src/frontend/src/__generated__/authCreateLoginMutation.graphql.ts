/**
 * @generated SignedSource<<b43d0ee25039928f71c0e11df5c12918>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type GalleryCreateLoginInput = {
  email: string;
  password: string;
};
export type authCreateLoginMutation$variables = {
  input: GalleryCreateLoginInput;
};
export type authCreateLoginMutation$data = {
  readonly createLogin: {
    readonly token: string | null | undefined;
  } | null | undefined;
};
export type authCreateLoginMutation = {
  response: authCreateLoginMutation$data;
  variables: authCreateLoginMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "GalleryLogin",
    "kind": "LinkedField",
    "name": "createLogin",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "token",
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
    "name": "authCreateLoginMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "authCreateLoginMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5f0dee5eed9caf67c5726268503ccf18",
    "id": null,
    "metadata": {},
    "name": "authCreateLoginMutation",
    "operationKind": "mutation",
    "text": "mutation authCreateLoginMutation(\n  $input: GalleryCreateLoginInput!\n) {\n  createLogin(input: $input) {\n    token\n  }\n}\n"
  }
};
})();

(node as any).hash = "fd2d2077e9a4c2d4a5c4bc6d2c65badc";

export default node;
