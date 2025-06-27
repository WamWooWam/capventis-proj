/**
 * @generated SignedSource<<5c8b567a886e3a0a23e50be55a0bd6a7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type GalleryCreateAlbumInput = {
  name: string;
};
export type CreateAlbumDialogMutation$variables = {
  input: GalleryCreateAlbumInput;
};
export type CreateAlbumDialogMutation$data = {
  readonly createAlbum: {
    readonly id: string;
  } | null | undefined;
};
export type CreateAlbumDialogMutation = {
  response: CreateAlbumDialogMutation$data;
  variables: CreateAlbumDialogMutation$variables;
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
    "concreteType": "GalleryAlbum",
    "kind": "LinkedField",
    "name": "createAlbum",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
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
    "name": "CreateAlbumDialogMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateAlbumDialogMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8d7f1a7996485b42dee1039e3542e0e1",
    "id": null,
    "metadata": {},
    "name": "CreateAlbumDialogMutation",
    "operationKind": "mutation",
    "text": "mutation CreateAlbumDialogMutation(\n  $input: GalleryCreateAlbumInput!\n) {\n  createAlbum(input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "bda9926bc938871b79951a2904a9c5b9";

export default node;
