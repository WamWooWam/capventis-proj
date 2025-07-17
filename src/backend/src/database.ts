import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export const sequelize = new Sequelize('sqlite:' + process.env.DB_FILE);

export interface Image extends Model<InferAttributes<Image>, InferCreationAttributes<Image>> {
    id: string
    name: CreationOptional<string>
    description: CreationOptional<string>
    width: number
    height: number

    UserId: string;
    ImageDatum?: ImageData

    createImageDatum(params: InferCreationAttributes<ImageData>): Promise<ImageData>
    getImageDatum(params?: any): Promise<ImageData>;
    setImageDatum(data: ImageData, params?: any): Promise<void>;
}

export interface ImageData extends Model<InferAttributes<ImageData>, InferCreationAttributes<ImageData>> {
    data: ArrayBuffer
    thumbnail: ArrayBuffer
    mimeType: string
}

export interface Album extends Model<InferAttributes<Album>, InferCreationAttributes<Album>> {
    id: string
    name: string

    User?: User;
    UserId: string;

    getImages(params?: any): Promise<Image[]>
    addImage(image: Image, params?: any): Promise<void>
}

export interface AlbumImage extends Model<InferAttributes<AlbumImage>, InferCreationAttributes<AlbumImage>> {
    AlbumId: string
    ImageId: string
    index: number

    Image?: Image
    Album?: Album
}

export interface User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    id: string
    name: string
    email: string
    hash: ArrayBuffer
    salt: ArrayBuffer
}

export const User = sequelize.define<User>('User', {
    id: { type: DataTypes.STRING, primaryKey: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    hash: DataTypes.BLOB,
    salt: DataTypes.BLOB,
}, {
    indexes: [
        { fields: ['name'], unique: true },
        { fields: ['email'], unique: true },
    ]
})

export const Image = sequelize.define<Image>('Image', {
    id: { type: DataTypes.STRING, primaryKey: true },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    width: DataTypes.INTEGER,
    height: DataTypes.INTEGER,

    UserId: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'id'
        }
    }
})

export const ImageData = sequelize.define<ImageData>('ImageData', {
    data: DataTypes.BLOB,
    thumbnail: DataTypes.BLOB,
    mimeType: DataTypes.STRING
})

export const Album = sequelize.define<Album>('Album', {
    id: { type: DataTypes.STRING, primaryKey: true },
    name: DataTypes.STRING,

    UserId: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'id'
        }
    }
})

export const AlbumImage = sequelize.define<AlbumImage>('AlbumImage', {
    AlbumId: {
        type: DataTypes.STRING,
        references: {
            model: Album, // 'Movies' would also work
            key: 'id',
        },
    },
    ImageId: {
        type: DataTypes.STRING,
        references: {
            model: Image, // 'Actors' would also work
            key: 'id',
        },
    },

    index: { type: DataTypes.INTEGER }
}, {
    indexes: [
        { fields: ["index"] }
    ]
})


User.hasMany(Album);
Album.hasOne(User, { foreignKey: 'UserId' })

User.hasMany(Image);
Image.hasOne(User, { foreignKey: 'UserId' })

Image.belongsToMany(Album, { through: AlbumImage });
Album.belongsToMany(Image, { through: AlbumImage });

Image.hasMany(AlbumImage, { foreignKey: 'ImageId' });
AlbumImage.belongsTo(Image, { foreignKey: 'ImageId' });

Album.hasMany(AlbumImage, { foreignKey: 'AlbumId' });
AlbumImage.belongsTo(Album, { foreignKey: 'AlbumId' });

Image.hasOne(ImageData, {
    foreignKey: {
        allowNull: false,
    }
});
ImageData.belongsTo(Image);

export async function sync() {
    await User.sync();
    await Image.sync();
    await ImageData.sync();
    await Album.sync();
    await AlbumImage.sync();
}