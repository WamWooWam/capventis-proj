import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export const sequelize = new Sequelize('sqlite:' + process.env.DB_FILE);

export interface Image extends Model<InferAttributes<Image>, InferCreationAttributes<Image>> {
    id: string,
    name: CreationOptional<string>,
    description: CreationOptional<string>,
    width: number,
    height: number

    ImageDatum?: ImageData

    createImageDatum(params: InferCreationAttributes<ImageData>): Promise<ImageData>
    getImageDatum(params?: any): Promise<ImageData>;
    setImageDatum(data: ImageData, params?: any): Promise<void>;
}

export interface ImageData extends Model<InferAttributes<ImageData>, InferCreationAttributes<ImageData>> {
    data: ArrayBuffer,
    mimeType: string
}

export interface Album extends Model<InferAttributes<Album>, InferCreationAttributes<Album>> {
    id: string,
    name: string,

    getImages(params?: any): Promise<Image[]>
    addImage(image: Image, params?: any): Promise<void>
}

export interface AlbumImage extends Model<InferAttributes<AlbumImage>, InferCreationAttributes<AlbumImage>> {
    AlbumId: string,
    ImageId: string,
    index: number

    Image?: Image
    Album?: Album
}

export const Image = sequelize.define<Image>('Image', {
    id: { type: DataTypes.STRING, primaryKey: true },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    width: DataTypes.INTEGER,
    height: DataTypes.INTEGER
})

export const ImageData = sequelize.define<ImageData>('ImageData', {
    data: DataTypes.BLOB,
    mimeType: DataTypes.STRING
})

export const Album = sequelize.define<Album>('Album', {
    id: { type: DataTypes.STRING, primaryKey: true },
    name: DataTypes.STRING,
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
    await Image.sync();
    await ImageData.sync();
    await Album.sync();
    await AlbumImage.sync();
}