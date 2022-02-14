import { Scalar } from '@nestjs/graphql';

import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Scalar('Upload')
export class Upload {
    description = 'Upload custom scalar type';

    // async parseValue(value: Promise<FileUpload>) {
    //     // const upload = await value
    //     // const stream = upload.createReadStream()
    //     // const fileType = await FileType.fromStream(stream)

    //     // if (isUndefined(fileType)) throw new GraphQLError('Mime type is unknown.')

    //     // if (fileType?.mime !== upload.mimetype)
    //     //     throw new GraphQLError('Mime type does not match file content.')

    //     return upload
    // }
    parseValue(value) {
        return GraphQLUpload.parseValue(value);
    }

    serialize(value: any) {
        return GraphQLUpload.serialize(value);
    }

    parseLiteral(ast) {
        return GraphQLUpload.parseLiteral(ast, ast.value);
    }
}