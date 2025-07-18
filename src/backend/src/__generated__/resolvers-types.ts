import { GraphQLResolveInfo } from 'graphql';
import { ApolloContext } from '../index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type GalleryAlbum = Node & {
  __typename?: 'GalleryAlbum';
  count: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  images?: Maybe<Array<Maybe<GalleryImage>>>;
  imagesConnection: GalleryAlbumImagesConnection;
  name: Scalars['String']['output'];
  owner: GalleryUser;
};


export type GalleryAlbumImagesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type GalleryAlbumImagesConnection = {
  __typename?: 'GalleryAlbumImagesConnection';
  edges?: Maybe<Array<Maybe<GalleryAlbumImagesEdge>>>;
  images?: Maybe<Array<Maybe<GalleryImage>>>;
  pageInfo: PageInfo;
};

export type GalleryAlbumImagesEdge = {
  __typename?: 'GalleryAlbumImagesEdge';
  cursor: Scalars['ID']['output'];
  node?: Maybe<GalleryImage>;
};

export type GalleryCreateAlbumInput = {
  name: Scalars['String']['input'];
};

export type GalleryCreateImageInput = {
  album: Scalars['ID']['input'];
  requests: Array<GalleryCreateImageRequest>;
};

export type GalleryCreateImageKey = {
  __typename?: 'GalleryCreateImageKey';
  expiresAt: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type GalleryCreateImageRequest = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type GalleryCreateLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type GalleryCreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type GalleryImage = Node & {
  __typename?: 'GalleryImage';
  description?: Maybe<Scalars['String']['output']>;
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  thumbUrl: Scalars['String']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type GalleryLogin = {
  __typename?: 'GalleryLogin';
  token?: Maybe<Scalars['String']['output']>;
};

export type GalleryUpdateAlbumInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type GalleryUpdateImageInput = {
  description: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type GalleryUser = Node & {
  __typename?: 'GalleryUser';
  albums?: Maybe<Array<Maybe<GalleryAlbum>>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAlbum?: Maybe<GalleryAlbum>;
  createImage?: Maybe<Array<Maybe<GalleryCreateImageKey>>>;
  createLogin?: Maybe<GalleryLogin>;
  createUser?: Maybe<GalleryUser>;
  deleteAlbum: Array<Scalars['ID']['output']>;
  deleteImage: Array<Scalars['ID']['output']>;
  deleteUser: Scalars['ID']['output'];
  updateAlbum?: Maybe<GalleryAlbum>;
  updateImage?: Maybe<GalleryImage>;
};


export type MutationCreateAlbumArgs = {
  input: GalleryCreateAlbumInput;
};


export type MutationCreateImageArgs = {
  input: GalleryCreateImageInput;
};


export type MutationCreateLoginArgs = {
  input: GalleryCreateLoginInput;
};


export type MutationCreateUserArgs = {
  input: GalleryCreateUserInput;
};


export type MutationDeleteAlbumArgs = {
  input: Array<Scalars['ID']['input']>;
};


export type MutationDeleteImageArgs = {
  input: Array<Scalars['ID']['input']>;
};


export type MutationDeleteUserArgs = {
  input: Scalars['ID']['input'];
};


export type MutationUpdateAlbumArgs = {
  input: GalleryUpdateAlbumInput;
};


export type MutationUpdateImageArgs = {
  input: GalleryUpdateImageInput;
};

export type Node = {
  id: Scalars['ID']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['ID']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  albums?: Maybe<Array<Maybe<GalleryAlbum>>>;
  node?: Maybe<Node>;
  user?: Maybe<GalleryUser>;
};


export type QueryAlbumsArgs = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QueryNodeArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = ResolversObject<{
  Node: ( GalleryAlbum ) | ( GalleryImage ) | ( GalleryUser );
}>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  GalleryAlbum: ResolverTypeWrapper<GalleryAlbum>;
  GalleryAlbumImagesConnection: ResolverTypeWrapper<GalleryAlbumImagesConnection>;
  GalleryAlbumImagesEdge: ResolverTypeWrapper<GalleryAlbumImagesEdge>;
  GalleryCreateAlbumInput: GalleryCreateAlbumInput;
  GalleryCreateImageInput: GalleryCreateImageInput;
  GalleryCreateImageKey: ResolverTypeWrapper<GalleryCreateImageKey>;
  GalleryCreateImageRequest: GalleryCreateImageRequest;
  GalleryCreateLoginInput: GalleryCreateLoginInput;
  GalleryCreateUserInput: GalleryCreateUserInput;
  GalleryImage: ResolverTypeWrapper<GalleryImage>;
  GalleryLogin: ResolverTypeWrapper<GalleryLogin>;
  GalleryUpdateAlbumInput: GalleryUpdateAlbumInput;
  GalleryUpdateImageInput: GalleryUpdateImageInput;
  GalleryUser: ResolverTypeWrapper<GalleryUser>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Node']>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  GalleryAlbum: GalleryAlbum;
  GalleryAlbumImagesConnection: GalleryAlbumImagesConnection;
  GalleryAlbumImagesEdge: GalleryAlbumImagesEdge;
  GalleryCreateAlbumInput: GalleryCreateAlbumInput;
  GalleryCreateImageInput: GalleryCreateImageInput;
  GalleryCreateImageKey: GalleryCreateImageKey;
  GalleryCreateImageRequest: GalleryCreateImageRequest;
  GalleryCreateLoginInput: GalleryCreateLoginInput;
  GalleryCreateUserInput: GalleryCreateUserInput;
  GalleryImage: GalleryImage;
  GalleryLogin: GalleryLogin;
  GalleryUpdateAlbumInput: GalleryUpdateAlbumInput;
  GalleryUpdateImageInput: GalleryUpdateImageInput;
  GalleryUser: GalleryUser;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Node: ResolversInterfaceTypes<ResolversParentTypes>['Node'];
  PageInfo: PageInfo;
  Query: {};
  String: Scalars['String']['output'];
}>;

export type GalleryAlbumResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['GalleryAlbum'] = ResolversParentTypes['GalleryAlbum']> = ResolversObject<{
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Maybe<Array<Maybe<ResolversTypes['GalleryImage']>>>, ParentType, ContextType>;
  imagesConnection?: Resolver<ResolversTypes['GalleryAlbumImagesConnection'], ParentType, ContextType, Partial<GalleryAlbumImagesConnectionArgs>>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['GalleryUser'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryAlbumImagesConnectionResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['GalleryAlbumImagesConnection'] = ResolversParentTypes['GalleryAlbumImagesConnection']> = ResolversObject<{
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['GalleryAlbumImagesEdge']>>>, ParentType, ContextType>;
  images?: Resolver<Maybe<Array<Maybe<ResolversTypes['GalleryImage']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryAlbumImagesEdgeResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['GalleryAlbumImagesEdge'] = ResolversParentTypes['GalleryAlbumImagesEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['GalleryImage']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryCreateImageKeyResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['GalleryCreateImageKey'] = ResolversParentTypes['GalleryCreateImageKey']> = ResolversObject<{
  expiresAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryImageResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['GalleryImage'] = ResolversParentTypes['GalleryImage']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  thumbUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  width?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryLoginResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['GalleryLogin'] = ResolversParentTypes['GalleryLogin']> = ResolversObject<{
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryUserResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['GalleryUser'] = ResolversParentTypes['GalleryUser']> = ResolversObject<{
  albums?: Resolver<Maybe<Array<Maybe<ResolversTypes['GalleryAlbum']>>>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createAlbum?: Resolver<Maybe<ResolversTypes['GalleryAlbum']>, ParentType, ContextType, RequireFields<MutationCreateAlbumArgs, 'input'>>;
  createImage?: Resolver<Maybe<Array<Maybe<ResolversTypes['GalleryCreateImageKey']>>>, ParentType, ContextType, RequireFields<MutationCreateImageArgs, 'input'>>;
  createLogin?: Resolver<Maybe<ResolversTypes['GalleryLogin']>, ParentType, ContextType, RequireFields<MutationCreateLoginArgs, 'input'>>;
  createUser?: Resolver<Maybe<ResolversTypes['GalleryUser']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  deleteAlbum?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationDeleteAlbumArgs, 'input'>>;
  deleteImage?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationDeleteImageArgs, 'input'>>;
  deleteUser?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'input'>>;
  updateAlbum?: Resolver<Maybe<ResolversTypes['GalleryAlbum']>, ParentType, ContextType, RequireFields<MutationUpdateAlbumArgs, 'input'>>;
  updateImage?: Resolver<Maybe<ResolversTypes['GalleryImage']>, ParentType, ContextType, RequireFields<MutationUpdateImageArgs, 'input'>>;
}>;

export type NodeResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = ResolversObject<{
  __resolveType: TypeResolveFn<'GalleryAlbum' | 'GalleryImage' | 'GalleryUser', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
}>;

export type PageInfoResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  endCursor?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  albums?: Resolver<Maybe<Array<Maybe<ResolversTypes['GalleryAlbum']>>>, ParentType, ContextType, Partial<QueryAlbumsArgs>>;
  node?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, Partial<QueryNodeArgs>>;
  user?: Resolver<Maybe<ResolversTypes['GalleryUser']>, ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ApolloContext> = ResolversObject<{
  GalleryAlbum?: GalleryAlbumResolvers<ContextType>;
  GalleryAlbumImagesConnection?: GalleryAlbumImagesConnectionResolvers<ContextType>;
  GalleryAlbumImagesEdge?: GalleryAlbumImagesEdgeResolvers<ContextType>;
  GalleryCreateImageKey?: GalleryCreateImageKeyResolvers<ContextType>;
  GalleryImage?: GalleryImageResolvers<ContextType>;
  GalleryLogin?: GalleryLoginResolvers<ContextType>;
  GalleryUser?: GalleryUserResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

