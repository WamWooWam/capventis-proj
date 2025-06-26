/**
 * @generated SignedSource<<48da549113e2d8848f96a2ee0ddea67d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type GalleryCreateImageInput = {
  album: string;
  requests: ReadonlyArray<GalleryCreateImageRequest>;
};
export type GalleryCreateImageRequest = {
  description: string;
  name: string;
};
export type UploadDialogGetKeyMutation$variables = {
  params: GalleryCreateImageInput;
};
export type UploadDialogGetKeyMutation$data = {
  readonly createImage: ReadonlyArray<{
    readonly key: string;
  } | null | undefined> | null | undefined;
};
export type UploadDialogGetKeyMutation = {
  response: UploadDialogGetKeyMutation$data;
  variables: UploadDialogGetKeyMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "params"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "params"
      }
    ],
    "concreteType": "GalleryCreateImageKey",
    "kind": "LinkedField",
    "name": "createImage",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "key",
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
    "name": "UploadDialogGetKeyMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UploadDialogGetKeyMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "46454476530b78bf25b8cb9d808b7d56",
    "id": null,
    "metadata": {},
    "name": "UploadDialogGetKeyMutation",
    "operationKind": "mutation",
    "text": "mutation UploadDialogGetKeyMutation(\n  $params: GalleryCreateImageInput!\n) {\n  createImage(input: $params) {\n    key\n  }\n}\n"
  }
};
})();

(node as any).hash = "fd23a1e395bf76e70ad12aded8eb3f1b";

export default node;
