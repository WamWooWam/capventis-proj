/**
 * @generated SignedSource<<d999dc3848d646c5bfff3d0666d88bfa>>
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
    readonly token: string;
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
    "cacheID": "cc9834118ffc316f37e9eb2039fe6c2c",
    "id": null,
    "metadata": {},
    "name": "UploadDialogGetKeyMutation",
    "operationKind": "mutation",
    "text": "mutation UploadDialogGetKeyMutation(\n  $params: GalleryCreateImageInput!\n) {\n  createImage(input: $params) {\n    token\n  }\n}\n"
  }
};
})();

(node as any).hash = "73f64255dc200a311cdae4a030c77d6a";

export default node;
